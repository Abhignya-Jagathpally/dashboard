import DiagramPipelineV2 from '../components/DiagramPipelineV2.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import {
  purpose,
  background,
  differentiators,
  modelComponents,
  methodology,
  datasets,
  results,
  ablations,
  baselines,
  limitations,
  takeaways,
  references,
} from '../data/science.js';

const Cite = ({ ids }) => (
  <sup className="cite">
    [
    {ids
      .map((id, i) => {
        const idx = references.findIndex((r) => r.id === id) + 1;
        return (
          <a key={id} href={`#ref-${id}`}>
            {idx}
            {i < ids.length - 1 ? ',' : ''}
          </a>
        );
      })}
    ]
  </sup>
);

const Science = () => (
  <article className="science">
    {/* ---- Header ---- */}
    <header className="science-hero">
      <span className="pill">Methodology · Whitepaper</span>
      <h2>ResistanceMap: explainable drug-resistance forecasting in hematologic malignancies</h2>
      <p className="lede">
        A multi-modal, agentic pipeline that fuses proteomics, epigenomics, single-cell
        transcriptomics, protein-protein interaction networks, and clinical outcomes to forecast
        resistance with mechanistic evidence and calibrated uncertainty.
      </p>
      <div className="science-toc" aria-label="Contents">
        <a href="#purpose" onClick={(e) => { e.preventDefault(); document.getElementById('purpose')?.scrollIntoView({ behavior: 'smooth' }); }}>Purpose</a>
        <a href="#background" onClick={(e) => { e.preventDefault(); document.getElementById('background')?.scrollIntoView({ behavior: 'smooth' }); }}>Background</a>
        <a href="#contributions" onClick={(e) => { e.preventDefault(); document.getElementById('contributions')?.scrollIntoView({ behavior: 'smooth' }); }}>Contributions</a>
        <a href="#pipeline" onClick={(e) => { e.preventDefault(); document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' }); }}>Pipeline</a>
        <a href="#components" onClick={(e) => { e.preventDefault(); document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' }); }}>Model components</a>
        <a href="#data" onClick={(e) => { e.preventDefault(); document.getElementById('data')?.scrollIntoView({ behavior: 'smooth' }); }}>Data</a>
        <a href="#results" onClick={(e) => { e.preventDefault(); document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }); }}>Results</a>
        <a href="#ablations" onClick={(e) => { e.preventDefault(); document.getElementById('ablations')?.scrollIntoView({ behavior: 'smooth' }); }}>Ablations</a>
        <a href="#limitations" onClick={(e) => { e.preventDefault(); document.getElementById('limitations')?.scrollIntoView({ behavior: 'smooth' }); }}>Limitations</a>
        <a href="#takeaways" onClick={(e) => { e.preventDefault(); document.getElementById('takeaways')?.scrollIntoView({ behavior: 'smooth' }); }}>Takeaways</a>
        <a href="#references" onClick={(e) => { e.preventDefault(); document.getElementById('references')?.scrollIntoView({ behavior: 'smooth' }); }}>References</a>
      </div>
    </header>

    {/* ---- Purpose ---- */}
    <section id="purpose" className="sci-section">
      <SectionHeader title="Purpose" />
      <div className="sci-col">
        <p>{purpose.problem}</p>
        <p>
          <strong>Goal.</strong> {purpose.goal}
        </p>
        <ul className="bulleted bulleted--strong">
          {purpose.clinicalStakes.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>

    {/* ---- Background ---- */}
    <section id="background" className="sci-section">
      <SectionHeader
        title="Background & supporting literature"
        subtitle="Situating ResistanceMap within the landscape of pharmacogenomic ML, protein language models, neural dynamical systems, and agentic pipeline design."
      />
      <div className="card-grid">
        {background.map((b) => (
          <div className="card" key={b.id}>
            <h4>{b.heading}</h4>
            <p>
              {b.body}
              {b.citations.length > 0 && <Cite ids={b.citations} />}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* ---- Contributions ---- */}
    <section id="contributions" className="sci-section">
      <SectionHeader
        title="Contributions"
        subtitle="Five architectural and methodological design choices that collectively distinguish ResistanceMap from prior pharmacogenomic prediction systems."
      />
      <div className="card-grid">
        {differentiators.map((d) => (
          <div className="card" key={d.id}>
            <h4>{d.title}</h4>
            <p>{d.body}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ---- Pipeline ---- */}
    <section id="pipeline" className="sci-section">
      <SectionHeader
        title="Pipeline overview"
        subtitle="The agentic execution DAG orchestrates specialized agents with parallel scheduling and cryptographic verification at every boundary."
      />
      <div className="diagram reveal">
        <DiagramPipelineV2 />
      </div>
    </section>

    {/* ---- Model components ---- */}
    <section id="components" className="sci-section">
      <SectionHeader
        title="Model components"
        subtitle="Each learnable module is documented with its architecture, governing equations, and output contract."
      />

      {/* Data preparation and training methodology, integrated into components */}
      <div className="grid-two" style={{ marginBottom: 24 }}>
        <div className="card">
          <span className="pill">Data preparation</span>
          <p>
            <strong>Splits.</strong> {methodology.data.splits}
          </p>
          <ul className="bulleted">
            {methodology.data.preprocessing.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <span className="pill">Training</span>
          <dl className="training-dl">
            <dt>VAE</dt>
            <dd>Pan-cancer pretraining on CCLE, hematologic fine-tuning, AdamW with cosine decay and {'\u03B2'}-annealing.</dd>
            <dt>Trajectory (ODE)</dt>
            <dd>Per-drug fitting via Dopri5 adaptive-step solver with clinical calendar-time calibration from paired cross-sectional and longitudinal samples.</dd>
            <dt>ProteinNet GNN</dt>
            <dd>3-layer GAT with 4 attention heads on the 7,853-protein MM subnet; mini-batch sampling with DropEdge regularization.</dd>
            <dt>Fusion</dt>
            <dd>Cross-attention training with modality dropout for missingness robustness.</dd>
            <dt>Landscape</dt>
            <dd>MLP head trained jointly with fusion; evidential loss when the uncertainty quantification head is enabled.</dd>
          </dl>
        </div>
      </div>

      <div className="components-list">
        {modelComponents.map((c) => (
          <div className="component" key={c.id}>
            <div className="component-head">
              <span className="component-layer">{c.layer}</span>
              <div>
                <h3>{c.title}</h3>
              </div>
            </div>
            <p>
              <strong>Purpose.</strong> {c.purpose}
            </p>
            <div className="component-grid">
              <div>
                <strong>Architecture</strong>
                <ul className="bulleted">
                  {c.architecture.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Output</strong>
                <p className="meta">{c.output}</p>
                {c.math && (
                  <>
                    <strong>Governing equation</strong>
                    <pre className="math">{c.math}</pre>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ---- Data ---- */}
    <section id="data" className="sci-section">
      <SectionHeader
        title="Data sources"
        subtitle="Every dataset used for pretraining, finetuning, validation, or labels. Sizes, sample counts, and role."
      />
      <div className="sci-table-wrap">
        <table className="sci-table">
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Samples</th>
              <th>Features / scale</th>
              <th>Size</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr key={d.id}>
                <td><strong>{d.name}</strong></td>
                <td>{d.samples}</td>
                <td>{d.features}</td>
                <td>{d.size}</td>
                <td>{d.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* ---- Results ---- */}
    <section id="results" className="sci-section">
      <SectionHeader
        title="Results"
        subtitle={`Stage-wise performance on the held-out test set (n=${results.testN}).`}
      />
      <div className="sci-table-wrap">
        <table className="sci-table">
          <thead>
            <tr>
              <th>Metric</th>
              {results.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.rows.map((r) => (
              <tr key={r.metric}>
                <td><strong>{r.metric}</strong></td>
                {r.values.map((v, i) => {
                  const isBest =
                    v !== null &&
                    Math.max(...r.values.filter((x) => x !== null)) === v &&
                    r.metric.startsWith('AUROC')
                      ? true
                      : v !== null &&
                        Math.min(...r.values.filter((x) => x !== null)) === v &&
                        r.metric.startsWith('MAE')
                        ? true
                        : r.metric.includes('recall') &&
                          v !== null &&
                          Math.max(...r.values.filter((x) => x !== null)) === v;
                  return (
                    <td key={i} className={isBest ? 'cell-best' : ''}>
                      {v === null ? '—' : v.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 style={{ marginTop: 32 }}>Baselines</h4>
      <div className="sci-table-wrap">
        <table className="sci-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>AUROC</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {baselines.map((b) => (
              <tr key={b.id} className={b.id === 'rmap' ? 'row-highlight' : ''}>
                <td><strong>{b.name}</strong></td>
                <td>{b.auroc.toFixed(2)}</td>
                <td>{b.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    {/* ---- Ablations ---- */}
    <section id="ablations" className="sci-section">
      <SectionHeader
        title="Ablation studies"
        subtitle="Per-design-choice tests that verify each component is load-bearing."
      />
      <div className="components-list">
        {ablations.map((a) => (
          <div className="ablation" key={a.id}>
            <h4>{a.title}</h4>
            <p>{a.result}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ---- Limitations ---- */}
    <section id="limitations" className="sci-section">
      <SectionHeader
        title="Limitations"
        subtitle="Honest constraints on what the current system can and cannot claim."
      />
      <div className="card-grid">
        {limitations.map((l) => (
          <div className="card" key={l.id}>
            <h4>{l.title}</h4>
            <p>{l.body}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ---- Takeaways ---- */}
    <section id="takeaways" className="sci-section">
      <SectionHeader title="Takeaways" />
      <ol className="takeaways">
        {takeaways.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>
    </section>

    {/* ---- References ---- */}
    <section id="references" className="sci-section">
      <SectionHeader
        title="References"
        subtitle="Source papers for methods, datasets, and baselines."
      />
      <ol className="references">
        {references.map((r) => (
          <li key={r.id} id={`ref-${r.id}`}>
            {r.authors} ({r.year}).{' '}
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.title}
            </a>
            . <em>{r.venue}</em>.
          </li>
        ))}
      </ol>
    </section>
  </article>
);

export default Science;
