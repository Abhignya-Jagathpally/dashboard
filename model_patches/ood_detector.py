"""Out-of-Distribution (OOD) Detector for ResistanceMap.

Addresses Tier C clinical safety failure:
  "No OOD detector present: the model cannot recognize when a patient lies
   outside its training distribution and will still emit a confident
   recommendation."

Implements a multi-signal OOD scoring system that gates predictions through
an abstention pathway. When a sample is flagged OOD, the inference API
returns a 'defer_to_clinician' verdict instead of a resistance score.

Design principles:
  1. Multiple complementary signals (no single-point-of-failure)
  2. Conservative thresholds (prefer false-positive OOD over missed OOD)
  3. Interpretable reason codes for each OOD flag
  4. Configurable abstention threshold per deployment context

Signals used:
  - Mahalanobis distance in VAE latent space
  - Reconstruction error from VAE decoder
  - Evidential uncertainty from landscape head (if available)
  - Feature-space density estimation (kNN distance)
  - Drug coverage check (is this drug in training set?)
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Optional

import numpy as np

logger = logging.getLogger(__name__)


class OODVerdict(str, Enum):
    """Outcome of OOD screening."""

    IN_DISTRIBUTION = "in_distribution"
    BORDERLINE = "borderline"
    OUT_OF_DISTRIBUTION = "out_of_distribution"
    DEFER_TO_CLINICIAN = "defer_to_clinician"


@dataclass
class OODReport:
    """Structured report from OOD detector."""

    verdict: OODVerdict
    overall_score: float  # 0 = perfectly in-distribution, 1 = extreme OOD
    signal_scores: dict[str, float] = field(default_factory=dict)
    reason_codes: list[str] = field(default_factory=list)
    abstain: bool = False
    confidence_adjustment: float = 1.0  # Multiplier to apply to model confidence

    def to_dict(self) -> dict[str, Any]:
        return {
            "verdict": self.verdict.value,
            "overall_score": round(self.overall_score, 4),
            "signal_scores": {k: round(v, 4) for k, v in self.signal_scores.items()},
            "reason_codes": self.reason_codes,
            "abstain": self.abstain,
            "confidence_adjustment": round(self.confidence_adjustment, 4),
        }


@dataclass
class OODConfig:
    """Configuration for OOD detector thresholds."""

    # Mahalanobis distance threshold (in latent space)
    mahalanobis_warn: float = 3.0     # z-score equivalent
    mahalanobis_reject: float = 5.0

    # Reconstruction error threshold (relative to training distribution)
    recon_error_warn_percentile: float = 95.0
    recon_error_reject_percentile: float = 99.0

    # kNN density threshold (distance to k-th nearest neighbor)
    knn_k: int = 10
    knn_warn_percentile: float = 95.0
    knn_reject_percentile: float = 99.0

    # Evidential uncertainty (if available)
    evidential_warn: float = 0.7
    evidential_reject: float = 0.9

    # Overall abstention threshold (weighted combination)
    abstention_threshold: float = 0.6

    # Signal weights for overall score
    weights: dict[str, float] = field(default_factory=lambda: {
        "mahalanobis": 0.30,
        "reconstruction": 0.25,
        "knn_density": 0.25,
        "evidential": 0.10,
        "drug_coverage": 0.10,
    })


class OODDetector:
    """Multi-signal OOD detector for ResistanceMap predictions.

    Fits on training data latent representations and gates inference
    predictions through an abstention pathway.

    Usage:
        # During training / checkpoint loading
        detector = OODDetector(config)
        detector.fit(train_latents, train_recon_errors, known_drugs)

        # During inference
        report = detector.score(sample_latent, sample_recon_error, drug_name)
        if report.abstain:
            return {"verdict": "defer_to_clinician", "ood_report": report.to_dict()}
    """

    def __init__(self, config: Optional[OODConfig] = None):
        self.config = config or OODConfig()
        self._fitted = False

        # Fitted parameters (populated by .fit())
        self._latent_mean: Optional[np.ndarray] = None
        self._latent_cov_inv: Optional[np.ndarray] = None
        self._recon_error_percentiles: Optional[dict[float, float]] = None
        self._train_latents: Optional[np.ndarray] = None
        self._knn_percentiles: Optional[dict[float, float]] = None
        self._known_drugs: set[str] = set()
        self._n_train: int = 0

    def fit(
        self,
        train_latents: np.ndarray,
        train_recon_errors: np.ndarray,
        known_drugs: list[str],
    ) -> None:
        """Fit OOD detector on training data representations.

        Args:
            train_latents: (N, D) array of VAE latent representations
            train_recon_errors: (N,) array of reconstruction errors
            known_drugs: List of drug names seen during training
        """
        self._n_train = len(train_latents)
        logger.info(
            "Fitting OOD detector on %d training samples, %d latent dims",
            self._n_train,
            train_latents.shape[1],
        )

        # ── Mahalanobis distance parameters ──
        self._latent_mean = np.mean(train_latents, axis=0)
        cov = np.cov(train_latents, rowvar=False)
        # Regularize covariance for numerical stability
        cov += np.eye(cov.shape[0]) * 1e-6
        self._latent_cov_inv = np.linalg.inv(cov)

        # ── Reconstruction error percentiles ──
        self._recon_error_percentiles = {
            p: float(np.percentile(train_recon_errors, p))
            for p in [50, 75, 90, 95, 99, 99.5]
        }

        # ── kNN density estimation ──
        self._train_latents = train_latents.copy()
        train_knn_dists = self._compute_knn_distances(train_latents)
        self._knn_percentiles = {
            p: float(np.percentile(train_knn_dists, p))
            for p in [50, 75, 90, 95, 99, 99.5]
        }

        # ── Drug coverage ──
        self._known_drugs = set(d.lower().strip() for d in known_drugs)

        self._fitted = True
        logger.info(
            "OOD detector fitted: mahalanobis ready, recon_error p95=%.4f, "
            "knn p95=%.4f, %d known drugs",
            self._recon_error_percentiles[95],
            self._knn_percentiles[95],
            len(self._known_drugs),
        )

    def score(
        self,
        latent: np.ndarray,
        recon_error: float,
        drug_name: Optional[str] = None,
        evidential_uncertainty: Optional[float] = None,
    ) -> OODReport:
        """Score a single sample for OOD detection.

        Args:
            latent: (D,) latent representation from VAE encoder
            recon_error: Scalar reconstruction error
            drug_name: Optional drug name for coverage check
            evidential_uncertainty: Optional uncertainty from evidential head

        Returns:
            OODReport with verdict, scores, and abstention decision
        """
        if not self._fitted:
            logger.warning("OOD detector not fitted; returning conservative OOD flag")
            return OODReport(
                verdict=OODVerdict.DEFER_TO_CLINICIAN,
                overall_score=1.0,
                reason_codes=["ood_detector_not_fitted"],
                abstain=True,
                confidence_adjustment=0.0,
            )

        signal_scores: dict[str, float] = {}
        reason_codes: list[str] = []

        # ── Signal 1: Mahalanobis distance ──
        maha_dist = self._mahalanobis_distance(latent)
        maha_score = self._threshold_to_score(
            maha_dist,
            self.config.mahalanobis_warn,
            self.config.mahalanobis_reject,
        )
        signal_scores["mahalanobis"] = maha_score
        if maha_dist > self.config.mahalanobis_reject:
            reason_codes.append(
                f"latent_space_outlier(mahalanobis={maha_dist:.2f}>"
                f"{self.config.mahalanobis_reject})"
            )
        elif maha_dist > self.config.mahalanobis_warn:
            reason_codes.append(
                f"latent_space_borderline(mahalanobis={maha_dist:.2f})"
            )

        # ── Signal 2: Reconstruction error ──
        recon_p95 = self._recon_error_percentiles[95]
        recon_p99 = self._recon_error_percentiles[99]
        recon_score = self._threshold_to_score(recon_error, recon_p95, recon_p99)
        signal_scores["reconstruction"] = recon_score
        if recon_error > recon_p99:
            reason_codes.append(
                f"high_reconstruction_error({recon_error:.4f}>p99={recon_p99:.4f})"
            )

        # ── Signal 3: kNN density ──
        knn_dist = self._compute_knn_distances(latent.reshape(1, -1))[0]
        knn_p95 = self._knn_percentiles[95]
        knn_p99 = self._knn_percentiles[99]
        knn_score = self._threshold_to_score(knn_dist, knn_p95, knn_p99)
        signal_scores["knn_density"] = knn_score
        if knn_dist > knn_p99:
            reason_codes.append(
                f"sparse_neighborhood(knn_dist={knn_dist:.4f}>p99={knn_p99:.4f})"
            )

        # ── Signal 4: Evidential uncertainty ──
        if evidential_uncertainty is not None:
            ev_score = self._threshold_to_score(
                evidential_uncertainty,
                self.config.evidential_warn,
                self.config.evidential_reject,
            )
            signal_scores["evidential"] = ev_score
            if evidential_uncertainty > self.config.evidential_reject:
                reason_codes.append(
                    f"high_epistemic_uncertainty({evidential_uncertainty:.3f})"
                )
        else:
            signal_scores["evidential"] = 0.0  # Neutral if not available

        # ── Signal 5: Drug coverage ──
        if drug_name is not None:
            drug_known = drug_name.lower().strip() in self._known_drugs
            drug_score = 0.0 if drug_known else 1.0
            signal_scores["drug_coverage"] = drug_score
            if not drug_known:
                reason_codes.append(f"unknown_drug({drug_name})")
        else:
            signal_scores["drug_coverage"] = 0.0

        # ── Weighted overall score ──
        overall = sum(
            self.config.weights.get(k, 0.0) * v
            for k, v in signal_scores.items()
        )
        overall = min(max(overall, 0.0), 1.0)

        # ── Verdict ──
        if overall >= self.config.abstention_threshold:
            verdict = OODVerdict.DEFER_TO_CLINICIAN
            abstain = True
        elif overall >= self.config.abstention_threshold * 0.6:
            verdict = OODVerdict.BORDERLINE
            abstain = False
        else:
            verdict = OODVerdict.IN_DISTRIBUTION
            abstain = False

        # Confidence adjustment: scale down model confidence proportionally
        confidence_adjustment = max(0.0, 1.0 - overall)

        return OODReport(
            verdict=verdict,
            overall_score=overall,
            signal_scores=signal_scores,
            reason_codes=reason_codes,
            abstain=abstain,
            confidence_adjustment=confidence_adjustment,
        )

    def score_batch(
        self,
        latents: np.ndarray,
        recon_errors: np.ndarray,
        drug_names: Optional[list[str]] = None,
        evidential_uncertainties: Optional[np.ndarray] = None,
    ) -> list[OODReport]:
        """Score a batch of samples."""
        n = len(latents)
        reports = []
        for i in range(n):
            report = self.score(
                latent=latents[i],
                recon_error=float(recon_errors[i]),
                drug_name=drug_names[i] if drug_names else None,
                evidential_uncertainty=(
                    float(evidential_uncertainties[i])
                    if evidential_uncertainties is not None
                    else None
                ),
            )
            reports.append(report)
        return reports

    @property
    def abstention_rate(self) -> Optional[float]:
        """Return None until we track predictions; caller must compute."""
        return None

    # ── Private helpers ──────────────────────────────────────────────────

    def _mahalanobis_distance(self, x: np.ndarray) -> float:
        """Mahalanobis distance from training centroid."""
        diff = x - self._latent_mean
        return float(np.sqrt(diff @ self._latent_cov_inv @ diff))

    def _compute_knn_distances(self, queries: np.ndarray) -> np.ndarray:
        """Mean distance to k nearest training neighbors."""
        # Simple brute-force for now; swap to faiss for production
        dists = np.linalg.norm(
            queries[:, None, :] - self._train_latents[None, :, :], axis=2
        )
        # Sort and take mean of k nearest (excluding self if in training set)
        k = min(self.config.knn_k, self._n_train - 1)
        knn_dists = np.sort(dists, axis=1)[:, :k]
        return np.mean(knn_dists, axis=1)

    @staticmethod
    def _threshold_to_score(value: float, warn: float, reject: float) -> float:
        """Map a value to [0, 1] score using warn/reject thresholds."""
        if value <= warn:
            return 0.0
        elif value >= reject:
            return 1.0
        else:
            return (value - warn) / (reject - warn)

    def state_dict(self) -> dict[str, Any]:
        """Serialize detector state for checkpointing."""
        return {
            "fitted": self._fitted,
            "latent_mean": self._latent_mean,
            "latent_cov_inv": self._latent_cov_inv,
            "recon_error_percentiles": self._recon_error_percentiles,
            "train_latents": self._train_latents,
            "knn_percentiles": self._knn_percentiles,
            "known_drugs": list(self._known_drugs),
            "n_train": self._n_train,
            "config": {
                "mahalanobis_warn": self.config.mahalanobis_warn,
                "mahalanobis_reject": self.config.mahalanobis_reject,
                "abstention_threshold": self.config.abstention_threshold,
                "knn_k": self.config.knn_k,
            },
        }

    def load_state_dict(self, state: dict[str, Any]) -> None:
        """Restore detector state from checkpoint."""
        self._fitted = state["fitted"]
        self._latent_mean = state["latent_mean"]
        self._latent_cov_inv = state["latent_cov_inv"]
        self._recon_error_percentiles = state["recon_error_percentiles"]
        self._train_latents = state["train_latents"]
        self._knn_percentiles = state["knn_percentiles"]
        self._known_drugs = set(state["known_drugs"])
        self._n_train = state["n_train"]
        logger.info("OOD detector state restored (%d training samples)", self._n_train)
