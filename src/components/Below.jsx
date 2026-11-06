import { startTransition, useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "motion/react";
import ValueProps from "./ValueProps.jsx";
import Difference from "./Difference.jsx";
import Marine from "./Marine.jsx";
import Work from "./Work.jsx";
import Packages from "./Packages.jsx";
import HowItWorks from "./HowItWorks.jsx";
import BookSection from "./BookSection.jsx";
import Footer from "./Footer.jsx";
import MobileBook from "./MobileBook.jsx";

const SECTIONS = [ValueProps, Difference, Marine, Work, Packages, HowItWorks, BookSection];

// Everything below the hero lives in its own chunk (with Motion). Sections
// mount one per task, in transitions, so no single commit blocks the main
// thread. They are off-screen, so nothing visible shifts as they arrive.
export default function Below() {
  const [n, setN] = useState(1);
  useEffect(() => {
    if (n >= SECTIONS.length) return;
    const id = setTimeout(() => startTransition(() => setN((v) => v + 1)), 0);
    return () => clearTimeout(id);
  }, [n]);
  return (
    <LazyMotion features={domAnimation} strict>
      {SECTIONS.slice(0, n).map((S, i) => (
        <S key={i} />
      ))}
      {/* the bar observes #book, so it mounts once every section exists */}
      {n >= SECTIONS.length ? <MobileBook /> : null}
    </LazyMotion>
  );
}

export function Tail() {
  return <Footer />;
}
