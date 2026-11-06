import { useRef } from "react";
import useInView from "../../lib/useInView";

/**
 * Circuit-trace hairline used as a section divider. Built from 1px HTML
 * segments that reveal with scaleX/scaleY (transform only), so it stays crisp
 * at every width. A step down, a teal branch, two vias.
 */
export default function Trace({ className = "", at = 42, branch = 64 }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true });
  return (
    <div ref={ref} className={`mx-auto max-w-[1360px] px-4 sm:px-6 md:px-10 ${className}`} aria-hidden="true">
      <div className={`trace relative h-6 ${on ? "is-on" : ""}`} style={{ "--at": `${at}%`, "--br": `${branch}%` }}>
        <span className="trace-h" style={{ top: 5, left: 0, width: "var(--at)", "--d": "0s" }} />
        <span className="trace-v" style={{ top: 5, left: "var(--at)", height: 13, "--d": "0.45s" }} />
        <span className="trace-h" style={{ top: 17, left: "var(--at)", right: 0, "--d": "0.6s" }} />
        <span className="trace-v is-teal" style={{ top: 5, left: "var(--br)", height: 13, "--d": "1.1s", transformOrigin: "bottom" }} />
        <span className="trace-h is-teal" style={{ top: 5, left: "var(--br)", width: "12%", "--d": "1.3s" }} />
        <span className="trace-via" style={{ top: 2, left: "calc(var(--at) - 3px)", "--d": "0.5s" }} />
        <span className="trace-via is-teal" style={{ top: 2, left: "calc(var(--br) + 12% - 3px)", "--d": "1.7s" }} />
      </div>
    </div>
  );
}
