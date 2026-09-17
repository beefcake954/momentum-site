import { useCallback, useState } from "react";
import Mark from "./components/Mark.jsx";
import CalEmbed from "./components/CalEmbed.jsx";
import Loader from "./components/Loader.jsx";
const packages = [
  {
    id: "01",
    name: "Start",
    price: "$500–$750",
    time: "Set on the call. Flat. Done in days.",
    pitch: "A real small site. Pages. Brand. Email. Not a one-block landing page.",
    includes: [
      "3 logo files ready to print and use",
      "Small multi-page site — Home, Services, Contact, plus what the call says you need",
      "Google Workspace year one (one branded inbox)",
      "Form that hits your phone or inbox",
    ],
    not: "Not a giant brochure. Not ads. Not a CRM. $500 if the scope is tight. $750 if it is not.",
    featured: true,
  },
  {
    id: "02",
    name: "Build",
    price: "$175/hr",
    time: "You get an hour estimate before anything starts.",
    pitch: "Bigger site. Ads. Automations. The extra pages and the follow-up.",
    includes: [
      "Anything past Start — more pages, more structure, better local search",
      "Ads and creative when you want the phone to ring on purpose",
      "Lead routing, alerts, follow-up that does not live in someone’s head",
      "Quoted in hours. No surprise balloon at the end.",
    ],
    not: "Not a $12k sticker to look expensive. Hours × $175.",
  },
  {
    id: "03",
    name: "System",
    price: "Deposit + retainer",
    time: "CRM, lead bots, the Brain. Then we stay on it.",
    pitch: "The operating layer the shop actually runs: a real CRM, lead bots, and the Brain that keeps follow-up from living in one person’s head.",
    includes: [
      "CRM — lead inbox, statuses, notes, pipeline",
      "Lead bots to Telegram or text the moment a lead hits",
      "The Brain — context and routing so the floor is not guessing",
      "Site wired in so the form does not die in email. Deposit to start. Retainer so it stays alive. Same $175/hr for scoped extras.",
    ],
    not: "Not a one-week install you forget. Deposit + retainer. Hours written down first.",
  },
];
const work = [
  {
    tag: "Live · partner",
    name: "The Boat Kings",
    meta: "Pompano Beach · marine dealership",
    body: "We work with the store. CRM, lead bots, the Brain on the floor. A 20+ year high-revenue floor. They sell the boats. We are not the dealership.",
    foot: "Live · Pompano",
  },
  {
    tag: "Installing",
    name: "Boat World USA",
    meta: "South Florida · marine dealership",
    body: "Same kind of floor. Leads, pipeline, the operating layer going in now. We are installing. They run the store.",
    foot: "Installing",
  },
  {
    tag: "Live · new accounts",
    name: "New operators",
    meta: "Sites, brand, follow-up",
    body: "A mix of small sites, brand files, inboxes, and lead routing for shops that just started with us. No case-study theater.",
    foot: "In progress with us",
  },
];
export default function App() {
  const [booting, setBooting] = useState(true);
  const finishBoot = useCallback(() => setBooting(false), []);
  return (
    <div className="min-h-screen bg-ink text-abalone">
      {booting ? <Loader onDone={finishBoot} /> : null}
      <div className="pointer-events-none fixed inset-0 grid-fade" />
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[rgba(5,5,5,0.88)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <Mark />
            <div className="leading-none">
              <div className="font-serif text-lg tracking-tight">Momentum</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-faint)]">
                Pompano Beach
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-[var(--color-mute)] sm:flex">
            <a href="#marine" className="hover:text-abalone">Marine</a>
            <a href="#work" className="hover:text-abalone">Work</a>
            <a href="#packages" className="hover:text-abalone">Packages</a>
            <a href="#book" className="hover:text-abalone">Book</a>
          </nav>
          <a href="#book" className="glow-cta bg-teal px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
            Book 20 min
          </a>
        </div>
      </header>
      <main id="top">
        <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 md:pt-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
            South Florida · AI for local businesses
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-[44px] leading-[1.02] tracking-tight md:text-[72px]">
            We help local businesses become well-oiled machines.
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-[var(--color-mute)] md:text-[19px]">
            New shops. Small shops. Family shops. Websites, brand, lead bots,
            follow-up, custom systems — whatever is drowning the week. Creative
            outlet. We can create it. Honesty. Integrity. Simple words. Making
            money is the plus.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#book" className="glow-cta bg-teal px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-ink">
              Book a discovery call
            </a>
            <a href="#work" className="border border-[var(--color-line-strong)] px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] text-abalone hover:border-teal">
              See the work
            </a>
          </div>
        </section>
        <section className="border-y border-[var(--color-line)] bg-panel">
          <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-3">
            {[
              ["01", "Not the dealership.", "They sell the boats. We install the layer the floor actually uses."],
              ["02", "New and small welcome.", "First site, first inbox, first bot. You do not need a 20-year store to start."],
              ["03", "Simple words.", "Site. Brand. CRM. Bots. The Brain. Said like a human."],
            ].map(([n, t, b]) => (
              <div key={n} className="border-[var(--color-line)] px-5 py-8 md:border-r md:last:border-r-0">
                <div className="font-mono text-[11px] tracking-[0.2em] text-teal">{n}</div>
                <h2 className="mt-3 font-serif text-2xl">{t}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">{b}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-faint)]">The difference</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Honesty. Integrity. Simplicity.
          </h2>
          <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-relaxed text-[var(--color-mute)]">
            <p>
              Honesty is the number before we start, and whose building it is.
              We do not pretend to be the store.
            </p>
            <p>
              Integrity is the install on the floor. CRM, lead bots, the Brain —
              used during the day, not parked in a deck. If it is not ready we
              say so.
            </p>
            <p>
              Simplicity is the language. Site. Brand. Follow-up. Labor that
              should not live in one person’s head. We build that. Affordable
              on purpose. Making money is the side effect of making the
              business a machine.
            </p>
          </div>
        </section>
        <section id="marine" className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">03 · The specialty</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Marine is a specialty. Not the whole company.
          </h2>
          <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-relaxed text-[var(--color-mute)]">
            <p>
              Most of the work is local, new, small, family. A first site. A
              first inbox. A shop that wants the week to stop drowning.
            </p>
            <p>
              Boats are the niche we know in our bones. The Boat Kings — we
              work with the store. Boat World USA — we are installing. A 20+
              year high-revenue floor. Proof you can check. Not the whole
              company.
            </p>
          </div>
        </section>
        <section id="work" className="border-t border-[var(--color-line)] bg-panel py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">04 · Work you can check</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">On the floor. Not in a case-study PDF.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {work.map((item) => (
                <article key={item.name} className="flex flex-col border border-[var(--color-line)] bg-ink p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">{item.tag}</div>
                  <h3 className="mt-4 font-serif text-2xl">{item.name}</h3>
                  <p className="mt-1 font-mono text-[11px] text-[var(--color-faint)]">{item.meta}</p>
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-[var(--color-mute)]">{item.body}</p>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-teal hover:underline">
                      Open site →
                    </a>
                  ) : (
                    <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-faint)]">
                      {item.foot}
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="packages" className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-faint)]">05 · Packages</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">A flat start. Then you pay for hours.</h2>
          <p className="mt-5 max-w-2xl text-[var(--color-mute)]">
            No fake “was $18k” line. Start is a flat number after a 20-minute
            call. Everything past that is $175 an hour with the hours written
            down first.
          </p>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {packages.map((p) => (
              <article
                key={p.id}
                className={`flex flex-col border bg-panel p-6 ${p.featured ? "border-teal glow-cta" : "border-[var(--color-line)]"}`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-teal">{p.id}</span>
                  {p.featured ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-teal">Most shops land here</span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-serif text-3xl">{p.name}</h3>
                <div className="mt-2 font-mono text-2xl tabular-nums text-abalone">{p.price}</div>
                <p className="mt-1 font-mono text-[11px] text-[var(--color-faint)]">{p.time}</p>
                <p className="mt-5 text-sm text-[var(--color-mute)]">{p.pitch}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-abalone">
                  {p.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-teal">▸</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[11px] text-[var(--color-faint)]">{p.not}</p>
                <a
                  href="#book"
                  className={`mt-8 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] ${p.featured ? "bg-teal text-ink" : "border border-[var(--color-line-strong)] text-abalone"}`}
                >
                  Book this
                </a>
              </article>
            ))}
          </div>
          <div className="mt-4 border border-[var(--color-line)] bg-panel p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-teal">04</p>
                <h3 className="mt-2 font-serif text-3xl">Custom</h3>
                <p className="mt-3 max-w-2xl text-[var(--color-mute)]">
                  If it is the full CRM, the lead bots, and the Brain — the
                  thing the whole store lives in — that is not a package. We
                  scope it, take a deposit, then a retainer so it keeps moving.
                  Same $175 an hour. You will know the number before we build.
                </p>
              </div>
              <a href="#book" className="border border-teal px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-teal">
                Talk Custom
              </a>
            </div>
          </div>
        </section>
        <section className="border-y border-[var(--color-line)] bg-panel py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-faint)]">06 · How a call goes</p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                ["You pick a time.", "Twenty minutes. Calendar holds it. I get pinged on Telegram the second you book."],
                ["You show me the mess.", "The site. The brand files. The bots that do not fire. The CRM nobody uses. The labor that only lives in one person’s head."],
                ["You leave with a number.", "Start, Build, System, or Custom. If it is not a fit I will say so."],
              ].map(([t, b], i) => (
                <div key={t}>
                  <div className="font-mono text-[11px] text-teal">0{i + 1}</div>
                  <h3 className="mt-2 font-serif text-2xl">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--color-mute)]">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="book" className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">07 · Book</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Put twenty minutes on the calendar.</h2>
          <p className="mt-5 max-w-xl text-[var(--color-mute)]">
            No funnel. No twelve-page form. Pick a slot. I show up.
          </p>
          <div className="mt-10">
            <CalEmbed />
          </div>
        </section>
      </main>
      <footer className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <Mark className="h-6 w-6" />
            <div>
              <div className="font-serif">Momentum</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-faint)]">
                Pompano Beach, Florida
              </div>
            </div>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-[var(--color-faint)]">
            Built for local operators. Honesty, integrity, simplicity. We work
            with the stores. We are not the stores.
          </p>
        </div>
      </footer>
    </div>
  );
}
