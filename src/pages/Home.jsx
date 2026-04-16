import { useState } from 'react';
import { Link } from 'react-router-dom';

import DiagramPipelineV2 from '../components/DiagramPipelineV2.jsx';
import DiagramInterpretability from '../components/DiagramInterpretability.jsx';
import DiagramGovernance from '../components/DiagramGovernance.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import LockModal from '../components/LockModal.jsx';
import DataSourceCard from '../components/DataSourceCard.jsx';
import EvalGovernancePanel from '../components/EvalGovernancePanel.jsx';

import { pipelineStages } from '../data/pipeline.js';
import { dataSources } from '../data/dataSources.js';
import { interpretabilitySignals } from '../data/interpretability.js';
import { governanceTiers } from '../data/governance.js';

const Home = () => {
  const [activeLock, setActiveLock] = useState(null);

  return (
    <>
      {/* ── Hero ── */}
      <section id="overview" className="hero">
        <div className="hero-card reveal">
          <h2>Explainable resistance forecasting for hematologic malignancies</h2>
          <p>
            ResistanceMap introduces a layered agentic architecture that fuses four
            complementary omics modalities with protein-protein interaction networks to
            produce calibrated, horizon-specific resistance forecasts. Every prediction
            is accompanied by mechanistic evidence trails and undergoes multi-tier
            governance validation, enabling interpretability-first clinical decision
            support.
          </p>
          <div className="hero-metrics">
            <div className="metric">
              <h3>10 agents</h3>
              <span>Layered DAG with hash-chain verification</span>
            </div>
            <div className="metric">
              <h3>4 modalities</h3>
              <span>Proteomics · Epigenomics · Transcriptomics · PPI</span>
            </div>
            <div className="metric">
              <h3>3 horizons</h3>
              <span>Calibrated forecasts at 3, 6, 12 months</span>
            </div>
          </div>
          <div className="hero-cta">
            <Link to="/science" className="cta-primary">
              Explore the methodology &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Architecture Overview ── */}
      <section className="section" id="architecture">
        <SectionHeader
          title="Architecture Overview"
          subtitle="A directed acyclic graph of 10 specialised agents transforms raw multi-omics inputs into calibrated resistance landscapes. Each node is independently checkpointed, hash-verified, and designed for reproducibility across pipeline executions."
        />
        <div className="diagram reveal">
          <DiagramPipelineV2 />
        </div>
        <div className="flow">
          {pipelineStages.map((stage) => (
            <div className="flow-step" key={stage.id}>
              <strong>
                {stage.layer}: {stage.name}
              </strong>
              <div className="meta">{stage.inputs}</div>
              <div className="meta">{stage.outputs}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interpretability ── */}
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

      {/* ── Evaluation Governance ── */}
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

      {/* ── Data Sources ── */}
      <section className="section" id="data">
        <SectionHeader
          title="Data Sources"
          subtitle="Public data is fully integrated out of the box. Controlled datasets prompt for credentials before downloading or enrichment. Click any locked source to surface the access prompt."
          badges={[
            { id: 'irb', label: 'IRB-aware' },
          ]}
        />
        <div className="card-grid">
          {dataSources.map((source) => (
            <DataSourceCard key={source.id} source={source} onLockClick={setActiveLock} />
          ))}
        </div>
      </section>

      {activeLock && <LockModal source={activeLock} onClose={() => setActiveLock(null)} />}
    </>
  );
};

export default Home;
