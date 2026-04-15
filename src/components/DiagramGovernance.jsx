import React from 'react';

const DiagramGovernance = () => (
  <svg viewBox="0 0 900 420" role="img" aria-label="Evaluation governance tiers">
    <rect x="20" y="20" width="860" height="380" rx="26" fill="#f8f3ea" stroke="#d7cbb5" />
    <text x="60" y="70" fontFamily="Fraunces" fontSize="22" fill="#1c2628">
      Evaluation Governance Flow
    </text>
    <text x="60" y="94" fontFamily="IBM Plex Sans" fontSize="12" fill="#5a6b70">
      Orthogonal review of claims: state · when · pathway
    </text>

    <g fontFamily="IBM Plex Sans" fontSize="12" fill="#1c2628">
      <rect x="80" y="140" width="150" height="80" rx="16" fill="#ffffff" stroke="#2c6e6a" />
      <text x="100" y="170">Tier A</text>
      <text x="100" y="190" fontSize="10" fill="#5a6b70">Data adequacy</text>
      <text x="100" y="206" fontSize="10" fill="#5a6b70">Integration + bias</text>

      <rect x="270" y="140" width="150" height="80" rx="16" fill="#ffffff" stroke="#2c6e6a" />
      <text x="290" y="170">Tier B</text>
      <text x="290" y="190" fontSize="10" fill="#5a6b70">Architecture audit</text>
      <text x="290" y="206" fontSize="10" fill="#5a6b70">Pathway stability</text>

      <rect x="460" y="140" width="150" height="80" rx="16" fill="#ffffff" stroke="#c58a2b" />
      <text x="480" y="170">Tier C</text>
      <text x="480" y="190" fontSize="10" fill="#5a6b70">Forecast + baselines</text>
      <text x="480" y="206" fontSize="10" fill="#5a6b70">Clinical safety</text>

      <rect x="650" y="140" width="150" height="80" rx="16" fill="#ffffff" stroke="#a4492f" />
      <text x="670" y="170">Tier D</text>
      <text x="670" y="190" fontSize="10" fill="#5a6b70">Chair synthesis</text>
      <text x="670" y="206" fontSize="10" fill="#5a6b70">EvalReport verdict</text>
    </g>

    <g stroke="#2c6e6a" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M230 180 L270 180" />
      <path d="M420 180 L460 180" />
      <path d="M610 180 L650 180" />
    </g>

    <g>
      <rect x="120" y="250" width="660" height="110" rx="18" fill="#ffffff" stroke="#d7cbb5" />
      <text x="140" y="282" fontFamily="Fraunces" fontSize="14" fill="#1c2628">Adversarial Round</text>
      <text x="140" y="306" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">
        Architecture auditor vs baseline adversary · ablation evidence · bootstrap CIs
      </text>
      <text x="140" y="328" fontFamily="IBM Plex Sans" fontSize="11" fill="#5a6b70">
        Only pre-registered or peer-reviewed evidence accepted
      </text>
    </g>
  </svg>
);

export default DiagramGovernance;
