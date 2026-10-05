export default function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 md:pb-24 md:pt-24">
      <div className="hero-glow" />
      <p className="animate-fade-up font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
        South Florida · AI for local businesses
      </p>
      <h1 className="animate-fade-up delay-100 mt-6 max-w-4xl font-serif text-[44px] leading-[1.02] tracking-tight md:text-[72px]">
        Honest work for local businesses.
        <br />
        No guru language.
      </h1>
      <p className="animate-fade-up delay-200 mt-8 max-w-2xl text-[17px] leading-relaxed text-[var(--color-mute)] md:text-[19px]">
        Websites, bots, and custom systems — whatever is drowning the week.
        If it is stuck, outdated, or still done by hand for no reason, we
        build past it. New businesses. Small businesses. Family shops.
        Integrity first.
      </p>
      <div className="animate-fade-up delay-300 mt-10 flex flex-wrap items-center gap-4">
        <a
          href="#book"
          className="btn-lift glow-cta bg-teal px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink"
        >
          Book a discovery call
        </a>
        <a
          href="#work"
          className="btn-lift border border-[var(--color-line-strong)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-abalone hover:border-teal hover:text-teal"
        >
          See the work
        </a>
      </div>
    </section>
  );
}
