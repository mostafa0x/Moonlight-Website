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
      className="h-screen w-full relative overflow-hidden select-none"
      aria-label="Cultural Landmarks Gallery"
    >
      {/* Decorative Branding / Static Section Title */}
      <h1 className="absolute top-20 left-10 lg:top-20 lg:left-20 text-white/30 text-2xl font-bold tracking-[0.5em] uppercase z-50">
        {titleHeader}
      </h1>

      <div className="relative w-full h-full lg:max-w-7xl mx-auto">
        {landmarks.map((landmark, idx) => (
          <LandmarkSlide
            key={`${landmark.title}-${idx}`}
            item={landmark}
            isVisible={idx === currentIndex}
            slideNumber={String(idx + 1).padStart(2, "0")}
            totalSlides={String(landmarks.length).padStart(2, "0")}
          />
        ))}
      </div>

      {/* Slide Navigation Dots (Optional aesthetic touch) */}
      <div className="absolute right-6 bottom-10  lg:-translate-y-1/2 flex lg:flex-col gap-3 z-50 opacity-60">
        {landmarks.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "transition-all duration-300 rounded-full",
              idx === currentIndex ? "bg-[#F2C975] w-8 h-1 lg:h-8 lg:w-1" : "bg-white/20 w-3 h-1 lg:h-3 lg:w-1"
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(LandMarks);
