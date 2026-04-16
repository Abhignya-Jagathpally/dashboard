import React from 'react';

// Evaluation Governance Flow — PhD-quality peer-review governance diagram
// 4 tiers with detailed agent breakdown, adversarial review, and EvalReport output

const DiagramGovernance = () => (
  <svg viewBox="0 0 1060 680" role="img" aria-label="Evaluation governance flow showing four tiers of review with 10 evaluation agents, adversarial rounds, and verified EvalReport output">
    <defs>
      <linearGradient id="govBg" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#f4f0e8" />
        <stop offset="50%" stopColor="#edf5f3" />
        <stop offset="100%" stopColor="#f0ece3" />
      </linearGradient>
      <linearGradient id="govTealNode" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#edf7f5" />
      </linearGradient>
      <linearGradient id="govGoldNode" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffdf8" />
        <stop offset="100%" stopColor="#faf3e3" />
      </linearGradient>
      <linearGradient id="govCoralNode" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fffbf9" />
        <stop offset="100%" stopColor="#faf0eb" />
      </linearGradient>
      <linearGradient id="govAdversarial" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="rgba(164,73,47,0.06)" />
        <stop offset="50%" stopColor="rgba(164,73,47,0.10)" />
        <stop offset="100%" stopColor="rgba(164,73,47,0.06)" />
      </linearGradient>
      <marker id="govArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#2c6e6a" />
      </marker>
      <marker id="govArrCoral" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#a4492f" />
      </marker>
      <marker id="govArrGold" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#c58a2b" />
      </marker>
      <filter id="govShadow" x="-3%" y="-3%" width="106%" height="110%">
        <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="#1c2628" floodOpacity="0.06" />
      </filter>
      <filter id="govShadowSm" x="-2%" y="-4%" width="104%" height="112%">
        <feDropShadow dx="0" dy="0.5" stdDeviation="1.2" floodColor="#1c2628" floodOpacity="0.05" />
      </filter>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="1060" height="680" fill="url(#govBg)" rx="16" />

    {/* Title */}
    <text x="40" y="40" fontFamily="Fraunces, serif" fontSize="22" fontWeight="600" fill="#1c2628" letterSpacing="-0.3px">
      Evaluation Governance Flow
    </text>
    <text x="40" y="60" fontFamily="IBM Plex Sans, sans-serif" fontSize="11.5" fill="#5a6b70">
      Orthogonal review of claims  |  10 evaluation agents  |  adversarial rounds  |  SHA-256 verified EvalReport
    </text>
    <line x1="40" y1="70" x2="1020" y2="70" stroke="#2c6e6a" strokeWidth="0.4" opacity="0.25" />

    {/* Agent count badge */}
    <rect x="940" y="26" width="80" height="24" rx="8" fill="#2c6e6a" />
    <text x="980" y="42" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="600">10 AGENTS</text>

    {/* ========== TIER A: Data Adequacy ========== */}
    <g filter="url(#govShadow)">
      <rect x="30" y="90" width="230" height="260" rx="12" fill="url(#govTealNode)" stroke="#2c6e6a" strokeWidth="1.2" />
      <rect x="30" y="90" width="230" height="34" rx="12" fill="#2c6e6a" />
      <rect x="30" y="110" width="230" height="14" fill="#2c6e6a" />
      <text x="145" y="112" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Tier A: Data Adequacy
      </text>
      <text x="145" y="148" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" textAnchor="middle">3 specialized agents</text>

      {/* Agent 1: Completeness */}
      <g filter="url(#govShadowSm)">
        <rect x="46" y="162" width="198" height="48" rx="7" fill="#ffffff" stroke="#2c6e6a" strokeWidth="0.7" />
        <circle cx="62" cy="182" r="8" fill="#2c6e6a" opacity="0.12" />
        <text x="62" y="185" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">1</text>
        <text x="78" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Completeness Agent</text>
        <text x="78" y="196" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Missing-value audit, feature coverage</text>
      </g>

      {/* Agent 2: Integration */}
      <g filter="url(#govShadowSm)">
        <rect x="46" y="220" width="198" height="48" rx="7" fill="#ffffff" stroke="#2c6e6a" strokeWidth="0.7" />
        <circle cx="62" cy="240" r="8" fill="#2c6e6a" opacity="0.12" />
        <text x="62" y="243" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">2</text>
        <text x="78" y="238" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Integration Agent</text>
        <text x="78" y="254" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Cross-omics alignment, batch effects</text>
      </g>

      {/* Agent 3: Bias */}
      <g filter="url(#govShadowSm)">
        <rect x="46" y="278" width="198" height="48" rx="7" fill="#ffffff" stroke="#2c6e6a" strokeWidth="0.7" />
        <circle cx="62" cy="298" r="8" fill="#2c6e6a" opacity="0.12" />
        <text x="62" y="301" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">3</text>
        <text x="78" y="296" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Bias Agent</text>
        <text x="78" y="312" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Distribution shift, label imbalance</text>
      </g>
    </g>

    {/* Arrow A -> B */}
    <path d="M 260 220 L 284 220" stroke="#2c6e6a" strokeWidth="1.6" fill="none" markerEnd="url(#govArr)" />

    {/* ========== TIER B: Architecture ========== */}
    <g filter="url(#govShadow)">
      <rect x="292" y="90" width="230" height="260" rx="12" fill="url(#govGoldNode)" stroke="#c58a2b" strokeWidth="1.2" />
      <rect x="292" y="90" width="230" height="34" rx="12" fill="#c58a2b" />
      <rect x="292" y="110" width="230" height="14" fill="#c58a2b" />
      <text x="407" y="112" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Tier B: Architecture
      </text>
      <text x="407" y="148" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" textAnchor="middle">3 specialized agents</text>

      {/* Agent 4: Cell-State */}
      <g filter="url(#govShadowSm)">
        <rect x="308" y="162" width="198" height="48" rx="7" fill="#ffffff" stroke="#c58a2b" strokeWidth="0.7" />
        <circle cx="324" cy="182" r="8" fill="#c58a2b" opacity="0.12" />
        <text x="324" y="185" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#c58a2b" textAnchor="middle" fontWeight="700">4</text>
        <text x="340" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Cell-State Auditor</text>
        <text x="340" y="196" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">VAE latent fidelity, manifold quality</text>
      </g>

      {/* Agent 5: Pathway */}
      <g filter="url(#govShadowSm)">
        <rect x="308" y="220" width="198" height="48" rx="7" fill="#ffffff" stroke="#c58a2b" strokeWidth="0.7" />
        <circle cx="324" cy="240" r="8" fill="#c58a2b" opacity="0.12" />
        <text x="324" y="243" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#c58a2b" textAnchor="middle" fontWeight="700">5</text>
        <text x="340" y="238" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Pathway Auditor</text>
        <text x="340" y="254" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">GraphMASK vs. KEGG overlap check</text>
      </g>

      {/* Agent 6: Ablation */}
      <g filter="url(#govShadowSm)">
        <rect x="308" y="278" width="198" height="48" rx="7" fill="#ffffff" stroke="#c58a2b" strokeWidth="0.7" />
        <circle cx="324" cy="298" r="8" fill="#c58a2b" opacity="0.12" />
        <text x="324" y="301" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#c58a2b" textAnchor="middle" fontWeight="700">6</text>
        <text x="340" y="296" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Ablation Agent</text>
        <text x="340" y="312" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Component necessity, module removal</text>
      </g>
    </g>

    {/* Arrow B -> C */}
    <path d="M 522 220 L 546 220" stroke="#c58a2b" strokeWidth="1.6" fill="none" markerEnd="url(#govArrGold)" />

    {/* ========== TIER C: Clinical ========== */}
    <g filter="url(#govShadow)">
      <rect x="554" y="90" width="230" height="260" rx="12" fill="url(#govCoralNode)" stroke="#a4492f" strokeWidth="1.2" />
      <rect x="554" y="90" width="230" height="34" rx="12" fill="#a4492f" />
      <rect x="554" y="110" width="230" height="14" fill="#a4492f" />
      <text x="669" y="112" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Tier C: Clinical
      </text>
      <text x="669" y="148" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" textAnchor="middle">3 specialized agents</text>

      {/* Agent 7: Forecast */}
      <g filter="url(#govShadowSm)">
        <rect x="570" y="162" width="198" height="48" rx="7" fill="#ffffff" stroke="#a4492f" strokeWidth="0.7" />
        <circle cx="586" cy="182" r="8" fill="#a4492f" opacity="0.12" />
        <text x="586" y="185" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#a4492f" textAnchor="middle" fontWeight="700">7</text>
        <text x="602" y="180" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Forecast Agent</text>
        <text x="602" y="196" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Calibration, horizon accuracy</text>
      </g>

      {/* Agent 8: Safety */}
      <g filter="url(#govShadowSm)">
        <rect x="570" y="220" width="198" height="48" rx="7" fill="#ffffff" stroke="#a4492f" strokeWidth="0.7" />
        <circle cx="586" cy="240" r="8" fill="#a4492f" opacity="0.12" />
        <text x="586" y="243" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#a4492f" textAnchor="middle" fontWeight="700">8</text>
        <text x="602" y="238" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Safety Agent</text>
        <text x="602" y="254" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Harmful-prediction guardrails</text>
      </g>

      {/* Agent 9: Baselines */}
      <g filter="url(#govShadowSm)">
        <rect x="570" y="278" width="198" height="48" rx="7" fill="#ffffff" stroke="#a4492f" strokeWidth="0.7" />
        <circle cx="586" cy="298" r="8" fill="#a4492f" opacity="0.12" />
        <text x="586" y="301" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#a4492f" textAnchor="middle" fontWeight="700">9</text>
        <text x="602" y="296" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Baselines Agent</text>
        <text x="602" y="312" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">SOTA comparison, bootstrap CIs</text>
      </g>
    </g>

    {/* Arrow C -> D */}
    <path d="M 784 220 L 808 220" stroke="#a4492f" strokeWidth="1.6" fill="none" markerEnd="url(#govArrCoral)" />

    {/* ========== TIER D: Synthesis ========== */}
    <g filter="url(#govShadow)">
      <rect x="816" y="90" width="220" height="260" rx="12" fill="url(#govTealNode)" stroke="#1c2628" strokeWidth="1.2" />
      <rect x="816" y="90" width="220" height="34" rx="12" fill="#1c2628" />
      <rect x="816" y="110" width="220" height="14" fill="#1c2628" />
      <text x="926" y="112" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#ffffff" textAnchor="middle">
        Tier D: Synthesis
      </text>
      <text x="926" y="148" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" textAnchor="middle">1 chair agent</text>

      {/* Agent 10: Chair */}
      <g filter="url(#govShadowSm)">
        <rect x="832" y="162" width="188" height="60" rx="7" fill="#ffffff" stroke="#1c2628" strokeWidth="0.7" />
        <circle cx="848" cy="188" r="8" fill="#1c2628" opacity="0.12" />
        <text x="848" y="191" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#1c2628" textAnchor="middle" fontWeight="700">10</text>
        <text x="864" y="182" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">Chair Agent</text>
        <text x="864" y="196" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Synthesizes all tier reports</text>
        <text x="864" y="210" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Final verdict: PASS / FAIL / WARN</text>
      </g>

      {/* Output: EvalReport */}
      <g filter="url(#govShadowSm)">
        <rect x="832" y="240" width="188" height="90" rx="7" fill="#ffffff" stroke="#2c6e6a" strokeWidth="1" />
        <text x="848" y="260" fontFamily="Fraunces, serif" fontSize="11" fontWeight="600" fill="#2c6e6a">EvalReport</text>
        <text x="848" y="276" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Tier verdicts (A/B/C/D)</text>
        <text x="848" y="290" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Evidence citations</text>
        <text x="848" y="304" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">Confidence intervals</text>
        <text x="848" y="318" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">SHA-256 verification hash</text>

        {/* Hash icon */}
        <rect x="988" y="306" width="24" height="14" rx="3" fill="#2c6e6a" opacity="0.1" />
        <text x="1000" y="316" fontFamily="IBM Plex Sans, sans-serif" fontSize="7" fill="#2c6e6a" textAnchor="middle" fontWeight="700">#</text>
      </g>
    </g>

    {/* ========== ADVERSARIAL REVIEW SECTION ========== */}
    <g>
      <rect x="30" y="380" width="1006" height="140" rx="12" fill="url(#govAdversarial)" stroke="#a4492f" strokeWidth="0.8" strokeDasharray="6 4" />

      <text x="50" y="406" fontFamily="Fraunces, serif" fontSize="15" fontWeight="600" fill="#a4492f">
        Adversarial Review Round
      </text>
      <text x="276" y="406" fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#a4492f" opacity="0.7">
        Between each tier transition
      </text>

      {/* Adversarial details */}
      <g fontFamily="IBM Plex Sans, sans-serif">
        {/* Challenge 1 */}
        <g filter="url(#govShadowSm)">
          <rect x="50" y="420" width="220" height="84" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
          <text x="66" y="440" fontSize="10" fontWeight="600" fill="#1c2628">Evidence Standards</text>
          <text x="66" y="456" fontSize="8" fill="#5a6b70">Only pre-registered or peer-reviewed</text>
          <text x="66" y="470" fontSize="8" fill="#5a6b70">evidence accepted as support</text>
          <text x="66" y="490" fontSize="8" fill="#a4492f" fontWeight="500">Reject: post-hoc rationalization</text>
        </g>

        {/* Challenge 2 */}
        <g filter="url(#govShadowSm)">
          <rect x="300" y="420" width="220" height="84" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
          <text x="316" y="440" fontSize="10" fontWeight="600" fill="#1c2628">Ablation Evidence</text>
          <text x="316" y="456" fontSize="8" fill="#5a6b70">Architecture auditor challenges</text>
          <text x="316" y="470" fontSize="8" fill="#5a6b70">component necessity claims</text>
          <text x="316" y="490" fontSize="8" fill="#a4492f" fontWeight="500">Require: {'>'} 2% AUC drop per module</text>
        </g>

        {/* Challenge 3 */}
        <g filter="url(#govShadowSm)">
          <rect x="550" y="420" width="220" height="84" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
          <text x="566" y="440" fontSize="10" fontWeight="600" fill="#1c2628">Baseline Adversary</text>
          <text x="566" y="456" fontSize="8" fill="#5a6b70">Compare against simpler models:</text>
          <text x="566" y="470" fontSize="8" fill="#5a6b70">RF, XGBoost, single-modality</text>
          <text x="566" y="490" fontSize="8" fill="#a4492f" fontWeight="500">Require: significant improvement</text>
        </g>

        {/* Challenge 4 */}
        <g filter="url(#govShadowSm)">
          <rect x="800" y="420" width="220" height="84" rx="8" fill="#ffffff" stroke="#a4492f" strokeWidth="0.6" />
          <text x="816" y="440" fontSize="10" fontWeight="600" fill="#1c2628">Statistical Rigor</text>
          <text x="816" y="456" fontSize="8" fill="#5a6b70">Bootstrap 95% confidence intervals</text>
          <text x="816" y="470" fontSize="8" fill="#5a6b70">Multiple-comparison correction</text>
          <text x="816" y="490" fontSize="8" fill="#a4492f" fontWeight="500">Require: non-overlapping CIs</text>
        </g>
      </g>

      {/* Bidirectional arrows between tiers and adversarial */}
      <g stroke="#a4492f" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.4">
        <path d="M 145 350 L 145 380" />
        <path d="M 407 350 L 407 380" />
        <path d="M 669 350 L 669 380" />
        <path d="M 926 350 L 926 380" />
      </g>
    </g>

    {/* ========== BOTTOM: Process Summary ========== */}
    <rect x="30" y="545" width="1006" height="118" rx="12" fill="#ffffff" stroke="#c8d4d2" strokeWidth="0.8" />

    <text x="50" y="572" fontFamily="Fraunces, serif" fontSize="14" fontWeight="600" fill="#1c2628">
      Governance Process Summary
    </text>

    {/* Flow arrows at bottom */}
    <g fontFamily="IBM Plex Sans, sans-serif">
      {/* Step indicators */}
      <g transform="translate(50, 590)">
        <rect x="0" y="0" width="140" height="52" rx="8" fill="url(#govTealNode)" stroke="#2c6e6a" strokeWidth="0.8" />
        <text x="14" y="18" fontSize="9" fontWeight="600" fill="#2c6e6a">1. Data Check</text>
        <text x="14" y="32" fontSize="7.5" fill="#5a6b70">Completeness, integration,</text>
        <text x="14" y="43" fontSize="7.5" fill="#5a6b70">bias assessment</text>
      </g>

      <path d="M 195 616 L 220 616" stroke="#2c6e6a" strokeWidth="1.2" fill="none" markerEnd="url(#govArr)" />

      <g transform="translate(228, 590)">
        <rect x="0" y="0" width="140" height="52" rx="8" fill="url(#govGoldNode)" stroke="#c58a2b" strokeWidth="0.8" />
        <text x="14" y="18" fontSize="9" fontWeight="600" fill="#c58a2b">2. Architecture Audit</text>
        <text x="14" y="32" fontSize="7.5" fill="#5a6b70">Cell-state, pathway,</text>
        <text x="14" y="43" fontSize="7.5" fill="#5a6b70">ablation verification</text>
      </g>

      <path d="M 373 616 L 398 616" stroke="#c58a2b" strokeWidth="1.2" fill="none" markerEnd="url(#govArrGold)" />

      <g transform="translate(406, 590)">
        <rect x="0" y="0" width="140" height="52" rx="8" fill="url(#govCoralNode)" stroke="#a4492f" strokeWidth="0.8" />
        <text x="14" y="18" fontSize="9" fontWeight="600" fill="#a4492f">3. Clinical Validation</text>
        <text x="14" y="32" fontSize="7.5" fill="#5a6b70">Forecast, safety,</text>
        <text x="14" y="43" fontSize="7.5" fill="#5a6b70">baseline comparison</text>
      </g>

      <path d="M 551 616 L 576 616" stroke="#a4492f" strokeWidth="1.2" fill="none" markerEnd="url(#govArrCoral)" />

      <g transform="translate(584, 590)">
        <rect x="0" y="0" width="140" height="52" rx="8" fill="url(#govTealNode)" stroke="#1c2628" strokeWidth="0.8" />
        <text x="14" y="18" fontSize="9" fontWeight="600" fill="#1c2628">4. Chair Synthesis</text>
        <text x="14" y="32" fontSize="7.5" fill="#5a6b70">Merge all evidence,</text>
        <text x="14" y="43" fontSize="7.5" fill="#5a6b70">final verdict</text>
      </g>

      <path d="M 729 616 L 754 616" stroke="#1c2628" strokeWidth="1.2" fill="none" markerEnd="url(#govArr)" />

      <g transform="translate(762, 590)">
        <rect x="0" y="0" width="160" height="52" rx="8" fill="#2c6e6a" />
        <text x="14" y="18" fontSize="9" fontWeight="600" fill="#ffffff">EvalReport Output</text>
        <text x="14" y="32" fontSize="7.5" fill="#ffffff" opacity="0.8">SHA-256 verified</text>
        <text x="14" y="43" fontSize="7.5" fill="#ffffff" opacity="0.8">Immutable governance record</text>
      </g>

      {/* Adversarial arrows */}
      <g stroke="#a4492f" strokeWidth="0.6" strokeDasharray="2 3" fill="none" opacity="0.3">
        <path d="M 145 590 Q 145 580 195 580 Q 300 575 373 590" />
        <path d="M 298 590 Q 298 578 400 575 Q 500 575 551 590" />
        <path d="M 476 590 Q 476 578 580 575 Q 660 575 729 590" />
      </g>
      <text x="350" y="578" fontFamily="IBM Plex Sans, sans-serif" fontSize="6.5" fill="#a4492f" opacity="0.5" letterSpacing="0.1em">ADVERSARIAL</text>
    </g>
  </svg>
);

export default DiagramGovernance;
