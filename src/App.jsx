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
    time: "This is the operating layer.",
    pitch: "Mini CRM, pipelines, the thing the shop actually runs on.",
    includes: [
      "Lead inbox, statuses, notes",
      "Alerts to Telegram or text when a lead hits",
      "Site wired into the system so the form does not die in email",
      "Same $175/hr for scoped extras. Retainer so it stays alive.",
    ],
    not: "Not Command. Command is Custom — walk into The Boat Kings.",
  },
];
const work = [
  {
    tag: "Live · walk in",
    name: "The Boat Kings",
    meta: "Pompano Beach · marine dealership",
    body: "Command sits on the desks. Leads, pipeline, inventory. A real operating system inside a store that clears $20M+ a year. You can walk in and watch it.",
  },
  {
    tag: "Live · public",
    name: "Calice’s Commercial Cleaning",
    meta: "calicescleaning.com",
    href: "https://calicescleaning.com",
    body: "Brand, domain, email, one-pager. South Florida operator. Shipped, not mocked up.",
  },
  {
    tag: "Live · shop floor",
    name: "Dealership lead bot",
    meta: "Telegram · sales floor",
    body: "New leads hit the sales group the moment they come in. No one is refreshing an inbox hoping they didn’t miss it.",
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
            South Florida · systems for operators
          </p>
          <h1 className="mt-6 max-w-4xl font-serif text-[44px] leading-[1.02] tracking-tight md:text-[72px]">
            You can walk into the dealership and watch it run.
          </h1>
          <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-[var(--color-mute)] md:text-[19px]">
            We build websites, brand, and the systems that keep a local business
            moving. Plain language. Real work. No deck full of words nobody on
            the floor uses.
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
              ["01", "Not a pitch.", "You are not buying slides. You are buying the thing that runs."],
              ["02", "Proof is a building.", "The Boat Kings. Pompano. Walk in. Watch Command on the desks."],
              ["03", "Simple words.", "Leads. Follow-up. Website. Email. The machine — said like a human."],
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
            Most of these shops have nothing you can touch.
          </h2>
          <div className="mt-10 max-w-3xl space-y-6 text-[17px] leading-relaxed text-[var(--color-mute)]">
            <p>
              Kids with a Canva account and a ChatGPT tab quoting ten thousand
              dollars. Big words. Nothing on a shop floor.
            </p>
            <p>
              Momentum is the other thing. I sell boats and close deals at The
              Boat Kings. The operating system those desks use — leads,
              pipeline, inventory — I built. Same building. Same people. You
              can stand there and watch a $20 million store run on it.
            </p>
            <p>
              I also ship the small work. A cleaner in South Florida needed a
              brand, a site, and email that looked like a company. That’s live
              too. Affordable on purpose. Making money is the side effect of
              making the business a machine.
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
                      In-store · Pompano
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
                  If it looks like Command — login, pipeline, inventory, the
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
                ["You show me the mess.", "Where leads die. What the site looks like. What you are tired of doing by hand."],
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
            Built for local operators. Not a get-rich shop. Not a partner slash
            group slash ventures sticker on a Canva template.
          </p>
        </div>
      </footer>
    </div>
  );
}
