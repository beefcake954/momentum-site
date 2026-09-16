import { useEffect, useRef } from "react";
import { CAL_LINK, CAL_ORIGIN } from "../config";
export default function CalEmbed() {
  const host = useRef(null);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.Cal) {
        window.Cal("init", { origin: CAL_ORIGIN });
        window.Cal("inline", {
          elementOrSelector: node,
          calLink: CAL_LINK,
          layout: "month_view",
          config: { theme: "dark" },
        });
        window.Cal("ui", {
          theme: "dark",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#14b8a6",
              "cal-bg": "#0a0a0a",
              "cal-text": "#e8e4d9",
            },
          },
        });
      }
    };
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return (
    <div className="overflow-hidden border border-[var(--color-line)] bg-[var(--color-panel)]">
      <div ref={host} style={{ width: "100%", minHeight: 640, overflow: "auto" }} />
      <p className="border-t border-[var(--color-line)] px-4 py-3 font-mono text-[11px] tracking-wide text-[var(--color-faint)]">
        Calendar mounts from <span className="text-teal">{CAL_LINK}</span> in src/config.js.
      </p>
    </div>
  );
}
