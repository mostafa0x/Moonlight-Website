"use client";

import { useRef, useState, useEffect } from "react";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import type { LandmarksType } from "@/shared/global";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface LandMarksProps {
  landmarks: LandmarksType[];
}

/**
 * LandMarks Section
 * Implements a nested horizontal swiper for exploring landmarks
 * within a single vertical full-page section.
 */
function LandMarks({ landmarks = [] }: LandMarksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">
      <Swiper
        direction="horizontal"
        nested
        slidesPerView={1}
        spaceBetween={0}
        watchSlidesProgress
        observer
        observeParents
        rewind={landmarks.length > 1}
        grabCursor
        mousewheel={{ forceToAxis: true }}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Pagination]}
        speed={800}
        threshold={20}
        touchReleaseOnEdges
        className="h-full w-full landmark-swiper"
      >
        {landmarks.map((landmark, idx) => (
          <SwiperSlide key={idx} className="h-full w-full">
            <LandmarkSlide
              item={landmark}
              isVisible={isInView}
              slideNumber={String(idx + 1).padStart(2, "0")}
              totalSlides={String(landmarks.length).padStart(2, "0")}
            />
          </SwiperSlide>
        ))}

        {/* Pagination Styles */}
        <style>{`
          .landmark-swiper .swiper-pagination {
            bottom: 120px !important;
            z-index: 60 !important;
          }
          @media (min-width: 768px) {
            .landmark-swiper .swiper-pagination {
              bottom: 80px !important;
            }
          }
          .landmark-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.4) !important;
            opacity: 1 !important;
          }
          .landmark-swiper .swiper-pagination-bullet-active {
            background: #F2C975 !important;
          }
        `}</style>
      </Swiper>
    </div>
  );
}

LandMarks.displayName = "LandMarks";
export default LandMarks;
