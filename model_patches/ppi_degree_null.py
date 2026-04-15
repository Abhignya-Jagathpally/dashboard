"""Degree-Preserving PPI Null Model for GNN Attribution Deconfounding.

Addresses architecture_auditor FAIL:
  "GNN attributions are confounded with PPI degree until a
   degree-controlled null model is run."

Strategy:
  Generate rewired PPI graphs that preserve the exact degree sequence
  of the original STRING graph but randomize edge endpoints. Run GNN
  attributions on both original and rewired graphs. If a gene's
  attribution score on the original graph significantly exceeds its
  score on rewired graphs, the attribution is degree-deconfounded.

  Uses the configuration model (stub-matching) approach from network
  science, which preserves the exact degree of every node.

References:
  - Maslov & Sneppen (2002). Specificity and stability in topology of
    protein networks. Science 296(5569).
  - Milo et al. (2003). On the uniform generation of random graphs
    with prescribed degree sequences.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any, Optional, Callable

import numpy as np

logger = logging.getLogger(__name__)


@dataclass
class DegreeNullResult:
    """Attribution significance relative to degree-preserving null."""

    gene_name: str
    original_attribution: float
    null_mean: float
    null_std: float
    z_score: float
    p_value: float
    significant: bool  # z > 2.0 (one-sided)
    degree: int  # node degree in original graph
    effect_size: float  # (original - null_mean) / null_std


@dataclass
class DegreeNullReport:
    """Complete null-model analysis."""

    n_genes: int
    n_rewirings: int
    n_significant: int
    n_confounded: int  # genes with high original attribution but low z-score
    results: list[DegreeNullResult]
    summary: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "n_genes": self.n_genes,
            "n_rewirings": self.n_rewirings,
            "n_significant": self.n_significant,
            "n_confounded": self.n_confounded,
            "fraction_deconfounded": round(self.n_significant / max(self.n_genes, 1), 3),
            "summary": self.summary,
            "top_deconfounded": [
                {
                    "gene": r.gene_name,
                    "original": round(r.original_attribution, 4),
                    "z_score": round(r.z_score, 2),
                    "degree": r.degree,
                }
                for r in sorted(self.results, key=lambda r: r.z_score, reverse=True)[:20]
            ],
        }


@dataclass
class DegreeNullConfig:
    """Configuration for degree-preserving null model."""

    n_rewirings: int = 100          # Number of null graphs to generate
    n_swap_factor: int = 10         # Swaps per edge (total = n_edges * factor)
    significance_threshold: float = 2.0  # z-score threshold
    max_attempts_per_swap: int = 100
    seed: int = 42


class DegreePreservingRewirer:
    """Generate degree-preserving rewired graphs using edge-swap algorithm.

    The edge-swap (Maslov-Sneppen) algorithm repeatedly picks two random
    edges (u,v) and (w,x), then swaps to (u,x) and (w,v) — but only if
    the new edges don't already exist (preserving simplicity). This
    preserves the exact degree of every node.
    """

    def __init__(self, config: Optional[DegreeNullConfig] = None):
        self.config = config or DegreeNullConfig()

    def rewire(
        self,
        edge_index: np.ndarray,
        n_nodes: int,
    ) -> np.ndarray:
        """Generate one degree-preserving rewired graph.

        Args:
            edge_index: (2, E) array of [source, target] edges (undirected)
            n_nodes: Total number of nodes

        Returns:
            (2, E) rewired edge index with same degree sequence
        """
        rng = np.random.default_rng(self.config.seed + np.random.randint(0, 10000))

        edges = edge_index.T.copy()  # (E, 2)
        n_edges = len(edges)
        n_swaps = n_edges * self.config.n_swap_factor

        # Build edge set for O(1) lookup
        edge_set = set(map(tuple, edges))

        successful = 0
        for _ in range(n_swaps):
            # Pick two random edges
            idx1, idx2 = rng.choice(n_edges, size=2, replace=False)
            u, v = edges[idx1]
            w, x = edges[idx2]

            # Skip if any node appears twice (self-loops or shared nodes)
            if len({u, v, w, x}) < 4:
                continue

            # Try swap: (u,v), (w,x) → (u,x), (w,v)
            new_e1 = (u, x) if u < x else (x, u)
            new_e2 = (w, v) if w < v else (v, w)

            if new_e1 not in edge_set and new_e2 not in edge_set:
                # Remove old edges
                old_e1 = tuple(sorted((u, v)))
                old_e2 = tuple(sorted((w, x)))
                edge_set.discard(old_e1)
                edge_set.discard(old_e2)

                # Add new edges
                edge_set.add(new_e1)
                edge_set.add(new_e2)

                # Update edge list
                edges[idx1] = [new_e1[0], new_e1[1]]
                edges[idx2] = [new_e2[0], new_e2[1]]
                successful += 1

        logger.debug(
            "Rewired %d/%d swaps (%.1f%% success rate)",
            successful, n_swaps, 100 * successful / max(n_swaps, 1),
        )

        return edges.T  # (2, E)


class PPIDegreeNullAnalysis:
    """Run GNN attributions on original and degree-preserving null graphs.

    Usage:
        analysis = PPIDegreeNullAnalysis(config)
        report = analysis.run(
            edge_index=ppi_edges,
            n_nodes=n_proteins,
            gene_names=protein_names,
            attribution_fn=gnn_attribute,  # fn(edge_index) -> (n_nodes,) scores
        )
    """

    def __init__(self, config: Optional[DegreeNullConfig] = None):
        self.config = config or DegreeNullConfig()
        self.rewirer = DegreePreservingRewirer(config)

    def run(
        self,
        edge_index: np.ndarray,
        n_nodes: int,
        gene_names: list[str],
        attribution_fn: Callable[[np.ndarray], np.ndarray],
    ) -> DegreeNullReport:
        """Run degree-controlled null model analysis.

        Args:
            edge_index: (2, E) original PPI graph edges
            n_nodes: Number of proteins/nodes
            gene_names: List of gene/protein names (length n_nodes)
            attribution_fn: Function that takes (2, E) edge_index and
                returns (n_nodes,) attribution scores

        Returns:
            DegreeNullReport with per-gene significance.
        """
        logger.info(
            "Running degree-preserving null analysis: %d nodes, %d edges, %d rewirings",
            n_nodes, edge_index.shape[1], self.config.n_rewirings,
        )

        # Compute degree per node
        degrees = np.zeros(n_nodes, dtype=int)
        for i in range(edge_index.shape[1]):
            degrees[edge_index[0, i]] += 1
            degrees[edge_index[1, i]] += 1

        # Original attributions
        original_scores = attribution_fn(edge_index)

        # Null distribution
        null_scores = np.zeros((self.config.n_rewirings, n_nodes))
        for i in range(self.config.n_rewirings):
            if (i + 1) % 20 == 0:
                logger.info("  Null model %d/%d", i + 1, self.config.n_rewirings)
            rewired = self.rewirer.rewire(edge_index, n_nodes)
            null_scores[i] = attribution_fn(rewired)

        # Compute statistics
        null_mean = null_scores.mean(axis=0)
        null_std = null_scores.std(axis=0) + 1e-8  # Avoid division by zero

        z_scores = (original_scores - null_mean) / null_std

        # p-values (one-sided, attribution > null)
        p_values = np.mean(null_scores >= original_scores[None, :], axis=0)

        # Build per-gene results
        results = []
        for j in range(n_nodes):
            sig = z_scores[j] > self.config.significance_threshold
            results.append(DegreeNullResult(
                gene_name=gene_names[j] if j < len(gene_names) else f"gene_{j}",
                original_attribution=float(original_scores[j]),
                null_mean=float(null_mean[j]),
                null_std=float(null_std[j]),
                z_score=float(z_scores[j]),
                p_value=float(p_values[j]),
                significant=bool(sig),
                degree=int(degrees[j]),
                effect_size=float(z_scores[j]),
            ))

        n_significant = sum(1 for r in results if r.significant)

        # Identify confounded genes: high original attribution but NOT significant
        attr_threshold = np.percentile(original_scores, 90)
        n_confounded = sum(
            1 for r in results
            if r.original_attribution > attr_threshold and not r.significant
        )

        summary = (
            f"{n_significant}/{n_nodes} genes have degree-deconfounded attributions "
            f"(z>{self.config.significance_threshold}). "
            f"{n_confounded} high-attribution genes are confounded with degree. "
        )
        if n_confounded > 0:
            summary += (
                "These genes' apparent importance may be driven by their high "
                "connectivity rather than biological relevance to resistance."
            )

        report = DegreeNullReport(
            n_genes=n_nodes,
            n_rewirings=self.config.n_rewirings,
            n_significant=n_significant,
            n_confounded=n_confounded,
            results=results,
            summary=summary,
        )

        logger.info(
            "Null analysis complete: %d/%d significant, %d confounded",
            n_significant, n_nodes, n_confounded,
        )

        return report
