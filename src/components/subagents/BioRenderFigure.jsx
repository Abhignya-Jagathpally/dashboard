// BioRender-style molecular illustration of venetoclax resistance via
// BCL-2 family rewiring. Shows the mitochondrial outer membrane (MOM) with
// the balance between pro-apoptotic (BAX, BAK) and anti-apoptotic
// (BCL-2, BCL-XL, MCL-1) proteins. Venetoclax inhibits BCL-2;
// in resistant cells, MCL-1 upregulation rescues anti-apoptotic signalling.

const BioRenderFigure = () => (
  <svg viewBox="0 0 820 500" role="img" aria-label="BCL-2 family rewiring at the mitochondrial outer membrane in venetoclax resistance">
    <defs>
      <linearGradient id="cytoBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbf7ef" />
        <stop offset="100%" stopColor="#f3ede0" />
      </linearGradient>
      <linearGradient id="mitoBody" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d2a976" />
        <stop offset="100%" stopColor="#a87b3f" />
      </linearGradient>
      <linearGradient id="momStroke" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7a4a14" />
        <stop offset="100%" stopColor="#9c6526" />
      </linearGradient>
      <radialGradient id="proApop" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#d9f0d3" />
        <stop offset="100%" stopColor="#6fb35e" />
      </radialGradient>
      <radialGradient id="antiApop" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#fcd6cc" />
        <stop offset="100%" stopColor="#c65230" />
      </radialGradient>
      <radialGradient id="mcl1Highlight" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#fff7d6" />
        <stop offset="100%" stopColor="#e6a21b" />
      </radialGradient>
      <marker id="inhibitMarker" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 0 10" stroke="#c93e1e" strokeWidth="2.5" />
      </marker>
      <marker id="activateMarker" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#2c6e6a" />
      </marker>
      <marker id="upMarker" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M 5 0 L 10 10 L 0 10 z" fill="#c58a2b" />
      </marker>
    </defs>

    {/* Cytoplasm background */}
    <rect x="0" y="0" width="820" height="500" fill="url(#cytoBg)" rx="16" />

    {/* Legend */}
    <g transform="translate(24, 22)" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#1c2628">
      <text fontFamily="Fraunces, serif" fontSize="14" fontWeight="600">
        BCL-2 family rewiring at the mitochondrial outer membrane
      </text>
      <g transform="translate(0, 22)">
        <circle cx="8" cy="0" r="6" fill="url(#proApop)" stroke="#3e7c2f" />
        <text x="22" y="4">Pro-apoptotic</text>
        <g transform="translate(120, 0)">
          <circle cx="8" cy="0" r="6" fill="url(#antiApop)" stroke="#8a2f14" />
          <text x="22" y="4">Anti-apoptotic</text>
        </g>
        <g transform="translate(240, 0)">
          <circle cx="8" cy="0" r="6" fill="url(#mcl1Highlight)" stroke="#b5791a" />
          <text x="22" y="4">Upregulated in resistance</text>
        </g>
        <g transform="translate(420, 0)">
          <line x1="0" y1="0" x2="26" y2="0" stroke="#c93e1e" strokeWidth="2" markerEnd="url(#inhibitMarker)" />
          <text x="32" y="4">Inhibition</text>
        </g>
        <g transform="translate(520, 0)">
          <line x1="0" y1="0" x2="26" y2="0" stroke="#2c6e6a" strokeWidth="2" markerEnd="url(#activateMarker)" />
          <text x="32" y="4">Activation</text>
        </g>
      </g>
    </g>

    {/* Mitochondrion - elliptical body with MOM */}
    <g transform="translate(410, 280)">
      <ellipse cx="0" cy="0" rx="260" ry="110" fill="url(#mitoBody)" stroke="url(#momStroke)" strokeWidth="3" />
      <text x="0" y="82" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#4a2e0d" fontStyle="italic">
        mitochondrial outer membrane
      </text>

      {/* Cristae (inner membrane folds) — decorative */}
      <g stroke="#8a6338" strokeWidth="1.25" fill="none" opacity="0.55">
        <path d="M -180 -20 Q -150 -55 -120 -20 Q -90 15 -60 -20 Q -30 -55 0 -20 Q 30 15 60 -20 Q 90 -55 120 -20 Q 150 15 180 -20" />
        <path d="M -170 30 Q -140 -5 -110 30 Q -80 65 -50 30 Q -20 -5 10 30 Q 40 65 70 30 Q 100 -5 130 30 Q 160 65 190 30" />
      </g>
    </g>

    {/* Pro-apoptotic: BAX and BAK on the MOM */}
    <g transform="translate(300, 205)">
      <circle cx="0" cy="0" r="22" fill="url(#proApop)" stroke="#3e7c2f" strokeWidth="1.5" />
      <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="600" fill="#1c2628">BAX</text>
    </g>
    <g transform="translate(520, 205)">
      <circle cx="0" cy="0" r="22" fill="url(#proApop)" stroke="#3e7c2f" strokeWidth="1.5" />
      <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="600" fill="#1c2628">BAK</text>
    </g>

    {/* Anti-apoptotic on left: BCL-2 (inhibited by venetoclax) */}
    <g transform="translate(190, 300)">
      <circle cx="0" cy="0" r="26" fill="url(#antiApop)" stroke="#8a2f14" strokeWidth="1.5" />
      <text x="0" y="-2" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="600" fill="white">BCL-2</text>
      <text x="0" y="12" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#fde5dd">target</text>
    </g>

    {/* Anti-apoptotic centre: BCL-XL */}
    <g transform="translate(410, 355)">
      <circle cx="0" cy="0" r="22" fill="url(#antiApop)" stroke="#8a2f14" strokeWidth="1.5" />
      <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="white">BCL-XL</text>
    </g>

    {/* Anti-apoptotic right: MCL-1 (upregulated — highlighted yellow) */}
    <g transform="translate(630, 300)">
      <circle cx="0" cy="0" r="30" fill="url(#mcl1Highlight)" stroke="#b5791a" strokeWidth="2.5" />
      <text x="0" y="-2" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="12" fontWeight="700" fill="#4a2e0d">MCL-1</text>
      <text x="0" y="12" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#4a2e0d">rescue</text>
      {/* Up arrow signaling upregulation */}
      <path d="M 36 -16 L 36 4 M 36 -16 L 30 -8 M 36 -16 L 42 -8" stroke="#b5791a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Venetoclax (drug) - floating pill */}
    <g transform="translate(100, 145)">
      <rect x="-44" y="-18" width="88" height="36" rx="18" fill="#ffffff" stroke="#c93e1e" strokeWidth="2" />
      <text x="0" y="-1" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="700" fill="#c93e1e">Venetoclax</text>
      <text x="0" y="12" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="8" fill="#5a6b70">BCL-2i</text>
    </g>

    {/* Venetoclax inhibiting BCL-2 */}
    <line x1="130" y1="165" x2="170" y2="290" stroke="#c93e1e" strokeWidth="2.25" markerEnd="url(#inhibitMarker)" />

    {/* Sequestration arrows — BCL-2 and BCL-XL blocking BAX */}
    <line x1="215" y1="292" x2="286" y2="212" stroke="#8a2f14" strokeWidth="1.75" markerEnd="url(#inhibitMarker)" strokeDasharray="4 3" opacity="0.35" />
    {/* Sequestration arrow — MCL-1 now blocking BAK (rescue path) */}
    <line x1="603" y1="293" x2="538" y2="212" stroke="#b5791a" strokeWidth="2.5" markerEnd="url(#inhibitMarker)" />

    {/* BIM / NOXA (BH3-only activators) */}
    <g transform="translate(300, 105)">
      <rect x="-24" y="-12" width="48" height="24" rx="8" fill="#ffffff" stroke="#3e7c2f" strokeWidth="1.5" />
      <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">BIM</text>
    </g>
    <g transform="translate(520, 105)">
      <rect x="-28" y="-12" width="56" height="24" rx="8" fill="#ffffff" stroke="#3e7c2f" strokeWidth="1.5" />
      <text x="0" y="4" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" fill="#1c2628">NOXA</text>
    </g>

    {/* BIM -> BAX activation */}
    <line x1="300" y1="123" x2="300" y2="180" stroke="#2c6e6a" strokeWidth="1.75" markerEnd="url(#activateMarker)" />
    {/* NOXA -> BAK activation */}
    <line x1="520" y1="123" x2="520" y2="180" stroke="#2c6e6a" strokeWidth="1.75" markerEnd="url(#activateMarker)" />

    {/* Annotation: Apoptosis (downstream) */}
    <g transform="translate(410, 445)">
      <rect x="-70" y="-16" width="140" height="32" rx="12" fill="#ffffff" stroke="#2c6e6a" strokeWidth="1.5" />
      <text x="0" y="5" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="13" fontWeight="600" fill="#2c6e6a">Apoptosis (MOMP)</text>
    </g>
    {/* BAX/BAK -> apoptosis (weak because both sequestered) */}
    <path d="M 340 225 Q 380 380 380 430" stroke="#2c6e6a" strokeWidth="1.5" fill="none" strokeDasharray="5 4" opacity="0.4" markerEnd="url(#activateMarker)" />
    <path d="M 480 225 Q 440 380 440 430" stroke="#2c6e6a" strokeWidth="1.5" fill="none" strokeDasharray="5 4" opacity="0.4" markerEnd="url(#activateMarker)" />

    {/* Caption */}
    <text x="410" y="492" textAnchor="middle" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#5a6b70" fontStyle="italic">
      Venetoclax blocks BCL-2, but MCL-1 upregulation sequesters BAK independently — apoptotic signal dampened.
    </text>
  </svg>
);

export default BioRenderFigure;
