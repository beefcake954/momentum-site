import { useEffect, useRef } from "react";
import useInView from "../../lib/useInView";

// Center-console side profile, hand-traced from a reference photo
// (design-ref/boat.jpg, never shipped). Hull, sheer, gunwale, chine, console,
// T-top and frame, leaning post, twin outboards. No trailer, marks or text.
// viewBox units follow the reference frame (2000 wide).

const HULL =
  "M22 497C220 482 520 466 760 470C1050 478 1400 520 1600 560C1720 590 1830 640 1885 672L1878 690L1832 760L1100 782L520 800C380 795 300 760 230 705C150 640 70 560 22 497Z";

// sampled sheer (gunwale) and chine lines; the grid is lofted between them
const GUN = [[40, 507], [300, 492], [600, 481], [800, 484], [1100, 494], [1450, 540], [1650, 580], [1760, 605], [1878, 690]];
const CHINE = [[40, 507], [178, 652], [400, 690], [700, 728], [1000, 748], [1300, 755], [1600, 755], [1832, 752], [1878, 700]];

const WRAP =
  "M40 507C300 492 600 480 800 484C1100 494 1450 540 1650 580C1760 605 1840 650 1878 690L1832 752C1600 755 1300 755 1000 748C700 730 400 690 178 652C120 600 70 552 40 507Z";

// Outline groups (compound paths keep animated element count low). Each
// entry: [d, className, delay]
const LINES = [
  [HULL, "hb-hull", 0],
  ["M40 507C300 492 600 480 800 484C1100 494 1450 540 1650 580C1760 605 1840 650 1878 690", "hb-hull", 0.25], // gunwale cap
  ["M178 652C400 690 700 730 1000 748C1300 755 1600 755 1832 752M260 720C500 765 800 780 1100 778", "hb-detail", 0.4], // chine, strake
  ["M60 490C250 470 500 458 700 460M200 478V492M400 466V482M600 460V476M1050 500C1300 520 1500 548 1690 585", "hb-detail", 0.55], // bow rail, coaming
  ["M895 492L905 410L920 335L1030 335L1040 410L1048 492ZM916 400H1040", "hb-detail", 0.7], // console + windshield line
  ["M765 293C800 268 900 250 1000 246C1120 244 1230 252 1305 266L1298 282C1200 276 1080 278 960 286C880 291 820 297 790 302ZM800 302C950 318 1100 325 1240 322M948 246L950 162L980 156L1006 228L1008 246", "hb-hull", 0.85], // T-top, antenna
  ["M912 300L905 480M928 300L922 480M1250 286L1262 520M1272 284L1286 520M912 360L1262 350M1030 296C1045 340 1060 370 1075 405", "hb-detail", 1.0], // frame
  ["M1135 525L1142 460L1240 455L1246 525M1142 480H1240M1185 455L1190 425L1240 422L1242 455", "hb-detail", 1.1], // leaning post
  ["M1690 600L1688 525C1700 495 1740 485 1790 488C1840 492 1870 505 1882 530L1895 640L1860 655L1760 650ZM1790 488C1830 470 1870 478 1890 500L1915 600L1900 640", "hb-hull", 1.2], // cowlings
  ["M1850 655L1870 745L1905 755L1925 690L1895 640M1900 640L1935 660L1975 700L1985 745L1950 760L1925 750M1860 700H1960", "hb-detail", 1.35], // lower units
];

function sample(line, x) {
  if (x <= line[0][0]) return line[0][1];
  for (let i = 1; i < line.length; i++) {
    const [x1, y1] = line[i];
    const [x0, y0] = line[i - 1];
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return line.at(-1)[1];
}

function gridPath() {
  let d = "";
  // lofted horizontals between sheer and chine
  for (let k = 1; k < 7; k++) {
    const f = k / 7;
    let seg = "";
    for (let x = 40; x <= 1880; x += 40) {
      const y = sample(GUN, x) + (sample(CHINE, x) - sample(GUN, x)) * f;
      seg += `${seg ? "L" : "M"}${x} ${y.toFixed(1)}`;
    }
    d += seg;
  }
  // verticals, foreshortened toward the bow (denser on the left)
  for (let i = 1; i < 28; i++) {
    const t = i / 28;
    const x = 40 + Math.pow(t, 1.35) * 1840;
    const top = sample(GUN, x) - 4;
    const bot = sample(CHINE, x) + 4;
    d += `M${x.toFixed(1)} ${top.toFixed(1)}L${(x + 18).toFixed(1)} ${bot.toFixed(1)}`;
  }
  return d;
}

const GRID = gridPath();

const COWL_KNOCKOUT =
  "M1690 600L1688 525C1700 495 1740 485 1790 488C1830 470 1870 478 1890 500L1915 600L1900 640L1935 660L1975 700L1985 745L1950 760L1905 755L1870 745L1850 655L1760 650Z";

const renderLine = ([d, cls, delay]) => (
  <path key={d} d={d} pathLength="1" className={`draw ${cls}`} style={{ "--d": `${delay}s`, "--dur": "1.8s" }} />
);

export default function HoloBoat({ className = "" }) {
  const ref = useRef(null);
  const tiltRef = useRef(null);
  const drawn = useInView(ref, { once: true, rootMargin: "0px 0px -20% 0px" });
  const onScreen = useInView(ref, { rootMargin: "0px" });

  // Desktop-only mouse tilt: max 4°, eased in rAF, writes transform directly.
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = ref.current;
    const el = tiltRef.current;
    if (!fine || reduce || !host || !el || !onScreen) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const MAX = 4;
    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 2 * MAX;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.transform = `rotateX(${cy.toFixed(3)}deg) rotateY(${cx.toFixed(3)}deg)`;
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.01 ? requestAnimationFrame(tick) : 0;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [onScreen]);

  return (
    <div ref={ref} className={`holo-host ${className}`}>
      <div ref={tiltRef} className="holo-tilt">
        <svg
          viewBox="0 140 2000 680"
          className={`holo block h-auto w-full ${drawn ? "is-drawn" : ""} ${onScreen ? "" : "is-paused"}`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id="hb-wrap">
              <path d={WRAP} />
            </clipPath>
            <clipPath id="hb-hull">
              <path d={HULL} />
            </clipPath>
            <linearGradient id="hb-sheen" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#5eead4" stopOpacity="0" />
              <stop offset="0.3" stopColor="#5eead4" stopOpacity="0.35" />
              <stop offset="0.5" stopColor="#e9d5ff" stopOpacity="0.3" />
              <stop offset="0.7" stopColor="#d9f99d" stopOpacity="0.25" />
              <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hb-scan" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#5eead4" stopOpacity="0" />
              <stop offset="0.85" stopColor="#5eead4" stopOpacity="0.28" />
              <stop offset="1" stopColor="#ccfbf1" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* hull grid, faded in after the outline */}
          <g clipPath="url(#hb-wrap)">
            <path d={GRID} className="hb-grid" fill="none" />
            <rect className="hb-sheen" x="-700" y="440" width="700" height="360" fill="url(#hb-sheen)" />
          </g>

          {/* one scanline pass over the hull */}
          <g clipPath="url(#hb-hull)">
            <rect className="hb-scanline" x="0" y="-60" width="2000" height="60" fill="url(#hb-scan)" />
          </g>

          <g fill="none" strokeLinejoin="round">
            {LINES.slice(0, 8).map(renderLine)}
            {/* ink knockout so the outboards read as sitting in front of the hull lines */}
            <path d={COWL_KNOCKOUT} className="fade" fill="#080808" stroke="none" style={{ "--d": "1.15s" }} />
            {LINES.slice(8).map(renderLine)}
          </g>

          {/* waterline reflections */}
          <path d="M120 812H1880M360 818H1640" className="fade hb-water" fill="none" style={{ "--d": "1.6s" }} />
        </svg>
      </div>
    </div>
  );
}
