import useReveal from "../hooks/useReveal";

export default function Marine() {
  const ref = useReveal();
  return (
    <section id="marine" ref={ref} className="reveal mx-auto max-w-6xl px-5 py-14 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
        The specialty
      </p>
      <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
        Marine is our specialty. Not the whole company.
      </h2>
      <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-relaxed text-[var(--color-mute)]">
        <p>
          Boats are the niche we know best. The Boat Kings — a partner, on
          a high-volume floor in Pompano. Boat World USA — over 40 years in
          business, and we are installing the same class of system. Marine
          is a specialty because that is where the product was proven. Not
          because we only serve boats.
        </p>
      </div>
    </section>
  );
}
