import React from 'react';

// Clean horizontal pipeline overview — 5 major blocks flowing left to right
// Scientific journal quality with gradient background and dimension annotations

const DiagramPipeline = () => (
  <svg viewBox="0 0 960 420" role="img" aria-label="ResistanceMap pipeline overview showing five major stages from multi-omics input through fusion and prediction">
    <defs>
      <linearGradient id="pipeBg" x1="0" y1="0" x2="1" y2="0.8">
        <stop offset="0%" stopColor="#edf5f3" />
        <stop offset="40%" stopColor="#f4f0e8" />
        <stop offset="100%" stopColor="#f0ece3" />
      </linearGradient>
      <linearGradient id="pipeBlock1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#edf7f5" />
      </linearGradient>
      <linearGradient id="pipeBlock2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffdf8" />
        <stop offset="100%" stopColor="#faf3e3" />
      </linearGradient>
      <linearGradient id="pipeBlock3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#edf7f5" />
      </linearGradient>
      <linearGradient id="pipeBlock4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#edf7f5" />
      </linearGradient>
      <linearGradient id="pipeBlock5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbf9" />
        <stop offset="100%" stopColor="#faf0eb" />
      </linearGradient>
      <linearGradient id="pipeArrowGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#2c6e6a" />
        <stop offset="100%" stopColor="#c58a2b" />
      </linearGradient>
      <marker id="pipeArrow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M 0 1.5 L 10 6 L 0 10.5 z" fill="#2c6e6a" />
      </marker>
      <marker id="pipeArrowG" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M 0 1.5 L 10 6 L 0 10.5 z" fill="#c58a2b" />
      </marker>
      <filter id="pipeShadow" x="-3%" y="-3%" width="106%" height="110%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="3" floodColor="#1c2628" floodOpacity="0.07" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="960" height="420" fill="url(#pipeBg)" rx="16" />

    {/* Title */}
    <text x="40" y="38" fontFamily="Fraunces, serif" fontSize="20" fontWeight="600" fill="#1c2628" letterSpacing="-0.3px">
      Pipeline Overview
    </text>
    <text x="40" y="56" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#5a6b70">
      End-to-end resistance prediction  |  multi-omics to actionable drug-resistance landscape
    </text>
    <line x1="40" y1="66" x2="920" y2="66" stroke="#2c6e6a" strokeWidth="0.4" opacity="0.25" />

    {/* Flow connector line (background) */}
    <path d="M 135 200 L 920 200" stroke="#d7cbb5" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />

    {/* ========== BLOCK 1: Multi-Omics Input ========== */}
    <g filter="url(#pipeShadow)">
      <rect x="30" y="90" width="148" height="220" rx="12" fill="url(#pipeBlock1)" stroke="#2c6e6a" strokeWidth="1.2" />
      <rect x="30" y="90" width="148" height="32" rx="12" fill="#2c6e6a" />
      <rect x="30" y="108" width="148" height="14" fill="#2c6e6a" />
      <text x="104" y="112" fontFamily="Fraunces, serif" fontSize="12" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Multi-Omics Input
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <text x="48" y="148" fontSize="10" fontWeight="500">Proteomics</text>
        <text x="48" y="161" fontSize="8" fill="#5a6b70">RPPA abundance profiles</text>

        <text x="48" y="181" fontSize="10" fontWeight="500">Transcriptomics</text>
        <text x="48" y="194" fontSize="8" fill="#5a6b70">Bulk RNA-seq + scRNA</text>

        <text x="48" y="214" fontSize="10" fontWeight="500">Epigenomics</text>
        <text x="48" y="227" fontSize="8" fill="#5a6b70">Methylation + chromatin</text>

        <text x="48" y="247" fontSize="10" fontWeight="500">Drug Response</text>
        <text x="48" y="260" fontSize="8" fill="#5a6b70">IC50 dose-response curves</text>

        <text x="48" y="280" fontSize="10" fontWeight="500">Protein Sequences</text>
        <text x="48" y="293" fontSize="8" fill="#5a6b70">Target amino acid FASTA</text>
      </g>
    </g>

    {/* Arrow 1->2 */}
    <path d="M 178 200 L 204 200" stroke="#2c6e6a" strokeWidth="1.8" fill="none" markerEnd="url(#pipeArrow)" />

    {/* ========== BLOCK 2: Representation Learning ========== */}
    <g filter="url(#pipeShadow)">
      <rect x="212" y="100" width="158" height="200" rx="12" fill="url(#pipeBlock2)" stroke="#c58a2b" strokeWidth="1.2" />
      <rect x="212" y="100" width="158" height="32" rx="12" fill="#c58a2b" />
      <rect x="212" y="118" width="158" height="14" fill="#c58a2b" />
      <text x="291" y="122" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Representation Learning
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        {/* VAE sub-block */}
        <rect x="224" y="144" width="134" height="52" rx="6" fill="#ffffff" stroke="#c58a2b" strokeWidth="0.6" />
        <text x="234" y="160" fontSize="10" fontWeight="500">Conditional VAE</text>
        <text x="234" y="173" fontSize="8" fill="#5a6b70">Pan-cancer pretrain</text>
        <text x="234" y="185" fontSize="8" fill="#5a6b70">+ hematologic finetune</text>

        {/* ESM-2 sub-block */}
        <rect x="224" y="204" width="134" height="42" rx="6" fill="#ffffff" stroke="#c58a2b" strokeWidth="0.6" />
        <text x="234" y="220" fontSize="10" fontWeight="500">ESM-2 Embeddings</text>
        <text x="234" y="233" fontSize="8" fill="#5a6b70">650M param protein LM</text>

        {/* Parallel annotation */}
        <text x="360" y="182" fontSize="7" fill="#8b5a12" letterSpacing="0.1em" fontWeight="500">||</text>

        {/* Dimension annotations */}
        <rect x="224" y="256" width="52" height="14" rx="3" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.4" />
        <text x="229" y="266" fontSize="7" fill="#8b5a12" fontWeight="600">64-D latent</text>

        <rect x="290" y="256" width="64" height="14" rx="3" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.4" />
        <text x="295" y="266" fontSize="7" fill="#8b5a12" fontWeight="600">1280-D ESM-2</text>
      </g>
    </g>

    {/* Arrow 2->3 */}
    <path d="M 370 200 L 396 200" stroke="#2c6e6a" strokeWidth="1.8" fill="none" markerEnd="url(#pipeArrow)" />

    {/* ========== BLOCK 3: Temporal Dynamics ========== */}
    <g filter="url(#pipeShadow)">
      <rect x="404" y="110" width="148" height="180" rx="12" fill="url(#pipeBlock3)" stroke="#2c6e6a" strokeWidth="1.2" />
      <rect x="404" y="110" width="148" height="32" rx="12" fill="#2c6e6a" />
      <rect x="404" y="128" width="148" height="14" fill="#2c6e6a" />
      <text x="478" y="132" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Temporal Dynamics
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <text x="420" y="164" fontSize="10" fontWeight="500">Neural ODE</text>
        <text x="420" y="177" fontSize="8" fill="#5a6b70">Continuous-time state evolution</text>

        <text x="420" y="197" fontSize="10" fontWeight="500">dopri5 Solver</text>
        <text x="420" y="210" fontSize="8" fill="#5a6b70">Adaptive step integration</text>

        <text x="420" y="230" fontSize="10" fontWeight="500">Multi-Horizon Forecast</text>
        <text x="420" y="243" fontSize="8" fill="#5a6b70">3, 6, 12 month projections</text>

        <rect x="420" y="258" width="82" height="14" rx="3" fill="#edf7f5" stroke="#2c6e6a" strokeWidth="0.4" />
        <text x="426" y="268" fontSize="7" fill="#2c6e6a" fontWeight="600">64-D trajectories</text>
      </g>
    </g>

    {/* Arrow 3->4 */}
    <path d="M 552 200 L 578 200" stroke="#2c6e6a" strokeWidth="1.8" fill="none" markerEnd="url(#pipeArrow)" />

    {/* ========== BLOCK 4: Network Analysis ========== */}
    <g filter="url(#pipeShadow)">
      <rect x="586" y="110" width="148" height="180" rx="12" fill="url(#pipeBlock4)" stroke="#2c6e6a" strokeWidth="1.2" />
      <rect x="586" y="110" width="148" height="32" rx="12" fill="#2c6e6a" />
      <rect x="586" y="128" width="148" height="14" fill="#2c6e6a" />
      <text x="660" y="132" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Network Analysis
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <text x="602" y="164" fontSize="10" fontWeight="500">ProteinNet GNN</text>
        <text x="602" y="177" fontSize="8" fill="#5a6b70">3-layer graph attention network</text>

        <text x="602" y="197" fontSize="10" fontWeight="500">STRING v12 PPI</text>
        <text x="602" y="210" fontSize="8" fill="#5a6b70">Protein interaction topology</text>

        <text x="602" y="230" fontSize="10" fontWeight="500">GraphMASK Attribution</text>
        <text x="602" y="243" fontSize="8" fill="#5a6b70">Edge-level interpretability</text>

        <rect x="602" y="258" width="76" height="14" rx="3" fill="#edf7f5" stroke="#2c6e6a" strokeWidth="0.4" />
        <text x="607" y="268" fontSize="7" fill="#2c6e6a" fontWeight="600">256-D node repr</text>
      </g>
    </g>

    {/* Arrow 4->5 */}
    <path d="M 734 200 L 760 200" stroke="#c58a2b" strokeWidth="1.8" fill="none" markerEnd="url(#pipeArrowG)" />

    {/* ========== BLOCK 5: Fusion & Prediction ========== */}
    <g filter="url(#pipeShadow)">
      <rect x="768" y="90" width="168" height="220" rx="12" fill="url(#pipeBlock5)" stroke="#a4492f" strokeWidth="1.2" />
      <rect x="768" y="90" width="168" height="32" rx="12" fill="#a4492f" />
      <rect x="768" y="108" width="168" height="14" fill="#a4492f" />
      <text x="852" y="112" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Fusion & Prediction
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <text x="784" y="148" fontSize="10" fontWeight="500">Cross-Attention Fusion</text>
        <text x="784" y="161" fontSize="8" fill="#5a6b70">4 modalities, 4 heads</text>

        <text x="784" y="181" fontSize="10" fontWeight="500">Resistance Landscape</text>
        <text x="784" y="194" fontSize="8" fill="#5a6b70">Drug-risk state classification</text>

        <text x="784" y="214" fontSize="10" fontWeight="500">Target Prioritization</text>
        <text x="784" y="227" fontSize="8" fill="#5a6b70">Top-20 actionable targets</text>

        <text x="784" y="247" fontSize="10" fontWeight="500">Evidential UQ</text>
        <text x="784" y="260" fontSize="8" fill="#5a6b70">Calibrated confidence intervals</text>

        <rect x="784" y="276" width="60" height="14" rx="3" fill="#faf0eb" stroke="#a4492f" strokeWidth="0.4" />
        <text x="789" y="286" fontSize="7" fill="#a4492f" fontWeight="600">128-D fused</text>
      </g>
    </g>

    {/* ========== BOTTOM: Verification strip ========== */}
    <rect x="30" y="338" width="906" height="64" rx="10" fill="#ffffff" stroke="#c8d4d2" strokeWidth="0.8" opacity="0.9" />
    <text x="50" y="360" fontFamily="Fraunces, serif" fontSize="12" fontWeight="600" fill="#1c2628">
      Zero-Trust Verification Layer
    </text>
    <g fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70">
      <text x="50" y="378">SHA-256 hash chain</text>
      <text x="50" y="392">per-artifact provenance</text>

      <text x="220" y="378">KS distribution tests</text>
      <text x="220" y="392">covariate shift detection</text>

      <text x="400" y="378">8 biological guardrails</text>
      <text x="400" y="392">pathway + viability gates</text>

      <text x="580" y="378">AgentOps telemetry</text>
      <text x="580" y="392">full observability</text>

      <text x="760" y="378">4-tier governance audit</text>
      <text x="760" y="392">10 evaluation agents</text>
    </g>

    {/* Dotted lines from blocks to verification strip */}
    <g stroke="#c8d4d2" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.5">
      <line x1="104" y1="310" x2="104" y2="338" />
      <line x1="291" y1="300" x2="291" y2="338" />
      <line x1="478" y1="290" x2="478" y2="338" />
      <line x1="660" y1="290" x2="660" y2="338" />
      <line x1="852" y1="310" x2="852" y2="338" />
    </g>
  </svg>
);

export default DiagramPipeline;
