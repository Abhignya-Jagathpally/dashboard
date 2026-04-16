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
          {agent.mcpUrl && (
            <code className="subagent-mcp">{agent.mcpUrl}</code>
          )}
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

      <div className="subagent-actions">
        <button type="button" className="btn-primary" disabled title="Requires backend — see Phase 3">
          Invoke live (Phase 3)
        </button>
        <span className="meta">
          {agent.status === 'connected'
            ? 'MCP connector present. Live invocation requires a serverless backend.'
            : 'Not connected. Add MCP URL in Phase 3.'}
        </span>
      </div>
    </article>
  );
};

const SubAgents = () => (
  <article className="subagents-page">
    <header className="science-hero">
      <span className="pill">Sub-agent integrations</span>
      <h2>Specialized sub-agents augment ResistanceMap with domain-expert tools.</h2>
      <p className="lede">
        Three external agents plug into the main execution DAG: BioRender for mechanism
        illustrations, Synapse for cohort provenance, Wolfram Mathematica for dynamical-systems
        analysis. This page is anchored on a single case study — venetoclax resistance in
        relapsed/refractory multiple myeloma — so each agent shows its concrete contribution.
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

    {/* ---- Phase 3 preview ---- */}
    <section className="sci-section" id="phase-3">
      <SectionHeader
        title="Phase 3 — live MCP invocation"
        subtitle="What\u2019s needed to turn the buttons above from disabled into working."
      />
      <div className="card">
        <p>
          GitHub Pages serves static files; it cannot invoke MCP servers at runtime. Wiring up
          live calls requires a serverless backend that (a) holds the MCP client credentials and
          (b) fronts each agent behind an HTTPS endpoint the dashboard can <code>fetch()</code>.
        </p>
        <ul className="bulleted">
          <li>
            <strong>Cloudflare Pages + Functions</strong> — free tier, same-domain, cleanest DX.
            Migration from GitHub Pages is one-shot.
          </li>
          <li>
            <strong>Netlify Functions</strong> — easy, decent free tier. Keeps GH Pages for
            static hosting; Netlify just hosts the API.
          </li>
          <li>
            <strong>Pre-build at CI time</strong> — zero runtime cost. Figures are generated by a
            scheduled Action and committed to <code>src/assets/</code>. No interactive regeneration.
          </li>
        </ul>
        <p className="meta">
          Pick one of the three and Phase 3 delivers the live invocation path end-to-end, with each
          sub-agent fronted by a typed endpoint.
        </p>
      </div>
    </section>
  </article>
);

export default SubAgents;
