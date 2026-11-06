import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import ValueProps from "./components/ValueProps.jsx";
import Difference from "./components/Difference.jsx";
import Marine from "./components/Marine.jsx";
import Work from "./components/Work.jsx";
import Packages from "./components/Packages.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import BookSection from "./components/BookSection.jsx";
import Footer from "./components/Footer.jsx";

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

  return (
    <div className="min-h-screen text-abalone">
      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-ink">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6 md:h-[72px] md:px-10">
          <a href="#top" className="flex min-h-11 items-center" aria-label="Momentum, back to top">
            <picture>
              <source
                type="image/webp"
                srcSet="/momentum-logo-204.webp 204w, /momentum-logo-408.webp 408w"
                sizes="(min-width: 768px) 187px, 153px"
              />
              <img
                src="/momentum-logo-408.png"
                alt="Momentum"
                width="204"
                height="48"
                fetchPriority="high"
                className="h-9 w-auto object-contain md:h-11"
              />
            </picture>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-10 font-mono text-[12px] tracking-[0.04em] text-[var(--color-mute)] md:flex">
            <a href="#marine" className="nav-link">Marine</a>
            <a href="#work" className="nav-link">Work</a>
            <a href="#packages" className="nav-link">Packages</a>
            <a href="#book" className="nav-link">Book</a>
          </nav>
          <a
            href="#book"
            className="inline-flex min-h-11 items-center border border-teal px-4 font-mono text-[11px] uppercase tracking-[0.12em] text-teal transition-colors duration-500 hover:bg-teal hover:text-ink"
          >
            Book 20 min
          </a>
        </div>
      </header>

      <main id="top">
        <Hero ready={ready} />
        <ValueProps />
        <Difference />
        <Marine />
        <Work />
        <Packages />
        <HowItWorks />
        <BookSection />
      </main>

      <Footer />
    </div>
  );
}
