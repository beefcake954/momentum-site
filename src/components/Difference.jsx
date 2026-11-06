import Reveal from "./ui/Reveal";
import Trace from "./graphics/Trace";

export default function Difference() {
  return (
    <section className="relative pb-20 md:pb-32">
      <Trace />
      <div className="wrap grid gap-12 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-6">
        <Reveal className="lg:col-span-6">
          <p className="label text-[var(--color-faint)]">The difference</p>
          <h2 className="h-display mt-6 text-[clamp(3rem,9vw,7.25rem)] text-abalone">
            <span className="block">Honesty.</span>
            <span className="block md:pl-[0.6em]">Integrity.</span>
            <span className="block md:pl-[1.2em]">Simplicity.</span>
          </h2>
        </Reveal>
        <div className="body-lg max-w-[36rem] space-y-8 text-[var(--color-mute)] lg:col-span-5 lg:col-start-8 lg:self-end">
          <Reveal as="p" delay={0.05} className="border-t border-[var(--color-line)] pt-6">
            Honesty is the number before we start. What it does. What it
            costs. No sticker shock.
          </Reveal>
          <Reveal as="p" delay={0.1} className="border-t border-[var(--color-line)] pt-6">
            Integrity is the filter. If a system will not earn back what you
            paid for it — or make your team's day easier — we will not build
            it. Even good ideas get shelved if the return is not there.
          </Reveal>
          <Reveal as="p" delay={0.15} className="border-t border-[var(--color-line)] pt-6">
            Simplicity is how we work. Sites, bots, CRM, the Brain — even
            full custom operating systems. But we only ship what works.
            Making money is the side effect of making the business a machine.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
