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
        This case study demonstrates ResistanceMap's capacity for mechanistic resistance
        prediction through the lens of venetoclax resistance in t(11;14)-enriched
        relapsed/refractory multiple myeloma. The pipeline reconstructs BCL-2 family
        rewiring dynamics — specifically, compensatory upregulation of MCL-1 and BCL-XL
        in response to BCL-2 inhibition — by integrating graph-based pathway analysis
        with dynamical-systems modelling. Three domain-specialised sub-agents augment
        the core pipeline: BioRender for publication-quality mechanism illustration,
        Synapse for cohort provenance and access governance, and Wolfram Mathematica
        for symbolic stability analysis of the learned vector field.
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
        title="Sub-agent integration architecture"
        subtitle="Each sub-agent connects to a specific pipeline stage, contributing domain expertise that the core architecture cannot provide independently."
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
        title="Domain-specialised agents"
        subtitle="Each agent is documented with its purpose, input–output contract, pipeline integration point, and a concrete application to the venetoclax resistance case study."
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
