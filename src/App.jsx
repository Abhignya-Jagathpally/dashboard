import React, { useState } from 'react';
import DiagramPipeline from './components/DiagramPipeline.jsx';
import DiagramInterpretability from './components/DiagramInterpretability.jsx';
import DiagramGovernance from './components/DiagramGovernance.jsx';
import MindMap from './components/MindMap.jsx';

const pipelineStages = [
  {
    layer: 'L0',
    name: 'Data Validation + Prep',
    inputs: 'Raw omics, PPI, drug screens',
    outputs: 'Harmonized multi-omics dataset',
    notes: 'Zero-trust checks + QC thresholds',
  },
  {
    layer: 'L1',
    name: 'Proteome → Epigenome VAE',
    inputs: 'Proteomics + epigenomics',
    outputs: '64D resistance manifold',
    notes: 'Pan-cancer pretrain, MM finetune',
  },
  {
    layer: 'L2',
    name: 'Stability ODE',
    inputs: 'Latent state + reader/writer proteins',
    outputs: 'Basin-of-attraction stability',
    notes: 'Forecast horizons 3/6/12 months',
  },
  {
    layer: 'L3',
    name: 'Protein Network GNN',
    inputs: 'STRING PPI + ESM-2 embeddings',
    outputs: 'Per-protein resistance signals',
    notes: 'Graph attention + optional GraphMASK',
  },
  {
    layer: 'L4',
    name: 'Cross-Attention Fusion',
    inputs: 'VAE, ODE, GNN, stability',
    outputs: 'Unified resistance embedding',
    notes: 'Modality gating + missingness handling',
  },
  {
    layer: 'L5',
    name: 'Resistance Landscape',
    inputs: 'Fused embeddings',
    outputs: 'Drug risk, state, targets',
    notes: 'Top mechanisms + evidential heads',
  },
];

const dataSources = [
  { name: 'CCLE Proteomics', type: 'Bulk', access: 'Public', size: '1.2 GB' },
  { name: 'CCLE Epigenomics', type: 'Bulk', access: 'Public', size: '2.5 GB' },
  { name: 'STRING PPI v12', type: 'Network', access: 'Public', size: '400 MB' },
  { name: 'GDSC Drug Sensitivity', type: 'Drug Screen', access: 'Public', size: '150 MB' },
  { name: 'CTRPv2', type: 'Drug Screen', access: 'Registered', size: '300 MB', locked: true },
  { name: 'GSE124310 scRNA-seq', type: 'Single-cell', access: 'Public', size: '5 GB' },
  { name: 'GSE271107 scRNA-seq', type: 'Single-cell', access: 'Public', size: '8 GB' },
  { name: 'MMRF CoMMpass', type: 'Clinical', access: 'IRB Controlled', size: '50+ GB', locked: true },
];

const interpretabilitySignals = [
  'Per-protein contribution scores from ProteinNet + ResistancePropagator',
  'GraphMASK-ready causal edge attribution on the PPI graph',
  'Cross-attention weights to reveal dominant modality evidence',
  'Pathway stability audits under PPI edge dropout',
  'Evidential head for epistemic + aleatoric uncertainty (optional)',
];

const governanceTiers = [
  'Tier A: data adequacy, integration integrity, bias/fairness checks',
  'Tier B: architecture necessity, cell-state interpretability, pathway audits',
  'Tier C: forecasting calibration, baseline adversary, clinical safety',
  'Tier D: synthesis chair, verification chain, EvalReport verdict',
];

const modelSpecs = [
  { label: 'VAE latent dim', value: '64 (configurable)' },
  { label: 'Pretrain / finetune', value: '200 / 100 epochs' },
  { label: 'ODE horizons', value: '3, 6, 12 months' },
  { label: 'ESM-2 backbone', value: 'esm2_t33_650M_UR50D (1280D)' },
  { label: 'GNN depth', value: '4 layers · 8 heads' },
  { label: 'Fusion', value: 'Cross-attention · 4 heads' },
  { label: 'Landscape outputs', value: 'Drug risk · state · targets' },
  { label: 'Top mechanisms', value: '20 targets · 0.8 threshold' },
];

const qualityChecks = [
  'Missingness profiling + MCAR tests',
  'Batch effect audits (kBET / LISI)',
  'MM driver protein coverage enforcement',
  'SHA256 hash chain across agents',
  'Guardrails on probability ranges + IC50 bounds',
];

const inferenceEndpoints = [
  'POST /predict — single-sample resistance landscape',
  'POST /predict/batch — batched inference with trace IDs',
  'POST /predict/trajectory — temporal trajectories + state accuracy',
  'GET /targets/{sample_id} — top intervention targets',
  'GET /landscape/{sample_id} — visualization-ready payload',
  'GET /health — model readiness, device, version',
];

const systemPillars = [
  {
    title: 'Data Quality Pipeline',
    body: 'Profiling, missingness tests, batch effect detection, and MM driver coverage checks to ensure usable cohorts.',
  },
  {
    title: 'MCP Integration Layer',
    body: 'Connectors for PubMed, ChEMBL, ClinicalTrials.gov, and HuggingFace with rate limiting + TTL caching.',
  },
  {
    title: 'Latent Compute Scheduler',
    body: 'Priority-queue orchestration for heavy jobs like ESM-2 embedding and trajectory ensembles.',
  },
  {
    title: 'Agentic Orchestrator',
    body: 'DAG execution with isolated agents, SHA256 hash chain verification, and AgentOps telemetry.',
  },
];

const visualSystem = [
  'Bio-illustration motifs for multi-omics layers and cellular states',
  'Synaptic network cues for pathway attribution and graph logic',
  'Mathematica-style flow cues for dynamical systems + ODE stability',
];

const App = () => {
  const [activeLock, setActiveLock] = useState(null);

  return (
    <div className="page">
      <nav className="nav">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <h1>ResistanceMap</h1>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Agentic multi-omics resistance intelligence</div>
          </div>
        </div>
        <div className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#interpretability">Interpretability</a>
          <a href="#governance">Governance</a>
          <a href="#data">Data</a>
          <a href="#api">API</a>
        </div>
      </nav>

      <section id="overview" className="hero">
        <div className="hero-card reveal">
          <h2>Explainable resistance forecasting for hematologic malignancies.</h2>
          <p>
            ResistanceMap fuses proteomics, epigenomics, single-cell transcriptomics, and clinical outcomes to forecast
            drug resistance while surfacing mechanistic evidence trails. The pipeline is fully agentic, audited, and
            designed for interpretability-first decision support.
          </p>
          <div className="hero-metrics">
            <div className="metric">
              <h3>10-agent DAG</h3>
              <span>Layered execution + hash-chain verification</span>
            </div>
            <div className="metric">
              <h3>3/6/12 month</h3>
              <span>ODE-calibrated resistance horizons</span>
            </div>
            <div className="metric">
              <h3>Example run</h3>
              <span>21.3 min · test MSE 0.7191 · 11 drugs</span>
            </div>
          </div>
        </div>

        <div className="hero-card reveal" style={{ animationDelay: '0.1s' }}>
          <div className="pill">System Pillars</div>
          <div className="card-grid" style={{ marginTop: 12 }}>
            {systemPillars.map((pillar) => (
              <div className="card" key={pillar.title}>
                <h4>{pillar.title}</h4>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pipeline">
        <div className="section-header">
          <div>
            <h3 className="section-title">Full Pipeline Blueprint</h3>
            <p className="section-subtitle">
              Each stage is independently verified, checkpointed, and parallelized. The DAG surfaces the complete
              model lineage from raw multi-omics to calibrated resistance landscapes.
            </p>
          </div>
        </div>
        <div className="diagram reveal">
          <DiagramPipeline />
        </div>
        <div className="flow" style={{ marginTop: 20 }}>
          {pipelineStages.map((stage) => (
            <div className="flow-step" key={stage.layer}>
              <strong>{stage.layer}: {stage.name}</strong>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>{stage.inputs}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>{stage.outputs}</div>
              <div style={{ color: 'var(--muted)', fontSize: 11 }}>{stage.notes}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Model Specifications</h3>
            <p className="section-subtitle">
              Key hyperparameters and architectural commitments extracted from the configuration and training docs.
            </p>
          </div>
        </div>
        <div className="card-grid">
          {modelSpecs.map((spec) => (
            <div className="card" key={spec.label}>
              <h4>{spec.label}</h4>
              <p>{spec.value}</p>
            </div>
          ))}
        </div>
        <div className="grid-two" style={{ marginTop: 18 }}>
          <div className="card">
            <div className="pill">Data Quality</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              {qualityChecks.map((check) => (
                <div key={check} style={{ fontSize: 13, color: 'var(--muted)' }}>{check}</div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="pill">Observability</div>
            <p>
              AgentOps tracking captures duration, handoff latency, tool latency, and cost per request. Timing logs and
              verification chains are exported for audit-ready reproducibility.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="interpretability">
        <div className="section-header">
          <div>
            <h3 className="section-title">Interpretable Prediction Process</h3>
            <p className="section-subtitle">
              The model surfaces mechanistic explanations alongside every prediction. Interpretability is enforced
              through graph-level audits, attention transparency, and pathway stability checks.
            </p>
          </div>
          <div className="badges">
            <span className="badge">GraphMASK-ready</span>
            <span className="badge">Pathway stability</span>
            <span className="badge">Evidential UQ</span>
          </div>
        </div>
        <div className="grid-two">
          <div className="diagram reveal">
            <DiagramInterpretability />
          </div>
          <div className="card reveal" style={{ animationDelay: '0.1s' }}>
            <div className="pill">Interpretability Signals</div>
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {interpretabilitySignals.map((item) => (
                <div key={item}>
                  <strong style={{ fontSize: 13 }}>{item}</strong>
                </div>
              ))}
            </div>
            <div className="callout" style={{ marginTop: 18 }}>
              Interpretability artifacts are validated against governance Tier B audits and edge-dropout consistency
              checks before being surfaced in the dashboard.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Mind Map of the System</h3>
            <p className="section-subtitle">
              A structural overview tying together data, models, orchestration, inference, and evaluation governance.
            </p>
          </div>
        </div>
        <div className="diagram reveal">
          <MindMap />
        </div>
      </section>

      <section className="section" id="governance">
        <div className="section-header">
          <div>
            <h3 className="section-title">Evaluation Governance</h3>
            <p className="section-subtitle">
              The governance layer runs orthogonally to training, adjudicating state, timing, and pathway claims with
              tiered agents, adversarial baselines, and verification chains.
            </p>
          </div>
          <div className="badges">
            <span className="badge">Tiered verdicts</span>
            <span className="badge">Adversarial baselines</span>
          </div>
        </div>
        <div className="grid-two">
          <div className="diagram reveal">
            <DiagramGovernance />
          </div>
          <div className="card reveal" style={{ animationDelay: '0.1s' }}>
            <div className="pill">Governance Tiers</div>
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {governanceTiers.map((item) => (
                <div key={item}>
                  <strong style={{ fontSize: 13 }}>{item}</strong>
                </div>
              ))}
            </div>
            <div className="callout" style={{ marginTop: 18 }}>
              Governance produces an EvalReport with required changes, verification hashes, and
              explicit epistemic limits for every claim.
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="data">
        <div className="section-header">
          <div>
            <h3 className="section-title">Data & Credential Access</h3>
            <p className="section-subtitle">
              Public data is fully integrated out of the box. Controlled datasets prompt for credentials before
              downloading or enrichment. Click any locked source to surface the access prompt.
            </p>
          </div>
          <div className="badges">
            <span className="badge">MCP connectors</span>
            <span className="badge">IRB-aware</span>
          </div>
        </div>
        <div className="card-grid">
          {dataSources.map((source) => (
            <div
              key={source.name}
              className="card"
              role={source.locked ? 'button' : undefined}
              tabIndex={source.locked ? 0 : -1}
              onClick={() => source.locked && setActiveLock(source)}
              onKeyDown={(event) => {
                if (source.locked && (event.key === 'Enter' || event.key === ' ')) {
                  setActiveLock(source);
                }
              }}
            >
              <div className="pill">{source.type}</div>
              <h4>{source.name}</h4>
              <p>Access: {source.access}</p>
              <div className="badges">
                <span className={`badge ${source.locked ? 'locked' : ''}`}>
                  {source.locked ? 'Credentials required' : 'Open access'}
                </span>
                <span className="badge">{source.size}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="api">
        <div className="section-header">
          <div>
            <h3 className="section-title">Inference API</h3>
            <p className="section-subtitle">
              FastAPI endpoints deliver resistance state, trajectory, and intervention targets with confidence and
              interpretation attached to each response.
            </p>
          </div>
        </div>
        <div className="card-grid">
          {inferenceEndpoints.map((endpoint) => (
            <div className="card" key={endpoint}>
              <h4>{endpoint.split(' — ')[0]}</h4>
              <p>{endpoint.split(' — ')[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h3 className="section-title">Visual System</h3>
            <p className="section-subtitle">
              The dashboard uses bespoke vector diagrams inspired by bio-illustration, synaptic pathway maps, and
              computational notebook aesthetics while remaining fully original and open-source.
            </p>
          </div>
        </div>
        <div className="card-grid">
          {visualSystem.map((item) => (
            <div className="card" key={item}>
              <h4>{item}</h4>
              <p>Custom SVGs can be replaced with licensed BioRender or Synapse assets as needed.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>ResistanceMap Dashboard · React static build</div>
        <div>GitHub Pages ready (base path: /dashboard/)</div>
      </footer>

      {activeLock && (
        <div className="modal-backdrop" onClick={() => setActiveLock(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h3>Credentials Required</h3>
            <p>
              Access to <strong>{activeLock.name}</strong> is controlled ({activeLock.access}). Provide
              credentials or approval details before downloading or syncing this dataset.
            </p>
            <label htmlFor="access-id">Access ID or IRB approval</label>
            <input id="access-id" placeholder="Enter approval / access token" />
            <label htmlFor="contact">Contact email</label>
            <input id="contact" placeholder="name@institution.edu" />
            <div>
              <button type="button">Request access</button>
              <button type="button" className="ghost" onClick={() => setActiveLock(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
