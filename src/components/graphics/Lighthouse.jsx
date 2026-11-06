// Hillsboro Inlet Light as line art: octagonal iron skeletal tower (outer and
// inner legs, tie rings, cross-bracing, central stair column), gallery,
// watch room, lantern, roof and ventilator ball.

const CX = 100;
const BASE = 540;
const TOP = 152;
const lerp = (a, b, t) => a + (b - a) * t;
// half-width of a leg at height t (0 = base, 1 = top)
const outer = (t) => lerp(80, 26, t);
const inner = (t) => lerp(36, 11, t);
const yAt = (t) => lerp(BASE, TOP, t);
const RINGS = [0, 0.2, 0.4, 0.6, 0.8, 1];

// Grouped into a handful of compound paths: with pathLength=1 each group
// still draws its strokes in sequence, but the browser animates ~9 elements
// instead of ~50, which is what keeps the draw-in cheap on phones.
function groups() {
  const legs = [
    `M${CX - outer(0)} ${BASE}L${CX - outer(1)} ${TOP}`,
    `M${CX + outer(0)} ${BASE}L${CX + outer(1)} ${TOP}`,
    `M${CX - inner(0)} ${BASE}L${CX - inner(1)} ${TOP}`,
    `M${CX + inner(0)} ${BASE}L${CX + inner(1)} ${TOP}`,
  ].join("");
  const rings = RINGS.slice(1, -1).map((t) => `M${CX - outer(t)} ${yAt(t)}H${CX + outer(t)}`).join("");
  const brace = (s) => {
    let d = "";
    for (let i = 0; i < RINGS.length - 1; i++) {
      const a = RINGS[i], b = RINGS[i + 1];
      d += `M${CX + s * outer(a)} ${yAt(a)}L${CX + s * inner(b)} ${yAt(b)}`;
      d += `M${CX + s * inner(a)} ${yAt(a)}L${CX + s * outer(b)} ${yAt(b)}`;
    }
    return d;
  };
  return [
    `M4 ${BASE}H196`, // ground
    legs,
    `M${CX - 6} ${BASE}V${TOP}M${CX + 6} ${BASE}V${TOP}`, // stair column
    rings,
    brace(-1),
    brace(1),
    // gallery deck, brackets, railing, posts
    `M62 ${TOP}H138M64 ${TOP}L80 ${TOP + 12}M136 ${TOP}L120 ${TOP + 12}M64 138H136M64 ${TOP}V138M76 ${TOP}V138M88 ${TOP}V138M100 ${TOP}V138M112 ${TOP}V138M124 ${TOP}V138M136 ${TOP}V138`,
    // watch room, lantern, mullions
    `M82 138V114H118V138M76 114H124M80 114V76H120V114M90 114V76M100 114V76M110 114V76`,
    // roof, ventilator ball, lightning rod
    `M76 76L100 56L124 76M100 52m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M100 48V30`,
  ];
}

const GROUPS = groups();

export const LAMP = { x: CX, y: 95 };

export default function Lighthouse({ drawn, sweep = "loop", className = "", delay = 0.5 }) {
  return (
    <svg
      viewBox="0 0 200 560"
      className={`lighthouse ${drawn ? "is-drawn" : ""} sweep-${sweep} ${className}`}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
    >
      <defs>
        <linearGradient id="beam-r" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5eead4" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#14b8a6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lamp-glow">
          <stop offset="0" stopColor="#ccfbf1" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#14b8a6" stopOpacity="0.25" />
          <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        className="knockout"
        d={`M${CX - outer(0)} ${BASE}L${CX - outer(1)} ${TOP}H62V138H76V76L100 50L124 76V138H138V${TOP}H${CX + outer(1)}L${CX + outer(0)} ${BASE}Z`}
        fill="#080808"
      />
      {/* beams: a pair of wedges whose scaleX swings through zero, which reads
          as the lens turning. Transform + opacity only. */}
      <g className="beams" transform={`translate(${LAMP.x} ${LAMP.y})`}>
        <path className="beam beam-a" d="M0 -2L900 -70V70L0 2Z" fill="url(#beam-r)" />
        {/* mirrored in a wrapper: a CSS transform on the path itself would
            replace an SVG transform attribute */}
        <g transform="scale(-1 1)">
          <path className="beam beam-b" d="M0 -2L900 -70V70L0 2Z" fill="url(#beam-r)" />
        </g>
      </g>
      <circle className="lamp" cx={LAMP.x} cy={LAMP.y} r="26" fill="url(#lamp-glow)" />

      <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="butt">
        {GROUPS.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength="1"
            className="draw"
            style={{ "--d": `${delay + i * 0.09}s`, "--dur": "1.4s" }}
          />
        ))}
      </g>
    </svg>
  );
}
