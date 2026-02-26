"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const sections = ["Home", "About", "Services", "Contact"];
const SWIPE_THRESHOLD = 120;
const TRANSITION_DURATION = 1.1;

export default function FullPage() {
  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const goTo = (index: number) => {
    if (index < 0 || index >= sections.length) return;
    if (isAnimating.current) return;

    isAnimating.current = true;
    setActive(index);
    window.history.replaceState(null, "", `#${sections[index].toLowerCase()}`);

    setTimeout(() => {
      isAnimating.current = false;
    }, TRANSITION_DURATION * 1000);
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      e.deltaY > 0 ? goTo(active + 1) : goTo(active - 1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown") goTo(active + 1);
      if (e.key === "ArrowUp") goTo(active - 1);
    };

    const onTouchStart = (e: TouchEvent) =>
      (touchStartY.current = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) =>
      (touchEndY.current = e.touches[0].clientY);
    const onTouchEnd = () => {
      if (isAnimating.current) return;
      const delta = touchStartY.current - touchEndY.current;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      delta > 0 ? goTo(active + 1) : goTo(active - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [active]);

  return (
    <>
      {/* Fullpage container */}
      <div className="relative h-screen overflow-hidden bg-black">
        {sections.map((title, i) => (
          <Section key={i} index={i} active={active} title={title} />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="w-4 h-4 flex items-center justify-center"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                active === i ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}

// ----------------------- Section with internal Parallax -----------------------
function Section({
  index,
  active,
  title,
}: {
  index: number;
  active: number;
  title: string;
}) {
  const y = useMotionValue(0);

  const getY = () => {
    if (index === active) return 0;
    if (index < active) return -100;
    return 100;
  };

  // Parallax layers (relative to scroll animation)
  const parallaxText = useTransform(y, [0, 100], [0, 40]); // moves slower
  const parallaxDecor = useTransform(y, [0, 100], [0, 80]); // moves faster

  return (
    <motion.section
      style={{ y }}
      animate={{
        y: `${getY()}%`,
        scale: index === active ? 1 : 0.95,
        filter: index === active ? "blur(0px)" : "blur(6px)",
      }}
      transition={{ duration: TRANSITION_DURATION, ease: [0.22, 1, 0.36, 1] }}
      className="absolute  "
    >
      {/* Main Text */}
      <motion.h1
        style={{ y: parallaxText }}
        animate={{
          opacity: index === active ? 1 : 0,
        }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-white text-7xl font-bold tracking-tight text-center"
      >
        {title}
      </motion.h1>

      {/* Decorative Layer */}
      <motion.div
        style={{ y: parallaxDecor }}
        className="absolute w-60 h-60 bg-white/10 rounded-full"
      />
    </motion.section>
  );
}
