import { useRef } from "react";
import useInView from "../../lib/useInView";
import { useIsMobile } from "../../lib/motion";

/**
 * Side-profile brain built from nodes and hairline connections (frontal lobe
 * left). Mono labels feed lines into it; pulses ride those lines in and hop
 * across the mesh. Draw-ins are one-shot stroke-dashoffset; pulses, node
 * flashes and the sheen are transform/opacity only.
 * Desktop: slow ambient loop, paused off-screen. Phones: one wave, then still.
 * Reduced motion: fully drawn, static.
 */

const W = 680;
const H = 380;

// outline, clockwise from the frontal pole
const OUTLINE = [
  [178, 206], [182, 164], [202, 126], [236, 96], [280, 76], [332, 66], [386, 70], [434, 86],
  [474, 112], [502, 146], [516, 184], [512, 218], [496, 242], [500, 266], [482, 288], [452, 298],
  [420, 292], [404, 302], [398, 338], [376, 338], [374, 300], [352, 280], [314, 284], [274, 276],
  [236, 260], [204, 240],
];

const inside = ([x, y], poly = OUTLINE) => {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build() {
  const rnd = mulberry32(7);
  const nodes = OUTLINE.map((p) => [...p]);
  // interior nodes, rejection-sampled with a minimum spacing
  let tries = 0;
  while (nodes.length < OUTLINE.length + 30 && tries < 4000) {
    tries++;
    const p = [190 + rnd() * 320, 74 + rnd() * 222];
    if (!inside(p)) continue;
    // stay off the outline a little
    if (OUTLINE.some((o) => Math.hypot(o[0] - p[0], o[1] - p[1]) < 26)) continue;
    if (nodes.some((o) => Math.hypot(o[0] - p[0], o[1] - p[1]) < 34)) continue;
    nodes.push([Math.round(p[0]), Math.round(p[1])]);
  }
  // mesh: each interior node to its 3 nearest neighbours, if the link stays inside
  const key = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`);
  const edges = new Map();
  for (let i = OUTLINE.length; i < nodes.length; i++) {
    const near = nodes
      .map((p, j) => [j, Math.hypot(p[0] - nodes[i][0], p[1] - nodes[i][1])])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3);
    for (const [j] of near) {
      const mid = [(nodes[i][0] + nodes[j][0]) / 2, (nodes[i][1] + nodes[j][1]) / 2];
      if (inside(mid)) edges.set(key(i, j), [i, j]);
    }
  }
  return { nodes, edges: [...edges.values()] };
}

const { nodes: NODES, edges: EDGES } = build();

const near = (x, y) =>
  NODES.reduce((best, p, i) => (Math.hypot(p[0] - x, p[1] - y) < Math.hypot(NODES[best][0] - x, NODES[best][1] - y) ? i : best), 0);

// Mesh grows front to back: edges bucketed by x into compound paths so the
// connections appear progressively without hundreds of animated elements.
const BUCKETS = 6;
const MESH = Array.from({ length: BUCKETS }, () => "");
for (const [a, b] of EDGES) {
  const mx = (NODES[a][0] + NODES[b][0]) / 2;
  const k = Math.min(BUCKETS - 1, Math.floor(((mx - 178) / (516 - 178)) * BUCKETS));
  MESH[k] += `M${NODES[a][0]} ${NODES[a][1]}L${NODES[b][0]} ${NODES[b][1]}`;
}

const OUTLINE_D = `M${OUTLINE.map((p) => p.join(" ")).join("L")}Z`;

// sulci and fissures: lateral (Sylvian), central, transverse + cerebellar folia
const FOLDS =
  "M214 236C262 226 304 214 360 196M318 70C312 110 300 146 296 186M496 242C470 256 440 270 420 292" +
  "M432 296C452 282 474 270 494 256M446 292C462 286 478 276 490 268";

const NODE_D = NODES.map(([x, y]) => `M${x - 2.5} ${y - 2.5}h5v5h-5Z`).join("");

// feed lines: label anchor -> elbow -> brain node
const FEEDS = [
  { label: "pricing", side: "l", y: 92, to: near(236, 100) },
  { label: "service", side: "l", y: 196, to: near(184, 196) },
  { label: "inventory", side: "l", y: 300, to: near(250, 266) },
  { label: "ROs", side: "r", y: 84, to: near(440, 92) },
  { label: "leads", side: "r", y: 196, to: near(514, 196) },
  { label: "agents", side: "r", y: 316, to: near(460, 296) },
].map((f, i) => {
  const [tx, ty] = NODES[f.to];
  const x0 = f.side === "l" ? 112 : W - 112;
  const ex = f.side === "l" ? Math.min(tx - 24, 150) : Math.max(tx + 24, W - 150);
  const pts = [[x0, f.y], [ex, f.y], [tx, ty]];
  return { ...f, i, pts, d: `M${pts.map((p) => p.join(" ")).join("L")}` };
});

// a few hops across the mesh after each feed lands
const HOPS = FEEDS.map((f) => {
  const from = f.to;
  const link = EDGES.find(([a, b]) => a === from || b === from) ?? EDGES[0];
  const to = link[0] === from ? link[1] : link[0];
  return [NODES[from], NODES[to], to];
});

const CYCLE = 8; // seconds, desktop loop
const STAGGER = 1.1;

function keyframesFor(f) {
  const [a, b, c] = f.pts;
  const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
  const T = 30; // % of the cycle spent travelling
  const mid = (l1 / (l1 + l2)) * T;
  const [h0, h1] = HOPS[f.i];
  return `
@keyframes br-p${f.i} {
  0% { opacity: 0; transform: translate(${a[0]}px, ${a[1]}px); }
  3% { opacity: 1; }
  ${mid.toFixed(2)}% { transform: translate(${b[0]}px, ${b[1]}px); }
  ${T}% { opacity: 1; transform: translate(${c[0]}px, ${c[1]}px); }
  ${T + 2}%, 100% { opacity: 0; transform: translate(${c[0]}px, ${c[1]}px); }
}
@keyframes br-h${f.i} {
  0%, ${T}% { opacity: 0; transform: translate(${h0[0]}px, ${h0[1]}px); }
  ${T + 1}% { opacity: 1; }
  ${T + 12}% { opacity: 1; transform: translate(${h1[0]}px, ${h1[1]}px); }
  ${T + 15}%, 100% { opacity: 0; transform: translate(${h1[0]}px, ${h1[1]}px); }
}`;
}

const CSS = FEEDS.map(keyframesFor).join("\n");

export default function BrainGraph({ className = "" }) {
  const ref = useRef(null);
  const drawn = useInView(ref, { once: true, rootMargin: "0px 0px -15% 0px" });
  const onScreen = useInView(ref, { rootMargin: "0px" });
  const mobile = useIsMobile();
  const state = `${drawn ? "is-drawn" : ""} ${onScreen ? "" : "is-paused"} ${mobile ? "brain-once" : "brain-loop"}`;

  return (
    <div ref={ref} className={`brain relative ${state} ${className}`} style={{ "--br-cycle": `${CYCLE}s` }}>
      <style>{CSS}</style>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="br-clip">
            <path d={OUTLINE_D} />
          </clipPath>
          <linearGradient id="br-sheen" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#5eead4" stopOpacity="0" />
            <stop offset="0.3" stopColor="#5eead4" stopOpacity="0.22" />
            <stop offset="0.5" stopColor="#e9d5ff" stopOpacity="0.18" />
            <stop offset="0.7" stopColor="#d9f99d" stopOpacity="0.15" />
            <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* feed lines from the labels */}
        <g fill="none" className="br-feed">
          {FEEDS.map((f) => (
            <path key={f.label} d={f.d} pathLength="1" className="draw" style={{ "--d": `${0.15 + f.i * 0.08}s`, "--dur": "1.2s" }} />
          ))}
        </g>

        {/* mesh connects progressively, front to back */}
        <g fill="none" className="br-mesh">
          {MESH.map((d, k) =>
            d ? <path key={k} d={d} pathLength="1" className="draw" style={{ "--d": `${0.5 + k * 0.22}s`, "--dur": "1.6s" }} /> : null,
          )}
        </g>
        <path d={FOLDS} pathLength="1" fill="none" className="draw br-fold" style={{ "--d": "1.3s", "--dur": "1.4s" }} />
        <path d={OUTLINE_D} pathLength="1" fill="none" className="draw br-outline" style={{ "--d": "0.3s", "--dur": "2s" }} />

        {/* abalone sheen, clipped to the brain */}
        <g clipPath="url(#br-clip)">
          <rect className="br-sheen" x="-260" y="50" width="260" height="300" fill="url(#br-sheen)" />
        </g>

        <path d={NODE_D} className="fade br-node" style={{ "--d": "1s" }} />

        {/* target nodes flash as a pulse lands */}
        {FEEDS.map((f) => {
          const [x, y] = NODES[f.to];
          return (
            <rect
              key={f.label}
              className="br-hit"
              x={x - 3.5}
              y={y - 3.5}
              width="7"
              height="7"
              style={{ animationName: "br-flash", animationDelay: `calc(2.2s + ${(f.i * STAGGER).toFixed(2)}s + var(--br-cycle) * 0.3)` }}
            />
          );
        })}

        {/* pulses: in along the feed, then one hop across the mesh */}
        {FEEDS.map((f) => (
          <g key={f.label}>
            <rect className="br-pulse" x="-3" y="-3" width="6" height="6" style={{ animationName: `br-p${f.i}`, animationDelay: `${(2.2 + f.i * STAGGER).toFixed(2)}s` }} />
            <rect className="br-pulse is-hop" x="-2" y="-2" width="4" height="4" style={{ animationName: `br-h${f.i}`, animationDelay: `${(2.2 + f.i * STAGGER).toFixed(2)}s` }} />
          </g>
        ))}
      </svg>

      {FEEDS.map((f) => (
        <span
          key={f.label}
          className={`fade absolute -translate-y-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.04em] text-[var(--color-mute)] md:text-[11px] ${
            f.side === "l" ? "-translate-x-full pr-2" : "pl-2"
          }`}
          style={{ left: `${(f.pts[0][0] / W) * 100}%`, top: `${(f.y / H) * 100}%`, "--d": `${0.2 + f.i * 0.08}s` }}
        >
          {f.label}
        </span>
      ))}
    </div>
  );
}
