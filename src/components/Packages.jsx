import useReveal from "../hooks/useReveal";

const packages = [
  {
    id: "01",
    name: "Start",
    price: "$500–$750",
    time: "Set on the call. Flat. Done in days.",
    pitch:
      "Launch-ready from day one. A real multi-page site, brand, and inbox — built with care, not cranked out.",
    includes: [
      "3 logo files ready to print and use",
      "Multi-page site built to launch — Home, Services, Contact, plus what the call says you need",
      "Google Workspace year one (one branded inbox)",
      "Form that hits your phone or inbox",
    ],
    not: "Not a one-block landing page. Not ads. Not a CRM. $500 if the scope is tight. $750 if it is not.",
    featured: true,
  },
  {
    id: "02",
    name: "Build",
    price: "$175/hr",
    time: "You get an hour estimate before anything starts.",
    pitch:
      "Bigger site. Ads. Automations. The extra pages and the follow-up.",
    includes: [
      "Anything past Start — more pages, more structure, better local search",
      "Ads and creative when you want the phone to ring on purpose",
      "Lead routing, alerts, follow-up that does not live in someone's head",
      "Quoted in hours. No surprise balloon at the end.",
    ],
    not: "Not a $12k sticker to look expensive. Hours × $175.",
  },
  {
    id: "03",
    name: "System",
    price: "Deposit + retainer",
    time: "CRM, pipelines, lead bots. Then we stay on it.",
    pitch:
      "The operating layer the shop actually runs on: a real CRM, pipelines, lead bots, and the site wired in so follow-up does not live in one person's head.",
    includes: [
      "CRM — lead inbox, statuses, notes, pipeline",
      "Lead bots to Telegram or text the moment a lead hits",
      "Pipelines — every lead has a stage and an owner",
      "Site wired in so the form does not die in email. Deposit to start. Retainer so it stays alive. Same $175/hr for scoped extras.",
    ],
    not: "Not a one-week install you forget. Deposit + retainer. Hours written down first.",
  },
];

export default function Packages() {
  const ref = useReveal();
  return (
    <section id="packages" ref={ref} className="reveal mx-auto max-w-6xl px-5 py-14 md:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-faint)]">
        Packages
      </p>
      <h2 className="mt-4 font-serif text-4xl md:text-5xl">
        A simple package to start. Builds become hourly.
      </h2>
      <p className="mt-5 max-w-2xl text-[var(--color-mute)]">
        No fake "was $18k" line. Start is a flat number after a 20-minute
        call. Everything past that is $175 an hour with the hours written
        down first.
      </p>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {packages.map((p) => (
          <article
            key={p.id}
            className={`card-hover flex flex-col border bg-panel p-6 ${
              p.featured
                ? "border-teal glow-cta"
                : "border-[var(--color-line)]"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] text-teal">
                {p.id}
              </span>
              {p.featured ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-teal">
                  Most shops land here
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 font-serif text-3xl">{p.name}</h3>
            <div className="mt-2 font-mono text-2xl tabular-nums text-abalone">
              {p.price}
            </div>
            <p className="mt-1 font-mono text-[11px] text-[var(--color-faint)]">
              {p.time}
            </p>
            <p className="mt-5 text-sm text-[var(--color-mute)]">{p.pitch}</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-abalone">
              {p.includes.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-teal">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[11px] text-[var(--color-faint)]">
              {p.not}
            </p>
            <a
              href="#book"
              className={`btn-lift justify-center mt-8 px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.16em] ${
                p.featured
                  ? "bg-teal text-ink hover:bg-[#17c4b0]"
                  : "border border-[var(--color-line-strong)] text-abalone hover:border-teal hover:text-teal"
              }`}
            >
              Book this
            </a>
          </article>
        ))}
      </div>

      {/* Custom tier */}
      <div className="mt-4 border border-[var(--color-line)] bg-panel p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-teal">04</p>
            <h3 className="mt-2 font-serif text-3xl">Custom</h3>
            <p className="mt-3 max-w-2xl text-[var(--color-mute)]">
              Command-class. A full operating system scoped to your
              business — CRM, lead bots, dashboards, AI agents, and
              whatever the operation needs to run without guessing. Not just
              marine. Not just leads. If the whole team is going to live in
              it, that is Custom. We scope it, take a deposit, then a
              retainer so it keeps moving. Same $175 an hour. You will know
              the number before we build.
            </p>
          </div>
          <a
            href="#book"
            className="btn-lift border border-teal px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-teal hover:bg-teal hover:text-ink"
          >
            Talk Custom
          </a>
        </div>
      </div>
    </section>
  );
}
