import React from 'react';

// Interpretable prediction stack — rich, PhD-quality figure
// Shows full flow: modalities -> latent -> cross-attention -> landscape -> attribution
// Includes stylized attention heatmap, pathway graph, uncertainty bands, governance overlay

const DiagramInterpretability = () => (
  <svg viewBox="0 0 1060 680" role="img" aria-label="Interpretable prediction stack showing modality fusion, attention mechanism, attribution methods, and governance validation">
    <defs>
      <linearGradient id="intBg" x1="0" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#f3efe7" />
        <stop offset="50%" stopColor="#edf5f3" />
        <stop offset="100%" stopColor="#f0ece3" />
      </linearGradient>
      <linearGradient id="intNodeTeal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#edf7f5" />
      </linearGradient>
      <linearGradient id="intNodeGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffdf8" />
        <stop offset="100%" stopColor="#faf3e3" />
      </linearGradient>
      <linearGradient id="intNodeCoral" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbf9" />
        <stop offset="100%" stopColor="#faf0eb" />
      </linearGradient>
      <linearGradient id="intGovOverlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a4492f" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#a4492f" stopOpacity="0.02" />
      </linearGradient>
      <linearGradient id="intHeat1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#edf7f5" />
        <stop offset="50%" stopColor="#c58a2b" />
        <stop offset="100%" stopColor="#a4492f" />
      </linearGradient>
      <marker id="intArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#2c6e6a" />
      </marker>
      <marker id="intArrGold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#c58a2b" />
      </marker>
      <marker id="intArrCoral" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#a4492f" />
      </marker>
      <filter id="intShadow" x="-3%" y="-3%" width="106%" height="110%">
        <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#1c2628" floodOpacity="0.06" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="1060" height="680" fill="url(#intBg)" rx="16" />

    {/* Title */}
    <text x="40" y="40" fontFamily="Fraunces, serif" fontSize="22" fontWeight="600" fill="#1c2628" letterSpacing="-0.3px">
      Interpretable Prediction Stack
    </text>
    <text x="40" y="60" fontFamily="IBM Plex Sans, sans-serif" fontSize="11.5" fill="#5a6b70">
      Mechanism discovery  |  attribution stability  |  uncertainty quantification  |  governance-validated explanations
    </text>
    <line x1="40" y1="70" x2="1020" y2="70" stroke="#2c6e6a" strokeWidth="0.4" opacity="0.25" />

    {/* Column labels */}
    <g fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70" letterSpacing="0.12em" textAnchor="middle">
      <text x="90" y="90">INPUT</text>
      <text x="270" y="90">LATENT</text>
      <text x="490" y="90">FUSION</text>
      <text x="730" y="90">PREDICTION</text>
      <text x="940" y="90">ATTRIBUTION</text>
    </g>

    {/* ========== COLUMN 1: Input Modalities ========== */}
    <g filter="url(#intShadow)">
      <rect x="30" y="105" width="120" height="52" rx="8" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1" />
      <text x="46" y="127" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">Proteomics</text>
      <text x="46" y="142" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">RPPA abundance</text>
    </g>
    <g filter="url(#intShadow)">
      <rect x="30" y="170" width="120" height="52" rx="8" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1" />
      <text x="46" y="192" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">Transcriptomics</text>
      <text x="46" y="207" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Bulk + scRNA-seq</text>
    </g>
    <g filter="url(#intShadow)">
      <rect x="30" y="235" width="120" height="52" rx="8" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1" />
      <text x="46" y="257" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">Epigenomics</text>
      <text x="46" y="272" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Methylation profiles</text>
    </g>
    <g filter="url(#intShadow)">
      <rect x="30" y="300" width="120" height="52" rx="8" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1" />
      <text x="46" y="322" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">Protein Sequence</text>
      <text x="46" y="337" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">ESM-2 embeddings</text>
    </g>

    {/* ========== COLUMN 2: Latent Representations ========== */}
    <g filter="url(#intShadow)">
      <rect x="200" y="105" width="140" height="62" rx="8" fill="url(#intNodeGold)" stroke="#c58a2b" strokeWidth="1" />
      <text x="216" y="126" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">VAE Latent State</text>
      <text x="216" y="140" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">64-D resistance manifold</text>
      <text x="216" y="153" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Conditional decoder</text>
    </g>
    <g filter="url(#intShadow)">
      <rect x="200" y="185" width="140" height="62" rx="8" fill="url(#intNodeGold)" stroke="#c58a2b" strokeWidth="1" />
      <text x="216" y="206" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">ODE Trajectories</text>
      <text x="216" y="220" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Continuous-time evolution</text>
      <text x="216" y="233" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Lyapunov basin depth</text>
    </g>
    <g filter="url(#intShadow)">
      <rect x="200" y="265" width="140" height="62" rx="8" fill="url(#intNodeGold)" stroke="#c58a2b" strokeWidth="1" />
      <text x="216" y="286" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">ProteinNet GNN</text>
      <text x="216" y="300" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">256-D node embeddings</text>
      <text x="216" y="313" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">STRING v12 topology</text>
    </g>
    <g filter="url(#intShadow)">
      <rect x="200" y="340" width="140" height="46" rx="8" fill="url(#intNodeGold)" stroke="#c58a2b" strokeWidth="1" />
      <text x="216" y="360" fontFamily="IBM Plex Sans, sans-serif" fontSize="10.5" fontWeight="600" fill="#1c2628">ESM-2 Embed</text>
      <text x="216" y="374" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">1280-D per protein</text>
    </g>

    {/* Input -> Latent arrows */}
    <g stroke="#2c6e6a" strokeWidth="1.2" fill="none" markerEnd="url(#intArr)">
      <path d="M 150 131 L 200 131" />
      <path d="M 150 196 L 188 186 Q 194 184 200 186" />
      <path d="M 150 261 L 188 286 Q 194 290 200 290" />
      <path d="M 150 326 L 188 350 Q 194 354 200 356" />
    </g>

    {/* ========== COLUMN 3: Cross-Attention Fusion (detailed) ========== */}
    <g filter="url(#intShadow)">
      <rect x="395" y="100" width="190" height="300" rx="10" fill="url(#intNodeGold)" stroke="#c58a2b" strokeWidth="1.2" />

      {/* Header */}
      <rect x="395" y="100" width="190" height="30" rx="10" fill="#c58a2b" />
      <rect x="395" y="116" width="190" height="14" fill="#c58a2b" />
      <text x="490" y="120" fontFamily="Fraunces, serif" fontSize="11.5" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Cross-Attention Fusion
      </text>

      {/* 4-Head attention visualization */}
      <text x="412" y="150" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#1c2628" fontWeight="500">4-Head Attention Mechanism</text>

      {/* Stylized attention weight heatmap */}
      <g transform="translate(412, 158)">
        {/* Grid header labels */}
        <text x="30" y="-2" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="middle">Prot</text>
        <text x="52" y="-2" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="middle">Trans</text>
        <text x="74" y="-2" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="middle">Epi</text>
        <text x="96" y="-2" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="middle">Seq</text>

        {/* Row labels */}
        <text x="-2" y="12" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="end">H1</text>
        <text x="-2" y="28" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="end">H2</text>
        <text x="-2" y="44" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="end">H3</text>
        <text x="-2" y="60" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#5a6b70" textAnchor="end">H4</text>

        {/* Heatmap cells — varying opacities to suggest attention weights */}
        {/* Head 1 */}
        <rect x="20" y="4" width="18" height="12" rx="1.5" fill="#a4492f" opacity="0.85" />
        <rect x="42" y="4" width="18" height="12" rx="1.5" fill="#c58a2b" opacity="0.5" />
        <rect x="64" y="4" width="18" height="12" rx="1.5" fill="#c58a2b" opacity="0.3" />
        <rect x="86" y="4" width="18" height="12" rx="1.5" fill="#2c6e6a" opacity="0.2" />
        {/* Head 2 */}
        <rect x="20" y="20" width="18" height="12" rx="1.5" fill="#c58a2b" opacity="0.4" />
        <rect x="42" y="20" width="18" height="12" rx="1.5" fill="#a4492f" opacity="0.75" />
        <rect x="64" y="20" width="18" height="12" rx="1.5" fill="#a4492f" opacity="0.65" />
        <rect x="86" y="20" width="18" height="12" rx="1.5" fill="#2c6e6a" opacity="0.25" />
        {/* Head 3 */}
        <rect x="20" y="36" width="18" height="12" rx="1.5" fill="#2c6e6a" opacity="0.3" />
        <rect x="42" y="36" width="18" height="12" rx="1.5" fill="#c58a2b" opacity="0.35" />
        <rect x="64" y="36" width="18" height="12" rx="1.5" fill="#2c6e6a" opacity="0.2" />
        <rect x="86" y="36" width="18" height="12" rx="1.5" fill="#a4492f" opacity="0.9" />
        {/* Head 4 */}
        <rect x="20" y="52" width="18" height="12" rx="1.5" fill="#c58a2b" opacity="0.55" />
        <rect x="42" y="52" width="18" height="12" rx="1.5" fill="#2c6e6a" opacity="0.2" />
        <rect x="64" y="52" width="18" height="12" rx="1.5" fill="#a4492f" opacity="0.7" />
        <rect x="86" y="52" width="18" height="12" rx="1.5" fill="#c58a2b" opacity="0.45" />

        {/* Legend bar */}
        <rect x="20" y="72" width="84" height="5" rx="2" fill="url(#intHeat1)" />
        <text x="20" y="85" fontFamily="IBM Plex Sans, sans-serif" fontSize="5.5" fill="#5a6b70">low</text>
        <text x="96" y="85" fontFamily="IBM Plex Sans, sans-serif" fontSize="5.5" fill="#5a6b70">high</text>
      </g>

      {/* Gating mechanism */}
      <line x1="412" y1="260" x2="568" y2="260" stroke="#c58a2b" strokeWidth="0.4" opacity="0.4" />
      <text x="412" y="276" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#1c2628" fontWeight="500">Modality Gating</text>
      <text x="412" y="290" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Learned per-modality relevance</text>
      <text x="412" y="303" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">weights with softmax normalization</text>

      {/* Output dimension */}
      <line x1="412" y1="316" x2="568" y2="316" stroke="#c58a2b" strokeWidth="0.4" opacity="0.4" />
      <text x="412" y="332" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#1c2628" fontWeight="500">Output: 128-D fused</text>
      <text x="412" y="346" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Unified multi-modal representation</text>

      {/* Dimension badge */}
      <rect x="520" y="326" width="56" height="14" rx="3" fill="#faf3e3" stroke="#c58a2b" strokeWidth="0.4" />
      <text x="526" y="336" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#8b5a12" fontWeight="600">128-D fused</text>
    </g>

    {/* Latent -> Fusion arrows */}
    <g stroke="#c58a2b" strokeWidth="1.2" fill="none" markerEnd="url(#intArrGold)">
      <path d="M 340 136 Q 370 140 395 170" />
      <path d="M 340 216 L 395 230" />
      <path d="M 340 296 L 395 280" />
      <path d="M 340 363 Q 370 360 395 340" />
    </g>

    {/* ========== COLUMN 4: Resistance Landscape ========== */}
    <g filter="url(#intShadow)">
      <rect x="640" y="105" width="170" height="140" rx="10" fill="url(#intNodeCoral)" stroke="#a4492f" strokeWidth="1.2" />
      <rect x="640" y="105" width="170" height="28" rx="10" fill="#a4492f" />
      <rect x="640" y="119" width="170" height="14" fill="#a4492f" />
      <text x="725" y="124" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Resistance Landscape
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <text x="656" y="154" fontSize="9.5" fontWeight="500">Drug-Risk Classification</text>
        <text x="656" y="167" fontSize="8" fill="#5a6b70">State probability per compound</text>

        <text x="656" y="185" fontSize="9.5" fontWeight="500">Temporal Forecast</text>
        <text x="656" y="198" fontSize="8" fill="#5a6b70">3/6/12 month trajectories</text>

        <text x="656" y="216" fontSize="9.5" fontWeight="500">Target Prioritization</text>
        <text x="656" y="229" fontSize="8" fill="#5a6b70">Top-20 actionable targets</text>
      </g>

      {/* Stylized uncertainty bands */}
      <g transform="translate(656, 234)" opacity="0.6">
        <path d="M 0 10 Q 20 2 40 8 Q 60 4 80 6 Q 100 3 120 7" stroke="#a4492f" strokeWidth="1" fill="none" />
        <path d="M 0 10 Q 20 2 40 8 Q 60 4 80 6 Q 100 3 120 7 L 120 14 Q 100 10 80 12 Q 60 11 40 14 Q 20 9 0 16 Z" fill="#a4492f" opacity="0.1" />
        <path d="M 0 10 Q 20 2 40 8 Q 60 4 80 6 Q 100 3 120 7 L 120 18 Q 100 14 80 16 Q 60 15 40 18 Q 20 13 0 20 Z" fill="#a4492f" opacity="0.05" />
        <text x="130" y="14" fontFamily="IBM Plex Sans, sans-serif" fontSize="6" fill="#a4492f">UQ band</text>
      </g>
    </g>

    {/* Fusion -> Landscape arrow */}
    <path d="M 585 250 L 620 200 Q 630 186 640 190" stroke="#a4492f" strokeWidth="1.4" fill="none" markerEnd="url(#intArrCoral)" />

    {/* ========== COLUMN 5: Attribution Reports ========== */}
    <g filter="url(#intShadow)">
      <rect x="860" y="105" width="175" height="200" rx="10" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1.2" />
      <rect x="860" y="105" width="175" height="28" rx="10" fill="#2c6e6a" />
      <rect x="860" y="119" width="175" height="14" fill="#2c6e6a" />
      <text x="947" y="124" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Attribution Reports
      </text>

      <g fontFamily="IBM Plex Sans, sans-serif" fill="#1c2628">
        <text x="876" y="154" fontSize="9.5" fontWeight="500">Per-Protein Scores</text>
        <text x="876" y="167" fontSize="8" fill="#5a6b70">Contribution to prediction</text>

        <text x="876" y="185" fontSize="9.5" fontWeight="500">Top Pathways</text>
        <text x="876" y="198" fontSize="8" fill="#5a6b70">KEGG/Reactome enrichment</text>

        <text x="876" y="216" fontSize="9.5" fontWeight="500">Attention Heatmaps</text>
        <text x="876" y="229" fontSize="8" fill="#5a6b70">Per-head modality weights</text>

        <text x="876" y="247" fontSize="9.5" fontWeight="500">Confidence Intervals</text>
        <text x="876" y="260" fontSize="8" fill="#5a6b70">Evidential uncertainty bounds</text>

        {/* Mini pathway graph icon */}
        <g transform="translate(990, 265)" opacity="0.4">
          <circle cx="0" cy="0" r="3" fill="#2c6e6a" />
          <circle cx="14" cy="-8" r="3" fill="#2c6e6a" />
          <circle cx="14" cy="8" r="3" fill="#2c6e6a" />
          <circle cx="28" cy="0" r="3" fill="#2c6e6a" />
          <line x1="3" y1="0" x2="11" y2="-7" stroke="#2c6e6a" strokeWidth="0.8" />
          <line x1="3" y1="0" x2="11" y2="7" stroke="#2c6e6a" strokeWidth="0.8" />
          <line x1="17" y1="-7" x2="25" y2="0" stroke="#2c6e6a" strokeWidth="0.8" />
          <line x1="17" y1="7" x2="25" y2="0" stroke="#2c6e6a" strokeWidth="0.8" />
        </g>
      </g>
    </g>

    {/* Landscape -> Attribution arrow */}
    <path d="M 810 180 L 860 180" stroke="#2c6e6a" strokeWidth="1.4" fill="none" markerEnd="url(#intArr)" />

    {/* ========== BOTTOM SECTION: Attribution Methods ========== */}
    <g fontFamily="IBM Plex Sans, sans-serif">
      {/* GraphMASK */}
      <g filter="url(#intShadow)">
        <rect x="30" y="420" width="200" height="100" rx="10" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1" />
        <text x="48" y="446" fontSize="11" fontWeight="600" fill="#1c2628">GraphMASK Attribution</text>
        <text x="48" y="462" fontSize="8.5" fill="#5a6b70">Edge-level importance scoring</text>
        <text x="48" y="476" fontSize="8.5" fill="#5a6b70">Learned binary edge masks</text>
        <text x="48" y="490" fontSize="8.5" fill="#5a6b70">Protein interaction subgraph</text>

        {/* Mini graph icon */}
        <g transform="translate(186, 435)" opacity="0.35">
          <circle cx="0" cy="0" r="4" fill="#2c6e6a" />
          <circle cx="18" cy="-10" r="4" fill="#2c6e6a" />
          <circle cx="18" cy="10" r="4" fill="#2c6e6a" />
          <circle cx="32" cy="0" r="3" fill="#2c6e6a" />
          <line x1="4" y1="-1" x2="14" y2="-8" stroke="#2c6e6a" strokeWidth="1.5" />
          <line x1="4" y1="1" x2="14" y2="8" stroke="#2c6e6a" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="22" y1="-8" x2="29" y2="-2" stroke="#2c6e6a" strokeWidth="1.2" />
        </g>
      </g>

      {/* Attention Weights */}
      <g filter="url(#intShadow)">
        <rect x="260" y="420" width="200" height="100" rx="10" fill="url(#intNodeGold)" stroke="#c58a2b" strokeWidth="1" />
        <text x="278" y="446" fontSize="11" fontWeight="600" fill="#1c2628">Attention Weights</text>
        <text x="278" y="462" fontSize="8.5" fill="#5a6b70">Per-head modality alignment</text>
        <text x="278" y="476" fontSize="8.5" fill="#5a6b70">Cross-modal relevance scores</text>
        <text x="278" y="490" fontSize="8.5" fill="#5a6b70">Softmax-normalized weights</text>

        {/* Mini bar chart icon */}
        <g transform="translate(418, 448)" opacity="0.35">
          <rect x="0" y="14" width="6" height="16" rx="1" fill="#c58a2b" />
          <rect x="9" y="6" width="6" height="24" rx="1" fill="#c58a2b" />
          <rect x="18" y="18" width="6" height="12" rx="1" fill="#c58a2b" />
          <rect x="27" y="10" width="6" height="20" rx="1" fill="#c58a2b" />
        </g>
      </g>

      {/* Pathway Stability */}
      <g filter="url(#intShadow)">
        <rect x="490" y="420" width="200" height="100" rx="10" fill="url(#intNodeTeal)" stroke="#2c6e6a" strokeWidth="1" />
        <text x="508" y="446" fontSize="11" fontWeight="600" fill="#1c2628">Pathway Stability</text>
        <text x="508" y="462" fontSize="8.5" fill="#5a6b70">Edge-dropout robustness test</text>
        <text x="508" y="476" fontSize="8.5" fill="#5a6b70">Bootstrap pathway overlap</text>
        <text x="508" y="490" fontSize="8.5" fill="#5a6b70">Jaccard consistency index</text>
      </g>

      {/* Arrows from attribution methods up to attribution reports */}
      <g stroke="#5a6b70" strokeWidth="0.8" strokeDasharray="3 4" fill="none" markerEnd="url(#intArr)" opacity="0.4">
        <path d="M 130 420 Q 130 380 400 350 Q 700 310 947 305" />
        <path d="M 360 420 Q 360 380 600 340 Q 800 310 947 305" />
        <path d="M 590 420 Q 590 380 750 340 Q 860 320 947 305" />
      </g>
    </g>

    {/* ========== GOVERNANCE VALIDATION OVERLAY ========== */}
    <g>
      <rect x="30" y="548" width="1005" height="116" rx="12" fill="url(#intGovOverlay)" stroke="#a4492f" strokeWidth="0.8" strokeDasharray="6 4" />

      <text x="50" y="574" fontFamily="Fraunces, serif" fontSize="14" fontWeight="600" fill="#a4492f">
        Governance Validation Overlay
      </text>
      <text x="260" y="574" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#a4492f" opacity="0.7">
        Tier B architecture audit verifies all attribution claims
      </text>

      {/* Three governance check blocks */}
      <g fontFamily="IBM Plex Sans, sans-serif">
        <rect x="50" y="588" width="280" height="60" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
        <text x="66" y="608" fontSize="10" fontWeight="600" fill="#1c2628">Cell-State Auditor</text>
        <text x="66" y="622" fontSize="8" fill="#5a6b70">VAE latent fidelity check: reconstructed vs. observed</text>
        <text x="66" y="634" fontSize="8" fill="#5a6b70">Biological plausibility of learned manifold</text>

        <rect x="360" y="588" width="280" height="60" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
        <text x="376" y="608" fontSize="10" fontWeight="600" fill="#1c2628">Pathway Auditor</text>
        <text x="376" y="622" fontSize="8" fill="#5a6b70">GraphMASK edge masks vs. known KEGG pathways</text>
        <text x="376" y="634" fontSize="8" fill="#5a6b70">Edge-dropout overlap {'>'} 0.6 threshold</text>

        <rect x="670" y="588" width="350" height="60" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
        <text x="686" y="608" fontSize="10" fontWeight="600" fill="#1c2628">Ablation Auditor</text>
        <text x="686" y="622" fontSize="8" fill="#5a6b70">Component necessity: remove each module, measure degradation</text>
        <text x="686" y="634" fontSize="8" fill="#5a6b70">Ensures no redundant components inflate attribution</text>
      </g>

      {/* Governance badge */}
      <rect x="940" y="558" width="84" height="22" rx="6" fill="#a4492f" opacity="0.9" />
      <text x="982" y="573" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="600">TIER B AUDIT</text>
    </g>
  </svg>
);

export default DiagramInterpretability;
