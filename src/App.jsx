import { lazy, startTransition, Suspense, useCallback, useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import { installAnchorScroll } from "./lib/anchors";

const Below = lazy(() => import("./components/Below.jsx"));
const Tail = lazy(() => import("./components/Below.jsx").then((m) => ({ default: m.Tail })));

// The pixel-arc loader is static markup in index.html (it paints before this
// bundle arrives) and plays on every full load. The whole page renders
// underneath it; once every section is mounted and the fonts are in, we tell
// it the app is ready. It fires "momentum:reveal" after its minimum time.
const boot = typeof window !== "undefined" ? window.__momentumBoot : undefined;

export default function App() {
  const [ready, setReady] = useState(() => !boot || boot.revealed());

  useEffect(() => {
    if (!boot) return;
    const onReveal = () => setReady(true);
    window.addEventListener("momentum:reveal", onReveal);
    return () => window.removeEventListener("momentum:reveal", onReveal);
  }, []);

  const [mounted, setMounted] = useState(false);
  const onMounted = useCallback(() => setMounted(true), []);
  useEffect(() => {
    if (!boot || !mounted) return;
    let done = false;
    const go = () => {
      if (!done) {
        done = true;
        boot.appReady();
      }
    };
    (document.fonts?.ready ?? Promise.resolve()).then(go, go);
    // never hold the page hostage to a slow font
    const id = setTimeout(go, 1500);
    return () => clearTimeout(id);
  }, [mounted]);

  useEffect(() => installAnchorScroll(), []);

  // Mount the below-the-fold sections in a transition: React renders them in
  // small time slices instead of one long blocking task. They are off-screen,
  // so nothing visible shifts when they arrive.
  const [rest, setRest] = useState(false);
  useEffect(() => {
    startTransition(() => setRest(true));
  }, []);

  return (
    <div className="min-h-screen text-abalone">
      <main id="top">
        <Hero ready={ready} />
        {rest ? (
          <Suspense fallback={null}>
            <Below onMounted={onMounted} />
          </Suspense>
        ) : null}
      </main>

      {rest ? (
        <Suspense fallback={null}>
          <Tail />
        </Suspense>
      ) : null}
    </div>
  );
}
