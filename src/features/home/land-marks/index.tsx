"use client";

import { memo, useRef } from "react";
import { useInView } from "motion/react";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import type { LandmarksType } from "@/shared/global";

/**
 * LandMarks Section
 */
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, EffectFade } from "swiper/modules";

// Extra Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


interface LandMarksProps {
  id?: string;
  landmarks: LandmarksType[];
}

/**
 * LandMarks Section
 * Implements a nested horizontal swiper for exploring landmarks
 * within a single vertical full-page section.
 */
function LandMarks({
  landmarks = [],
}: LandMarksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">

      {/* Nested Horizontal Swiper */}
      <Swiper
        direction="horizontal"
        nested={true}
        slidesPerView={1}
        spaceBetween={0}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        rewind={landmarks.length > 1}
        grabCursor={true}
        mousewheel={{
          forceToAxis: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        speed={800}
        threshold={20}
        touchReleaseOnEdges={true}
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

        <style dangerouslySetInnerHTML={{
          __html: `
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
        ` }} />
      </Swiper>
    </div>
  );
}

LandMarks.displayName = "LandMarks";
export default LandMarks;
