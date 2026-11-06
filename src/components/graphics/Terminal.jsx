import { useRef } from "react";
import useInView from "../../lib/useInView";

/**
 * Mono status lines that type out once on enter. The "typing" is an ink cover
 * sliding off each line in steps(1ch) — transform only, no width animation.
 */
export default function Terminal({ lines, start = 1.2, className = "" }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true });
  let t = start;
  return (
    <div
      ref={ref}
      className={`term border border-[var(--color-line)] bg-panel px-4 py-4 font-mono text-[12px] leading-[1.9] text-[var(--color-mute)] md:px-5 ${on ? "is-on" : ""} ${className}`}
      aria-hidden="true"
    >
      {lines.map((line, i) => {
        const n = Array.from(line).length;
        const dur = Math.min(1.1, 0.035 * n + 0.2);
        const delay = t;
        t += dur + 0.25;
        return (
          <div key={line} className="flex gap-3 whitespace-nowrap">
            <span className="text-teal">›</span>
            <span className="term-line" style={{ "--n": n, "--dur": `${dur.toFixed(2)}s`, "--d": `${delay.toFixed(2)}s` }}>
              {line}
              <span className={`term-cover ${i === lines.length - 1 ? "is-last" : ""}`} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
