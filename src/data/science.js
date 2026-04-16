// All content below is drawn from the ResistanceMap v5 repository
// (https://github.com/Abhignya-Jagathpally/temp/tree/v5/ResistanceMap).
// Results table, hyperparameters, and dataset sizes are from the repo's
// README.md, ARCHITECTURE.md, and configs/default.yaml.

export const purpose = {
  problem:
    'Drug resistance is the dominant cause of treatment failure in hematologic malignancies — multiple myeloma (MM), acute myeloid leukemia (AML), and related blood cancers. Despite decades of progress, resistance emerges idiosyncratically across patients, and existing biomarker panels explain only a fraction of observed variance.',
  goal:
    'Build a mechanistically interpretable, multi-modal forecasting system that predicts which drugs will fail, when they will fail, and why — by learning jointly from proteomics, epigenomics, single-cell transcriptomics, protein-protein interaction networks, and clinical outcomes.',
  clinicalStakes: [
    'MM remains incurable; median OS in high-risk subgroups is under 3 years (MMRF CoMMpass).',
    'Treatment sequencing decisions are made under deep uncertainty about individual response trajectories.',
    'Existing tools report point predictions without mechanistic evidence or calibrated uncertainty — limiting their utility for clinical translation.',
  ],
};

export const background = [
  {
    id: 'omics-ml',
    heading: 'Pharmacogenomic ML',
    body: 'Prior work has treated proteomics, transcriptomics, and drug response as separate modalities, with single-modality predictors (DeepCDR, MOLI, DeepSurv) achieving AUROC 0.75–0.82 on cell-line panels. Multi-modal fusion has been limited to late concatenation or simple attention, missing pathway-level evidence.',
    citations: ['liu2020deepcdr', 'katzman2018deepsurv'],
  },
  {
    id: 'protein-lm',
    heading: 'Protein language models',
    body: 'ESM-2 (650M) produces 1280-dimensional per-residue embeddings that capture structural and functional information without supervised training. These embeddings seed graph neural networks over STRING PPI v12 (19,566 proteins, 11.9M interactions) to reason over pathway-level resistance signals.',
    citations: ['lin2023esm2', 'szklarczyk2023string'],
  },
  {
    id: 'neural-ode',
    heading: 'Neural ODEs for clinical forecasting',
    body: "Continuous-time dynamics models (Chen 2018) are well suited to irregular clinical sampling. ResistanceMap adapts neural ODEs as a stability/basin-of-attraction module for latent resistance states, calibrated to clinical calendar time at 3/6/12 month horizons.",
    citations: ['chen2018neuralode'],
  },
  {
    id: 'single-cell',
    heading: 'Single-cell foundations',
    body: 'scVI established variational inference as the standard for single-cell transcriptomics. ResistanceMap extends this idea to a conditional VAE mapping proteome → epigenome, pretrained pan-cancer on CCLE and finetuned on hematologic lines.',
    citations: ['lopez2018scvi', 'nusinow2020ccle'],
  },
  {
    id: 'agentic',
    heading: 'Agentic ML pipelines',
    body: 'Recent work has treated ML pipelines as orchestrated DAGs of specialized agents. ResistanceMap is one of the first to apply this pattern to biomedical modeling, with zero-trust (SHA256 hash chain) verification at every agent boundary and an orthogonal multi-tier evaluation governance layer.',
    citations: [],
  },
];

export const differentiators = [
  {
    id: 'agentic-dag',
    title: 'Fully agentic execution',
    body: 'The pipeline is a 10-agent DAG (Data Validation → Data Prep → VAE/ESM-2 parallel → VAE Finetune → Trajectory → ProteinNet → Fusion → Landscape → Validation) with parallel scheduling yielding 1.33–4× wall-clock speedup over sequential execution.',
  },
  {
    id: 'zero-trust',
    title: 'Zero-trust verification',
    body: 'Every agent boundary produces a SHA256 hash of its outputs. Downstream agents verify the chain before running; a single corrupted intermediate invalidates every downstream claim. KS tests and 8 biological guardrails (probability ranges, IC50 bounds, stochastic invariants) are enforced at each handoff.',
  },
  {
    id: 'cross-modal',
    title: 'Mechanistic cross-modal fusion',
    body: 'Cross-attention fusion (4 modalities × 4 heads) weights each modality per-sample, producing attention maps that directly explain which evidence drove each prediction. Pathway-level audits re-check these attributions under PPI edge dropout.',
  },
  {
    id: 'governance',
    title: 'Tiered evaluation governance',
    body: 'Training and evaluation run on orthogonal axes. Tier A (data adequacy), Tier B (architecture necessity), Tier C (forecasting + clinical safety), and Tier D (synthesis chair) produce an EvalReport with verification hashes, required changes, and explicit epistemic limits for every claim.',
  },
  {
    id: 'math',
    title: 'First-principles math as reality check',
    body: 'Lyapunov stability analysis and bistability scoring are implemented in the v5 code as runtime reality checks on basin-transition predictions. Fano\u2019s inequality and Kramers escape rate are theoretical anchors cited in the design but not yet computed in code. These external constraints make the pipeline falsifiable, not just predictive.',
  },
];

export const modelComponents = [
  {
    id: 'l1-vae',
    layer: 'L1',
    title: 'Proteome → Epigenome Conditional VAE',
    file: 'resistancemap/models/vae.py (958 lines)',
    purpose:
      'Learn a 64-dimensional latent resistance manifold from proteomics conditioned on epigenomic context. Pan-cancer pretraining (200 epochs on ~1000 CCLE lines) then hematology-specific finetuning (100 epochs on ~100 lines).',
    architecture: [
      'Encoder: 8000-dim input → 3× linear+GELU blocks (2048→1024→512) → μ, σ (64D)',
      'Decoder: 64D latent → 3× linear+GELU blocks (512→1024→2048) → 50,000-dim epigenome prediction',
      'ELBO loss with β-annealing; conditioning vector injected at each layer',
    ],
    math: '\u2112 = \u2212\ud835\udd3c_{q_\u03c6(z|x,c)}[log p_\u03b8(x|z,c)] + \u03b2\u00b7KL(q_\u03c6(z|x,c) \u2016 p(z))',
    output: '64D resistance-state embedding per sample + reconstructed epigenome',
  },
  {
    id: 'l2-traj',
    layer: 'L2',
    title: 'Clinical-Anchored Neural ODE (Trajectory)',
    file: 'resistancemap/models/trajectory.py (1644 lines) + clinical_anchored_ode.py (606 lines)',
    purpose:
      'Predict temporal evolution of the resistance state at 3, 6, and 12 months post-baseline. Dopri5 (Dormand-Prince 5) solver for high-accuracy integration; integration time calibrated to clinical calendar time (addresses Tier B architecture blocker).',
    architecture: [
      'Latent ODE: dz/dt = f_\u03b8(z, t, reader/writer protein features)',
      'Dopri5 adaptive-step solver via torchdiffeq',
      'Stability scoring: basin depth + drift under perturbation',
    ],
    math: 'z(t\u2081) = z(t\u2080) + \u222b_{t\u2080}^{t\u2081} f_\u03b8(z(\u03c4), \u03c4) d\u03c4',
    output: 'Stability score per drug; forecast at 3/6/12 months with uncertainty band',
  },
  {
    id: 'l3-gnn',
    layer: 'L3',
    title: 'ESM-2 + Protein Network GNN',
    file: 'resistancemap/models/protein_network.py (935 lines)',
    purpose:
      'Reason over the STRING PPI v12 network (19,566 proteins, 930k directed edges after ENSP→gene mapping, 7,853-protein MM subnet) using ESM-2 1280-D embeddings as node features. Graph attention (3 layers, 4 heads, 256 hidden) surfaces per-protein resistance signals and pathway-level evidence.',
    architecture: [
      'Node features: ESM-2 esm2_t33_650M_UR50D (1280D per protein); bottleneck 1280→256',
      'Graph: STRING v12 filtered at combined_score ≥ 0.7; degree-preserving rewired null for attribution debiasing',
      'Message passing: 3-layer GAT, 4 heads, 256 hidden; DropEdge, PairNorm, JumpingKnowledge (cat); GraphMASK-ready for causal edge attribution',
    ],
    math: 'h_i^{(l+1)} = \u03c3(\u2211_{j \u2208 \ud835\udca9(i)} \u03b1_{ij}^{(l)} W^{(l)} h_j^{(l)})',
    output: 'Per-protein resistance score + pathway attribution (top 20 targets at threshold 0.8)',
  },
  {
    id: 'l4-fusion',
    layer: 'L4',
    title: 'Cross-Attention Fusion',
    file: 'resistancemap/models/fusion.py (741 lines)',
    purpose:
      'Combine evidence from VAE (latent state), Trajectory (stability), ProteinNet (pathway signals), and optional clinical covariates into a unified 128-D resistance embedding. Modality gating handles missingness gracefully.',
    architecture: [
      'Query/Key/Value: modality × sample → 4-head cross-attention',
      'Hidden dim 128; output 128-D; residual + layer-norm per block',
      'Modality dropout for missingness robustness',
    ],
    math: 'Attention(Q,K,V) = softmax(QK\u1d40 / \u221ad_k) V — applied across modalities, not sequence positions',
    output: 'Unified 128-D resistance embedding per (sample, drug) pair',
  },
  {
    id: 'l5-landscape',
    layer: 'L5',
    title: 'Resistance Landscape Predictor',
    file: 'resistancemap/landscape/predictor.py + models/bistability.py (640 lines)',
    purpose:
      'Map fused embeddings to interpretable outputs: drug-specific resistance probability, cellular state classification, and top intervention targets. Optional evidential head produces epistemic + aleatoric uncertainty.',
    architecture: [
      'MLP head: 128 → 128 → 64 → {drug risk, state logits, target scores}',
      'Evidential uncertainty (Dirichlet: α = softplus(logits)+1, epistemic = K/Σα) as optional head',
      'Bistability scoring (basin depth + drift)',
    ],
    math: 'p(resistant | x, drug) = \u03c3(W\u00b7h_fused + b); \u03b1 for Dirichlet UQ',
    output: 'Drug risk score + state class + ranked targets + calibrated uncertainty',
  },
  {
    id: 'specialized',
    layer: '\u2020',
    title: 'Specialized modules',
    file:
      'cell_communication.py (459), cell_state_plasticity.py (793), clonal_heterogeneity.py (584), domain_adaptation.py (867), rl_treatment_optimization.py (822)',
    purpose:
      'Auxiliary components for specific clinical questions: niche signaling (BCMA/IL-6 axes in MM), plasticity between stem/progenitor/plasma-cell states, subclonal evolution under therapy, domain adaptation across cohorts, and reinforcement-learning-based treatment sequencing.',
    architecture: [
      'Each module is independently trainable and loadable via the agent orchestrator',
      'Shared latent space with L1 VAE; outputs flow into L4 Fusion',
    ],
    math: null,
    output: 'Mechanism-specific features consumed by downstream agents when enabled',
  },
];

export const methodology = {
  data: {
    splits: 'Stratified by patient ID to prevent leakage. 70/15/15 train/val/test; random_seed=42.',
    preprocessing: [
      'Proteomics: drop proteins with >30% missingness; kNN imputation (k=5); quantile normalization.',
      'Epigenomics: ChIP-seq peak matrices; log2 normalization; batch correction via Harmony or scVI.',
      'scRNA-seq: min_genes=200, max_genes=8000, min_counts=1000, max_mitochondrial=20%.',
      'PPI: STRING v12 filtered at combined_score ≥ 0.7; ENSP → gene symbol mapping.',
    ],
  },
  training: {
    vae: 'Pretrain 200 epochs (CCLE, ~1000 lines), batch=512, AdamW lr=1e-3 cosine decay, β-annealing 0→1. Finetune 100 epochs on hematologic subset.',
    traj:
      'ODE fit per drug: 500 epochs, dopri5 solver, rtol=1e-5, atol=1e-7. Clinical calendar calibration via paired cross-sectional + longitudinal samples.',
    gnn: '3-layer GAT, 4 heads, 256 hidden, dropout 0.2, 50 epochs, mini-batch sampling on 7,853-protein MM subnet.',
    fusion: 'Cross-attention training 150 epochs, batch=512, modality dropout 0.1.',
    landscape: 'MLP head trained jointly with fusion; evidential loss when UQ head enabled.',
  },
  infra: [
    'Single H100 total training time: ~27 hours. 8× H100 distributed: ~4 hours.',
    'bfloat16 native; torch.compile for fused kernels; DataLoader num_workers=8.',
    'Each stage is checkpoint-aware and skipped if the checkpoint is hash-valid.',
    'Docker image + docker-compose for reproducibility; MLflow profile for experiment tracking.',
  ],
};

export const datasets = [
  { id: 'ccle-prot', name: 'CCLE Proteomics', samples: '1,393 cell lines', features: '19,177 proteins', size: '1.2 GB', role: 'VAE pretrain' },
  { id: 'ccle-epi', name: 'CCLE Epigenomics', samples: '897 cell lines', features: '42 chromatin features', size: '2.5 GB', role: 'VAE conditioning' },
  { id: 'string', name: 'STRING PPI v12', samples: '—', features: '19,566 proteins · 11.9M edges (7,853-protein MM subnet)', size: '400 MB', role: 'L3 GNN graph' },
  { id: 'gdsc', name: 'GDSC Drug Sensitivity', samples: '987 lines', features: '198 compounds · 11 MM-relevant', size: '150 MB', role: 'Resistance labels' },
  { id: 'ctrpv2', name: 'CTRPv2', samples: '—', features: 'Broad Institute drug screen', size: '300 MB', role: 'Secondary labels (registered access)' },
  { id: 'gse124310', name: 'GSE124310 scRNA-seq', samples: '27,796 cells', features: 'MM patient bone marrow', size: '5 GB', role: 'Patient fine-tuning' },
  { id: 'gse271107', name: 'GSE271107 scRNA-seq', samples: '143,748 cells', features: 'HD → MGUS → SMM → MM progression', size: '8 GB', role: 'Lenalidomide response' },
  { id: 'mmrf', name: 'MMRF CoMMpass', samples: '1,143 MM patients', features: 'Clinical + genomic; median OS 82.3 months', size: '50+ GB', role: 'Clinical outcomes (IRB)' },
];

export const results = {
  testN: 150,
  columns: ['VAE Only', '+ Trajectory', '+ Fusion', '+ Landscape'],
  rows: [
    { metric: 'AUROC (Resistance)', values: [0.82, 0.85, 0.88, 0.89] },
    { metric: 'AUPRC (Resistance)', values: [0.76, 0.79, 0.83, 0.84] },
    { metric: 'MAE (3-month forecast)', values: [0.18, 0.12, 0.09, null] },
    { metric: 'Top-1 mechanism recall', values: [null, null, 0.72, 0.78] },
  ],
  latestRun: {
    runId: '20260411T200711Z',
    wallTime: '21.3 minutes',
    testMse: 0.7191,
    samples: 132,
    drugs: 11,
  },
};

export const ablations = [
  {
    id: 'abl-modality',
    title: 'Modality ablation',
    result:
      'Removing ProteinNet drops AUROC from 0.89 → 0.84 (−0.05); removing Trajectory drops MAE@3mo from 0.09 → 0.14. All four modalities carry non-redundant information.',
  },
  {
    id: 'abl-pretrain',
    title: 'Pan-cancer pretraining',
    result:
      'VAE without pan-cancer pretrain: AUROC 0.78 vs 0.82 (pretrained only). Pretraining remains valuable even after hematologic finetuning.',
  },
  {
    id: 'abl-ppi-degree',
    title: 'PPI degree null',
    result:
      'Degree-preserving rewired PPI reduces pathway-attribution top-1 recall from 0.78 → 0.41, confirming signals are not purely explained by node degree (Tier B blocker closed in 20260413 run).',
  },
  {
    id: 'abl-ode-calibration',
    title: 'ODE calendar-time calibration',
    result:
      'Uncalibrated ODE time produces well-fit trajectories but cannot support calendar-month claims. Calibration lowers MAE@3mo from 0.18 → 0.09 and restores Tier B pass.',
  },
  {
    id: 'abl-ood',
    title: 'OOD abstention',
    result:
      'With OOD detector + abstention: clinical-safety agent passes; confident predictions outside the training manifold drop from 14% → 0% of test cases.',
  },
];

export const baselines = [
  { id: 'lastobs', name: 'Last Observation Carried Forward', auroc: 0.58, note: 'Trivial temporal baseline' },
  { id: 'transonly', name: 'Transcriptome-only MLP', auroc: 0.71, note: 'Bulk RNA → resistance, no PPI, no ODE' },
  { id: 'clinonly', name: 'Clinical-only Cox PH', auroc: 0.68, note: 'Stage, ISS, FISH only' },
  { id: 'deepsurv', name: 'DeepSurv', auroc: 0.79, note: 'Published survival MLP baseline' },
  { id: 'deepcdr', name: 'DeepCDR', auroc: 0.82, note: 'Published drug-response CNN baseline' },
  { id: 'rmap', name: 'ResistanceMap (full)', auroc: 0.89, note: 'This work' },
];

export const limitations = [
  {
    id: 'cohort',
    title: 'Cohort scope',
    body:
      'Training data is dominated by MM (MMRF CoMMpass + hematologic CCLE lines). Generalization to AML/ALL is supported by architecture but empirically unvalidated.',
  },
  {
    id: 'drugs',
    title: 'Drug coverage',
    body:
      'GDSC does not screen corticosteroids, second-generation PIs, IMiDs beyond Lenalidomide, or monoclonal antibodies. Key MM regimens (Dex, Carfilzomib, Pomalidomide, Dara) require CTRPv2, beatAML, or trial-derived data.',
  },
  {
    id: 'causality',
    title: 'Attribution is associational',
    body:
      'GraphMASK and attention weights identify predictive features, not causal drivers. Prospective interventional validation is required before mechanism claims drive clinical decisions.',
  },
  {
    id: 'uq',
    title: 'Uncertainty is bounded, not perfect',
    body:
      'Evidential UQ produces well-calibrated aleatoric + epistemic estimates on in-distribution data. Fano\u2019s inequality is a theoretical anchor cited in the design (lower bound on achievable error) but is not yet computed in code; actual performance bounds rely on the implemented Dirichlet calibration.',
  },
];

export const takeaways = [
  'Multi-modal fusion lifts AUROC 0.82 → 0.89 and MAE 0.18 → 0.09 over single-modality baselines — the modalities are complementary, not redundant.',
  'Agentic DAG + zero-trust hash chains make every prediction auditable down to the intermediate tensor. This is what makes the pipeline deployable in a clinical-safety context, not just a benchmark.',
  'Orthogonal evaluation governance (Tier A–D) catches failure modes that training-time metrics miss — ODE calendar-time calibration, PPI degree confounds, missing OOD detection were all surfaced by Tier B/C audits before reaching downstream users.',
  'Lyapunov stability analysis and bistability scoring are implemented as runtime reality checks; Fano\u2019s inequality and Kramers escape rate remain future theoretical anchors to be computed in code.',
];

export const references = [
  { id: 'lin2023esm2', authors: 'Lin, Z. et al.', year: 2023, title: 'Evolutionary-scale prediction of atomic-level protein structure', venue: 'Science 379:1123', url: 'https://www.science.org/doi/10.1126/science.ade2574' },
  { id: 'szklarczyk2023string', authors: 'Szklarczyk, D. et al.', year: 2023, title: 'The STRING database in 2023', venue: 'Nucleic Acids Research 51:D638', url: 'https://academic.oup.com/nar/article/51/D1/D638/6825349' },
  { id: 'chen2018neuralode', authors: 'Chen, R.T.Q. et al.', year: 2018, title: 'Neural Ordinary Differential Equations', venue: 'NeurIPS', url: 'https://arxiv.org/abs/1806.07366' },
  { id: 'lopez2018scvi', authors: 'Lopez, R. et al.', year: 2018, title: 'Deep generative modeling for single-cell transcriptomics', venue: 'Nature Methods 15:1053', url: 'https://www.nature.com/articles/s41592-018-0229-2' },
  { id: 'velickovic2018gat', authors: 'Veli\u010dkovi\u0107, P. et al.', year: 2018, title: 'Graph Attention Networks', venue: 'ICLR', url: 'https://arxiv.org/abs/1710.10903' },
  { id: 'kingma2014vae', authors: 'Kingma, D.P., Welling, M.', year: 2014, title: 'Auto-Encoding Variational Bayes', venue: 'ICLR', url: 'https://arxiv.org/abs/1312.6114' },
  { id: 'liu2020deepcdr', authors: 'Liu, Q. et al.', year: 2020, title: 'DeepCDR: a hybrid graph convolutional network for predicting cancer drug response', venue: 'Bioinformatics 36:i911', url: 'https://academic.oup.com/bioinformatics/article/36/Supplement_2/i911/6055929' },
  { id: 'katzman2018deepsurv', authors: 'Katzman, J.L. et al.', year: 2018, title: 'DeepSurv: personalized treatment recommender system using a Cox proportional hazards deep neural network', venue: 'BMC Medical Research Methodology 18:24', url: 'https://bmcmedresmethodol.biomedcentral.com/articles/10.1186/s12874-018-0482-1' },
  { id: 'nusinow2020ccle', authors: 'Nusinow, D.P. et al.', year: 2020, title: 'Quantitative proteomics of the Cancer Cell Line Encyclopedia', venue: 'Cell 180:387', url: 'https://www.cell.com/cell/fulltext/S0092-8674(19)31385-6' },
  { id: 'iorio2016gdsc', authors: 'Iorio, F. et al.', year: 2016, title: 'A landscape of pharmacogenomic interactions in cancer', venue: 'Cell 166:740', url: 'https://www.cell.com/cell/fulltext/S0092-8674(16)30746-2' },
  { id: 'walker2018mmrf', authors: 'Walker, B.A. et al.', year: 2019, title: 'A high-risk, double-hit, group of newly diagnosed myeloma identified by genomic analysis', venue: 'Leukemia 33:159', url: 'https://www.nature.com/articles/s41375-018-0196-8' },
  { id: 'korsunsky2019harmony', authors: 'Korsunsky, I. et al.', year: 2019, title: 'Fast, sensitive and accurate integration of single-cell data with Harmony', venue: 'Nature Methods 16:1289', url: 'https://www.nature.com/articles/s41592-019-0619-0' },
  { id: 'buttner2019kbet', authors: 'B\u00fcttner, M. et al.', year: 2019, title: 'A test metric for assessing single-cell RNA-seq batch correction', venue: 'Nature Methods 16:43', url: 'https://www.nature.com/articles/s41592-018-0254-1' },
  { id: 'schlichtkrull2021graphmask', authors: 'Schlichtkrull, M.S. et al.', year: 2021, title: 'Interpreting Graph Neural Networks for NLP with Differentiable Edge Masking', venue: 'ICLR', url: 'https://arxiv.org/abs/2010.00577' },
  { id: 'mcinnes2018umap', authors: 'McInnes, L. et al.', year: 2018, title: 'UMAP: Uniform Manifold Approximation and Projection', venue: 'arXiv:1802.03426', url: 'https://arxiv.org/abs/1802.03426' },
];
