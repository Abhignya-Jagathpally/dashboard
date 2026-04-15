import React from 'react';

const DiagramInterpretability = () => (
  <svg viewBox="0 0 920 520" role="img" aria-label="Interpretable prediction flow">
    <defs>
      <linearGradient id="intGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#f3efe7" />
        <stop offset="100%" stopColor="#d8ebe7" />
      </linearGradient>
    </defs>
    <rect x="20" y="20" width="880" height="480" rx="26" fill="url(#intGrad)" stroke="#d7cbb5" />
    <text x="60" y="70" fontFamily="Fraunces" fontSize="22" fill="#1c2628">
      Interpretable Prediction Stack
    </text>
    <text x="60" y="95" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
      Mechanism discovery, attribution stability, and uncertainty checks
    </text>

    <g fontFamily="IBM Plex Sans" fontSize="12" fill="#1c2628">
      <rect x="60" y="130" width="160" height="60" rx="14" fill="#ffffff" stroke="#2c6e6a" />
      <text x="80" y="160">Multi-omics</text>
      <text x="80" y="178" fontSize="10" fill="#5a6b70">Proteomics · Epigenomics · scRNA</text>

      <rect x="260" y="115" width="160" height="60" rx="14" fill="#ffffff" stroke="#2c6e6a" />
      <text x="280" y="146">VAE Latent State</text>
      <text x="280" y="164" fontSize="10" fill="#5a6b70">64D resistance manifold</text>

      <rect x="260" y="205" width="160" height="60" rx="14" fill="#ffffff" stroke="#2c6e6a" />
      <text x="280" y="236">ODE Stability</text>
      <text x="280" y="254" fontSize="10" fill="#5a6b70">Basin depth + drift</text>

      <rect x="260" y="295" width="160" height="60" rx="14" fill="#ffffff" stroke="#2c6e6a" />
      <text x="280" y="326">ProteinNet GNN</text>
      <text x="280" y="344" fontSize="10" fill="#5a6b70">GraphMASK / attributions</text>

      <rect x="460" y="200" width="170" height="70" rx="14" fill="#ffffff" stroke="#c58a2b" />
      <text x="488" y="232">Cross-Attention</text>
      <text x="488" y="250" fontSize="10" fill="#5a6b70">Modal weights + gating</text>

      <rect x="670" y="170" width="190" height="70" rx="14" fill="#ffffff" stroke="#c58a2b" />
      <text x="700" y="202">Resistance Landscape</text>
      <text x="700" y="220" fontSize="10" fill="#5a6b70">State · Forecast · Targets</text>

      <rect x="670" y="270" width="190" height="70" rx="14" fill="#ffffff" stroke="#a4492f" />
      <text x="700" y="302">Attribution Reports</text>
      <text x="700" y="320" fontSize="10" fill="#5a6b70">Top pathways · confidence</text>
    </g>

    <g stroke="#2c6e6a" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M220 160 L260 146" />
      <path d="M220 160 L260 236" />
      <path d="M220 160 L260 326" />
      <path d="M420 146 L460 220" />
      <path d="M420 236 L460 220" />
      <path d="M420 326 L460 220" />
      <path d="M630 235 L670 205" />
      <path d="M630 235 L670 305" />
    </g>

    <g>
      <rect x="60" y="320" width="160" height="140" rx="16" fill="#ffffff" stroke="#d7cbb5" />
      <text x="80" y="352" fontFamily="Fraunces" fontSize="14" fill="#1c2628">Interpretability</text>
      <text x="80" y="374" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Per-protein scores</text>
      <text x="80" y="392" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Pathway overlap</text>
      <text x="80" y="410" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Attention heatmaps</text>
      <text x="80" y="428" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Graph stability tests</text>
    </g>

    <g>
      <rect x="460" y="310" width="170" height="150" rx="16" fill="#ffffff" stroke="#d7cbb5" />
      <text x="480" y="342" fontFamily="Fraunces" fontSize="14" fill="#1c2628">Governance Checks</text>
      <text x="480" y="364" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Tier B pathway audit</text>
      <text x="480" y="382" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Edge-dropout overlap</text>
      <text x="480" y="400" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Ablation necessity</text>
      <text x="480" y="418" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">Uncertainty calibration</text>
    </g>
  </svg>
);

export default DiagramInterpretability;
