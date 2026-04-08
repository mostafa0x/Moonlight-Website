"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      syncTouch: true,
    });

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const sections = Array.from(document.querySelectorAll("section[id]"));
      if (sections.length === 0) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const currentIndex = Math.round(scrollY / viewportHeight);

      let nextIndex = currentIndex;
      if (e.deltaY > 30) nextIndex = currentIndex + 1;
      else if (e.deltaY < -30) nextIndex = currentIndex - 1;

      if (nextIndex >= 0 && nextIndex < sections.length && nextIndex !== currentIndex) {
        e.preventDefault();
        isScrolling = true;
        
        lenis.scrollTo(sections[nextIndex] as HTMLElement, {
          duration: 1.2,
          onComplete: () => {
            setTimeout(() => { isScrolling = false; }, 300);
          }
        });
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY - touchEndY;
      if (Math.abs(delta) > 50) {
        handleWheel({ deltaY: delta } as WheelEvent);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") handleWheel({ deltaY: 100 } as WheelEvent);
      else if (e.key === "ArrowUp" || e.key === "PageUp") handleWheel({ deltaY: -100 } as WheelEvent);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("keydown", handleKeydown);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeydown);
      lenis.destroy();
    };


  }, []);

  return <>{children}</>;
}
