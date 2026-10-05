import { useCallback, useState } from "react";
import Loader from "./components/Loader.jsx";
import Hero from "./components/Hero.jsx";
import ValueProps from "./components/ValueProps.jsx";
import Difference from "./components/Difference.jsx";
import Marine from "./components/Marine.jsx";
import Work from "./components/Work.jsx";
import Packages from "./components/Packages.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import BookSection from "./components/BookSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [booting, setBooting] = useState(true);
  const finishBoot = useCallback(() => setBooting(false), []);

  return (
    <div className="min-h-screen bg-ink text-abalone">
      {booting ? <Loader onDone={finishBoot} /> : null}

      <div className="pointer-events-none fixed inset-0 grid-fade" />

      <header className="sticky top-0 z-30 border-b border-[var(--color-line)] bg-[rgba(5,5,5,0.88)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center pl-1">
            <img
              src="/momentum-logo.png"
              alt="Momentum"
              className="h-10 w-auto object-contain md:h-12"
            />
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-[var(--color-mute)] sm:flex">
            <a href="#marine" className="link-hover hover:text-abalone">Marine</a>
            <a href="#work" className="link-hover hover:text-abalone">Work</a>
            <a href="#packages" className="link-hover hover:text-abalone">Packages</a>
            <a href="#book" className="link-hover hover:text-abalone">Book</a>
          </nav>
          <a
            href="#book"
            className="glow-cta bg-teal px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-[0_0_0_1px_rgba(20,184,166,0.6),0_0_40px_rgba(20,184,166,0.25)]"
          >
            Book 20 min
          </a>
        </div>
      </header>

      <main id="top">
        <Hero />
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
