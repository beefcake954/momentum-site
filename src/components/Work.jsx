import useReveal from "../hooks/useReveal";

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

export default function Work() {
  const ref = useReveal();
  return (
    <section id="work" ref={ref} className="reveal border-t border-[var(--color-line)] bg-panel py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
          Work you can check
        </p>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">
          On the floor. Not in a case-study PDF.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {work.map((item) => (
            <article
              key={item.name}
              className="card-hover flex flex-col border border-[var(--color-line)] bg-ink p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
                {item.tag}
              </div>
              <h3 className="mt-4 font-serif text-2xl">{item.name}</h3>
              <p className="mt-1 font-mono text-[11px] text-[var(--color-faint)]">
                {item.meta}
              </p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-[var(--color-mute)]">
                {item.body}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-hover mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-teal"
                >
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
  );
}
