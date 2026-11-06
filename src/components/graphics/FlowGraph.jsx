import { useId, useMemo, useRef } from "react";
import useInView from "../../lib/useInView";
import { useIsMobile } from "../../lib/motion";

/**
 * Circuit-routed flow graph. Orthogonal traces draw in once on enter, nodes
 * fade in, then a teal packet travels the route (transform only). Desktop
 * loops the packet and pauses it off-screen; phones run it once.
 *
 * nodes: [{ x, y, label, labelAt: "above" | "below" }] in viewBox units.
 * The route is built from node to node with a vertical jog halfway.
 */
export default function FlowGraph({ nodes, width = 560, height = 220, duration = 6.5, className = "" }) {
  const ref = useRef(null);
  const drawn = useInView(ref, { once: true });
  const onScreen = useInView(ref, { rootMargin: "0px" });
  const mobile = useIsMobile();
  const uid = useId().replace(/[^a-z0-9]/gi, "");

  const { d, keyframes, nodeAt } = useMemo(() => {
    const pts = [[nodes[0].x, nodes[0].y]];
    const nodeIndex = [0];
    for (let i = 1; i < nodes.length; i++) {
      const a = nodes[i - 1], b = nodes[i];
      const mx = (a.x + b.x) / 2;
      pts.push([mx, a.y], [mx, b.y], [b.x, b.y]);
      nodeIndex.push(pts.length - 1);
    }
    const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = segs.reduce((s, v) => s + v, 0);
    // packet travels during 0-72%, rests on the last node, fades, restarts
    const TRAVEL = 72;
    let acc = 0;
    const stops = pts.map((p, i) => {
      if (i > 0) acc += segs[i - 1];
      return { pct: (acc / total) * TRAVEL, p };
    });
    const kf = [
      ...stops.map(({ pct, p }) => `${pct.toFixed(2)}% { transform: translate(${p[0]}px, ${p[1]}px); opacity: 1; }`),
      `86% { transform: translate(${pts.at(-1)[0]}px, ${pts.at(-1)[1]}px); opacity: 1; }`,
      `94%, 100% { transform: translate(${pts.at(-1)[0]}px, ${pts.at(-1)[1]}px); opacity: 0; }`,
    ].join("\n");
    const at = nodeIndex.map((pi) => stops[pi].pct);
    return { d: `M${pts.map((p) => p.join(" ")).join("L")}`, keyframes: kf, nodeAt: at };
  }, [nodes]);

  const name = `pk-${uid}`;
  const css = `
    @keyframes ${name} { 0% { opacity: 0; transform: translate(${nodes[0].x}px, ${nodes[0].y}px); } ${keyframes} }
    ${nodeAt
      .map(
        (pct, i) => `@keyframes ${name}-n${i} {
          0%, ${Math.max(0, pct - 0.5).toFixed(2)}% { opacity: 0; }
          ${(pct + 1).toFixed(2)}% { opacity: 1; }
          90% { opacity: 1; } 100% { opacity: 0; } }`,
      )
      .join("\n")}
  `;

  const mode = mobile ? "once" : "loop";
  const state = `${drawn ? "is-drawn" : ""} ${onScreen ? "" : "is-paused"} flow-${mode}`;

  return (
    <div ref={ref} className={`flow relative ${state} ${className}`} style={{ "--flow-dur": `${duration}s`, "--flow-name": name }}>
      <style>{css}</style>
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
        {/* faint parallel bus traces with vias, for context */}
        <path
          d={`M0 ${height - 14}H${width * 0.6}l8 8H${width}`}
          className="fade"
          stroke="rgba(232,228,217,0.08)"
          fill="none"
          style={{ "--d": "0.1s" }}
        />
        <path d={d} pathLength="1" className="draw" stroke="rgba(232,228,217,0.38)" strokeWidth="1.1" fill="none" style={{ "--d": "0.2s", "--dur": "1.6s" }} />
        {nodes.map((n, i) => (
          <g key={n.label} className="fade" style={{ "--d": `${0.35 + i * 0.25}s` }}>
            <rect x={n.x - 7} y={n.y - 7} width="14" height="14" fill="#080808" stroke="rgba(232,228,217,0.6)" strokeWidth="1.1" />
            <rect
              className="flow-hit"
              x={n.x - 3.5}
              y={n.y - 3.5}
              width="7"
              height="7"
              fill="#14b8a6"
              style={{ animationName: `${name}-n${i}` }}
            />
          </g>
        ))}
        <rect className="flow-packet" x="-4" y="-4" width="8" height="8" fill="#5eead4" style={{ animationName: name }} />
      </svg>
      {nodes.map((n, i) => (
        <span
          key={n.label}
          className="fade absolute -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-[0.04em] text-[var(--color-mute)]"
          style={{
            left: `${(n.x / width) * 100}%`,
            top: `${(n.y / height) * 100}%`,
            marginTop: n.labelAt === "below" ? "16px" : "-32px",
            "--d": `${0.45 + i * 0.25}s`,
          }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}
