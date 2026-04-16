import { useState } from 'react';
import { evalReport, tierDescriptions } from '../data/evalReport.js';

const VERDICT_LABELS = {
  pass: 'PASS',
  conditional: 'CONDITIONAL',
  fail: 'FAIL',
  skipped: 'SKIPPED',
};

const VerdictBadge = ({ verdict }) => (
  <span className={`verdict verdict--${verdict}`}>
    {VERDICT_LABELS[verdict] ?? 'SKIPPED'}
  </span>
);

const formatAgentName = (name) =>
  name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/^Eval /, '')
    .replace(/ Agent$/, '');

const EvalGovernancePanel = () => {
  const [expandedTier, setExpandedTier] = useState(null);

  const toggle = (tier) =>
    setExpandedTier((current) => (current === tier ? null : tier));

  return (
    <div className="eval-panel">
      <div className="tier-grid">
        {Object.entries(evalReport.perTierVerdicts).map(([tier, verdict]) => {
          const isOpen = expandedTier === tier;
          return (
            <div
              key={tier}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`tier-${tier}-detail`}
              className={`tier-card${isOpen ? ' tier-card--open' : ''}`}
              onClick={() => toggle(tier)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle(tier);
                }
              }}
            >
              <div className="tier-card-head">
                <strong className="tier-card-title">Tier {tier}</strong>
                <VerdictBadge verdict={verdict} />
              </div>
              <p className="tier-card-desc">{tierDescriptions[tier]}</p>
            </div>
          );
        })}
      </div>

      {expandedTier && (
        <div
          id={`tier-${expandedTier}-detail`}
          className="card reveal tier-detail"
        >
          <span className="pill">Tier {expandedTier} Agent Verdicts</span>
          <div className="agent-list">
            {Object.entries(evalReport.perTierAgentVerdicts[expandedTier]).map(
              ([agent, verdict]) => (
                <div key={agent} className="agent-row">
                  <span>{formatAgentName(agent)}</span>
                  <VerdictBadge verdict={verdict} />
                </div>
              ),
            )}
          </div>
        </div>
      )}

      <div className="callout blocker-callout">
        <strong className="blocker-title">
          {evalReport.criticalBlockers.length} Critical Blockers
        </strong>
        <div className="blocker-list">
          {evalReport.criticalBlockers.map((blocker) => (
            <div key={blocker.id} className="blocker">
              <span className="blocker-tier">{blocker.tier}</span>
              <strong>{blocker.issue}</strong>
              <div className="blocker-fix">Fix: {blocker.fix}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="eval-footnote">
        Report: {evalReport.runId} · Click tier cards to expand agent verdicts
      </div>
    </div>
  );
};

export default EvalGovernancePanel;
