// Redesigned Agentic Execution DAG.
// Improvements over the original:
//   - 9 layers (was 7): adds Data Prep, ProteinNet split, Landscape, Validation
//   - Explicit parallel grouping with background bands (VAE || ESM-2, Trajectory || ProteinNet)
//   - Runtime annotations per stage (from the real config logs)
//   - Verification lane on the right shows hash-chain flow, not just a text list
//   - Color palette uses the existing design tokens (--accent teal, --accent-2 sand, --accent-3 rust)

const DiagramPipelineV2 = () => (
  <svg viewBox="0 0 1100 640" role="img" aria-label="ResistanceMap agentic execution DAG">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f4efe5" />
        <stop offset="100%" stopColor="#e6f1ee" />
      </linearGradient>
      <linearGradient id="parallelBand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(197,138,43,0.08)" />
        <stop offset="100%" stopColor="rgba(197,138,43,0.03)" />
      </linearGradient>
      <linearGradient id="seqNode" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f5faf8" />
      </linearGradient>
      <linearGradient id="parNode" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fbf3e3" />
      </linearGradient>
      <linearGradient id="finalNode" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#fbeee8" />
      </linearGradient>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#2c6e6a" />
      </marker>
      <marker id="arrowSand" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#c58a2b" />
      </marker>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="1100" height="640" fill="url(#bgGrad)" rx="20" />

    {/* Title + subtitle */}
    <text x="40" y="48" fontFamily="Fraunces, serif" fontSize="24" fontWeight="600" fill="#1c2628">
      Agentic Execution DAG
    </text>
    <text x="40" y="72" fontFamily="IBM Plex Sans, sans-serif" fontSize="13" fill="#5a6b70">
      10 agents · parallel scheduling · SHA256 hash chain verification · 1.33–4× wall-clock speedup
    </text>

    {/* Layer column rail */}
    <g fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#5a6b70" letterSpacing="0.1em">
      <text x="40" y="118">LAYER 0</text>
      <text x="40" y="178">LAYER 1</text>
      <text x="40" y="238">LAYER 2 · PARALLEL</text>
      <text x="40" y="318">LAYER 3</text>
      <text x="40" y="378">LAYER 4 · PARALLEL</text>
      <text x="40" y="458">LAYER 5</text>
      <text x="40" y="508">LAYER 6</text>
      <text x="40" y="558">LAYER 7</text>
      <text x="40" y="608">LAYER 8</text>
    </g>

    {/* Parallel bands for L2 and L4 */}
    <rect x="160" y="210" width="680" height="80" rx="12" fill="url(#parallelBand)" stroke="rgba(197,138,43,0.25)" strokeDasharray="3 4" />
    <text x="830" y="228" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#8b5a12" textAnchor="end" letterSpacing="0.08em">
      PARALLEL
    </text>

    <rect x="160" y="350" width="680" height="80" rx="12" fill="url(#parallelBand)" stroke="rgba(197,138,43,0.25)" strokeDasharray="3 4" />
    <text x="830" y="368" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#8b5a12" textAnchor="end" letterSpacing="0.08em">
      PARALLEL
    </text>

    {/* ---------- Nodes ---------- */}
    <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
      {/* L0 Data Validation */}
      <g>
        <rect x="180" y="100" width="280" height="42" rx="10" fill="url(#seqNode)" stroke="#2c6e6a" />
        <text x="196" y="124" fontSize="13" fontWeight="600">Data Validation</text>
        <text x="196" y="137" fontSize="10" fill="#5a6b70">Schema + file integrity · instant</text>
      </g>

      {/* L1 Data Prep */}
      <g>
        <rect x="180" y="160" width="280" height="42" rx="10" fill="url(#seqNode)" stroke="#2c6e6a" />
        <text x="196" y="184" fontSize="13" fontWeight="600">Data Prep</text>
        <text x="196" y="197" fontSize="10" fill="#5a6b70">Harmonize omics + scRNA · 1.2 min</text>
      </g>

      {/* L2 VAE Pretrain (parallel) */}
      <g>
        <rect x="180" y="240" width="320" height="42" rx="10" fill="url(#parNode)" stroke="#c58a2b" />
        <text x="196" y="264" fontSize="13" fontWeight="600">VAE Pretrain</text>
        <text x="196" y="277" fontSize="10" fill="#5a6b70">200 epochs · pan-cancer CCLE · 1.9 min</text>
      </g>

      {/* L2 ESM-2 Embed (parallel) */}
      <g>
        <rect x="520" y="240" width="320" height="42" rx="10" fill="url(#parNode)" stroke="#c58a2b" />
        <text x="536" y="264" fontSize="13" fontWeight="600">ESM-2 Embed</text>
        <text x="536" y="277" fontSize="10" fill="#5a6b70">esm2_t33_650M_UR50D · 1280-D per protein</text>
      </g>

      {/* L3 VAE Finetune */}
      <g>
        <rect x="180" y="300" width="280" height="42" rx="10" fill="url(#seqNode)" stroke="#2c6e6a" />
        <text x="196" y="324" fontSize="13" fontWeight="600">VAE Finetune</text>
        <text x="196" y="337" fontSize="10" fill="#5a6b70">100 epochs · hematologic · 0.3 min</text>
      </g>

      {/* L4 Trajectory (parallel) */}
      <g>
        <rect x="180" y="380" width="320" height="42" rx="10" fill="url(#parNode)" stroke="#c58a2b" />
        <text x="196" y="404" fontSize="13" fontWeight="600">Trajectory (Neural ODE)</text>
        <text x="196" y="417" fontSize="10" fill="#5a6b70">Dopri5 · 3/6/12 month horizons · 4.5 min</text>
      </g>

      {/* L4 ProteinNet (parallel) */}
      <g>
        <rect x="520" y="380" width="320" height="42" rx="10" fill="url(#parNode)" stroke="#c58a2b" />
        <text x="536" y="404" fontSize="13" fontWeight="600">ProteinNet GNN</text>
        <text x="536" y="417" fontSize="10" fill="#5a6b70">4-layer GAT · 8 heads · STRING v12 · 7.9 min</text>
      </g>

      {/* L5 Fusion */}
      <g>
        <rect x="180" y="440" width="660" height="42" rx="10" fill="url(#seqNode)" stroke="#2c6e6a" />
        <text x="196" y="464" fontSize="13" fontWeight="600">Cross-Attention Fusion</text>
        <text x="196" y="477" fontSize="10" fill="#5a6b70">4 modalities × 4 heads · unified 256-D · 5.5 min</text>
      </g>

      {/* L6 Landscape */}
      <g>
        <rect x="180" y="490" width="660" height="42" rx="10" fill="url(#finalNode)" stroke="#a4492f" />
        <text x="196" y="514" fontSize="13" fontWeight="600">Resistance Landscape</text>
        <text x="196" y="527" fontSize="10" fill="#5a6b70">Drug risk · state · top 20 targets · evidential UQ</text>
      </g>

      {/* L7 Validation */}
      <g>
        <rect x="180" y="540" width="660" height="42" rx="10" fill="url(#finalNode)" stroke="#a4492f" />
        <text x="196" y="564" fontSize="13" fontWeight="600">Validation</text>
        <text x="196" y="577" fontSize="10" fill="#5a6b70">Held-out test · SOTA benchmarks · tier audits</text>
      </g>

      {/* L8 Serve */}
      <g>
        <rect x="180" y="590" width="660" height="36" rx="10" fill="#ffffff" stroke="#2c6e6a" strokeDasharray="5 3" />
        <text x="196" y="612" fontSize="12" fontWeight="500">Serve · FastAPI /predict · /predict/trajectory · /targets/&#123;id&#125;</text>
      </g>
    </g>

    {/* ---------- Edges ---------- */}
    <g stroke="#2c6e6a" strokeWidth="1.75" fill="none" markerEnd="url(#arrow)">
      <path d="M 320 142 L 320 160" />
      <path d="M 320 202 L 320 240" />
      {/* L1 fork to L2 pair */}
      <path d="M 320 202 Q 320 215 340 222 L 500 222 L 680 222 Q 690 222 690 240" strokeDasharray="0" />
      <path d="M 340 282 L 320 300" />
      <path d="M 680 282 Q 690 295 690 300 L 340 300" strokeDasharray="3 3" />
      <path d="M 320 342 L 320 380" />
      <path d="M 320 342 Q 320 355 340 362 L 680 362 Q 690 362 690 380" />
      <path d="M 340 422 L 400 440" />
      <path d="M 680 422 L 600 440" />
      <path d="M 510 482 L 510 490" />
      <path d="M 510 532 L 510 540" />
      <path d="M 510 582 L 510 590" />
    </g>

    {/* ---------- Verification lane ---------- */}
    <g>
      <rect x="880" y="100" width="200" height="480" rx="16" fill="#ffffff" stroke="#d7cbb5" />
      <text x="896" y="130" fontFamily="Fraunces, serif" fontSize="16" fontWeight="600" fill="#1c2628">
        Zero-Trust
      </text>
      <text x="896" y="148" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#5a6b70">
        Verification at each boundary
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#1c2628">
        <g transform="translate(896, 180)">
          <circle cx="6" cy="0" r="5" fill="#2c6e6a" />
          <text x="20" y="4">SHA256 hash chain</text>
        </g>
        <g transform="translate(896, 215)">
          <circle cx="6" cy="0" r="5" fill="#2c6e6a" />
          <text x="20" y="4">KS distribution tests</text>
        </g>
        <g transform="translate(896, 250)">
          <circle cx="6" cy="0" r="5" fill="#2c6e6a" />
          <text x="20" y="4">8 biological guardrails</text>
        </g>
        <g transform="translate(896, 285)">
          <circle cx="6" cy="0" r="5" fill="#c58a2b" />
          <text x="20" y="4">AgentOps telemetry</text>
        </g>
        <g transform="translate(896, 320)">
          <circle cx="6" cy="0" r="5" fill="#c58a2b" />
          <text x="20" y="4">Duration · latency · cost</text>
        </g>
      </g>

      <line x1="896" y1="355" x2="1064" y2="355" stroke="#efe4d0" />

      <text x="896" y="380" fontFamily="Fraunces, serif" fontSize="14" fontWeight="600" fill="#1c2628">
        First-Principles
      </text>
      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#1c2628">
        <text x="896" y="405">Fano\u2019s inequality</text>
        <text x="896" y="426" fontSize="9" fill="#5a6b70">bounds best achievable error</text>
        <text x="896" y="450">Lyapunov stability</text>
        <text x="896" y="471" fontSize="9" fill="#5a6b70">basin depth of resistance states</text>
        <text x="896" y="495">Kramers escape rate</text>
        <text x="896" y="516" fontSize="9" fill="#5a6b70">transition probability bounds</text>
      </g>

      <line x1="896" y1="535" x2="1064" y2="535" stroke="#efe4d0" />
      <text x="896" y="558" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#5a6b70">
        Pipeline total: 21.3 min
      </text>
      <text x="896" y="573" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#5a6b70">
        (10 agents · single H100)
      </text>
    </g>

    {/* Dotted connector from last model stage into verification lane */}
    <line x1="840" y1="460" x2="880" y2="340" stroke="#c58a2b" strokeWidth="1.25" strokeDasharray="2 3" />
  </svg>
);

export default DiagramPipelineV2;
