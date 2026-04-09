"use client";

import { ReactNode, Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Keyboard, Parallax } from "swiper/modules";
import { cn } from "@/shared/lib/utils";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/parallax";

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
  dotCount?: number;
}

export default function ScrollContainer({ children, className, dotCount }: ScrollContainerProps) {
  // Flatten children to ensure each one becomes a slide
  const slides = Children.toArray(children);
  const totalSlides = dotCount || slides.length;

  return (
    <div className="fixed inset-0 w-full h-full bg-transparent overflow-hidden">
      {/* Custom Styles for Swiper Bullets — Responsive across all screens */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-pagination {
          position: fixed !important;
          right: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          z-index: 50 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0 !important;
        }
        @media (min-width: 1024px) {
          .custom-pagination {
            right: 40px !important;
          }
        }
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.2) !important;
          opacity: 1 !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          margin: 12px 0 !important;
          display: block !important;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active {
          background: #F2C975 !important;
          border-color: #F2C975 !important;
          height: 24px !important;
          border-radius: 20px !important;
        }

        /* Large Screens (Desktop) */
        @media (min-width: 1024px) {
          .swiper-pagination-bullet {
            width: 14px !important;
            height: 14px !important;
          }
          .swiper-pagination-bullet-active {
            height: 32px !important;
          }
        }
      ` }} />

      {/* [SERVER-SIDE DOTS] These dots appear instantly for better LCP */}
      <div className="custom-pagination swiper-pagination-vertical swiper-pagination-bullets">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "swiper-pagination-bullet",
              i === 0 && "swiper-pagination-bullet-active" // Initial state for LCP
            )}
          />
        ))}
      </div>

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
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}

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
        modules={[Mousewheel, Pagination, Keyboard, Parallax]}

        className={cn("h-screen w-full", className)}
        allowTouchMove={true}
        simulateTouch={false}
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
