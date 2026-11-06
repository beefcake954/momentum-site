import { useEffect, useState } from "react";

/**
 * Tracks whether an element is on screen.
 * once: flips to true the first time and stays (for one-shot reveals).
 * Without once it toggles, which is what pauses loops off-screen.
 */
export default function useInView(ref, { once = false, rootMargin = "0px 0px -12% 0px", threshold = 0 } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once, rootMargin, threshold]);
  return inView;
}
