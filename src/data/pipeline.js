// Stages of the ResistanceMap pipeline, rendered as a flow below the diagram.
// `id` is used as a stable React key — do not reuse across stages.
export const pipelineStages = [
  {
    id: 'L0',
    layer: 'L0',
    name: 'Data Validation + Prep',
    inputs: 'Raw omics, PPI, drug screens',
    outputs: 'Harmonized multi-omics dataset',
    notes: 'Zero-trust checks + QC thresholds',
  },
  {
    id: 'L1',
    layer: 'L1',
    name: 'Proteome → Epigenome VAE',
    inputs: 'Proteomics + epigenomics',
    outputs: '64D resistance manifold',
    notes: 'Pan-cancer pretrain, MM finetune',
  },
  {
    id: 'L2',
    layer: 'L2',
    name: 'Stability ODE',
    inputs: 'Latent state + reader/writer proteins',
    outputs: 'Basin-of-attraction stability',
    notes: 'Forecast horizons 3/6/12 months',
  },
  {
    id: 'L3',
    layer: 'L3',
    name: 'Protein Network GNN',
    inputs: 'STRING PPI + ESM-2 embeddings',
    outputs: 'Per-protein resistance signals',
    notes: 'Graph attention + optional GraphMASK',
  },
  {
    id: 'L4',
    layer: 'L4',
    name: 'Cross-Attention Fusion',
    inputs: 'VAE, ODE, GNN, stability',
    outputs: 'Unified resistance embedding',
    notes: 'Modality gating + missingness handling',
  },
  {
    id: 'L5',
    layer: 'L5',
    name: 'Resistance Landscape',
    inputs: 'Fused embeddings',
    outputs: 'Drug risk, state, targets',
    notes: 'Top mechanisms + evidential heads',
  },
];
