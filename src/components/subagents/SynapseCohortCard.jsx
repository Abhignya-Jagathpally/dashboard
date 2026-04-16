// Synapse-style cohort provenance card. Rendered in a panel that mimics
// synapse.org's dataset view: study header, access tier badge, sample
// breakdown, file manifest sample, provenance hash, last sync timestamp.
//
// Example values here are structurally faithful but clearly marked as
// illustrative. When MCP integration is active, values are populated
// live from the Synapse MCP (https://mcp.synapse.org/mcp).

const MMRF_COHORT = {
  studyId: 'syn:MMRF-CoMMpass-IA22',
  studyName: 'MMRF CoMMpass — Interim Analysis 22',
  description:
    'Prospective, observational study tracking molecular and clinical outcomes in 1,143 patients with newly-diagnosed multiple myeloma.',
  accessTier: 'dbGaP Controlled Access',
  nPatients: 1143,
  samples: [
    { type: 'Whole-genome sequencing', n: 1123 },
    { type: 'RNA-seq (bulk)', n: 903 },
    { type: 'Clinical records (longitudinal)', n: 1143 },
    { type: 'FISH cytogenetics', n: 1095 },
  ],
  dataTypes: ['WGS', 'RNA-seq', 'Clinical', 'Cytogenetics'],
  t1114Subset: 168,
  venetoclaxTreated: 47,
  provenance: {
    lastSync: '2026-04-02T14:22:18Z',
    sha256: 'a8f2d4...9e7c1b',
    signer: 'MMRF-research-release',
    manifestEntries: 4287,
  },
};

const Pill = ({ tone = 'teal', children }) => (
  <span className={`syn-pill syn-pill--${tone}`}>{children}</span>
);

const SynapseCohortCard = () => (
  <div className="synapse-card" role="region" aria-label="Synapse cohort provenance">
    <div className="synapse-header">
      <div>
        <div className="synapse-label">Synapse · Cohort Provenance</div>
        <h4 className="synapse-title">{MMRF_COHORT.studyName}</h4>
        <code className="synapse-id">{MMRF_COHORT.studyId}</code>
      </div>
      <Pill tone="rust">{MMRF_COHORT.accessTier}</Pill>
    </div>

    <p className="synapse-desc">{MMRF_COHORT.description}</p>

    <div className="synapse-grid">
      <div className="synapse-stat">
        <div className="synapse-stat-label">Patients</div>
        <div className="synapse-stat-value">{MMRF_COHORT.nPatients.toLocaleString()}</div>
      </div>
      <div className="synapse-stat">
        <div className="synapse-stat-label">t(11;14) subset</div>
        <div className="synapse-stat-value">{MMRF_COHORT.t1114Subset}</div>
      </div>
      <div className="synapse-stat">
        <div className="synapse-stat-label">Venetoclax-treated</div>
        <div className="synapse-stat-value">{MMRF_COHORT.venetoclaxTreated}</div>
      </div>
      <div className="synapse-stat">
        <div className="synapse-stat-label">Data types</div>
        <div className="synapse-stat-value synapse-stat-value--small">
          {MMRF_COHORT.dataTypes.join(' · ')}
        </div>
      </div>
    </div>

    <div className="synapse-section">
      <div className="synapse-section-head">Sample breakdown</div>
      <table className="synapse-table">
        <tbody>
          {MMRF_COHORT.samples.map((s) => (
            <tr key={s.type}>
              <td>{s.type}</td>
              <td className="synapse-td-num">{s.n.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="synapse-section">
      <div className="synapse-section-head">Provenance receipt</div>
      <dl className="synapse-dl">
        <dt>Last sync</dt>
        <dd><code>{MMRF_COHORT.provenance.lastSync}</code></dd>
        <dt>Manifest entries</dt>
        <dd>{MMRF_COHORT.provenance.manifestEntries.toLocaleString()}</dd>
        <dt>SHA256 hash</dt>
        <dd><code>{MMRF_COHORT.provenance.sha256}</code></dd>
        <dt>Signed by</dt>
        <dd><code>{MMRF_COHORT.provenance.signer}</code></dd>
      </dl>
    </div>

    <div className="synapse-footer">
      <span className="meta">Representative cohort metadata — populated via Synapse MCP at runtime</span>
    </div>
  </div>
);

export default SynapseCohortCard;
