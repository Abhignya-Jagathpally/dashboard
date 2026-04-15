import React from 'react';

/**
 * DiagramPipeline — corrected to match actual DAG from pipeline logs
 *
 * Fixes from the original:
 *   - ProteinNet is Layer 5 (depends on trajectory), NOT Layer 4 parallel
 *   - Fusion is Layer 6, Landscape is Layer 7, Validation is Layer 8
 *   - Added proper parallel arrows for Layer 2 (VAE Pretrain ‖ ESM-2 Embed)
 */
const DiagramPipeline = () => (
  <svg viewBox="0 0 920 580" role="img" aria-label="ResistanceMap agentic pipeline DAG">
    <defs>
      <linearGradient id="pipeGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#e3f1ee" />
        <stop offset="100%" stopColor="#f4e5cc" />
      </linearGradient>
      <linearGradient id="pipeAccent" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#2c6e6a" />
        <stop offset="100%" stopColor="#c58a2b" />
      </linearGradient>
      <marker id="arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#2c6e6a" />
      </marker>
      <marker id="arrowGold" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#c58a2b" />
      </marker>
    </defs>

    <rect x="20" y="20" width="880" height="540" rx="28" fill="url(#pipeGrad)" stroke="#d7cbb5" />
    <text x="60" y="62" fontFamily="Fraunces, serif" fontSize="20" fill="#1c2628" fontWeight="600">
      Agentic Execution DAG
    </text>
    <text x="60" y="84" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#5a6b70">
      10 agents · 9 parallel layers · SHA256 hash chain verification
    </text>

    {/* Pipeline nodes */}
    <g fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#1c2628">
      {/* Layer 0 */}
      <rect x="60" y="106" width="180" height="42" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="88" y="132" fontWeight="600">L0  Data Validation</text>

      {/* Layer 1 */}
      <rect x="60" y="168" width="180" height="42" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="107" y="194" fontWeight="600">L1  Data Prep</text>

      {/* Layer 2 — parallel */}
      <rect x="30" y="240" width="175" height="48" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="55" y="265" fontWeight="600">L2  VAE Pretrain</text>
      <text x="55" y="279" fontSize="10" fill="#5a6b70">parallel ‖</text>

      <rect x="230" y="240" width="175" height="48" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="255" y="265" fontWeight="600">L2  ESM-2 Embed</text>
      <text x="255" y="279" fontSize="10" fill="#5a6b70">parallel ‖</text>

      {/* Layer 3 */}
      <rect x="60" y="314" width="180" height="42" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="95" y="340" fontWeight="600">L3  VAE Finetune</text>

      {/* Layer 4 */}
      <rect x="60" y="376" width="180" height="42" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="98" y="402" fontWeight="600">L4  Trajectory</text>

      {/* Layer 5 */}
      <rect x="60" y="438" width="180" height="42" rx="12" fill="#fff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="96" y="464" fontWeight="600">L5  ProteinNet</text>

      {/* Layer 6 — Fusion (gold accent) */}
      <rect x="470" y="240" width="180" height="42" rx="12" fill="#fff" stroke="#c58a2b" strokeWidth="1.5" />
      <text x="521" y="266" fontWeight="600">L6  Fusion</text>

      {/* Layer 7 — Landscape */}
      <rect x="470" y="314" width="180" height="42" rx="12" fill="#fff" stroke="#c58a2b" strokeWidth="1.5" />
      <text x="510" y="340" fontWeight="600">L7  Landscape</text>

      {/* Layer 8 — Validation */}
      <rect x="470" y="388" width="180" height="42" rx="12" fill="#fff" stroke="#c58a2b" strokeWidth="1.5" />
      <text x="508" y="414" fontWeight="600">L8  Validation</text>
    </g>

    {/* Arrows — teal for early stages */}
    <g stroke="#2c6e6a" strokeWidth="1.8" fill="none" markerEnd="url(#arrow)">
      <path d="M150 148 L150 168" />
      <path d="M150 210 L118 240" />
      <path d="M150 210 L318 240" />
      <path d="M118 288 L150 314" />
      <path d="M150 356 L150 376" />
      <path d="M150 418 L150 438" />
    </g>

    {/* Arrows — gold for fusion/downstream */}
    <g stroke="#c58a2b" strokeWidth="1.8" fill="none" markerEnd="url(#arrowGold)">
      <path d="M240 462 L470 262" />
      <path d="M405 262 L470 252" />
      <path d="M560 282 L560 314" />
      <path d="M560 356 L560 388" />
    </g>

    {/* Verification panel */}
    <g>
      <rect x="680" y="106" width="190" height="390" rx="18" fill="#fff" stroke="#d7cbb5" />
      <text x="706" y="138" fontFamily="Fraunces, serif" fontSize="15" fill="#1c2628" fontWeight="600">
        Verification
      </text>
      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#5a6b70">
        <text x="706" y="164">SHA256 hash chain</text>
        <text x="706" y="186">KS test guardrails (×8)</text>
        <text x="706" y="208">Audit trail logs</text>
      </g>
      <path d="M680 224 L870 224" stroke="#efe4d0" />
      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#5a6b70">
        <text x="706" y="248">AgentOps telemetry</text>
        <text x="706" y="270">Duration · Latency · Cost</text>
        <text x="706" y="292">Tool performance</text>
      </g>
      <path d="M680 308 L870 308" stroke="#efe4d0" />
      <g fontFamily="IBM Plex Sans, sans-serif" fontSize="12">
        <text x="706" y="332" fill="#1a5c58" fontWeight="600">Latest run</text>
        <text x="706" y="354" fill="#5a6b70">10/10 agents completed</text>
        <text x="706" y="376" fill="#5a6b70">21.3 min total</text>
        <text x="706" y="398" fill="#5a6b70">test MSE: 0.7191</text>
        <text x="706" y="420" fill="#5a6b70">11 drugs · 132 samples</text>
      </g>

      {/* Eval verdict summary */}
      <path d="M680 440 L870 440" stroke="#efe4d0" />
      <text x="706" y="464" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fill="#a4492f" fontWeight="600">
        Eval: B=FAIL C=FAIL
      </text>
      <text x="706" y="484" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#5a6b70">
        7 critical blockers remain
      </text>
    </g>
  </svg>
);

export default DiagramPipeline;
