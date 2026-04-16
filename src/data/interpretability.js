export const interpretabilitySignals = [
  { id: 'per-protein', text: 'Per-protein contribution scores from ProteinNet + ResistancePropagator' },
  { id: 'graphmask', text: 'GraphMASK-ready causal edge attribution on the PPI graph' },
  { id: 'cross-attn', text: 'Cross-attention weights to reveal dominant modality evidence' },
  { id: 'pathway-audit', text: 'Pathway stability audits under PPI edge dropout' },
  { id: 'evidential', text: 'Evidential head for epistemic + aleatoric uncertainty (optional)' },
];
