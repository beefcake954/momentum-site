import useReveal from "../hooks/useReveal";

const props = [
  [
    "01",
    "Built from the floor up.",
    "Momentum started inside a marine dealership. The systems we built there are the same ones we bring to every shop.",
  ],
  [
    "02",
    "New and small welcome.",
    "First website, first logo, a simple CRM or bot — whatever your business needs to get off the ground. We go all the way to fully custom operating systems. You do not need a busy floor to start.",
  ],
  [
    "03",
    "Plain language.",
    "Site. Brand. CRM. Bots. The Brain. The whole point of AI in your business is understanding how it helps — not getting buried in jargon and a multi-thousand-dollar deposit.",
  ],
];

export default function ValueProps() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal border-y border-[var(--color-line)] bg-panel">
      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-3">
        {props.map(([n, t, b]) => (
          <div
            key={n}
            className="border-[var(--color-line)] px-5 py-8 md:border-r md:last:border-r-0"
          >
            <div className="font-mono text-[11px] tracking-[0.2em] text-teal">{n}</div>
            <h2 className="mt-3 font-serif text-2xl">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
