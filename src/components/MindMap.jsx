import React from 'react';

const MindMap = () => (
  <svg viewBox="0 0 900 460" role="img" aria-label="ResistanceMap mind map">
    <defs>
      <linearGradient id="mindGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#d7ebe6" />
        <stop offset="100%" stopColor="#f1e2c8" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="860" height="420" rx="26" fill="url(#mindGrad)" stroke="#d7cbb5" />

    <g stroke="#2c6e6a" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M450 230 L220 120" />
      <path d="M450 230 L680 110" />
      <path d="M450 230 L190 260" />
      <path d="M450 230 L720 260" />
      <path d="M450 230 L300 360" />
      <path d="M450 230 L600 360" />
    </g>

    <g fontFamily="IBM Plex Sans" fontSize="12" fill="#1c2628">
      <rect x="370" y="190" width="160" height="70" rx="16" fill="#ffffff" stroke="#2c6e6a" />
      <text x="402" y="220" fontFamily="Fraunces" fontSize="14">ResistanceMap</text>
      <text x="402" y="242" fontSize="10" fill="#5a6b70">Multi-modal pipeline</text>

      <rect x="120" y="80" width="200" height="70" rx="16" fill="#ffffff" stroke="#2c6e6a" />
      <text x="142" y="110">Data + MCP</text>
      <text x="142" y="130" fontSize="10" fill="#5a6b70">DepMap · GEO · STRING</text>

      <rect x="610" y="70" width="210" height="80" rx="16" fill="#ffffff" stroke="#2c6e6a" />
      <text x="632" y="104">Model Stack</text>
      <text x="632" y="124" fontSize="10" fill="#5a6b70">VAE · ODE · GNN · Fusion</text>

      <rect x="90" y="230" width="220" height="80" rx="16" fill="#ffffff" stroke="#c58a2b" />
      <text x="112" y="262">Agentic Orchestration</text>
      <text x="112" y="282" fontSize="10" fill="#5a6b70">DAG · Hash chain · AgentOps</text>

      <rect x="660" y="230" width="200" height="80" rx="16" fill="#ffffff" stroke="#c58a2b" />
      <text x="682" y="262">Inference API</text>
      <text x="682" y="282" fontSize="10" fill="#5a6b70">/predict · /trajectory · targets</text>

      <rect x="220" y="340" width="210" height="80" rx="16" fill="#ffffff" stroke="#a4492f" />
      <text x="242" y="372">Interpretability</text>
      <text x="242" y="392" fontSize="10" fill="#5a6b70">Attributions · pathways · UQ</text>

      <rect x="520" y="340" width="210" height="80" rx="16" fill="#ffffff" stroke="#a4492f" />
      <text x="542" y="372">Governance</text>
      <text x="542" y="392" fontSize="10" fill="#5a6b70">Tiered evaluation · baselines</text>
    </g>
  </svg>
);

export default MindMap;
