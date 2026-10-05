import useReveal from "../hooks/useReveal";

export default function Difference() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal mx-auto max-w-6xl px-5 py-14 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
        The difference
      </p>
      <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
        Honesty. Integrity. Simplicity.
      </h2>
      <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-relaxed text-[var(--color-mute)]">
        <p>
          Honesty is the number before we start. What it does. What it
          costs. No sticker shock.
        </p>
        <p>
          Integrity is the filter. If a system will not earn back what you
          paid for it — or make your team's day easier — we will not build
          it. Even good ideas get shelved if the return is not there.
        </p>
        <p>
          Simplicity is how we work. Sites, bots, CRM, the Brain — even
          full custom operating systems. But we only ship what works.
          Making money is the side effect of making the business a machine.
        </p>
      </div>
    </section>
  );
}
