import { useState } from 'react';
import { tierDescriptions } from '../data/evalReport.js';

const TIER_AGENTS = {
  A: [
    { name: 'Data Completeness', role: 'Data completeness & coverage' },
    { name: 'Measurement Integration', role: 'Measurement integration & batch effects' },
    { name: 'Bias & Fairness', role: 'Bias, fairness & distributional shift' },
  ],
  B: [
    { name: 'Architecture Necessity', role: 'Architecture necessity & ablation' },
    { name: 'Cell-State Trajectory', role: 'Cell-state trajectory validity' },
    { name: 'Pathway Reasoning', role: 'Pathway & PPI reasoning audit' },
  ],
  C: [
    { name: 'Forecasting Calibration', role: 'Forecasting calibration & uncertainty' },
    { name: 'Baseline Adversary', role: 'Baseline adversary comparison' },
    { name: 'Clinical Translation', role: 'Clinical translation & safety review' },
  ],
  D: [
    { name: 'Principal Synthesiser', role: 'Principal synthesis & EvalReport generation' },
  ],
};

const EvalGovernancePanel = () => {
  const [expandedTier, setExpandedTier] = useState(null);

  const toggle = (tier) =>
    setExpandedTier((current) => (current === tier ? null : tier));

  return (
    <div className="eval-panel">
      <div className="tier-grid">
        {Object.entries(TIER_AGENTS).map(([tier, agents]) => {
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
              </div>
              <p className="tier-card-desc">{tierDescriptions[tier]}</p>

              {isOpen && (
                <div
                  id={`tier-${tier}-detail`}
                  className="tier-detail"
                >
                  <div className="agent-list">
                    {agents.map((agent) => (
                      <div key={agent.name} className="agent-row">
                        <strong>{agent.name}</strong>
                        <span className="agent-role">{agent.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvalGovernancePanel;
