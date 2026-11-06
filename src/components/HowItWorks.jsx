import { useRef } from "react";
import Reveal from "./ui/Reveal";
import useInView from "../lib/useInView";

const steps = [
  [
    "You pick a time.",
    "Twenty minutes. Calendar holds it. I get pinged on Telegram the second you book.",
  ],
  [
    "You show me what needs work.",
    "The site. The brand files. The bots that do not fire. The CRM nobody uses. Or something brand new — a first website, a system to cut labor, a way to get your team organized. Show me where it hurts.",
  ],
  [
    "You leave with a number.",
    "Start, Build, System, or Custom. If it is not a fit I will say so.",
  ],
];

export default function HowItWorks() {
  const ref = useRef(null);
  const on = useInView(ref, { once: true });
  return (
    <section className="relative border-t border-[var(--color-line)] py-20 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="label text-[var(--color-faint)]">How a call goes</p>
        </Reveal>
        {/* a real sequence, so it reads as a timeline: a hairline with three
            stops that draws across (desktop) or down (phones) once */}
        <ol ref={ref} className={`timeline relative mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-6 ${on ? "is-on" : ""}`}>
          <span aria-hidden="true" className="timeline-rule" />
          {steps.map(([t, b], i) => (
            <li key={t} className="relative pl-10 md:pl-0 md:pt-12 md:pr-8" style={{ "--d": `${0.3 + i * 0.25}s` }}>
              <span aria-hidden="true" className="timeline-stop" />
              <div className="label text-teal">0{i + 1}</div>
              <h3 className="h-display mt-3 text-[clamp(1.9rem,3vw,2.6rem)] text-abalone">{t}</h3>
              <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-[var(--color-mute)] md:text-[16px]">{b}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
