// Hairline nautical-chart study of Hillsboro Inlet: Intracoastal to the west,
// barrier island, the inlet cut and jetties, ebb-shoal depth contours, the
// dredged channel with its markers, and a compass rose. Stylised, not survey data.
// Land is left, the Atlantic is right.

const D = (d, delay, extra = {}) => ({ d, delay, ...extra });

// Compound paths keep the number of animated elements low (cheap on phones);
// each still draws its sub-strokes in sequence thanks to pathLength=1.
const PATHS = [
  D("M8 8H792V712H8Z", 0),
  D("M300 8V712M600 8V712M8 240H792M8 480H792", 0.1, { faint: true }), // graticule
  // Intracoastal Waterway
  D("M150 8C160 130 138 250 154 370S148 600 160 712M206 8C216 120 196 236 210 350M210 410C200 520 214 620 206 712", 0.25),
  // barrier-island shoreline, broken by the inlet, and the inlet cut
  D("M420 8C426 140 416 262 430 350M440 410C432 500 440 620 430 712", 0.4, { strong: true }),
  D("M210 350C282 344 360 353 430 350M210 410C290 416 370 405 440 410", 0.55, { strong: true }),
  D("M430 350L494 341M440 410L488 404", 0.85, { teal: true }), // jetties
  // depth contours, bulging over the ebb shoal
  D("M512 8C518 200 506 300 556 380S516 560 524 712", 0.7),
  D("M596 8C606 204 586 292 640 382S600 572 610 712", 0.8),
  D("M688 8C698 212 676 302 716 386S688 582 698 712", 0.9),
  D("M770 8C777 222 758 312 784 390S768 592 775 712", 1.0),
];

// Red-right-returning: nuns (triangles) on the north edge, cans (squares) south.
const NUNS = [540, 622, 706].map((x, i) => `M${x - 5} ${360 + i * 3}h10l-5 -10z`);
const CANS = [540, 622, 706].map((x, i) => `M${x - 4} ${398 - i}h8v8h-8z`);

function roseTicks() {
  const cx = 690, cy = 612, r = 44;
  const out = [];
  for (let a = 0; a < 360; a += 15) {
    const rad = (a * Math.PI) / 180;
    const len = a % 90 === 0 ? 10 : a % 45 === 0 ? 6 : 3;
    const x1 = cx + Math.sin(rad) * r, y1 = cy - Math.cos(rad) * r;
    const x2 = cx + Math.sin(rad) * (r - len), y2 = cy - Math.cos(rad) * (r - len);
    out.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
  }
  return out.join("");
}

function edgeTicks() {
  let d = "";
  for (let x = 48; x < 792; x += 40) d += `M${x} 8v${x % 200 === 8 ? 10 : 5}M${x} 712v-${x % 200 === 8 ? 10 : 5}`;
  for (let y = 48; y < 712; y += 40) d += `M8 ${y}h5M792 ${y}h-5`;
  return d;
}

export default function InletChart({ drawn, className = "" }) {
  return (
    <svg
      viewBox="0 0 800 720"
      className={`chart ${drawn ? "is-drawn" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" strokeWidth="1.1" strokeLinecap="butt">
        {PATHS.map((p) => (
          <path
            key={p.d}
            d={p.d}
            pathLength="1"
            className={`draw ${p.faint ? "c-faint" : p.strong ? "c-strong" : p.teal ? "c-teal" : "c-line"}`}
            style={{ "--d": `${p.delay}s` }}
          />
        ))}
        <path d={edgeTicks()} className="fade c-line" style={{ "--d": "0.5s" }} />

        {/* dredged channel */}
        <path d="M494 362L770 374M488 398L770 392" className="fade c-teal" strokeDasharray="6 7" style={{ "--d": "1.2s" }} />
        <path d={NUNS.join("")} className="fade c-teal" style={{ "--d": "1.35s" }} />
        <path d={CANS.join("")} className="fade c-teal" style={{ "--d": "1.45s" }} />

        {/* light position, north side of the inlet */}
        <path d="M418 332m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0M418 318v28M404 332h28" className="fade c-teal" style={{ "--d": "1.5s" }} />

        {/* compass rose */}
        <path d="M690 612m-44 0a44 44 0 1 0 88 0a44 44 0 1 0 -88 0" pathLength="1" className="draw c-line" style={{ "--d": "1.1s" }} />
        <path d={roseTicks()} className="fade c-line" style={{ "--d": "1.4s" }} />
        <path d="M690 548L696 612L690 676L684 612Z" className="fade c-strong" style={{ "--d": "1.5s" }} />
      </g>
    </svg>
  );
}
