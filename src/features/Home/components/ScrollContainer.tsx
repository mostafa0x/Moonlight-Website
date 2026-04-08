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
}

/**
 * ScrollContainer — Powered by Swiper.js (The industry-leading FREE alternative to FullPage.js)
 * Features:
 * 1. 1:1 Wheel Capture (One scroll = One section)
 * 2. Infinite Loop support (Optional)
 * 3. Mobile Touch & Desktop Keyboard support
 * 4. Premium Vertical Pagination dots
 */
export default function ScrollContainer({ children, className }: ScrollContainerProps) {
  // Flatten children to ensure each one becomes a slide
  const slides = Children.toArray(children);

  return (
    <div className="fixed inset-0 w-full h-full bg-transparent overflow-hidden">
      {/* Custom Styles for Swiper Bullets — Responsive across all screens */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background: rgba(255, 255, 255, 0.2) !important;
          opacity: 1 !important;
          border: 1px solid rgba(255, 255, 255, 0.4) !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          margin: 12px 0 !important;
        }
        .swiper-pagination-bullet-active {
          background: #F2C975 !important;
          border-color: #F2C975 !important;
          height: 24px !important;
          border-radius: 20px !important;
          box-shadow: 0 0 15px rgba(242, 201, 117, 0.5) !important;
        }
        .swiper-pagination-vertical.swiper-pagination-bullets {
          right: 15px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
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
          .swiper-pagination-vertical.swiper-pagination-bullets {
            right: 40px !important;
          }
        }
      ` }} />


      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
          thresholdDelta: 60, // Lighten the burden on high-precision desktop mice
        }}
        speed={1000}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
        }}
        // Performance Optimizations for Desktop/Non-Phone
        watchSlidesProgress={true}
        resistanceRatio={0}
        preventInteractionOnTransition={true}
        modules={[Mousewheel, Pagination, Keyboard, Parallax]}


        className={cn("h-screen w-full", className)}
        allowTouchMove={true}
        simulateTouch={false} // Performance: Disable mouse drag as touch on Desktop
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

