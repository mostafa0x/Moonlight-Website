"use client";

import { ReactNode, Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard, Parallax } from "swiper/modules";
import { cn } from "@/shared/lib/utils";

// Swiper Styles
import "swiper/css";
import "swiper/css/parallax";

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollContainer({ children, className }: ScrollContainerProps) {
  // Flatten children to ensure each one becomes a slide
  const slides = Children.toArray(children);

  return (
    <div className="fixed inset-0 w-full h-full bg-transparent overflow-hidden">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
          thresholdDelta: 60,
        }}
        speed={800}
        keyboard={{ enabled: true }}

        // Advanced Performance & Touch Suite
        touchRatio={1.2}
        threshold={5}
        longSwipesRatio={0.1}
        roundLengths={true}
        resistance={true}
        resistanceRatio={0.85}

        watchSlidesProgress={true}
        preventInteractionOnTransition={false}
        touchStartPreventDefault={false}
        passiveListeners={true}
        observer={true}
        observeParents={true}
        modules={[Mousewheel, Keyboard, Parallax]}

        className={cn("h-screen w-full", className)}
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
