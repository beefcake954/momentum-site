import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { EASE, useIsMobile } from "../../lib/motion";

/**
 * Fade-up on enter, once. Animates a full transform string + opacity, which
 * Motion hands to WAAPI (compositor). Travel is halved on phones; reduced
 * motion renders the content as-is with no animation.
 */
export default function Reveal({ as = "div", delay = 0, y = 24, className = "", children, ...rest }) {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  const Comp = m[as];
  const dist = mobile ? y / 2 : y;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, transform: `translateY(${dist}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
