import Reveal from "./ui/Reveal";
import CalEmbed from "./CalEmbed";

export default function BookSection() {
  return (
    <section id="book" className="relative border-t border-[var(--color-line)] py-20 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="label text-teal">Book</p>
          <h2 className="h-display mt-6 max-w-[14ch] text-[clamp(2.8rem,8vw,7rem)] text-abalone">
            Put twenty minutes on the calendar.
          </h2>
          <p className="body-lg mt-8 max-w-xl text-[var(--color-mute)]">
            No funnel. No twelve-page form. Pick a slot. I show up.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 md:mt-20">
          <CalEmbed />
        </Reveal>
      </div>
    </section>
  );
}
