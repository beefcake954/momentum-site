import Reveal from "./ui/Reveal";
import FlowGraph from "./graphics/FlowGraph";
import BrainGraph from "./graphics/BrainGraph";
import { Arrow } from "./Hero";

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

// Line graphs for the system tiers (labels describe the flow, no claims).
const SYSTEM_FLOW = [
  { x: 30, y: 30, label: "form", labelAt: "above" },
  { x: 120, y: 90, label: "CRM", labelAt: "below" },
  { x: 210, y: 30, label: "pipeline", labelAt: "above" },
  { x: 290, y: 90, label: "alert", labelAt: "below" },
];

function Tier({ p, i }) {
  return (
    <Reveal
      as="article"
      delay={i * 0.08}
      className={`tier relative flex flex-col border-t py-10 lg:border-t-0 lg:px-8 lg:py-12 lg:first:pl-0 lg:last:pr-0 ${
        p.featured ? "border-teal" : "border-[var(--color-line)]"
      } ${i > 0 ? "lg:border-l lg:border-l-[var(--color-line)]" : ""}`}
    >
      {p.featured ? <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-teal lg:block lg:right-8" /> : null}
      <div className="flex items-baseline justify-between gap-4">
        <span className="label text-teal">{p.id}</span>
        {p.featured ? <span className="label text-teal">Most shops land here</span> : null}
      </div>
      <h3 className="h-display mt-6 text-[clamp(2.6rem,5vw,3.5rem)] text-abalone">{p.name}</h3>
      <div className="mt-3 font-mono text-[22px] tabular-nums tracking-[-0.01em] text-abalone md:text-[24px]">{p.price}</div>
      <p className="label mt-2 text-[var(--color-faint)]">{p.time}</p>
      {p.name === "System" ? <FlowGraph nodes={SYSTEM_FLOW} width={320} height={120} duration={5.5} className="mt-10 max-w-[320px]" /> : null}
      <p className="mt-8 text-[15px] leading-relaxed text-[var(--color-mute)]">{p.pitch}</p>
      <ul className="mt-8 flex-1 border-t border-[var(--color-line)] text-[15px] leading-relaxed text-abalone">
        {p.includes.map((line) => (
          <li key={line} className="flex gap-4 border-b border-[var(--color-line)] py-3.5">
            <span aria-hidden="true" className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-teal" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <p className="label mt-6 leading-relaxed text-[var(--color-faint)]">{p.not}</p>
      <a href="#book" className={`mt-8 ${p.featured ? "btn-primary" : "btn-outline"}`}>
        Book this
        <Arrow />
      </a>
    </Reveal>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="relative border-t border-[var(--color-line)] py-20 md:py-32">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <p className="label text-[var(--color-faint)]">Packages</p>
            <h2 className="h-display mt-6 text-[clamp(2.6rem,5.4vw,4.75rem)] text-abalone">
              <span className="lg:block">A simple package to start. </span>
              <span className="lg:block">Builds become hourly.</span>
            </h2>
          </div>
          <p className="body-lg max-w-[30rem] text-[var(--color-mute)] lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-2">
            No fake "was $18k" line. Start is a flat number after a 20-minute
            call. Everything past that is $175 an hour with the hours written
            down first.
          </p>
        </Reveal>

        <div className="mt-16 grid border-b border-[var(--color-line)] lg:mt-24 lg:grid-cols-3 lg:border-t lg:border-t-[var(--color-line)]">
          {packages.map((p, i) => (
            <Tier key={p.id} p={p} i={i} />
          ))}
        </div>

        {/* Custom tier */}
        <Reveal className="grid gap-10 border-b border-[var(--color-line)] py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
          <div className="lg:col-span-5">
            <p className="label text-teal">04</p>
            <h3 className="h-display mt-6 text-[clamp(2.6rem,5vw,3.5rem)] text-abalone">Custom</h3>
            <div className="mt-3 font-mono text-[22px] tabular-nums tracking-[-0.01em] text-abalone md:text-[24px]">Deposit + retainer</div>
            <p className="label mt-2 text-[var(--color-faint)]">Same $175 an hour. You will know the number before we build.</p>
            <p className="body-lg mt-8 max-w-[36rem] text-[var(--color-mute)]">
              A full operating system for the whole business. Phone app. Full
              context on pricing, service, and repair orders. Agents that watch
              for errors and inventory changes. A Brain you can talk to.
            </p>
            <a href="#book" className="btn-outline is-teal mt-10">
              Talk Custom
              <Arrow />
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <BrainGraph className="mx-auto max-w-[640px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
