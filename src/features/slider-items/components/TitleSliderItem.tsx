"use client";

import { memo, useMemo } from "react";
import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";

interface TitleSliderItemProps {
  item: LandmarksType;
  isVisible: boolean;
}

/**
 * TitleSliderItem Component
 * Mobile-focused title display for the slider with transitions.
 */
function TitleSliderItem({ item, isVisible }: TitleSliderItemProps) {
  const { displayItem, isExiting } = useExitSlider(item);

  // Memoize transition classes
  const titleClasses = useMemo(() => cn(
    "font-cairo text-xl font-bold text-[#F2C975] select-none transition-all duration-500 ease-in-out transform sm:text-2xl",
    isExiting
      ? "opacity-0 -translate-x-full scale-95"
      : isVisible
        ? "translate-x-0 opacity-100 scale-100"
        : "-translate-x-full opacity-0 scale-95",
  ), [isExiting, isVisible]);

  return (
    <h3 className={titleClasses}>
      {displayItem.title}
    </h3>
  );
}

TitleSliderItem.displayName = "TitleSliderItem";

export default memo(TitleSliderItem);
