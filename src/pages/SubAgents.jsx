import SectionHeader from '../components/SectionHeader.jsx';
import BioRenderFigure from '../components/subagents/BioRenderFigure.jsx';
import SynapseCohortCard from '../components/subagents/SynapseCohortCard.jsx';
import PhasePortrait from '../components/subagents/PhasePortrait.jsx';
import { caseStudy, subAgents, integrationPoints, STATUS_LABELS } from '../data/subAgents.js';

const FIGURE_BY_ID = {
  biorender: BioRenderFigure,
  synapse: SynapseCohortCard,
  wolfram: PhasePortrait,
};

const StatusBadge = ({ status }) => (
  <span className={`status-badge status-badge--${status}`}>
    <span className="status-dot" aria-hidden="true" />
    {STATUS_LABELS[status]}
  </span>
);

const SubAgentBlock = ({ agent, index }) => {
  const Figure = FIGURE_BY_ID[agent.id];
  return (
    <article className="subagent" id={`agent-${agent.id}`}>
      <header className="subagent-header">
        <div className="subagent-index">{String(index + 1).padStart(2, '0')}</div>
        <div className="subagent-title-wrap">
          <h3 className="subagent-name">
            {agent.name}
            <span className="subagent-tagline">· {agent.tagline}</span>
          </h3>
        </div>
        <StatusBadge status={agent.status} />
      </header>

      <p className="subagent-purpose">{agent.purpose}</p>

      <div className="subagent-figure">
        <Figure />
      </div>

      <div className="subagent-grid">
        <div>
          <h5>Inputs</h5>
          <ul className="bulleted">
            {agent.inputs.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Outputs</h5>
          <ul className="bulleted">
            {agent.outputs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="subagent-footer">
        <div className="subagent-integration">
          <span className="pill">Pipeline role</span>
          <p>{agent.pipelineRole}</p>
        </div>
        <div className="subagent-use-case">
          <span className="pill">Case-study example</span>
          <p>{agent.useCaseExample}</p>
        </div>
      </div>
    </article>
  );
};

const SubAgents = () => (
  <article className="subagents-page">
    <header className="science-hero">
      <span className="pill">Case Study</span>
      <h2>Venetoclax resistance in relapsed/refractory multiple myeloma</h2>
      <p className="lede">
        ResistanceMap combines graph-based causal inference with dynamical-systems
        modeling to predict mechanistic drivers of drug resistance. In this case study,
        the pipeline reconstructs BCL-2 family rewiring under venetoclax pressure,
        identifying how MCL-1 and BCL-XL upregulation compensate for BCL-2 inhibition
        in t(11;14)-enriched myeloma. Three specialized sub-agents augment the core
        pipeline with domain expertise: BioRender for publication-quality mechanism
        illustrations, Synapse for cohort provenance and data governance, and Wolfram
        Mathematica for dynamical-systems phase-portrait analysis.
      </p>
    </header>

    {/* ---- Case study ---- */}
    <section className="sci-section" id="case-study">
      <SectionHeader
        title="Case study"
        subtitle={caseStudy.title}
        badges={[
          { id: 'bcl2', label: 'BCL-2 family rewiring' },
          { id: 't1114', label: 't(11;14) enriched' },
          { id: 'rrmm', label: 'RRMM' },
        ]}
      />
      <div className="grid-two grid-two--spaced">
        <div className="card">
          <span className="pill">Why this mechanism</span>
          <ul className="bulleted bulleted--strong">
            {caseStudy.background.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <span className="pill">Grounding data</span>
          <h5 style={{ marginTop: 8 }}>Datasets</h5>
          <ul className="bulleted">
            {caseStudy.datasets.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h5 style={{ marginTop: 12 }}>Driver proteins</h5>
          <div className="driver-chips">
            {caseStudy.drivers.map((d) => (
              <span key={d} className="driver-chip">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ---- Integration overview ---- */}
    <section className="sci-section" id="integration">
      <SectionHeader
        title="Where each sub-agent plugs into the DAG"
        subtitle="One integration point per agent, all on the critical path."
      />
      <div className="integration-map">
        {integrationPoints.map((pt) => {
          const agent = subAgents.find((a) => a.id === pt.agent);
          return (
            <div key={pt.agent} className="integration-row">
              <div className="integration-agent">
                <StatusBadge status={agent.status} />
                <strong>{agent.name}</strong>
              </div>
              <div className="integration-arrow" aria-hidden="true">→</div>
              <div className="integration-stage">
                <code>{pt.stage}</code>
                <p className="meta">{pt.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>

    {/* ---- Individual sub-agents ---- */}
    <section className="sci-section">
      <SectionHeader
        title="The three sub-agents"
        subtitle="Each agent documented with purpose, I/O contract, pipeline role, example output, and case-study application."
      />
      <div className="subagents-list">
        {subAgents.map((agent, idx) => (
          <SubAgentBlock key={agent.id} agent={agent} index={idx} />
        ))}
      </div>
    </section>
  </article>
);

export default SubAgents;
