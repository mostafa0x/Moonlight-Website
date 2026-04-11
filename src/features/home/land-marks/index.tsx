"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import type { LandmarksType } from "@/shared/global";



/**
 * LandMarks Section
 * Optimized version: Handles structural layout as a static unit,
 * delegating interactive slider logic to a focused sub-component.
 */
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay, EffectFade } from "swiper/modules";

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
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 left-10 lg:top-20 lg:left-20 text-white/50 text-2xl font-bold tracking-[0.5em] uppercase z-50 pointer-events-none"
      >
        {titleHeader}
      </motion.h1>

      <style dangerouslySetInnerHTML={{
        __html: `
        .landmark-swiper .swiper-pagination-progressbar {
          top: auto !important;
          bottom: 0 !important;
          height: 4px !important;
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .landmark-swiper .swiper-pagination-progressbar-fill {
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
        autoplay={{
          delay: 7500,
          disableOnInteraction: false,
        }}
        rewind={landmarks.length > 1}
        grabCursor={true}
        mousewheel={{
          forceToAxis: true,
        }}
        pagination={{
          type: "progressbar",
        }}
        modules={[Mousewheel, Pagination, Autoplay, EffectFade]}
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




