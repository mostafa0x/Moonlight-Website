"use client";

import { memo, useMemo } from "react";
import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";

interface SliderItemHeaderProps {
  item: LandmarksType;
  isVisible: boolean;
}

/**
 * SliderItemHeader Component
 * Displays title and description for each slider item with entrance/exit transitions.
 * Refactored for performance and best practices.
 */
function SliderItemHeader({ item, isVisible }: SliderItemHeaderProps) {
  const { displayItem, isExiting } = useExitSlider(item);

  // Memoize class names to prevent recalculation on every render
  const containerClasses = useMemo(() => cn(
    "pt-8 sm:pt-10 lg:pt-32 space-y-4 select-none transition-all duration-500 ease-in-out transform",
    isExiting
      ? "opacity-0 -translate-x-full scale-95"
      : isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "-translate-x-full opacity-0 scale-95",
  ), [isExiting, isVisible]);

  return (
    <article
      className={containerClasses}
      aria-label={`${displayItem.title} information`}
    >
      <h3 className="hidden font-cairo text-2xl font-bold text-[#F2C975] lg:flex uppercase tracking-wide">
        {displayItem.title}
      </h3>

      <p className="font-cairo text-base font-medium text-[#E0E0E0] sm:text-lg md:max-w-[96%] lg:max-w-152 leading-relaxed">
        {displayItem.description}
      </p>
    </article>
  );
}

SliderItemHeader.displayName = "SliderItemHeader";

export default memo(SliderItemHeader);
