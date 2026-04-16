export const interpretabilitySignals = [
  { id: 'per-protein', text: 'Per-protein contribution scores from ProteinNet + ResistancePropagator' },
  { id: 'graphmask', text: 'GraphMASK-ready causal edge attribution (layer instantiated; not yet active in forward pass) on the PPI graph' },
  { id: 'cross-attn', text: 'Cross-attention weights to reveal dominant modality evidence' },
  { id: 'pathway-audit', text: 'Pathway stability audits under PPI edge dropout' },
  { id: 'evidential', text: 'Evidential head (Dirichlet-based, α = softplus+1) for epistemic + aleatoric uncertainty' },
];
