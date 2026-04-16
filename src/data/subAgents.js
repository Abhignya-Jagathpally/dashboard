// Content for the /sub-agents route. The anchoring use case is venetoclax
// resistance in relapsed/refractory multiple myeloma (RRMM) via BCL-2 family
// rewiring — specifically MCL-1 upregulation rescuing anti-apoptotic signalling.
// This is the most pedagogically clear MM resistance mechanism: clean
// biochemistry, published cohorts, well-characterised in the t(11;14) subgroup.

export const caseStudy = {
  title: 'Venetoclax resistance in relapsed/refractory multiple myeloma',
  oneLiner:
    'Anchoring the sub-agent examples on a single, well-characterised mechanism: BCL-2 family rewiring in the t(11;14) RRMM subgroup.',
  background: [
    'Venetoclax is a selective BCL-2 inhibitor, highly active in the ~15–20% of MM patients carrying t(11;14) CCND1 translocation, who show BCL-2 dependence.',
    'Resistance emerges within 6–18 months in most responders. The dominant escape mechanism is upregulation of MCL-1 (and to a lesser extent BCL-XL), which functionally substitutes for inhibited BCL-2 at the mitochondrial outer membrane.',
    'ResistanceMap\u2019s combined VAE + GNN + ODE should predict this rewiring mechanistically: the GNN surfaces MCL-1 and BCL2L1 as top attribution nodes; the ODE stability analysis identifies a bifurcation as the BCL-2 axis is perturbed.',
  ],
  datasets: [
    'MMRF CoMMpass (clinical outcomes + WGS, 1,143 patients)',
    'CCLE + GDSC (venetoclax IC50 across hematologic lines)',
    'GSE124310 scRNA-seq (MM bone marrow, 27,796 cells)',
    'STRING PPI v12, MM subnet (7,853 proteins around known MM drivers)',
  ],
  drivers: ['BCL2', 'MCL1', 'BCL2L1 (BCL-XL)', 'BAX', 'BAK1', 'BIM', 'NOXA'],
};

export const subAgents = [
  {
    id: 'biorender',
    name: 'BioRender',
    tagline: 'Cellular & molecular illustrations',
    status: 'connected',
    mcpUrl: 'https://mcp.services.biorender.com/mcp',
    purpose:
      'Generate publication-quality figures for communicating resistance mechanisms. Given a mechanism (e.g., BCL-2 family rewiring at the mitochondrial outer membrane), the agent searches BioRender\u2019s curated icon + template libraries and assembles a labelled illustration.',
    inputs: [
      'Mechanism description (natural language or structured list of proteins + interactions)',
      'Cell type (plasma cell, bone marrow niche, etc.)',
      'Highlight set — which entities to emphasise',
    ],
    outputs: [
      'Searchable icon matches with display names + asset IDs',
      'Template recommendations linking to app.biorender.com for customisation',
      'Inline preview rendered in the dashboard',
    ],
    pipelineRole:
      'Consumes Landscape module outputs (top-20 target proteins + mechanism ranking) and produces per-prediction mechanism figures for interpretability reports.',
    useCaseExample:
      'For a t(11;14) patient predicted resistant to venetoclax: request illustration of BCL-2 inhibited, MCL-1 upregulated, BAX/BAK sequestered. Figure is attached to the patient-level EvalReport.',
  },
  {
    id: 'synapse',
    name: 'Synapse.org',
    tagline: 'Cohort discovery & provenance',
    status: 'connected',
    mcpUrl: 'https://mcp.synapse.org/mcp',
    purpose:
      'Resolve cohort metadata, access tiers, and provenance for any dataset used by the pipeline. Provides audit-trail evidence for every clinical claim: which patients, which samples, which consent scope.',
    inputs: [
      'Study identifier (Synapse ID, dbGaP ID, or study name)',
      'Sample-level filters (disease, timepoint, prior therapy)',
    ],
    outputs: [
      'Full cohort metadata (n patients, n samples, data types, access tier)',
      'File manifest with SHA checksums + last-modified timestamps',
      'Provenance tree linking samples to upstream clinical records',
    ],
    pipelineRole:
      'Runs at Layer 0 Data Validation alongside the zero-trust hash chain. Every input batch carries a Synapse provenance receipt that downstream agents verify before executing.',
    useCaseExample:
      'When validating MMRF CoMMpass: Synapse agent returns n=1,143 patients, IA22 release, dbGaP controlled access, last sync 2026-04-02, with a signed provenance hash that enters the pipeline\u2019s SHA256 chain.',
  },
  {
    id: 'wolfram',
    name: 'Wolfram Mathematica',
    tagline: 'Dynamical systems & stability analysis',
    status: 'offline',
    mcpUrl: null,
    purpose:
      'Symbolic and numerical analysis of the Neural ODE — computing fixed points, Jacobians, Lyapunov exponents, nullclines, and Kramers escape rates directly from the learned vector field. Produces mathematical certificates that the ODE\u2019s basin-of-attraction claims are sound.',
    inputs: [
      'Learned ODE vector field (exported as symbolic or numerical callable)',
      'State-space region of interest (typically 2D projection of the 64D latent)',
      'Parameters: drug concentration, patient-specific covariates',
    ],
    outputs: [
      'Phase portraits with nullclines, fixed points, and separatrices',
      'Stability classification (stable node / saddle / focus) at each fixed point',
      'Kramers escape rate estimates — probability of basin transition under perturbation',
    ],
    pipelineRole:
      'Runs post-training at Tier B governance. Outputs inform the `bistability.py` module\u2019s reported confidence bounds and are cross-checked against empirical ODE simulation.',
    useCaseExample:
      'For the venetoclax ODE: Mathematica identifies two stable fixed points (sensitive / resistant basins) separated by a saddle. Kramers rate = 0.08 per month under standard dosing — consistent with observed 6–18 month resistance emergence.',
  },
];

// Where each sub-agent plugs into the main DAG. Used by the integration
// diagram on the SubAgents page.
export const integrationPoints = [
  {
    agent: 'synapse',
    stage: 'L0 Data Validation',
    description: 'Provenance receipts enter the SHA256 hash chain.',
  },
  {
    agent: 'wolfram',
    stage: 'L2 Trajectory (Neural ODE)',
    description: 'Symbolic stability certificates validate ODE basins post-training.',
  },
  {
    agent: 'biorender',
    stage: 'L5 Resistance Landscape',
    description: 'Mechanism illustrations generated per-prediction for EvalReports.',
  },
];

// Status-indicator labels
export const STATUS_LABELS = {
  connected: 'MCP connected',
  offline: 'MCP offline',
  pending: 'MCP pending',
};
