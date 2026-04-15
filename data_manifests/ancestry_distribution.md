# Selection Bias & Ancestry Distribution Memo — ResistanceMap

## Purpose

This document acknowledges known enrollment biases and demographic skews across
all cohorts used by ResistanceMap, satisfying the Tier A `eval_bias_fairness_shift`
requirement. Every cohort has selection bias; the goal is to make it explicit so
downstream metrics can be interpreted correctly.

---

## Cohort-Level Bias Assessments

### 1. CCLE Cell Lines (Proteomics + Epigenomics)

**Source**: Cancer Cell Line Encyclopedia / DepMap (Broad Institute)

**Known biases**:
- Cell lines disproportionately derive from tumors of European-ancestry patients.
  Estimated >70% European origin based on SNP-inferred ancestry of parental tumors.
- Hematologic malignancy lines are underrepresented relative to solid tumors (~8%
  of total CCLE). Multiple myeloma lines specifically number ~20-30.
- Cell-line establishment success rate is higher for aggressive/proliferative tumors,
  creating survivorship bias toward high-risk biology.
- In vitro culture eliminates microenvironment, immune, and pharmacokinetic
  contributors to resistance, biasing toward cell-autonomous mechanisms.

**Mitigation**: Domain adaptation module (`models/domain_adaptation.py`) is designed
to bridge cell-line → patient predictions. Ancestry bias is not correctable from
cell lines alone; patient-level subgroup analysis (MMRF) is required.

### 2. GDSC Drug Sensitivity Screens

**Source**: Genomics of Drug Sensitivity in Cancer (Sanger/MGH)

**Known biases**:
- Screens the same CCLE-overlapping cell lines; inherits ancestry skew above.
- IC50 values are measured at 72 hours under standard culture conditions. Slow-
  growing myeloma lines may not reach equilibrium, inflating apparent sensitivity.
- Drug concentrations are pre-set; some MM-relevant drugs (e.g., Daratumumab) are
  absent because antibody-based therapies cannot be screened in monoculture.
- GDSC v2 uses a different fitting algorithm than v1; ResistanceMap uses v2 only.

**Mitigation**: MAD-based thresholding (see `resistance_label_definition.md`) is
more robust than fixed-cutoff binarization to batch effects between GDSC versions.

### 3. MMRF CoMMpass (Clinical Outcomes)

**Source**: Multiple Myeloma Research Foundation / GDC Portal

**Known biases**:
- Enrollment was restricted to newly diagnosed MM (NDMM) patients from 2011–2017
  at U.S. and Canadian academic medical centers. This excludes:
  - Relapsed/refractory patients at enrollment
  - Community oncology patients (lower SES, less access)
  - Non-North-American populations
- Self-reported ancestry distribution (approximate):
  - White/European: ~80%
  - Black/African American: ~12%
  - Hispanic/Latino: ~4%
  - Asian: ~2%
  - Other/not reported: ~2%
- Black patients are underrepresented relative to U.S. MM incidence (Black patients
  have ~2x higher MM incidence than White patients but are ~12% of CoMMpass).
- SES proxies (insurance type, zip code) are partially available but not uniformly
  coded across all enrollment sites.

**Mitigation**: Per-subgroup metrics (Tier C requirement) must be reported for at
minimum: ancestry (White vs Black vs other), cytogenetic risk, ISS stage, age
stratum, and sex. The model MUST NOT be used to make clinical claims about
populations not represented in CoMMpass without external validation.

### 4. scRNA-seq Cohorts

**GSE124310** (27,796 MM bone marrow cells):
- Single-center study; ancestry not annotated in GEO metadata.
- Enriched for CD138+ plasma cells; non-malignant compartment underrepresented.

**GSE271107** (143,748 cells across HD→MGUS→SMM→MM):
- Disease-stage progression cohort; not a treatment-response cohort.
- Using progression stage as a resistance proxy is a modeling assumption, not a
  measured label. This must be flagged in all predictions derived from this data.

### 5. STRING PPI Network (v12)

**Known biases**:
- Literature-derived edges are biased toward well-studied proteins (kinases,
  oncogenes). Poorly studied proteins appear disconnected even if biologically
  interacting.
- Experimental edges (co-expression, co-occurrence) partially offset this but
  introduce organism-transfer noise (non-human interactions mapped to human).
- Confidence score cutoff of 0.7 retains ~460k edges from ~7,800 MM-relevant
  proteins. This discards many true interactions at lower confidence.

---

## SES Proxy Availability

| Cohort | SES Proxy Available | Notes |
|--------|-------------------|-------|
| CCLE / GDSC | No | Cell lines have no patient-level SES |
| MMRF CoMMpass | Partial | Insurance type available for ~60% of patients; zip code available but not geocoded |
| scRNA-seq | No | GEO metadata does not include SES |

**Handling**: SES is declared absent for cell-line cohorts. For MMRF, insurance
type will be included as a covariate in subgroup analyses where available. The
model does NOT adjust for SES in the current version; this is an explicit
limitation.

---

## Summary of Actionable Risks

| Risk | Severity | Affected Population | Mitigation |
|------|----------|-------------------|------------|
| Ancestry underrepresentation | High | Black/African American patients | Report per-ancestry ECE; flag if calibration degrades >5% |
| Cell-line survivorship bias | Medium | All patients (indirect) | Domain adaptation + patient-level validation |
| NDMM-only enrollment | Medium | RRMM patients | External validation on RRMM cohort before any RRMM claims |
| Missing SES adjustment | Medium | Low-SES patients | Acknowledge limitation; do not claim equity without data |
| scRNA-seq ancestry unknown | Low | Unknown | Cannot stratify single-cell predictions by ancestry |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-04-15 | Initial selection-bias memo authored per Tier A eval requirement |
