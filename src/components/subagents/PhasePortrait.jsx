// Mathematica-style phase portrait for the learned Neural ODE, projected
// onto two principal dimensions of the 64D latent resistance state.
// Two stable fixed points (sensitive / resistant basins) separated by a
// saddle. Vector field, nullclines, and a sample trajectory are drawn.
//
// The figure is hand-tuned to look like StreamPlot[] + ContourPlot[] output
// from Mathematica: thin grey streamlines, red nullclines, solid basin-crossing
// trajectory, fixed points marked and classified.

// Vector field arrows — computed offline; positions/directions tuned to
// suggest a saddle near (0.5, 0.5) with basins near (0.2, 0.2) and (0.8, 0.8).
const ARROWS = [
  // Top-left: attracted to (0.2, 0.2) basin
  { x: 0.1, y: 0.25, dx: 0.04, dy: -0.03 },
  { x: 0.15, y: 0.4, dx: 0.02, dy: -0.05 },
  { x: 0.25, y: 0.5, dx: 0.00, dy: -0.05 },
  { x: 0.3, y: 0.35, dx: -0.03, dy: -0.03 },
  { x: 0.1, y: 0.15, dx: 0.04, dy: 0.02 },
  { x: 0.3, y: 0.15, dx: -0.03, dy: 0.02 },
  // Bottom-right: attracted to (0.8, 0.8)
  { x: 0.7, y: 0.55, dx: 0.04, dy: 0.04 },
  { x: 0.8, y: 0.6, dx: 0.02, dy: 0.05 },
  { x: 0.9, y: 0.7, dx: -0.02, dy: 0.04 },
  { x: 0.65, y: 0.85, dx: 0.05, dy: -0.02 },
  { x: 0.9, y: 0.85, dx: -0.04, dy: 0.00 },
  { x: 0.75, y: 0.95, dx: 0.02, dy: -0.04 },
  // Near saddle (0.5, 0.5): unstable along diagonal, stable perpendicular
  { x: 0.45, y: 0.55, dx: -0.03, dy: 0.03 },
  { x: 0.55, y: 0.45, dx: 0.03, dy: -0.03 },
  { x: 0.5, y: 0.35, dx: -0.02, dy: -0.04 },
  { x: 0.5, y: 0.65, dx: 0.02, dy: 0.04 },
  // Flow toward basins
  { x: 0.4, y: 0.25, dx: -0.04, dy: -0.02 },
  { x: 0.6, y: 0.75, dx: 0.04, dy: 0.02 },
];

// Map phase-space coords [0,1] × [0,1] to SVG coords
const W = 560;
const H = 420;
const PAD = 50;
const mapX = (x) => PAD + x * (W - 2 * PAD);
const mapY = (y) => H - PAD - y * (H - 2 * PAD);

const PhasePortrait = () => (
  <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Phase portrait of the resistance-state ODE showing sensitive and resistant basins separated by a saddle">
    <defs>
      <marker id="fieldArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8a9398" />
      </marker>
      <marker id="trajArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#c93e1e" />
      </marker>
    </defs>

    {/* Background plot area */}
    <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} fill="#ffffff" stroke="#d7cbb5" />

    {/* Grid */}
    <g stroke="#e8e2d3" strokeWidth="0.75">
      {[0.25, 0.5, 0.75].map((v) => (
        <line key={`gv${v}`} x1={mapX(v)} x2={mapX(v)} y1={PAD} y2={H - PAD} />
      ))}
      {[0.25, 0.5, 0.75].map((v) => (
        <line key={`gh${v}`} x1={PAD} x2={W - PAD} y1={mapY(v)} y2={mapY(v)} />
      ))}
    </g>

    {/* Axes */}
    <g>
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#1c2628" />
      <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#1c2628" />
      {/* Axis labels */}
      <text x={W - PAD + 14} y={H - PAD + 4} fontFamily="Fraunces, serif" fontStyle="italic" fontSize="14" fill="#1c2628">z₁</text>
      <text x={PAD - 14} y={PAD - 8} fontFamily="Fraunces, serif" fontStyle="italic" fontSize="14" fill="#1c2628">z₂</text>
    </g>

    {/* Nullclines (dz1/dt = 0 red, dz2/dt = 0 orange) */}
    <g fill="none" strokeWidth="1.75">
      {/* dz1/dt = 0: roughly an S-shaped curve */}
      <path
        d={`M ${mapX(0)} ${mapY(0.25)}
            Q ${mapX(0.3)} ${mapY(0.35)} ${mapX(0.5)} ${mapY(0.5)}
            Q ${mapX(0.7)} ${mapY(0.65)} ${mapX(1)} ${mapY(0.75)}`}
        stroke="#c93e1e"
        strokeDasharray="6 4"
      />
      {/* dz2/dt = 0: inverted S-curve */}
      <path
        d={`M ${mapX(0.1)} ${mapY(1)}
            Q ${mapX(0.25)} ${mapY(0.6)} ${mapX(0.5)} ${mapY(0.5)}
            Q ${mapX(0.75)} ${mapY(0.4)} ${mapX(0.9)} ${mapY(0)}`}
        stroke="#c58a2b"
        strokeDasharray="6 4"
      />
    </g>

    {/* Vector field streamlines */}
    <g stroke="#8a9398" strokeWidth="0.9" fill="none" opacity="0.7">
      {ARROWS.map((a, i) => (
        <line
          key={i}
          x1={mapX(a.x)}
          y1={mapY(a.y)}
          x2={mapX(a.x + a.dx)}
          y2={mapY(a.y + a.dy)}
          markerEnd="url(#fieldArrow)"
        />
      ))}
    </g>

    {/* Sample trajectory: sensitive basin -> saddle -> resistant basin */}
    <path
      d={`M ${mapX(0.18)} ${mapY(0.22)}
          Q ${mapX(0.3)} ${mapY(0.35)} ${mapX(0.48)} ${mapY(0.48)}
          Q ${mapX(0.5)} ${mapY(0.52)} ${mapX(0.55)} ${mapY(0.62)}
          Q ${mapX(0.68)} ${mapY(0.72)} ${mapX(0.8)} ${mapY(0.8)}`}
      stroke="#c93e1e"
      strokeWidth="2.25"
      fill="none"
      markerEnd="url(#trajArrow)"
    />

    {/* Fixed points */}
    {/* Stable (sensitive) */}
    <g>
      <circle cx={mapX(0.2)} cy={mapY(0.2)} r="7" fill="#2c6e6a" stroke="white" strokeWidth="2" />
      <text x={mapX(0.2) - 12} y={mapY(0.2) + 25} fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#1c2628">sensitive</text>
      <text x={mapX(0.2) - 12} y={mapY(0.2) + 38} fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" fontStyle="italic">stable node</text>
    </g>
    {/* Stable (resistant) */}
    <g>
      <circle cx={mapX(0.8)} cy={mapY(0.8)} r="7" fill="#a4492f" stroke="white" strokeWidth="2" />
      <text x={mapX(0.8) - 8} y={mapY(0.8) - 16} fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#1c2628">resistant</text>
      <text x={mapX(0.8) - 8} y={mapY(0.8) - 4} fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" fontStyle="italic">stable node</text>
    </g>
    {/* Saddle */}
    <g>
      <rect x={mapX(0.5) - 6} y={mapY(0.5) - 6} width="12" height="12" fill="#c58a2b" stroke="white" strokeWidth="2" transform={`rotate(45 ${mapX(0.5)} ${mapY(0.5)})`} />
      <text x={mapX(0.5) + 10} y={mapY(0.5) - 4} fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#1c2628">saddle</text>
      <text x={mapX(0.5) + 10} y={mapY(0.5) + 8} fontFamily="IBM Plex Sans, sans-serif" fontSize="9" fill="#5a6b70" fontStyle="italic">unstable · λ = ±0.14</text>
    </g>

    {/* Kramers rate annotation */}
    <g transform={`translate(${W - PAD - 170}, ${PAD + 14})`}>
      <rect x="0" y="0" width="160" height="56" rx="8" fill="#1c2628" opacity="0.92" />
      <text x="12" y="20" fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#d7cbb5" letterSpacing="0.06em">KRAMERS ESCAPE RATE</text>
      <text x="12" y="42" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="13" fill="#fde5dd">
        k ≈ 0.08 mo⁻¹
      </text>
    </g>

    {/* Legend */}
    <g transform={`translate(${PAD + 10}, ${H - 24})`} fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fill="#5a6b70">
      <line x1="0" y1="0" x2="22" y2="0" stroke="#c93e1e" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="28" y="4">dz₁/dt = 0</text>
      <g transform="translate(100, 0)">
        <line x1="0" y1="0" x2="22" y2="0" stroke="#c58a2b" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x="28" y="4">dz₂/dt = 0</text>
      </g>
      <g transform="translate(200, 0)">
        <line x1="0" y1="0" x2="22" y2="0" stroke="#c93e1e" strokeWidth="2" />
        <text x="28" y="4">trajectory</text>
      </g>
      <g transform="translate(290, 0)">
        <line x1="0" y1="0" x2="22" y2="0" stroke="#8a9398" strokeWidth="0.9" markerEnd="url(#fieldArrow)" />
        <text x="28" y="4">vector field</text>
      </g>
    </g>
  </svg>
);

export default PhasePortrait;
