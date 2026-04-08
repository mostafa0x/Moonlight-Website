"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "motion/react";
import { useAutoSlider } from "@/features/slider-items/hooks";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import type { LandmarksType } from "@/shared/global";

/**
 * LandMarks Section
 * Restored to the original high-performance slider design.
 */
function LandMarks({
  landmarks = [],
  titleHeader,
}: {
  landmarks: LandmarksType[];
  titleHeader: string;
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  // Custom hook for managing the auto-advancing slide index
  const currentIndex = useAutoSlider(isInView, landmarks.length, 7500);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.8 }}
      className="h-screen w-full snap-start snap-always relative overflow-hidden select-none bg-black"
      aria-label="Cultural Landmarks Gallery"
    >

      {/* Decorative Branding / Static Section Title */}
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 left-10 lg:top-20 lg:left-20 text-white/30 text-2xl font-bold tracking-[0.5em] uppercase z-50 pointer-events-none"
      >
        {titleHeader}
      </motion.h1>

      <div className="relative w-full h-full">
        {landmarks.map((landmark, idx) => {
          // Determine if the slide should be rendered
          const isNear = Math.abs(idx - currentIndex) <= 1;
          const isWrapAroundPrev = currentIndex === 0 && idx === landmarks.length - 1;
          const isWrapAroundNext = currentIndex === landmarks.length - 1 && idx === 0;
          
          if (!isNear && !isWrapAroundPrev && !isWrapAroundNext) return null;

          return (
            <LandmarkSlide
              key={`${landmark.title}-${idx}`}
              item={landmark}
              isVisible={idx === currentIndex && isInView}
              slideNumber={String(idx + 1).padStart(2, "0")}
              totalSlides={String(landmarks.length).padStart(2, "0")}
            />
          );
        })}
      </div>
    </motion.section>
  );
}

LandMarks.displayName = "LandMarks";
export default memo(LandMarks);


