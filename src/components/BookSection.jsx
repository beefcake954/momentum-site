import useReveal from "../hooks/useReveal";
import CalEmbed from "./CalEmbed";

export default function BookSection() {
  const ref = useReveal();
  return (
    <section id="book" ref={ref} className="reveal mx-auto max-w-6xl px-5 py-14 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
        Book
      </p>
      <h2 className="mt-4 font-serif text-4xl md:text-5xl">
        Put twenty minutes on the calendar.
      </h2>
      <p className="mt-5 max-w-xl text-[var(--color-mute)]">
        No funnel. No twelve-page form. Pick a slot. I show up.
      </p>
      <div className="mt-10">
        <CalEmbed />
      </div>
    </section>
  );
}
