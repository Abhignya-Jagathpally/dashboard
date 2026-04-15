import React from 'react';

const DiagramPipeline = () => (
  <svg viewBox="0 0 900 520" role="img" aria-label="ResistanceMap agentic pipeline">
    <defs>
      <linearGradient id="pipeGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#e3f1ee" />
        <stop offset="100%" stopColor="#f4e5cc" />
      </linearGradient>
      <linearGradient id="pipeAccent" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#2c6e6a" />
        <stop offset="100%" stopColor="#c58a2b" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="860" height="480" rx="28" fill="url(#pipeGrad)" stroke="#d7cbb5" />
    <text x="60" y="70" fontFamily="Fraunces" fontSize="22" fill="#1c2628">
      Agentic Execution DAG
    </text>
    <text x="60" y="94" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
      Parallelized stages with zero-trust hash chain verification
    </text>

    <g fontFamily="IBM Plex Sans" fontSize="12" fill="#1c2628">
      <rect x="70" y="120" width="170" height="48" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="92" y="148">Layer 0: Data Validation</text>

      <rect x="70" y="190" width="170" height="48" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="106" y="218">Layer 1: Data Prep</text>

      <rect x="40" y="270" width="170" height="52" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="64" y="296">Layer 2: VAE Pretrain</text>
      <text x="64" y="312" fontSize="10" fill="#5a6b70">(parallel)</text>

      <rect x="250" y="270" width="170" height="52" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="270" y="296">Layer 2: ESM-2 Embed</text>
      <text x="270" y="312" fontSize="10" fill="#5a6b70">(parallel)</text>

      <rect x="70" y="350" width="170" height="48" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="95" y="378">Layer 3: VAE Finetune</text>

      <rect x="40" y="420" width="170" height="48" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="70" y="448">Layer 4: Trajectory</text>

      <rect x="250" y="420" width="170" height="48" rx="12" fill="#ffffff" stroke="#2c6e6a" />
      <text x="278" y="448">Layer 4: ProteinNet</text>

      <rect x="470" y="270" width="170" height="48" rx="12" fill="#ffffff" stroke="#c58a2b" />
      <text x="506" y="298">Layer 5: Fusion</text>

      <rect x="470" y="340" width="170" height="48" rx="12" fill="#ffffff" stroke="#c58a2b" />
      <text x="498" y="368">Layer 6: Landscape</text>

      <rect x="470" y="410" width="170" height="48" rx="12" fill="#ffffff" stroke="#c58a2b" />
      <text x="496" y="438">Layer 7: Validation</text>
    </g>

    <g stroke="#2c6e6a" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M155 168 L155 190" />
      <path d="M155 238 L125 270" />
      <path d="M155 238 L335 270" />
      <path d="M125 322 L155 350" />
      <path d="M155 398 L125 420" />
      <path d="M155 398 L335 420" />
      <path d="M420 446 L470 290" stroke="url(#pipeAccent)" />
      <path d="M420 446 L470 360" stroke="url(#pipeAccent)" />
      <path d="M555 318 L555 340" stroke="url(#pipeAccent)" />
      <path d="M555 388 L555 410" stroke="url(#pipeAccent)" />
    </g>

    <g>
      <rect x="660" y="130" width="190" height="310" rx="18" fill="#ffffff" stroke="#d7cbb5" />
      <text x="682" y="160" fontFamily="Fraunces" fontSize="16" fill="#1c2628">
        Verification
      </text>
      <text x="682" y="184" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
        SHA256 hash chain
      </text>
      <text x="682" y="206" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
        KS test guardrails
      </text>
      <text x="682" y="228" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
        Audit trail logs
      </text>
      <path d="M660 250 L850 250" stroke="#efe4d0" />
      <text x="682" y="278" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
        AgentOps metrics
      </text>
      <text x="682" y="300" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
        Duration · Latency · Cost
      </text>
      <text x="682" y="332" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
        Tool performance
      </text>
    </g>
  </svg>
);

export default DiagramPipeline;
