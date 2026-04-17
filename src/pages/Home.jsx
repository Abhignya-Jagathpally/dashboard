import { useState } from 'react';
import { Link } from 'react-router-dom';

import DiagramInterpretability from '../components/DiagramInterpretability.jsx';
import DiagramGovernance from '../components/DiagramGovernance.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import LockModal from '../components/LockModal.jsx';
import DataSourceCard from '../components/DataSourceCard.jsx';
import EvalGovernancePanel from '../components/EvalGovernancePanel.jsx';

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
            ResistanceMap is a multi-modal pharmacogenomic pipeline that integrates
            proteomic, epigenomic, single-cell transcriptomic, and protein–protein
            interaction data to produce mechanistically interpretable drug-resistance
            forecasts. An agentic execution architecture ensures reproducibility through
            cryptographic verification at every intermediate stage, while a four-tier
            evaluation governance layer adjudicates the epistemic validity of each
            prediction before it reaches downstream consumers.
          </p>
          <div className="hero-metrics">
            <div className="metric">
              <h3>Agentic orchestration</h3>
              <span>Hash-verified DAG with zero-trust boundaries</span>
            </div>
            <div className="metric">
              <h3>4 modalities</h3>
              <span>Proteomics · Epigenomics · Transcriptomics · PPI networks</span>
            </div>
            <div className="metric">
              <h3>Calibrated forecasts</h3>
              <span>Horizon-specific predictions at 3, 6, and 12 months</span>
            </div>
          </div>
          <div className="hero-cta">
            <Link to="/science" className="cta-primary">
              Explore the methodology &rarr;
            </Link>
          </div>
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
          subtitle="An orthogonal evaluation layer adjudicates data adequacy, architectural necessity, forecasting calibration, and clinical safety through tiered review with adversarial baselines."
          badges={[
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
          subtitle="Multi-omics datasets span cell-line encyclopedias, drug sensitivity screens, single-cell atlases, and clinical cohorts. Controlled-access datasets are annotated with their governance tier."
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
