import { useEffect, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1];

const MQ = "(max-width: 767px)";

export function useIsMobile() {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MQ).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(MQ);
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}
