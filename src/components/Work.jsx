import Reveal from "./ui/Reveal";

const work = [
  {
    tag: "Live · partner",
    name: "The Boat Kings",
    meta: "Pompano Beach · marine dealership",
    body: "Momentum partnered with The Boat Kings, a high-volume marine dealership in Pompano Beach. Full custom CRM with a dashboard every employee logs into, lead bots, and an AI voice assistant — running on the floor every day. They sell the boats. We build the systems.",
    foot: "Live · Pompano",
  },
  {
    tag: "Installing",
    name: "Boat World USA",
    meta: "South Florida · marine dealership · 40+ years",
    body: "In business over 40 years. Same class of system going in — leads, pipeline, and a full operating layer for the team. We are installing. They run the store.",
    foot: "Installing",
  },
  {
    tag: "Live · new accounts",
    name: "New operators",
    meta: "Sites, brand, follow-up",
    body: "A mix of sites, brand files, inboxes, and lead routing for businesses that just started with us. No case-study theater.",
    foot: "In progress with us",
  },
];

function Status({ tag }) {
  const live = tag.startsWith("Live");
  return (
    <span className="label inline-flex items-center gap-3 text-teal">
      <span aria-hidden="true" className={`inline-block h-2 w-2 ${live ? "bg-teal" : "border border-teal"}`} />
      {tag}
    </span>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative border-t border-[var(--color-line)] py-20 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="label text-teal">Work you can check</p>
          <h2 className="h-display mt-6 max-w-[16ch] text-[clamp(2.6rem,6vw,5rem)] text-abalone">
            On the floor. Not in a case-study PDF.
          </h2>
        </Reveal>

        <ol className="mt-16 border-t border-[var(--color-line)] md:mt-24">
          {work.map((item, i) => (
            <Reveal
              as="li"
              key={item.name}
              delay={i * 0.06}
              className="work-row group relative grid gap-5 border-b border-[var(--color-line)] py-10 lg:grid-cols-12 lg:gap-6 lg:py-14"
            >
              <div className="lg:col-span-2 lg:pt-4">
                <Status tag={item.tag} />
              </div>
              <div className="lg:col-span-5">
                <h3 className="work-name h-display text-[clamp(2.4rem,4.6vw,4rem)] text-abalone">{item.name}</h3>
                <p className="label mt-3 text-[var(--color-faint)]">{item.meta}</p>
              </div>
              <div className="lg:col-span-5 lg:pt-3">
                <p className="text-[16px] leading-relaxed text-[var(--color-mute)] md:text-[17px]">{item.body}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="btn-text mt-6">
                    Open site →
                  </a>
                ) : (
                  <p className="label mt-6 text-[var(--color-faint)]">{item.foot}</p>
                )}
              </div>
              <span aria-hidden="true" className="work-rule pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-teal" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
