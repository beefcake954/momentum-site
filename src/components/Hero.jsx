import { useRef } from "react";
import useInView from "../lib/useInView";
import InletChart from "./graphics/InletChart";
import Lighthouse from "./graphics/Lighthouse";

const LINES = ["Honest work for", "local businesses.", "No guru language."];
// Hillsboro Inlet Light. Sources: Wikipedia (26°15′32″N 80°4′51″W) and
// USBeacons (N 26°15′33.4″ W 80°4′50.7″), checked 2026-11-06.
const COORDS = "26°15′33″N 80°04′51″W";

function Place({ className = "" }) {
  return (
    <p className={`font-mono text-[11px] leading-relaxed tracking-[0.04em] text-[var(--color-faint)] ${className}`}>
      <span className="block text-[var(--color-mute)]">Hillsboro Inlet · Pompano Beach</span>
      <span className="block tabular-nums">{COORDS}</span>
    </p>
  );
}

export default function Hero({ ready = true }) {
  const ref = useRef(null);
  const onScreen = useInView(ref, { rootMargin: "0px" });
  // One orchestrated entrance, driven by a single class flip and CSS
  // transitions (compositor-only, zero JS per frame). Delays live in --d.
  const at = (i) => ({ "--d": `${(0.55 + i * 0.08).toFixed(2)}s` });

  return (
    <section ref={ref} className={`hero-wrap relative overflow-hidden ${ready ? "is-ready" : ""}`}>
      <div className="hero-chart" aria-hidden="true">
        <InletChart drawn={ready} className="block h-full w-full" />
      </div>

      <div className="hero relative mx-auto max-w-[1360px] px-4 sm:px-6 md:px-10">
        <div className="flex items-start justify-between gap-6">
          <p
            style={at(-5)}
            className="rv flex items-center gap-3 font-mono text-[12px] tracking-[0.04em] text-teal"
          >
            <span aria-hidden="true" className="inline-block h-px w-8 bg-teal" />
            South Florida · AI for local businesses
          </p>
          <div style={at(4)} className="rv hidden lg:block">
            <Place className="text-right" />
          </div>
        </div>

        <h1 className="hero-h1 relative z-[1] mt-7 font-serif text-abalone md:mt-10">
          {LINES.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="line" style={{ "--d": `${(0.08 + i * 0.11).toFixed(2)}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* desktop lighthouse: continuous slow sweep, paused off-screen */}
        <div className="hero-light pointer-events-none absolute hidden lg:block" aria-hidden="true">
          <Lighthouse drawn={ready} sweep="loop" className={`h-full w-auto ${onScreen ? "" : "is-paused"}`} />
        </div>

        <div
          aria-hidden="true"
          className="hero-rule relative mt-10 h-px origin-left bg-[var(--color-line-strong)] md:mt-14"
        />

        <div className="relative grid gap-10 pb-12 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-6 lg:pb-28">
          <p
            style={at(0)}
            className="rv hero-sub max-w-[34rem] text-[var(--color-mute)] lg:order-2 lg:col-span-6 lg:col-start-7"
          >
            Sites, bots, systems — whatever is drowning the week. If it is
            stuck, outdated, or still done by hand for no reason, we build past
            it. New shops. Small shops. Family shops. Integrity first.
          </p>

          <div
            style={at(1.5)}
            className="rv flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8 lg:order-1 lg:col-span-5 lg:self-end"
          >
            <a href="#book" className="btn-primary">
              Book a discovery call
              <Arrow />
            </a>
            <a href="#work" className="btn-text self-start sm:self-auto">
              See the work
            </a>
          </div>
        </div>

        {/* phones + tablets: small lighthouse strip, one sweep then still */}
        <div
          style={at(3)}
          className="rv relative flex items-end gap-5 border-t border-[var(--color-line)] pb-10 pt-6 lg:hidden"
        >
          <Lighthouse drawn={ready} sweep="once" delay={0.9} className="h-[150px] w-auto shrink-0" />
          <Place className="pb-1" />
        </div>
      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg className="btn-arrow" width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
      <path d="M0 5h12.5M8.5 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}
