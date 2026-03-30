"use client";

import { memo, useMemo } from "react";
import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";

interface SliderItemHeaderProps {
  item: LandmarksType;
  isVisible: boolean;
  className?: string;
}

/**
 * SliderItemHeader Component
 * Displays title and description for each slider item with entrance/exit transitions.
 * Refactored for performance and best practices.
 */
function SliderItemHeader({ item, isVisible, className }: SliderItemHeaderProps) {
  const { displayItem, isExiting } = useExitSlider(item);

  // Memoize transition classes for the main container
  const containerClasses = useMemo(() => cn(
    "pt-4 sm:pt-10 lg:pt-20 xl:pt-32 space-y-4 md:space-y-6 select-none transition-all duration-700 ease-in-out transform",
    isExiting
      ? "opacity-0 -translate-x-12 blur-md"
      : isVisible
        ? "opacity-100 translate-x-0 blur-0"
        : "-translate-x-12 opacity-0 blur-md",
    className
  ), [isExiting, isVisible, className]);

  return (
    <div
      className={containerClasses}
      role="region"
      aria-label={`${displayItem.title} details`}
    >
      <SliderItemTitle title={displayItem.title} isVisible={isVisible && !isExiting} />
      <SliderItemDescription description={displayItem.description} isVisible={isVisible && !isExiting} />
    </div>
  );
}

/**
 * SliderItemTitle Component
 * Premium animated title with staggered entrance.
 */
const SliderItemTitle = memo(({ title, isVisible }: { title: string; isVisible: boolean }) => (
  <h3 className={cn(
    "hidden lg:flex font-cairo text-4xl xl:text-5xl font-extrabold text-[#F2C975] uppercase tracking-[0.2em] text-right",
    "transition-all duration-700 delay-100",
    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
  )}>
    {title}
  </h3>
));
SliderItemTitle.displayName = "SliderItemTitle";

/**
 * SliderItemDescription Component
 * Premium glassmorphism-style description with improved typography.
 */
const SliderItemDescription = memo(({ description, isVisible }: { description: string; isVisible: boolean }) => (
  <p className={cn(
    "font-cairo text-lg font-medium text-white/95 sm:text-xl md:max-w-[96%] lg:max-w-160 leading-relaxed text-right",
    "transition-all duration-700 delay-300",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  )}>
    {description}
  </p>
));
SliderItemDescription.displayName = "SliderItemDescription";

SliderItemHeader.displayName = "SliderItemHeader";

export default memo(SliderItemHeader);
