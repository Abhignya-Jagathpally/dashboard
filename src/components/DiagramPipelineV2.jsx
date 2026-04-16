// Agentic Execution DAG — PhD-quality SVG diagram
// Sequential layers with parallel VAE || ESM-2 at Layer 2 only
// Scientific color palette, gradient fills, annotation callouts

const DiagramPipelineV2 = () => (
  <svg viewBox="0 0 1100 700" role="img" aria-label="ResistanceMap agentic execution DAG showing 10 sequential layers with parallel VAE and ESM-2 embedding at layer 2">
    <defs>
      <linearGradient id="v2BgGrad" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#f4f0e8" />
        <stop offset="50%" stopColor="#edf5f3" />
        <stop offset="100%" stopColor="#f0ece3" />
      </linearGradient>
      <linearGradient id="v2ParBand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(197,138,43,0.10)" />
        <stop offset="100%" stopColor="rgba(197,138,43,0.03)" />
      </linearGradient>
      <linearGradient id="v2NodeTeal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#edf7f5" />
      </linearGradient>
      <linearGradient id="v2NodeGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffdf8" />
        <stop offset="100%" stopColor="#faf3e3" />
      </linearGradient>
      <linearGradient id="v2NodeCoral" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbf9" />
        <stop offset="100%" stopColor="#faf0eb" />
      </linearGradient>
      <linearGradient id="v2VerifGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fefefe" />
        <stop offset="100%" stopColor="#f5f8f7" />
      </linearGradient>
      <linearGradient id="v2VerifAccent" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2c6e6a" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#2c6e6a" stopOpacity="0.03" />
      </linearGradient>
      <marker id="v2Arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#2c6e6a" />
      </marker>
      <marker id="v2ArrowGold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#c58a2b" />
      </marker>
      <marker id="v2ArrowCoral" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#a4492f" />
      </marker>
      <marker id="v2ArrowMuted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#5a6b70" opacity="0.5" />
      </marker>
      <filter id="v2Shadow" x="-4%" y="-4%" width="108%" height="112%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1c2628" floodOpacity="0.06" />
      </filter>
      <filter id="v2ShadowSm" x="-2%" y="-6%" width="104%" height="116%">
        <feDropShadow dx="0" dy="0.5" stdDeviation="1" floodColor="#1c2628" floodOpacity="0.05" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="1100" height="700" fill="url(#v2BgGrad)" rx="18" />

    {/* Subtle grid lines */}
    <g stroke="#c8d4d2" strokeWidth="0.3" opacity="0.4">
      {[140, 195, 275, 335, 390, 445, 500, 555, 605, 655].map((y, i) => (
        <line key={i} x1="130" y1={y} x2="830" y2={y} strokeDasharray="1 6" />
      ))}
    </g>

    {/* Title block */}
    <text x="40" y="46" fontFamily="Fraunces, serif" fontSize="23" fontWeight="600" fill="#1c2628" letterSpacing="-0.3px">
      Agentic Execution DAG
    </text>
    <text x="40" y="68" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#5a6b70">
      10 agents  |  parallel scheduling (Layer 2 only)  |  SHA-256 hash-chain verification
    </text>
    <line x1="40" y1="80" x2="830" y2="80" stroke="#2c6e6a" strokeWidth="0.5" opacity="0.3" />

    {/* Layer labels — left rail */}
    <g fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" letterSpacing="0.12em" textAnchor="end">
      <text x="125" y="118">LAYER 0</text>
      <text x="125" y="173">LAYER 1</text>
      <text x="125" y="253">LAYER 2</text>
      <text x="125" y="313">LAYER 3</text>
      <text x="125" y="368">LAYER 4</text>
      <text x="125" y="423">LAYER 5</text>
      <text x="125" y="478">LAYER 6</text>
      <text x="125" y="533">LAYER 7</text>
      <text x="125" y="583">LAYER 8</text>
      <text x="125" y="638">LAYER 9</text>
    </g>

    {/* Parallel band for Layer 2 */}
    <rect x="135" y="224" width="700" height="64" rx="10" fill="url(#v2ParBand)" stroke="#c58a2b" strokeWidth="0.7" strokeDasharray="4 4" opacity="0.9" />
    <text x="824" y="240" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#8b5a12" textAnchor="end" letterSpacing="0.15em" fontWeight="500">
      PARALLEL
    </text>
    <text x="824" y="251" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#8b5a12" textAnchor="end" opacity="0.7">
      concurrent execution
    </text>

    {/* ========== NODES ========== */}
    <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">

      {/* L0 — Data Validation */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="97" width="290" height="44" rx="8" fill="url(#v2NodeTeal)" stroke="#2c6e6a" strokeWidth="1.2" />
        <text x="172" y="116" fontSize="12" fontWeight="600">
          <tspan fill="#2c6e6a" fontSize="11">{'{'}</tspan> Data Validation
        </text>
        <text x="172" y="131" fontSize="9.5" fill="#5a6b70">Schema integrity  |  file-format guards  |  SHA-256 seal</text>
        <circle cx="154" cy="118" r="7" fill="#2c6e6a" opacity="0.12" />
        <text x="154" y="121" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">V</text>
      </g>

      {/* L1 — Data Prep */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="152" width="290" height="44" rx="8" fill="url(#v2NodeTeal)" stroke="#2c6e6a" strokeWidth="1.2" />
        <text x="172" y="171" fontSize="12" fontWeight="600">
          <tspan fill="#2c6e6a" fontSize="11">{'{'}</tspan> Data Preparation
        </text>
        <text x="172" y="186" fontSize="9.5" fill="#5a6b70">Harmonize multi-omics  |  scRNA normalization</text>
        <circle cx="154" cy="173" r="7" fill="#2c6e6a" opacity="0.12" />
        <text x="154" y="176" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">P</text>
      </g>

      {/* L2a — VAE Pretrain (parallel left) */}
      <g filter="url(#v2ShadowSm)">
        <rect x="150" y="234" width="320" height="46" rx="8" fill="url(#v2NodeGold)" stroke="#c58a2b" strokeWidth="1.2" />
        <text x="182" y="254" fontSize="12" fontWeight="600">
          <tspan fill="#c58a2b" fontSize="11">{'{'}</tspan> VAE Pretrain
        </text>
        <text x="182" y="269" fontSize="9.5" fill="#5a6b70">Pan-cancer conditional VAE  |  CCLE pan-lineage  |  64-D latent</text>
        <circle cx="164" cy="256" r="7" fill="#c58a2b" opacity="0.12" />
        <text x="164" y="259" fontSize="7" fill="#c58a2b" textAnchor="middle" fontWeight="700">E</text>
      </g>

      {/* L2b — ESM-2 Embed (parallel right) */}
      <g filter="url(#v2ShadowSm)">
        <rect x="500" y="234" width="320" height="46" rx="8" fill="url(#v2NodeGold)" stroke="#c58a2b" strokeWidth="1.2" />
        <text x="532" y="254" fontSize="12" fontWeight="600">
          <tspan fill="#c58a2b" fontSize="11">{'{'}</tspan> ESM-2 Embed
        </text>
        <text x="532" y="269" fontSize="9.5" fill="#5a6b70">esm2_t33_650M_UR50D  |  1280-D per protein</text>
        <circle cx="514" cy="256" r="7" fill="#c58a2b" opacity="0.12" />
        <text x="514" y="259" fontSize="7" fill="#c58a2b" textAnchor="middle" fontWeight="700">S</text>
      </g>

      {/* L3 — VAE Finetune */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="296" width="690" height="38" rx="8" fill="url(#v2NodeTeal)" stroke="#2c6e6a" strokeWidth="1.2" />
        <text x="172" y="314" fontSize="12" fontWeight="600">
          <tspan fill="#2c6e6a" fontSize="11">{'{'}</tspan> VAE Finetune
        </text>
        <text x="320" y="314" fontSize="9.5" fill="#5a6b70">Hematologic-specific fine-tuning  |  disease-conditional decoder  |  64-D latent</text>
        <circle cx="154" cy="314" r="7" fill="#2c6e6a" opacity="0.12" />
        <text x="154" y="317" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">F</text>
      </g>

      {/* L4 — Trajectory (SEQUENTIAL, full width) */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="348" width="690" height="42" rx="8" fill="url(#v2NodeTeal)" stroke="#2c6e6a" strokeWidth="1.2" />
        <text x="172" y="368" fontSize="12" fontWeight="600">
          <tspan fill="#2c6e6a" fontSize="11">{'{'}</tspan> Trajectory (Neural ODE)
        </text>
        <text x="370" y="368" fontSize="9.5" fill="#5a6b70">dopri5 adaptive solver  |  calibration + forecast  |  3/6/12 month horizons</text>
        <circle cx="154" cy="368" r="7" fill="#2c6e6a" opacity="0.12" />
        <text x="154" y="371" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">T</text>
      </g>

      {/* L5 — ProteinNet GNN (SEQUENTIAL, depends on L4) */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="403" width="690" height="42" rx="8" fill="url(#v2NodeTeal)" stroke="#2c6e6a" strokeWidth="1.2" />
        <text x="172" y="423" fontSize="12" fontWeight="600">
          <tspan fill="#2c6e6a" fontSize="11">{'{'}</tspan> ProteinNet GNN
        </text>
        <text x="332" y="423" fontSize="9.5" fill="#5a6b70">3-layer GAT  |  4 attention heads  |  256 hidden  |  STRING v12 + ESM-2 + trajectory</text>
        <circle cx="154" cy="423" r="7" fill="#2c6e6a" opacity="0.12" />
        <text x="154" y="426" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">G</text>
      </g>

      {/* L6 — Fusion */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="458" width="690" height="42" rx="8" fill="url(#v2NodeGold)" stroke="#c58a2b" strokeWidth="1.2" />
        <text x="172" y="478" fontSize="12" fontWeight="600">
          <tspan fill="#c58a2b" fontSize="11">{'{'}</tspan> Cross-Attention Fusion
        </text>
        <text x="370" y="478" fontSize="9.5" fill="#5a6b70">4 modalities  |  4 heads  |  128-D fused representation</text>
        <circle cx="154" cy="478" r="7" fill="#c58a2b" opacity="0.12" />
        <text x="154" y="481" fontSize="7" fill="#c58a2b" textAnchor="middle" fontWeight="700">X</text>
      </g>

      {/* L7 — Resistance Landscape */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="513" width="690" height="42" rx="8" fill="url(#v2NodeCoral)" stroke="#a4492f" strokeWidth="1.2" />
        <text x="172" y="533" fontSize="12" fontWeight="600">
          <tspan fill="#a4492f" fontSize="11">{'{'}</tspan> Resistance Landscape
        </text>
        <text x="370" y="533" fontSize="9.5" fill="#5a6b70">Drug-risk classification  |  state trajectories  |  top-20 targets  |  evidential UQ</text>
        <circle cx="154" cy="533" r="7" fill="#a4492f" opacity="0.12" />
        <text x="154" y="536" fontSize="7" fill="#a4492f" textAnchor="middle" fontWeight="700">R</text>
      </g>

      {/* L8 — Validation */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="568" width="690" height="38" rx="8" fill="url(#v2NodeCoral)" stroke="#a4492f" strokeWidth="1.2" />
        <text x="172" y="587" fontSize="12" fontWeight="600">
          <tspan fill="#a4492f" fontSize="11">{'{'}</tspan> Validation
        </text>
        <text x="290" y="587" fontSize="9.5" fill="#5a6b70">Held-out test cohort  |  SOTA benchmarks  |  4-tier governance audit</text>
        <circle cx="154" cy="587" r="7" fill="#a4492f" opacity="0.12" />
        <text x="154" y="590" fontSize="7" fill="#a4492f" textAnchor="middle" fontWeight="700">A</text>
      </g>

      {/* L9 — Serve */}
      <g filter="url(#v2ShadowSm)">
        <rect x="140" y="620" width="690" height="34" rx="8" fill="#ffffff" stroke="#2c6e6a" strokeWidth="1" strokeDasharray="5 3" />
        <text x="172" y="641" fontSize="11" fontWeight="500" fill="#5a6b70">
          Serve  |  FastAPI  /predict  |  /predict/trajectory  |  /targets/&#123;id&#125;
        </text>
      </g>
    </g>

    {/* ========== EDGES ========== */}
    <g stroke="#2c6e6a" strokeWidth="1.5" fill="none" markerEnd="url(#v2Arrow)">
      {/* L0 -> L1 */}
      <path d="M 285 141 L 285 152" />
      {/* L1 -> L2a (fork left) */}
      <path d="M 285 196 L 285 210 Q 285 220 300 222 L 305 224 L 310 234" />
      {/* L1 -> L2b (fork right) */}
      <path d="M 285 196 L 285 210 Q 285 220 300 222 L 655 222 Q 660 222 660 234" markerEnd="url(#v2ArrowGold)" />
      {/* L2a -> L3 */}
      <path d="M 310 280 L 310 290 Q 310 293 320 296" />
      {/* L2b -> L3 (merge dotted) */}
      <path d="M 660 280 L 660 290 Q 660 293 640 296 L 530 296" strokeDasharray="3 3" opacity="0.6" />
      {/* L3 -> L4 */}
      <path d="M 485 334 L 485 348" />
      {/* L4 -> L5 (sequential!) */}
      <path d="M 485 390 L 485 403" />
      {/* L5 -> L6 */}
      <path d="M 485 445 L 485 458" />
      {/* L6 -> L7 */}
      <path d="M 485 500 L 485 513" />
      {/* L7 -> L8 */}
      <path d="M 485 555 L 485 568" />
      {/* L8 -> L9 */}
      <path d="M 485 606 L 485 620" />
    </g>

    {/* ========== ANNOTATION CALLOUTS ========== */}
    <g fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">
      {/* dopri5 callout on Trajectory */}
      <rect x="700" y="350" width="120" height="18" rx="4" fill="#edf7f5" stroke="#2c6e6a" strokeWidth="0.5" />
      <text x="710" y="362" fontSize="8" fill="#2c6e6a" fontWeight="500">dopri5 adaptive solver</text>
      <line x1="700" y1="359" x2="695" y2="365" stroke="#2c6e6a" strokeWidth="0.5" opacity="0.5" />

      {/* cross-attention callout on Fusion */}
      <rect x="700" y="460" width="130" height="18" rx="4" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.5" />
      <text x="710" y="472" fontSize="8" fill="#c58a2b" fontWeight="500">cross-attention, 4 heads</text>

      {/* dimension annotation on VAE */}
      <rect x="430" y="268" width="54" height="14" rx="3" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.4" />
      <text x="437" y="278" fontSize="7" fill="#8b5a12" fontWeight="600">64-D latent</text>

      {/* dimension annotation on ESM-2 */}
      <rect x="762" y="268" width="56" height="14" rx="3" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.4" />
      <text x="767" y="278" fontSize="7" fill="#8b5a12" fontWeight="600">1280-D ESM</text>

      {/* dimension annotation on Fusion output */}
      <rect x="585" y="488" width="60" height="14" rx="3" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.4" />
      <text x="591" y="498" fontSize="7" fill="#8b5a12" fontWeight="600">128-D fused</text>
    </g>

    {/* ========== VERIFICATION LANE ========== */}
    <g>
      <rect x="870" y="92" width="215" height="562" rx="14" fill="url(#v2VerifGrad)" stroke="#c8d4d2" strokeWidth="1" filter="url(#v2Shadow)" />
      <rect x="870" y="92" width="215" height="562" rx="14" fill="url(#v2VerifAccent)" />

      {/* Title */}
      <text x="890" y="122" fontFamily="Fraunces, serif" fontSize="15" fontWeight="600" fill="#1c2628">
        Zero-Trust Verification
      </text>
      <line x1="890" y1="132" x2="1068" y2="132" stroke="#2c6e6a" strokeWidth="0.4" opacity="0.3" />

      {/* Verification items */}
      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <g transform="translate(890, 155)">
          <rect x="0" y="-6" width="8" height="8" rx="2" fill="#2c6e6a" />
          <text x="16" y="2" fontSize="10.5" fontWeight="500">SHA-256 hash chain</text>
          <text x="16" y="14" fontSize="8.5" fill="#5a6b70">Immutable provenance per artifact</text>
        </g>
        <g transform="translate(890, 190)">
          <rect x="0" y="-6" width="8" height="8" rx="2" fill="#2c6e6a" />
          <text x="16" y="2" fontSize="10.5" fontWeight="500">KS distribution tests</text>
          <text x="16" y="14" fontSize="8.5" fill="#5a6b70">Covariate shift detection</text>
        </g>
        <g transform="translate(890, 225)">
          <rect x="0" y="-6" width="8" height="8" rx="2" fill="#2c6e6a" />
          <text x="16" y="2" fontSize="10.5" fontWeight="500">8 biological guardrails</text>
          <text x="16" y="14" fontSize="8.5" fill="#5a6b70">Pathway, gene-set, viability gates</text>
        </g>
        <g transform="translate(890, 260)">
          <rect x="0" y="-6" width="8" height="8" rx="2" fill="#c58a2b" />
          <text x="16" y="2" fontSize="10.5" fontWeight="500">AgentOps telemetry</text>
          <text x="16" y="14" fontSize="8.5" fill="#5a6b70">Full observability per agent</text>
        </g>
      </g>

      {/* Divider */}
      <line x1="890" y1="295" x2="1068" y2="295" stroke="#d7cbb5" strokeWidth="0.6" />

      {/* First Principles */}
      <text x="890" y="318" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#1c2628">
        First-Principles Bounds
      </text>
      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <g transform="translate(890, 340)">
          <text x="0" y="0" fontSize="10" fontWeight="500" fill="#2c6e6a">Fano{'\u2019'}s inequality</text>
          <text x="0" y="13" fontSize="8.5" fill="#5a6b70">Best achievable error bound</text>
        </g>
        <g transform="translate(890, 370)">
          <text x="0" y="0" fontSize="10" fontWeight="500" fill="#2c6e6a">Lyapunov stability</text>
          <text x="0" y="13" fontSize="8.5" fill="#5a6b70">Basin depth of resistance states</text>
        </g>
        <g transform="translate(890, 400)">
          <text x="0" y="0" fontSize="10" fontWeight="500" fill="#2c6e6a">Kramers escape rate</text>
          <text x="0" y="13" fontSize="8.5" fill="#5a6b70">Transition probability bounds</text>
        </g>
      </g>

      {/* Divider */}
      <line x1="890" y1="430" x2="1068" y2="430" stroke="#d7cbb5" strokeWidth="0.6" />

      {/* Summary */}
      <text x="890" y="452" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#1c2628">
        Pipeline Summary
      </text>
      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70">
        <text x="890" y="470">10 specialized agents</text>
        <text x="890" y="484">Single H100 execution</text>
        <text x="890" y="498">Layer 2: parallel (VAE || ESM-2)</text>
        <text x="890" y="512">Layers 4-5: sequential (ODE then GNN)</text>
      </g>
    </g>

    {/* Dotted connectors from pipeline to verification lane */}
    <g stroke="#5a6b70" strokeWidth="0.8" strokeDasharray="3 4" fill="none" markerEnd="url(#v2ArrowMuted)" opacity="0.5">
      <path d="M 830 118 Q 850 118 870 140" />
      <path d="M 830 257 Q 850 260 870 230" />
      <path d="M 830 370 Q 850 370 870 370" />
      <path d="M 830 480 Q 850 480 870 460" />
      <path d="M 830 535 Q 850 540 870 520" />
    </g>

    {/* Sequential dependency annotation between L4 and L5 */}
    <g>
      <rect x="140" y="392" width="80" height="10" rx="2" fill="#edf7f5" opacity="0.9" />
      <text x="145" y="400" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#2c6e6a" fontWeight="500" letterSpacing="0.08em">
        SEQUENTIAL
      </text>
    </g>
  </svg>
);

export default DiagramPipelineV2;
