/**
 * In-page anchor scrolling that stays accurate with content-visibility:auto.
 * Sections below the fold render at an estimated height until they are near
 * the viewport, so a single smooth scroll can land off-target once they
 * render for real. We scroll, then re-aim once the scroll settles.
 */
export function installAnchorScroll() {
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest?.('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    const behavior = reduce() ? "auto" : "smooth";
    target.scrollIntoView({ behavior, block: "start" });
    let tries = 0;
    const settle = () => {
      const off = target.getBoundingClientRect().top - parseFloat(getComputedStyle(target).scrollMarginTop || "0");
      if (Math.abs(off) > 4 && tries++ < 3) {
        target.scrollIntoView({ behavior, block: "start" });
        schedule();
      }
    };
    const schedule = () => {
      if ("onscrollend" in window) window.addEventListener("scrollend", settle, { once: true });
      else setTimeout(settle, 700);
    };
    schedule();
    history.replaceState(null, "", `#${id}`);
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
