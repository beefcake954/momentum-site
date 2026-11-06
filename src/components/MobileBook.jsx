import { useEffect, useState } from "react";
import { Arrow } from "./Hero";

/**
 * Thumb-reach booking bar for phones. Slides up (transform only) once the
 * hero CTAs have scrolled away; slides back down when the booking section or
 * footer is on screen so it never covers the real calendar button.
 */
export default function MobileBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".hero-wrap");
    const targets = [document.getElementById("book"), document.querySelector("footer")].filter(Boolean);
    if (!hero || typeof IntersectionObserver === "undefined") return;
    let heroOut = false;
    const near = new Set();
    const update = () => setShow(heroOut && near.size === 0);
    const heroObs = new IntersectionObserver(([e]) => {
      heroOut = !e.isIntersecting;
      update();
    }, { rootMargin: "0px 0px -35% 0px" });
    const tObs = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? near.add(e.target) : near.delete(e.target);
      update();
    });
    heroObs.observe(hero);
    targets.forEach((t) => tObs.observe(t));
    return () => {
      heroObs.disconnect();
      tObs.disconnect();
    };
  }, []);

  return (
    <div className={`mobile-book md:hidden ${show ? "is-shown" : ""}`} aria-hidden={!show}>
      <a href="#book" className="btn-primary w-full" tabIndex={show ? 0 : -1}>
        Book 20 min
        <Arrow />
      </a>
    </div>
  );
}
