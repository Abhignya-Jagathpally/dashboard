import { useState } from 'react';
import { Link } from 'react-router-dom';

import DiagramPipeline from '../components/DiagramPipeline.jsx';
import DiagramInterpretability from '../components/DiagramInterpretability.jsx';
import DiagramGovernance from '../components/DiagramGovernance.jsx';
import MindMap from '../components/MindMap.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import LockModal from '../components/LockModal.jsx';
import DataSourceCard from '../components/DataSourceCard.jsx';
import EvalGovernancePanel from '../components/EvalGovernancePanel.jsx';

import { pipelineStages } from '../data/pipeline.js';
import { dataSources } from '../data/dataSources.js';
import { interpretabilitySignals } from '../data/interpretability.js';
import { governanceTiers } from '../data/governance.js';
import { modelSpecs, qualityChecks } from '../data/modelSpecs.js';
import { inferenceEndpoints } from '../data/api.js';
import { systemPillars } from '../data/systemPillars.js';

const Home = () => {
  const [activeLock, setActiveLock] = useState(null);

  return (
    <>
      <section id="overview" className="hero">
        <div className="hero-card reveal">
          <h2>Explainable resistance forecasting for hematologic malignancies.</h2>
          <p>
            ResistanceMap fuses proteomics, epigenomics, single-cell transcriptomics, and clinical
            outcomes to forecast drug resistance while surfacing mechanistic evidence trails. The
            pipeline is fully agentic, audited, and designed for interpretability-first decision
            support.
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
              <h3>Latest run</h3>
              <span>21.3 min · test MSE 0.7191 · 11 drugs</span>
            </div>
          </div>
          <div className="hero-cta">
            <Link to="/science" className="cta-primary">
              Read the full methodology →
            </Link>
          </div>
        </div>

        <div className="hero-card reveal reveal--delayed">
          <span className="pill">System Pillars</span>
          <div className="card-grid card-grid--tight">
            {systemPillars.map((pillar) => (
              <div className="card" key={pillar.id}>
                <h4>{pillar.title}</h4>
                <p>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pipeline">
        <SectionHeader
          title="Full Pipeline Blueprint"
          subtitle="Each stage is independently verified, checkpointed, and parallelized. The DAG surfaces the complete model lineage from raw multi-omics to calibrated resistance landscapes."
        />
        <div className="diagram reveal">
          <DiagramPipeline />
        </div>
        <div className="flow">
          {pipelineStages.map((stage) => (
            <div className="flow-step" key={stage.id}>
              <strong>
                {stage.layer}: {stage.name}
              </strong>
              <div className="meta">{stage.inputs}</div>
              <div className="meta">{stage.outputs}</div>
              <div className="meta meta--small">{stage.notes}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Model Specifications"
          subtitle="Key hyperparameters and architectural commitments extracted from the configuration and training docs."
        />
        <div className="card-grid">
          {modelSpecs.map((spec) => (
            <div className="card" key={spec.id}>
              <h4>{spec.label}</h4>
              <p>{spec.value}</p>
            </div>
          ))}
        </div>
        <div className="grid-two grid-two--spaced">
          <div className="card">
            <span className="pill">Data Quality</span>
            <ul className="bulleted">
              {qualityChecks.map((check) => (
                <li key={check.id}>{check.text}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <span className="pill">Observability</span>
            <p>
              AgentOps tracking captures duration, handoff latency, tool latency, and cost per
              request. Timing logs and verification chains are exported for audit-ready
              reproducibility.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="interpretability">
        <SectionHeader
          title="Interpretable Prediction Process"
          subtitle="The model surfaces mechanistic explanations alongside every prediction. Interpretability is enforced through graph-level audits, attention transparency, and pathway stability checks."
          badges={[
            { id: 'gm', label: 'GraphMASK-ready' },
            { id: 'ps', label: 'Pathway stability' },
            { id: 'eu', label: 'Evidential UQ' },
          ]}
        />
        <div className="grid-two">
          <div className="diagram reveal">
            <DiagramInterpretability />
          </div>
          <div className="card reveal reveal--delayed">
            <span className="pill">Interpretability Signals</span>
            <ul className="bulleted bulleted--strong">
              {interpretabilitySignals.map((signal) => (
                <li key={signal.id}>{signal.text}</li>
              ))}
            </ul>
            <div className="callout">
              Interpretability artifacts are validated against governance Tier B audits and
              edge-dropout consistency checks before being surfaced in the dashboard.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          title="Mind Map of the System"
          subtitle="A structural overview tying together data, models, orchestration, inference, and evaluation governance."
        />
        <div className="diagram reveal">
          <MindMap />
        </div>
      </section>

      <section className="section" id="governance">
        <SectionHeader
          title="Evaluation Governance"
          subtitle="The governance layer runs orthogonally to training, adjudicating state, timing, and pathway claims with tiered agents, adversarial baselines, and verification chains. Live verdicts reflect the latest evaluation run."
          badges={[
            { id: 'tv', label: 'Tiered verdicts' },
            { id: 'ab', label: 'Adversarial baselines' },
          ]}
        />
        <EvalGovernancePanel />
        <div className="grid-two grid-two--spaced">
          <div className="diagram reveal">
            <DiagramGovernance />
          </div>
          <div className="card reveal reveal--delayed">
            <span className="pill">Governance Tiers</span>
            <ul className="bulleted bulleted--strong">
              {governanceTiers.map((tier) => (
                <li key={tier.id}>
                  <strong>{tier.label}:</strong> {tier.description}
                </li>
              ))}
            </ul>
            <div className="callout">
              Governance produces an EvalReport with required changes, verification hashes, and
              explicit epistemic limits for every claim.
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="data">
        <SectionHeader
          title="Data & Credential Access"
          subtitle="Public data is fully integrated out of the box. Controlled datasets prompt for credentials before downloading or enrichment. Click any locked source to surface the access prompt."
          badges={[
            { id: 'mcp', label: 'MCP connectors' },
            { id: 'irb', label: 'IRB-aware' },
          ]}
        />
        <div className="card-grid">
          {dataSources.map((source) => (
            <DataSourceCard key={source.id} source={source} onLockClick={setActiveLock} />
          ))}
        </div>
      </section>

      <section className="section" id="api">
        <SectionHeader
          title="Inference API"
          subtitle="FastAPI endpoints deliver resistance state, trajectory, and intervention targets with confidence and interpretation attached to each response."
        />
        <div className="card-grid">
          {inferenceEndpoints.map((endpoint) => (
            <div className="card" key={endpoint.id}>
              <h4>
                <span className={`method method--${endpoint.method.toLowerCase()}`}>
                  {endpoint.method}
                </span>
                <code>{endpoint.path}</code>
              </h4>
              <p>{endpoint.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="sub-agents-teaser">
        <SectionHeader
          title="Sub-agent integrations"
          subtitle="Three specialised agents plug into the main DAG: BioRender for mechanism illustrations, Synapse for cohort provenance, Wolfram Mathematica for stability analysis."
          badges={[
            { id: 'br', label: 'BioRender' },
            { id: 'sy', label: 'Synapse.org' },
            { id: 'wm', label: 'Mathematica' },
          ]}
        />
        <div className="card-grid">
          <div className="card">
            <span className="pill">BioRender</span>
            <h4>Cellular & molecular illustrations</h4>
            <p>Per-prediction mechanism figures generated via the BioRender MCP. Consumes Landscape top-target output.</p>
          </div>
          <div className="card">
            <span className="pill">Synapse.org</span>
            <h4>Cohort discovery & provenance</h4>
            <p>Provenance receipts at Layer 0 Data Validation enter the SHA256 hash chain alongside zero-trust checks.</p>
          </div>
          <div className="card">
            <span className="pill">Mathematica</span>
            <h4>Dynamical systems analysis</h4>
            <p>Symbolic certificates for the Neural ODE — fixed points, Lyapunov exponents, Kramers escape rates.</p>
          </div>
        </div>
        <div className="hero-cta" style={{ marginTop: 18 }}>
          <Link to="/sub-agents" className="cta-primary">
            See the venetoclax case study →
          </Link>
        </div>
      </section>

      {activeLock && <LockModal source={activeLock} onClose={() => setActiveLock(null)} />}
    </>
  );
};

export default Home;
