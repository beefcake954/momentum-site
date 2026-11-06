import { lazy, startTransition, Suspense, useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import { installAnchorScroll } from "./lib/anchors";

const Below = lazy(() => import("./components/Below.jsx"));
const Tail = lazy(() => import("./components/Below.jsx").then((m) => ({ default: m.Tail })));

// The pixel-arc loader is static markup in index.html (it paints before this
// bundle arrives). We tell it the app is mounted; it fires "momentum:reveal"
// once its minimum time has passed, and plays only once per session.
const boot = typeof window !== "undefined" ? window.__momentumBoot : undefined;

export default function App() {
  const [ready, setReady] = useState(() => !boot || boot.revealed());

  useEffect(() => {
    if (!boot) return;
    const onReveal = () => setReady(true);
    window.addEventListener("momentum:reveal", onReveal);
    boot.appReady();
    return () => window.removeEventListener("momentum:reveal", onReveal);
  }, []);

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
            <Below />
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
