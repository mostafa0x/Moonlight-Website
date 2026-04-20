"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionHeader from "@/shared/components/SectionHeader";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import type { LandmarksType } from "@/shared/global";



/**
 * LandMarks Section
 * Optimized version: Handles structural layout as a static unit,
 * delegating interactive slider logic to a focused sub-component.
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
  titleHeader: string;
}

/**
 * LandMarks Section
 * Implements a nested horizontal swiper for exploring landmarks
 * within a single vertical full-page section.
 */
function LandMarks({
  landmarks = [],
  titleHeader,
}: LandMarksProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">
      {/* Persistent Governorate Header */}
      <SectionHeader title={titleHeader} textColor="text-white" />

      <style dangerouslySetInnerHTML={{
        __html: `
        .landmark-swiper .swiper-pagination {
          bottom: 50px !important;
        }
        .landmark-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          transition: background 0.3s ease;
        }
        .landmark-swiper .swiper-pagination-bullet-active {
          background: #F2C975 !important;
        }
      ` }} />

      {/* Nested Horizontal Swiper with Ancient Egyptian Style Transitions */}
      <Swiper
        direction="horizontal"
        nested={true}
        slidesPerView={1}
        spaceBetween={0}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        rewind={landmarks.length > 1}
        grabCursor={true}
        mousewheel={{
          forceToAxis: true,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, EffectFade]}
        speed={800} // Snappier for better UX
        threshold={15} // Prevents jittery vertical scrolls from triggering horizontal slide
        touchReleaseOnEdges={true}
        className="h-full w-full landmark-swiper"
      >

        {landmarks.map((landmark, idx) => (
          <SwiperSlide key={`${landmark.title}-${idx}`}>
            <LandmarkSlide
              item={landmark}
              isVisible={isInView}
              slideNumber={String(idx + 1).padStart(2, "0")}
              totalSlides={String(landmarks.length).padStart(2, "0")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}



LandMarks.displayName = "LandMarks";
export default memo(LandMarks);




