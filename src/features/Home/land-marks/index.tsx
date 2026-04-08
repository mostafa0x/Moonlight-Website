"use client";

import { memo, useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { useAutoSlider } from "@/features/slider-items/hooks";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import type { LandmarksType } from "@/shared/global";


import Section from "@/features/home/components/Section";

/**
 * LandMarks Section
 * Optimized version: Handles structural layout as a static unit,
 * delegating interactive slider logic to a focused sub-component.
 */
interface LandMarksProps {
  id?: string;
  landmark: LandmarksType;
  titleHeader: string;
  index: number;
  total: number;
}

/**
 * LandMarks Section
 * Simplified version: Renders a single landmark as an independent full-page section.
 */
function LandMarks({
  id,
  landmark,
  titleHeader,
  index,
  total,
}: LandMarksProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  return (
    <Section
      id={id}
      className=" select-none"
      aria-label={`Landmark: ${landmark.title}`}
    >
      <div ref={containerRef} className="relative w-full h-full">
        {/* Static Header */}
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-20 left-10 lg:top-20 lg:left-20 text-white/30 text-2xl font-bold tracking-[0.5em] uppercase z-50 pointer-events-none"
        >
          {titleHeader}
        </motion.h1>

        {/* The single landmark content */}
        <div className="relative w-full h-full will-change-transform">
          <LandmarkSlide
            item={landmark}
            isVisible={isInView}
            slideNumber={String(index + 1).padStart(2, "0")}
            totalSlides={String(total).padStart(2, "0")}
          />
        </div>
      </div>
    </Section>
  );
}

LandMarks.displayName = "LandMarks";
export default memo(LandMarks);




