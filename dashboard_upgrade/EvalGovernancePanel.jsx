import React, { useState } from 'react';

/**
 * EvalGovernancePanel — live evaluation governance status
 *
 * Renders the actual tier verdicts from the latest evaluation report.
 * In production, this would fetch from /logs/evaluation/latest/report.json.
 * For the static dashboard, the data is embedded at build time.
 */

// Latest evaluation report data (from 20260411T200711Z)
const EVAL_REPORT = {
  run_id: '20260411T200711Z',
  per_tier_verdicts: { A: 'skipped', B: 'fail', C: 'fail', D: 'conditional' },
  per_tier_agent_verdicts: {
    A: {
      eval_data_adequacy: 'conditional',
      eval_measurement_integration: 'conditional',
      eval_bias_fairness_shift: 'skipped',
    },
    B: {
      architecture_auditor: 'fail',
      cell_state_trajectory: 'skipped',
      pathway_ppi_reasoning: 'skipped',
    },
    C: {
      forecasting_uncertainty_agent: 'skipped',
      baseline_adversary_agent: 'skipped',
      clinical_translation_safety_agent: 'fail',
    },
    D: {
      principal_integrator_agent: 'conditional',
    },
  },
  critical_blockers: [
    {
      tier: 'A',
      agent: 'eval_data_adequacy',
      issue: 'Treatment line (NDMM vs RRMM) not documented in any manifest',
      fix: 'Provide patient_manifest.csv with treatment_line and sample_site columns',
    },
    {
      tier: 'A',
      agent: 'eval_data_adequacy',
      issue: 'Resistance label definition is not documented',
      fix: 'Add resistance_label_definition.md with primary vs secondary thresholding rule',
    },
    {
      tier: 'A',
      agent: 'eval_data_adequacy',
      issue: 'Leakage scan was vacuous (no split manifest available)',
      fix: 'Expose train/val/test patient-id manifests',
    },
    {
      tier: 'B',
      agent: 'architecture_auditor',
      issue: 'ODE integration_time in arbitrary units — calendar-time claims unsupported',
      fix: 'Calibrate ODE integration time to clinical calendar time',
    },
    {
      tier: 'B',
      agent: 'architecture_auditor',
      issue: 'GNN attributions confounded with PPI degree',
      fix: 'Run degree-preserving rewired PPI null model',
    },
    {
      tier: 'C',
      agent: 'clinical_translation_safety',
      issue: 'No OOD detector — model emits confident predictions out-of-distribution',
      fix: 'Add OOD detector with abstention pathway',
    },
    {
      tier: 'C',
      agent: 'clinical_translation_safety',
      issue: '9 drugs missing pre-registered safety notes',
      fix: 'Add safety notes for Panobinostat, Vorinostat, Romidepsin, Venetoclax, Dinaciclib, Palbociclib, Doxorubicin, Etoposide, Cyclophosphamide',
    },
  ],
};

const TIER_DESCRIPTIONS = {
  A: 'Data adequacy, integration integrity, bias/fairness checks',
  B: 'Architecture necessity, cell-state interpretability, pathway audits',
  C: 'Forecasting calibration, baseline adversary, clinical safety',
  D: 'Synthesis chair, verification chain, EvalReport verdict',
};

const VERDICT_STYLES = {
  pass: { bg: 'rgba(44, 110, 106, 0.12)', border: 'rgba(44, 110, 106, 0.35)', color: '#1a5c58', label: 'PASS' },
  conditional: { bg: 'rgba(197, 138, 43, 0.12)', border: 'rgba(197, 138, 43, 0.35)', color: '#8b5a12', label: 'CONDITIONAL' },
  fail: { bg: 'rgba(164, 73, 47, 0.12)', border: 'rgba(164, 73, 47, 0.35)', color: '#a4492f', label: 'FAIL' },
  skipped: { bg: 'rgba(90, 107, 112, 0.08)', border: 'rgba(90, 107, 112, 0.2)', color: '#5a6b70', label: 'SKIPPED' },
};

const VerdictBadge = ({ verdict }) => {
  const style = VERDICT_STYLES[verdict] || VERDICT_STYLES.skipped;
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {style.label}
    </span>
  );
};

const formatAgentName = (name) =>
  name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('Eval ', '')
    .replace(' Agent', '');

const EvalGovernancePanel = () => {
  const [expandedTier, setExpandedTier] = useState(null);

  return (
    <div>
      {/* Tier overview cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 24 }}>
        {Object.entries(EVAL_REPORT.per_tier_verdicts).map(([tier, verdict]) => (
          <div
            key={tier}
            role="button"
            tabIndex={0}
            onClick={() => setExpandedTier(expandedTier === tier ? null : tier)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setExpandedTier(expandedTier === tier ? null : tier)}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 18,
              padding: 18,
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: expandedTier === tier ? '0 22px 50px rgba(28,38,40,0.12)' : 'var(--shadow)',
              transform: expandedTier === tier ? 'translateY(-2px)' : 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <strong style={{ fontSize: 18, fontFamily: 'var(--display)' }}>Tier {tier}</strong>
              <VerdictBadge verdict={verdict} />
            </div>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13, lineHeight: 1.5 }}>
              {TIER_DESCRIPTIONS[tier]}
            </p>
          </div>
        ))}
      </div>

      {/* Expanded tier detail */}
      {expandedTier && (
        <div className="card reveal" style={{ marginBottom: 24 }}>
          <div className="pill">Tier {expandedTier} Agent Verdicts</div>
          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            {Object.entries(EVAL_REPORT.per_tier_agent_verdicts[expandedTier]).map(([agent, verdict]) => (
              <div
                key={agent}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: 14 }}>{formatAgentName(agent)}</span>
                <VerdictBadge verdict={verdict} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical blockers */}
      <div className="callout" style={{ marginTop: 0 }}>
        <strong style={{ display: 'block', marginBottom: 10, fontSize: 14 }}>
          {EVAL_REPORT.critical_blockers.length} Critical Blockers
        </strong>
        <div style={{ display: 'grid', gap: 10 }}>
          {EVAL_REPORT.critical_blockers.map((blocker, i) => (
            <div key={i} style={{ fontSize: 13, lineHeight: 1.5 }}>
              <span style={{
                display: 'inline-block',
                padding: '2px 6px',
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 700,
                background: 'rgba(164, 73, 47, 0.15)',
                color: '#a4492f',
                marginRight: 6,
              }}>
                {blocker.tier}
              </span>
              <strong>{blocker.issue}</strong>
              <div style={{ color: 'var(--muted)', marginTop: 2, paddingLeft: 28 }}>
                Fix: {blocker.fix}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--muted)' }}>
        Report: {EVAL_REPORT.run_id} · Click tier cards to expand agent verdicts
      </div>
    </div>
  );
};

export default EvalGovernancePanel;
