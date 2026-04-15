"""ODE Time Calibration — bridge pseudotime to calendar months.

Addresses architecture_auditor FAIL:
  "trajectory.integration_time=100.0 is in *arbitrary units*; calendar-time
   'when'-claims are not supported until the integrator is calibrated to
   clinical time."

Also addresses forecasting_uncertainty_agent SKIP:
  "ODE integration_time is in arbitrary units; mapping to calendar months has
   not been demonstrated."

Strategy:
  The ChromatinODE integrates from t=0 to t=integration_time in *latent ODE
  units*. To claim "3-month forecast", we need a learned or empirically
  validated mapping from ODE-time to calendar-time.

  This module provides two approaches:
    1. Supervised calibration: fit a monotonic mapping using paired
       (pseudotime, calendar_time) data from longitudinal patients (MMRF).
    2. Landmark calibration: anchor specific ODE-time values to known
       clinical landmarks (e.g., median PFS for standard-risk NDMM).

  After calibration, every temporal prediction emits:
    - calendar_time_months: mapped time in months
    - calibration_uncertainty: confidence interval from the mapping
    - calibration_method: which approach was used
    - is_extrapolation: whether the prediction exceeds training range
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any, Optional

import numpy as np

logger = logging.getLogger(__name__)

try:
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    HAS_TORCH = True
except ImportError:
    HAS_TORCH = False


@dataclass
class CalibrationResult:
    """Result of mapping ODE pseudotime to calendar time."""

    pseudotime: float
    calendar_months: float
    ci_lower: float  # 95% CI lower bound (months)
    ci_upper: float  # 95% CI upper bound (months)
    calibration_method: str  # "supervised" | "landmark" | "uncalibrated"
    is_extrapolation: bool
    confidence: float  # 0-1, how trustworthy this mapping is

    def to_dict(self) -> dict[str, Any]:
        return {
            "pseudotime": round(self.pseudotime, 4),
            "calendar_months": round(self.calendar_months, 2),
            "ci_lower_months": round(self.ci_lower, 2),
            "ci_upper_months": round(self.ci_upper, 2),
            "calibration_method": self.calibration_method,
            "is_extrapolation": self.is_extrapolation,
            "confidence": round(self.confidence, 3),
        }


@dataclass
class CalibrationConfig:
    """Configuration for time calibration."""

    # Supervised calibration
    n_spline_knots: int = 5
    fit_epochs: int = 500
    learning_rate: float = 0.01

    # Landmark calibration (fallback)
    # Median PFS for standard-risk NDMM on VRd: ~40-50 months (SWOG S0777)
    # Median PFS for high-risk NDMM: ~18-24 months
    landmark_pfs_standard_risk_months: float = 45.0
    landmark_pfs_high_risk_months: float = 21.0

    # Extrapolation bounds
    max_calibrated_months: float = 36.0  # Don't claim beyond 3 years
    extrapolation_penalty: float = 0.5  # Confidence multiplier for extrapolation


class ODETimeCalibrator:
    """Calibrates ODE integration time to clinical calendar months.

    Two-tier calibration:
      Tier 1 (supervised): Fit monotonic spline on longitudinal patient data
        where we observe both ODE latent trajectory and clinical event times.
      Tier 2 (landmark): Anchor ODE time using known clinical landmarks
        (median PFS from published trials) when paired data is unavailable.

    Usage:
        calibrator = ODETimeCalibrator(config)

        # Tier 1: Supervised (preferred)
        calibrator.fit_supervised(pseudotimes, calendar_months, censored)

        # Tier 2: Landmark (fallback)
        calibrator.fit_landmark(ode_integration_time, reference_pfs_months)

        # Map ODE time to calendar
        result = calibrator.calibrate(pseudotime=50.0)
        print(f"{result.calendar_months:.1f} months (CI: {result.ci_lower:.1f}-{result.ci_upper:.1f})")
    """

    def __init__(self, config: Optional[CalibrationConfig] = None):
        self.config = config or CalibrationConfig()
        self._method: str = "uncalibrated"
        self._fitted: bool = False

        # Supervised calibration parameters
        self._knot_pseudotimes: Optional[np.ndarray] = None
        self._knot_calendar: Optional[np.ndarray] = None
        self._residual_std: float = 0.0
        self._train_max_pseudotime: float = 0.0
        self._train_max_calendar: float = 0.0

        # Landmark calibration parameters
        self._landmark_scale: float = 1.0  # calendar_months / pseudotime
        self._landmark_uncertainty: float = 5.0  # months

    def fit_supervised(
        self,
        pseudotimes: np.ndarray,
        calendar_months: np.ndarray,
        censored: Optional[np.ndarray] = None,
    ) -> "ODETimeCalibrator":
        """Fit monotonic mapping from longitudinal patient data.

        Args:
            pseudotimes: (N,) ODE pseudotime values at clinical events
            calendar_months: (N,) corresponding calendar time in months
            censored: (N,) boolean, True if observation is right-censored

        Returns:
            Self for chaining.
        """
        n = len(pseudotimes)
        if n < 10:
            logger.warning(
                "Only %d paired observations for supervised calibration; "
                "falling back to landmark. Need ≥10 for reliable fit.", n
            )
            return self.fit_landmark(
                ode_integration_time=float(pseudotimes.max()),
                reference_pfs_months=float(calendar_months.max()),
            )

        # Sort by pseudotime
        order = np.argsort(pseudotimes)
        pt_sorted = pseudotimes[order]
        cal_sorted = calendar_months[order]

        # Fit monotonic piecewise-linear spline
        n_knots = min(self.config.n_spline_knots, n // 3)
        knot_indices = np.linspace(0, n - 1, n_knots + 2, dtype=int)[1:-1]

        self._knot_pseudotimes = pt_sorted[knot_indices]
        self._knot_calendar = cal_sorted[knot_indices]

        # Enforce monotonicity
        for i in range(1, len(self._knot_calendar)):
            self._knot_calendar[i] = max(
                self._knot_calendar[i],
                self._knot_calendar[i - 1] + 0.1,
            )

        # Compute residual uncertainty
        predicted = np.interp(pt_sorted, self._knot_pseudotimes, self._knot_calendar)
        residuals = cal_sorted - predicted
        if censored is not None:
            # Only use uncensored observations for residual estimation
            uncensored_mask = ~censored[order]
            if uncensored_mask.sum() > 2:
                residuals = residuals[uncensored_mask]
        self._residual_std = float(np.std(residuals)) if len(residuals) > 1 else 3.0

        self._train_max_pseudotime = float(pt_sorted[-1])
        self._train_max_calendar = float(cal_sorted[-1])
        self._method = "supervised"
        self._fitted = True

        logger.info(
            "Supervised calibration fitted: %d knots, residual_std=%.2f months, "
            "range=[0, %.1f] pseudotime → [0, %.1f] months",
            n_knots, self._residual_std,
            self._train_max_pseudotime, self._train_max_calendar,
        )
        return self

    def fit_landmark(
        self,
        ode_integration_time: float,
        reference_pfs_months: Optional[float] = None,
        risk_group: str = "standard",
    ) -> "ODETimeCalibrator":
        """Fallback calibration using clinical landmark.

        Assumes a linear mapping: calendar_months = scale * pseudotime,
        anchored at a known clinical landmark (median PFS).

        Args:
            ode_integration_time: Total ODE integration time in model units
            reference_pfs_months: Known clinical reference (e.g., median PFS)
            risk_group: "standard" or "high" (selects default PFS if not given)

        Returns:
            Self for chaining.
        """
        if reference_pfs_months is None:
            reference_pfs_months = (
                self.config.landmark_pfs_standard_risk_months
                if risk_group == "standard"
                else self.config.landmark_pfs_high_risk_months
            )

        self._landmark_scale = reference_pfs_months / max(ode_integration_time, 1e-6)

        # Uncertainty is higher for landmark-based calibration
        # Assume ±20% of the reference PFS as the mapping uncertainty
        self._landmark_uncertainty = reference_pfs_months * 0.20

        self._train_max_pseudotime = ode_integration_time
        self._train_max_calendar = reference_pfs_months
        self._method = "landmark"
        self._fitted = True

        logger.info(
            "Landmark calibration: ODE %.1f → %.1f months (%s risk), "
            "scale=%.4f, uncertainty=±%.1f months",
            ode_integration_time, reference_pfs_months, risk_group,
            self._landmark_scale, self._landmark_uncertainty,
        )
        return self

    def calibrate(self, pseudotime: float) -> CalibrationResult:
        """Map a single ODE pseudotime to calendar months.

        Args:
            pseudotime: Scalar ODE time value.

        Returns:
            CalibrationResult with calendar time and uncertainty.
        """
        if not self._fitted:
            return CalibrationResult(
                pseudotime=pseudotime,
                calendar_months=pseudotime,  # identity = uncalibrated
                ci_lower=0.0,
                ci_upper=pseudotime * 2,
                calibration_method="uncalibrated",
                is_extrapolation=True,
                confidence=0.0,
            )

        is_extrapolation = pseudotime > self._train_max_pseudotime

        if self._method == "supervised":
            calendar = float(
                np.interp(
                    pseudotime,
                    self._knot_pseudotimes,
                    self._knot_calendar,
                )
            )
            # Linear extrapolation beyond training range
            if is_extrapolation and len(self._knot_pseudotimes) >= 2:
                slope = (
                    (self._knot_calendar[-1] - self._knot_calendar[-2])
                    / (self._knot_pseudotimes[-1] - self._knot_pseudotimes[-2] + 1e-8)
                )
                overshoot = pseudotime - self._train_max_pseudotime
                calendar = self._train_max_calendar + slope * overshoot

            # 95% CI from residual std (wider for extrapolation)
            ci_width = 1.96 * self._residual_std
            if is_extrapolation:
                extrap_factor = 1 + (pseudotime / self._train_max_pseudotime - 1)
                ci_width *= extrap_factor

            confidence = 0.85 if not is_extrapolation else max(0.3, 0.85 - 0.2 * (pseudotime / self._train_max_pseudotime - 1))

        else:  # landmark
            calendar = self._landmark_scale * pseudotime
            ci_width = self._landmark_uncertainty * (1 + 0.5 * (pseudotime / self._train_max_pseudotime))
            confidence = 0.5 if not is_extrapolation else max(0.15, 0.5 - 0.2 * (pseudotime / self._train_max_pseudotime - 1))

        # Clamp to configured maximum
        calendar = min(calendar, self.config.max_calibrated_months)
        if is_extrapolation:
            confidence *= self.config.extrapolation_penalty

        return CalibrationResult(
            pseudotime=pseudotime,
            calendar_months=max(0.0, calendar),
            ci_lower=max(0.0, calendar - ci_width),
            ci_upper=calendar + ci_width,
            calibration_method=self._method,
            is_extrapolation=is_extrapolation,
            confidence=min(1.0, max(0.0, confidence)),
        )

    def calibrate_horizons(
        self, horizons_months: list[float] = [3, 6, 12]
    ) -> dict[int, CalibrationResult]:
        """Reverse-map: given desired calendar horizons, find ODE pseudotimes.

        Args:
            horizons_months: Desired forecast horizons in months.

        Returns:
            Dict mapping horizon_months → CalibrationResult.
        """
        results = {}
        for h in horizons_months:
            if self._method == "supervised" and self._knot_pseudotimes is not None:
                # Inverse interpolation
                pt = float(np.interp(h, self._knot_calendar, self._knot_pseudotimes))
            elif self._method == "landmark":
                pt = h / max(self._landmark_scale, 1e-8)
            else:
                pt = h  # uncalibrated
            results[int(h)] = self.calibrate(pt)
        return results

    def state_dict(self) -> dict[str, Any]:
        """Serialize for checkpointing."""
        return {
            "method": self._method,
            "fitted": self._fitted,
            "knot_pseudotimes": self._knot_pseudotimes,
            "knot_calendar": self._knot_calendar,
            "residual_std": self._residual_std,
            "train_max_pseudotime": self._train_max_pseudotime,
            "train_max_calendar": self._train_max_calendar,
            "landmark_scale": self._landmark_scale,
            "landmark_uncertainty": self._landmark_uncertainty,
        }

    def load_state_dict(self, state: dict[str, Any]) -> None:
        """Restore from checkpoint."""
        self._method = state["method"]
        self._fitted = state["fitted"]
        self._knot_pseudotimes = state.get("knot_pseudotimes")
        self._knot_calendar = state.get("knot_calendar")
        self._residual_std = state.get("residual_std", 0.0)
        self._train_max_pseudotime = state.get("train_max_pseudotime", 0.0)
        self._train_max_calendar = state.get("train_max_calendar", 0.0)
        self._landmark_scale = state.get("landmark_scale", 1.0)
        self._landmark_uncertainty = state.get("landmark_uncertainty", 5.0)
