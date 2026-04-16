// Latest evaluation report, embedded at build time.
// In production this would be fetched from /logs/evaluation/latest/report.json.
export const evalReport = {
  runId: '20260411T200711Z',
  perTierVerdicts: { A: 'skipped', B: 'fail', C: 'fail', D: 'conditional' },
  perTierAgentVerdicts: {
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
  criticalBlockers: [
    {
      id: 'a-treatment-line',
      tier: 'A',
      agent: 'eval_data_adequacy',
      issue: 'Treatment line (NDMM vs RRMM) not documented in any manifest',
      fix: 'Provide patient_manifest.csv with treatment_line and sample_site columns',
    },
    {
      id: 'a-label-def',
      tier: 'A',
      agent: 'eval_data_adequacy',
      issue: 'Resistance label definition is not documented',
      fix: 'Add resistance_label_definition.md with primary vs secondary thresholding rule',
    },
    {
      id: 'a-leakage',
      tier: 'A',
      agent: 'eval_data_adequacy',
      issue: 'Leakage scan was vacuous (no split manifest available)',
      fix: 'Expose train/val/test patient-id manifests',
    },
    {
      id: 'b-ode-time',
      tier: 'B',
      agent: 'architecture_auditor',
      issue: 'ODE integration_time in arbitrary units — calendar-time claims unsupported',
      fix: 'Calibrate ODE integration time to clinical calendar time',
    },
    {
      id: 'b-gnn-degree',
      tier: 'B',
      agent: 'architecture_auditor',
      issue: 'GNN attributions confounded with PPI degree',
      fix: 'Run degree-preserving rewired PPI null model',
    },
    {
      id: 'c-ood',
      tier: 'C',
      agent: 'clinical_translation_safety',
      issue: 'No OOD detector — model emits confident predictions out-of-distribution',
      fix: 'Add OOD detector with abstention pathway',
    },
    {
      id: 'c-safety-notes',
      tier: 'C',
      agent: 'clinical_translation_safety',
      issue: '9 drugs missing pre-registered safety notes',
      fix: 'Add safety notes for Panobinostat, Vorinostat, Romidepsin, Venetoclax, Dinaciclib, Palbociclib, Doxorubicin, Etoposide, Cyclophosphamide',
    },
  ],
};

export const tierDescriptions = {
  A: 'Data adequacy, integration integrity, bias/fairness checks',
  B: 'Architecture necessity, cell-state interpretability, pathway audits',
  C: 'Forecasting calibration, baseline adversary, clinical safety',
  D: 'Synthesis chair, verification chain, EvalReport verdict',
};
