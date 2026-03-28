import { memo } from "react";

/**
 * SliderItemSkeleton Component
 * Provides a lightweight placeholder for the slider items.
 * Uses CSS skeletons instead of images for better performance.
 */
function SliderItemSkeleton() {
  return (
    <div 
      className="flex h-full w-full items-center justify-center"
      role="status"
      aria-label="Loading slide..."
    >
      <div 
        className="skeleton relative h-96 w-52 rounded-lg bg-white/5 opacity-50 select-none md:h-112 md:w-80 lg:h-136 lg:w-96 xl:w-72" 
        aria-hidden="true"
      />
    </div>
  );
}

SliderItemSkeleton.displayName = "SliderItemSkeleton";

export default memo(SliderItemSkeleton);
