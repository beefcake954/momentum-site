import { CAL_LINK, CAL_ORIGIN } from "../config";
import { Arrow } from "./Hero";

export default function CalEmbed() {
  const href = `${CAL_ORIGIN}/${CAL_LINK}`;
  return (
    <div className="grid gap-10 border-y border-[var(--color-line)] py-10 md:grid-cols-12 md:gap-6 md:py-14">
      <div className="md:col-span-7">
        <p className="label text-teal">Discovery call · 20 minutes</p>
        <p className="body-lg mt-4 max-w-md text-[var(--color-mute)]">
          Pick a slot. I show up. No funnel. No twelve-page form.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-4 md:col-span-5 md:items-end md:self-end">
        <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary is-large">
          Open calendar
          <Arrow />
        </a>
        <p className="label break-all text-[var(--color-faint)] md:text-right">{href}</p>
      </div>
    </div>
  );
}
