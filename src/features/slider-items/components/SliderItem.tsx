"use client";
import { memo, useMemo } from "react";
import { useExitSlider } from "@/features/slider-items/hooks";
import { useImageLoader } from "@/features/slider-items/hooks/useImageLoader";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";
import SliderImage from "./SliderImage";

interface SliderItemProps {
  item: LandmarksType;
  index?: number;
  isVisible: boolean;
}

/**
 * SliderItem Component
 * Manages individual slide presentation with entrance/exit transitions.
 * Refactored using Vercel best practices for performance and INP.
 */
function SliderItem({
  item,
  index = 0,
  isVisible,
}: SliderItemProps) {
  const { displayItem, isExiting } = useExitSlider(item);
  const isFirstItem = index === 0;

  // Custom hook for image loading state and cache detection
  const { isLoaded, onImageLoad } = useImageLoader(displayItem.imageUrl);

  // Memoized classes for the container to improve responsiveness and performance
  const containerClasses = useMemo(() => cn(
    "absolute left-1/2 top-1/2 h-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
    "w-[85vw] sm:w-[70vw] lg:w-[45vw] xl:w-[35vw]", // Fluid width based on viewport
    "-translate-y-1/2 translate-x-[-50%]", // Center by default
    isExiting
      ? "translate-x-full opacity-0 scale-90 rotate-3 blur-lg"
      : isVisible
        ? "opacity-100 scale-100 rotate-0 blur-0 translate-x-[-50%] lg:translate-x-[-5%] xl:translate-x-[-15%]" // Offset for desktop
        : "translate-x-[150%] opacity-0 scale-95 -rotate-2"
  ), [isExiting, isVisible]);

  return (
    <article
      className="relative w-full h-[45vh] sm:h-[55vh] lg:h-[70vh] xl:h-[75vh] select-none overflow-visible"
      aria-hidden={!isVisible}
    >
      <div className={containerClasses}>
        <SliderImage
          src={displayItem.imageUrl}
          alt={displayItem.title}
          isLoaded={isLoaded}
          priority={isFirstItem || isVisible}
          onLoad={onImageLoad}
          className={cn(
            "h-full w-full",
            "aspect-3/4 sm:aspect-4/3 lg:aspect-auto object-cover rounded-2xl md:rounded-3xl"
          )}
        />

      </div>
    </article>
  );
}

SliderItem.displayName = "SliderItem";

export default memo(SliderItem);
