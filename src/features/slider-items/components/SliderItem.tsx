"use client";

import { memo, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";

interface SliderItemProps {
  item: LandmarksType;
  index?: number;
  isVisible: boolean;
}

/**
 * SliderItem Component
 * Manages individual slide presentation with entrance/exit transitions.
 * Refactored for performance and bundle size.
 */
function SliderItem({
  item,
  index = 0,
  isVisible,
}: SliderItemProps) {
  const { displayItem, isExiting } = useExitSlider(item);
  const [isLoaded, setIsLoaded] = useState(false);

  const isFirstItem = index === 0;

  // Reset loaded state when image changes
  useEffect(() => {
    setIsLoaded(false);
  }, [displayItem.imageUrl]);

  // Optimized class names for the container
  const containerClasses = useMemo(() => cn(
    "absolute left-1/2 top-1/2 h-full w-[330px] -translate-y-1/2 transition-all duration-500 ease-in-out sm:w-[530px] xl:w-[730px]",
    isExiting
      ? "translate-x-full opacity-0 scale-95"
      : isVisible
        ? "translate-x-[-45%] opacity-100 scale-100 lg:translate-x-[-50%] xl:translate-x-[-55%]"
        : "translate-x-full opacity-0"
  ), [isExiting, isVisible]);

  return (
    <div
      className="relative w-full h-136 select-none md:h-136 lg:h-136 xl:h-140 xl:w-80"
      aria-hidden={!isVisible}
    >
      <figure className={containerClasses}>
        {/* Loading Skeleton / Background */}
        {!isLoaded && (
          <div
            className="skeleton absolute inset-0 rounded-lg bg-white/5 opacity-50"
            aria-hidden="true"
          />
        )}

        <Image
          key={displayItem.imageUrl}
          src={displayItem.imageUrl}
          alt={displayItem.title}
          fill
          priority={isFirstItem || isVisible}
          sizes="(max-width: 640px) 330px, (max-width: 1280px) 530px, 730px"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={cn(
            "object-contain transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-sm"
          )}
        />

        {/* Caption can be added here if needed semantically */}
      </figure>
    </div>
  );
}

SliderItem.displayName = "SliderItem";

export default memo(SliderItem);
