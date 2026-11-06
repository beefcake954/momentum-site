import Reveal from "./ui/Reveal";
import FlowGraph from "./graphics/FlowGraph";
import Terminal from "./graphics/Terminal";

const props = [
  [
    "01",
    "Built from the floor up.",
    "Momentum started inside a marine dealership. The systems we built there are the same ones we bring to every shop.",
  ],
  [
    "02",
    "New and small welcome.",
    "First website, first logo, a simple CRM or bot — whatever your business needs to get off the ground. We go all the way to fully custom operating systems. You do not need a busy floor to start.",
  ],
  [
    "03",
    "Plain language.",
    "Site. Brand. CRM. Bots. The Brain. The whole point of AI in your business is understanding how it helps — not getting buried in jargon and a multi-thousand-dollar deposit.",
  ],
];

const FLOW = [
  { x: 50, y: 60, label: "lead", labelAt: "above" },
  { x: 200, y: 160, label: "bot", labelAt: "below" },
  { x: 350, y: 60, label: "CRM", labelAt: "above" },
  { x: 500, y: 160, label: "follow-up", labelAt: "below" },
];

const STATUS = [
  "agent: new lead → routed",
  "bot: first reply sent",
  "crm: owner assigned",
  "follow-up: scheduled",
];

export default function ValueProps() {
  return (
    <section className="relative border-t border-[var(--color-line)] py-20 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <FlowGraph nodes={FLOW} className="mx-auto max-w-[520px] pt-8 lg:mx-0" />
            </Reveal>
            <Reveal delay={0.1}>
              <Terminal lines={STATUS} className="mt-12 max-w-[520px]" />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {props.map(([n, t, b], i) => (
            <Reveal
              key={n}
              delay={i * 0.06}
              className="grid grid-cols-[2.75rem_1fr] border-t border-[var(--color-line)] py-10 first:pt-10 md:grid-cols-[4rem_1fr] md:py-14"
            >
              <div className="label pt-3 text-teal">{n}</div>
              <div>
                <h2 className="h-display text-[clamp(2.1rem,5vw,3.4rem)] text-abalone">{t}</h2>
                <p className="body-lg mt-5 max-w-[34rem] text-[var(--color-mute)]">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
