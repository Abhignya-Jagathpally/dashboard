# Resistance Label Definition — ResistanceMap

## Purpose

This document defines how drug resistance labels are assigned to patient
samples in the ResistanceMap pipeline. It satisfies the Tier A
`eval_data_adequacy` requirement for a resistance label provenance memo.

## Label Taxonomy

| Label Value | Meaning | Definition |
|-------------|---------|------------|
| 0 | Sensitive | Patient achieved ≥ partial response (PR) to the drug regimen and maintained response for ≥ 6 months |
| 1 | Resistant | Patient either never achieved PR (primary) or relapsed within 6 months of achieving PR (secondary) |

## Primary vs Secondary Resistance

- **Primary resistance**: No response (stable disease or progressive disease as
  best response) to the first-line regimen containing the target drug.
  Operationally: best_response ∈ {SD, PD} in CoMMpass `STAND_Response` table.

- **Secondary resistance**: Initial response (≥ PR) followed by confirmed
  progression within 6 months of best response date.
  Operationally: `best_response ∈ {PR, VGPR, CR, sCR}` AND
  `date_progression - date_best_response ≤ 180 days`.

## Thresholding Rule

For cell-line drug screens (GDSC / CTRPv2), resistance is binarized from
continuous IC50 values:

```
resistant = IC50 > median(IC50_drug) + 1 * MAD(IC50_drug)
```

Where MAD is the median absolute deviation. This threshold was chosen to
approximate the upper tertile of sensitivity while being robust to outliers.

For patient-level labels (MMRF CoMMpass), the clinical response definition
above is used directly — no IC50 thresholding is applied.

## Source Features

| Cohort | Source Column | Notes |
|--------|-------------|-------|
| GDSC cell lines | `LN_IC50` from `GDSC2_fitted_dose_response.csv` | Natural-log IC50; exponentiate before applying threshold |
| CTRPv2 cell lines | `area_under_curve` from CTRPv2 dose-response | AUC-based; invert so higher = more resistant |
| MMRF CoMMpass | `bestresponse` from `STAND_Response` table | IMWG response criteria (sCR/CR/VGPR/PR/SD/PD) |
| scRNA-seq (GSE124310) | Inherited from matched CoMMpass patient | Link via `patient_id` in manifest |
| scRNA-seq (GSE271107) | Disease stage (HD→MGUS→SMM→MM) | Progression stage used as proxy; NOT a direct resistance label |

## Known Limitations

1. **Cell-line ≠ patient**: IC50-derived labels from CCLE/GDSC do not capture
   tumor microenvironment, immune evasion, or pharmacokinetic resistance
   mechanisms present in patients. Transfer of cell-line labels to patient
   predictions requires explicit domain-adaptation (see `models/domain_adaptation.py`).

2. **Temporal ambiguity**: CoMMpass response assessments occur at variable
   intervals (4–12 weeks). The 6-month secondary resistance cutoff is
   approximate and subject to assessment-schedule bias.

3. **Drug combination confounding**: Most CoMMpass patients receive combination
   therapy. Attributing resistance to a single drug requires the
   single-agent cell-line screen as a biological prior; the patient-level
   label reflects regimen resistance, not necessarily single-drug resistance.

4. **Missing labels**: Patients who withdrew, died of non-myeloma causes, or
   lacked response assessment are excluded (not imputed). This creates
   informative censoring that the model does not currently adjust for.

## Changelog

| Date | Change |
|------|--------|
| 2026-04-15 | Initial provenance memo authored per Tier A eval requirement |
