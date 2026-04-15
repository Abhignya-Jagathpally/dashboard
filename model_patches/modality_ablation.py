"""Leave-One-Modality-Out (LOMO) Ablation Framework.

Addresses architecture_auditor FAIL:
  "Cross-attention fusion can collapse onto a single dominant modality
   without per-modality dropout ablations."

Runs systematic ablation experiments:
  1. Full model (all modalities)
  2. Drop VAE latents only
  3. Drop trajectory/stability only
  4. Drop protein network only
  5. Drop epigenomics only (if separate from VAE)

Reports per-modality contribution and flags collapse if any single
modality drop causes <5% performance change (indicating redundancy)
or if dropping all but one modality retains >90% of full performance
(indicating the fusion ignores other modalities).
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any, Callable, Optional

import numpy as np

logger = logging.getLogger(__name__)


@dataclass
class AblationResult:
    """Result of a single ablation experiment."""

    condition: str           # e.g., "full", "drop_vae", "drop_trajectory"
    modalities_active: list[str]
    modalities_dropped: list[str]
    metrics: dict[str, float]  # metric_name → value
    n_samples: int


@dataclass
class AblationReport:
    """Complete ablation analysis."""

    results: list[AblationResult]
    per_modality_contribution: dict[str, float]  # modality → % performance drop
    collapse_detected: bool
    collapse_details: list[str]
    dominant_modality: Optional[str]
    recommendation: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "n_conditions": len(self.results),
            "per_modality_contribution": {
                k: round(v, 4) for k, v in self.per_modality_contribution.items()
            },
            "collapse_detected": self.collapse_detected,
            "collapse_details": self.collapse_details,
            "dominant_modality": self.dominant_modality,
            "recommendation": self.recommendation,
            "conditions": [
                {
                    "condition": r.condition,
                    "active": r.modalities_active,
                    "dropped": r.modalities_dropped,
                    "metrics": {k: round(v, 4) for k, v in r.metrics.items()},
                }
                for r in self.results
            ],
        }


@dataclass
class AblationConfig:
    """Configuration for ablation experiments."""

    # Modalities to test
    modalities: list[str] = field(default_factory=lambda: [
        "vae_latents",
        "trajectory_stability",
        "protein_network",
        "epigenomics",
    ])

    # Primary metric for comparison (higher = better)
    primary_metric: str = "auroc"
    primary_metric_higher_is_better: bool = True

    # Collapse detection thresholds
    min_contribution_threshold: float = 0.05   # <5% drop = modality not contributing
    max_single_modality_threshold: float = 0.90  # >90% retained with only 1 = collapse

    # Number of evaluation seeds for variance estimation
    n_seeds: int = 3


class ModalityAblation:
    """Systematic leave-one-modality-out ablation for fusion collapse detection.

    Usage:
        ablation = ModalityAblation(config)
        report = ablation.run(
            eval_fn=lambda active_modalities: {"auroc": 0.88, "mse": 0.12},
            test_data=test_loader,
        )
        if report.collapse_detected:
            print(f"COLLAPSE: {report.collapse_details}")
    """

    def __init__(self, config: Optional[AblationConfig] = None):
        self.config = config or AblationConfig()

    def run(
        self,
        eval_fn: Callable[[list[str]], dict[str, float]],
        n_samples: int = 0,
    ) -> AblationReport:
        """Run complete ablation analysis.

        Args:
            eval_fn: Function that takes list of active modality names and
                returns dict of metric_name → value. The function is
                responsible for zeroing/masking the dropped modalities
                in the fusion model.
            n_samples: Number of test samples (for reporting).

        Returns:
            AblationReport with collapse analysis.
        """
        modalities = self.config.modalities
        results: list[AblationResult] = []

        # ── Condition 1: Full model (baseline) ──
        logger.info("Ablation: evaluating full model (all modalities)")
        full_metrics = self._eval_with_seeds(eval_fn, modalities)
        results.append(AblationResult(
            condition="full",
            modalities_active=list(modalities),
            modalities_dropped=[],
            metrics=full_metrics,
            n_samples=n_samples,
        ))

        full_primary = full_metrics[self.config.primary_metric]

        # ── Conditions 2..N+1: Drop one modality at a time ──
        per_modality_contribution: dict[str, float] = {}

        for mod in modalities:
            active = [m for m in modalities if m != mod]
            logger.info("Ablation: dropping '%s', active=%s", mod, active)

            drop_metrics = self._eval_with_seeds(eval_fn, active)
            results.append(AblationResult(
                condition=f"drop_{mod}",
                modalities_active=active,
                modalities_dropped=[mod],
                metrics=drop_metrics,
                n_samples=n_samples,
            ))

            drop_primary = drop_metrics[self.config.primary_metric]

            # Contribution = relative performance change
            if self.config.primary_metric_higher_is_better:
                contribution = (full_primary - drop_primary) / max(abs(full_primary), 1e-8)
            else:
                contribution = (drop_primary - full_primary) / max(abs(full_primary), 1e-8)

            per_modality_contribution[mod] = contribution

        # ── Conditions N+2..2N+1: Keep only one modality ──
        single_modality_performance: dict[str, float] = {}

        for mod in modalities:
            active = [mod]
            logger.info("Ablation: single modality '%s'", mod)

            single_metrics = self._eval_with_seeds(eval_fn, active)
            results.append(AblationResult(
                condition=f"only_{mod}",
                modalities_active=active,
                modalities_dropped=[m for m in modalities if m != mod],
                metrics=single_metrics,
                n_samples=n_samples,
            ))

            single_primary = single_metrics[self.config.primary_metric]

            if self.config.primary_metric_higher_is_better:
                retained = single_primary / max(abs(full_primary), 1e-8)
            else:
                retained = full_primary / max(abs(single_primary), 1e-8)

            single_modality_performance[mod] = retained

        # ── Collapse detection ──
        collapse_detected = False
        collapse_details: list[str] = []
        dominant_modality: Optional[str] = None

        # Check 1: Any modality not contributing
        non_contributing = [
            mod for mod, contrib in per_modality_contribution.items()
            if contrib < self.config.min_contribution_threshold
        ]
        if non_contributing:
            collapse_details.append(
                f"Non-contributing modalities (drop <{self.config.min_contribution_threshold:.0%} "
                f"of {self.config.primary_metric}): {non_contributing}"
            )
            collapse_detected = True

        # Check 2: Single modality retains too much performance
        dominant = [
            mod for mod, retained in single_modality_performance.items()
            if retained > self.config.max_single_modality_threshold
        ]
        if dominant:
            collapse_details.append(
                f"Single-modality collapse: {dominant} retain "
                f">{self.config.max_single_modality_threshold:.0%} of full performance"
            )
            collapse_detected = True
            dominant_modality = max(dominant, key=lambda m: single_modality_performance[m])

        # Check 3: Modality with highest single-modality performance
        if single_modality_performance:
            best_single = max(single_modality_performance, key=single_modality_performance.get)
            if not dominant_modality:
                dominant_modality = best_single

        # Recommendation
        if collapse_detected:
            recommendation = (
                f"Fusion collapse detected. The model relies primarily on "
                f"'{dominant_modality}'. Add per-modality dropout during training "
                f"(p=0.3 per modality) and re-train the fusion layer. Also consider "
                f"modality-specific loss terms to force each branch to carry signal."
            )
        else:
            recommendation = (
                "No fusion collapse detected. All modalities contribute meaningfully. "
                "The cross-attention fusion is operating as designed."
            )

        report = AblationReport(
            results=results,
            per_modality_contribution=per_modality_contribution,
            collapse_detected=collapse_detected,
            collapse_details=collapse_details,
            dominant_modality=dominant_modality,
            recommendation=recommendation,
        )

        logger.info(
            "Ablation complete: collapse=%s, contributions=%s",
            collapse_detected,
            {k: f"{v:.1%}" for k, v in per_modality_contribution.items()},
        )

        return report

    def _eval_with_seeds(
        self,
        eval_fn: Callable[[list[str]], dict[str, float]],
        active_modalities: list[str],
    ) -> dict[str, float]:
        """Run evaluation multiple times and average for stability."""
        all_metrics: dict[str, list[float]] = {}

        for seed in range(self.config.n_seeds):
            metrics = eval_fn(active_modalities)
            for k, v in metrics.items():
                all_metrics.setdefault(k, []).append(v)

        return {k: float(np.mean(v)) for k, v in all_metrics.items()}
