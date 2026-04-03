"use client";
import { memo } from "react";
import { useAutoSlider } from "@/features/slider-items/hooks";
import LandmarkSlide from "@/features/slider-items/components/LandmarkSlide";
import { cn } from "@/shared/lib/utils";
import type { LandmarksType } from "@/shared/global";

/**
 * LandMarks Section
 * A premium, fully responsive slider showcasing cultural landmarks.
 * Refactored for a unified "Single Slide" experience that works on all viewports.
 */
function LandMarks({
  currentPage,
  landmarks = [],
  titleHeader,
  page,
}: {
  currentPage: number;
  landmarks: LandmarksType[];
  titleHeader: string;
  page: number;
}) {
  const isPageInView = currentPage === page;

  // Custom hook for managing the auto-advancing slide index
  const currentIndex = useAutoSlider(isPageInView, landmarks.length, 7500);

  return (
    <section
      className={cn(
        "h-screen w-full relative overflow-hidden select-none transition-[opacity,transform] duration-1000 ease-in-out will-change-[opacity,transform]",
        isPageInView ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}
      aria-label="Cultural Landmarks Gallery"
    >
      {/* Decorative Branding / Static Section Title */}
      <h1 className={cn(
        "absolute top-20 left-10 lg:top-20 lg:left-20 text-white/30 text-2xl font-bold tracking-[0.5em] uppercase z-50 transition-all duration-1000",
        isPageInView ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      )}>
        {titleHeader}
      </h1>

      <div className="relative w-full h-full">
        {landmarks.map((landmark, idx) => {
          // Determine if the slide is the current one, the next one, or the previous one.
          // This "Buffer" (±1) is essential to keep animations working while saving TBT.
          const isNear = Math.abs(idx - currentIndex) <= 1;
          const isWrapAroundPrev = currentIndex === 0 && idx === landmarks.length - 1;
          const isWrapAroundNext = currentIndex === landmarks.length - 1 && idx === 0;
          
          if (!isNear && !isWrapAroundPrev && !isWrapAroundNext) return null;

          return (
            <LandmarkSlide
              key={`${landmark.title}-${idx}`}
              item={landmark}
              isVisible={idx === currentIndex && isPageInView}
              slideNumber={String(idx + 1).padStart(2, "0")}
              totalSlides={String(landmarks.length).padStart(2, "0")}
            />
          );
        })}
      </div>


    </section>
  );
}

export default memo(LandMarks);
