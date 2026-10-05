import useReveal from "../hooks/useReveal";

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
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal border-y border-[var(--color-line)] bg-panel py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
          How a call goes
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map(([t, b], i) => (
            <div key={t}>
              <div className="font-mono text-[11px] text-teal">0{i + 1}</div>
              <h3 className="mt-2 font-serif text-2xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
