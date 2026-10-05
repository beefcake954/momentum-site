import { CAL_LINK, CAL_ORIGIN } from "../config";

export default function CalEmbed() {
  const href = `${CAL_ORIGIN}/${CAL_LINK}`;
  return (
    <div className="border border-[var(--color-line)] bg-[var(--color-panel)] p-8 md:p-12">
      <div className="flex flex-col items-start gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            Discovery call · 20 minutes
          </p>
          <p className="mt-3 max-w-md text-[var(--color-mute)]">
            Pick a slot. I show up. No funnel. No twelve-page form.
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-cta inline-flex items-center gap-3 bg-teal px-8 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-ink transition-shadow hover:shadow-[0_0_0_1px_rgba(20,184,166,0.6),0_0_40px_rgba(20,184,166,0.25)]"
        >
          Open calendar
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
        <p className="font-mono text-[10px] tracking-wide text-[var(--color-faint)]">
          {href}
        </p>
      </div>
    </div>
  );
}
