export const modelSpecs = [
  { id: 'vae-dim', label: 'VAE latent dim', value: '64 (configurable)' },
  { id: 'epochs', label: 'Pretrain / finetune', value: '200 / 100 epochs' },
  { id: 'ode-horizons', label: 'ODE horizons', value: '3, 6, 12 months' },
  { id: 'esm2', label: 'ESM-2 backbone', value: 'esm2_t33_650M_UR50D (1280D)' },
  { id: 'gnn', label: 'GNN depth', value: '3 layers · 4 heads · 256 hidden' },
  { id: 'fusion', label: 'Fusion', value: 'Cross-attention · 4 heads' },
  { id: 'landscape', label: 'Landscape outputs', value: 'Drug risk · state · targets' },
  { id: 'top-mech', label: 'Top mechanisms', value: '20 targets · 0.8 threshold' },
];

export const qualityChecks = [
  { id: 'missingness', text: 'Missingness profiling + MCAR tests' },
  { id: 'batch-effect', text: 'Batch effect audits (kBET / LISI)' },
  { id: 'mm-driver', text: 'MM driver protein coverage enforcement' },
  { id: 'hash-chain', text: 'SHA256 hash chain across agents' },
  { id: 'guardrails', text: 'Guardrails on probability ranges + IC50 bounds' },
];
