import { CAL_LINK, CAL_ORIGIN } from "../config";
export default function CalEmbed() {
  const src = `${CAL_ORIGIN}/${CAL_LINK}?theme=dark&layout=month_view`;
  return (
    <div className="overflow-hidden border border-[var(--color-line)] bg-[var(--color-panel)]">
      <iframe
        title="Book a discovery call"
        src={src}
        style={{ width: "100%", height: 720, border: 0, background: "#0a0a0a" }}
      />
      <p className="border-t border-[var(--color-line)] px-4 py-3 font-mono text-[11px] tracking-wide text-[var(--color-faint)]">
        {CAL_ORIGIN}/{CAL_LINK}
      </p>
    </div>
  );
}
