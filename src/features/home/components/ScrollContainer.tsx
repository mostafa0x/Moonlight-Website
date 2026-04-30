"use client";

import { ReactNode, Children, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel, Keyboard, EffectFade, Parallax } from "swiper/modules";
import { cn } from "@/shared/lib/utils";

// Swiper Styles
import "swiper/css";

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollContainer({ children, className }: ScrollContainerProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const handleScrollToTop = () => {
      if (swiperInstance) {
        swiperInstance.slideTo(0, 800);
      }
    };

    window.addEventListener("scroll-to-top", handleScrollToTop);
    return () => window.removeEventListener("scroll-to-top", handleScrollToTop);
  }, [swiperInstance]);

  // Flatten children to ensure each one becomes a slide
  const slides = Children.toArray(children);

  return (
    <div className="fixed inset-0 w-full h-full bg-transparent overflow-hidden" style={{ overscrollBehavior: "none" }}>
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        onSwiper={setSwiperInstance}
        mousewheel={{
          sensitivity: 0.8,
          thresholdDelta: 50,
          thresholdTime: 500,
          releaseOnEdges: false,
        }}
        speed={1000}
        keyboard={{ enabled: true }}

        // Advanced Performance & Touch Suite
        touchRatio={1}
        threshold={30}
        longSwipesRatio={0.1}
        roundLengths={true}
        resistance={true}
        resistanceRatio={0.85}
        watchSlidesProgress={true}
        preventInteractionOnTransition={true}
        touchStartPreventDefault={false}
        passiveListeners={true}
        observer={true}
        observeParents={true}
        modules={[Mousewheel, Keyboard, Parallax]}

        className={cn("h-full w-full", className)}
        allowTouchMove={true}
        simulateTouch={true}
        grabCursor={false}
      >
        {slides.map((child, index) => (
          <SwiperSlide key={index} className="h-full w-full overflow-hidden bg-transparent">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
