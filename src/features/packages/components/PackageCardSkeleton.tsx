import { memo } from "react";

/**
 * PackageCardSkeleton Component
 * Static placeholder for the PackageCard during loading states.
 * Uses memo to prevent unnecessary re-renders.
 */
function PackageCardSkeleton() {
  return (
    <div 
      className="relative h-130 w-full overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-lg animate-pulse"
      role="status"
      aria-label="Loading package..."
    >
      {/* Background Skeleton Shimmer */}
      <div className="skeleton absolute inset-0 opacity-20" />

      {/* Content Skeleton Overlay */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-6 pb-4">
        {/* Title Skeleton */}
        <div className="skeleton h-8 w-3/4 rounded-lg bg-white/10" />

        <div className="flex items-end justify-between">
          {/* Price Skeleton */}
          <div className="flex flex-col gap-2">
            <div className="skeleton h-3 w-20 rounded-full bg-white/5" />
            <div className="skeleton h-10 w-32 rounded-lg bg-[#F2C975]/20" />
          </div>
          
          {/* Button Skeleton */}
          <div className="skeleton h-10 w-28 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

PackageCardSkeleton.displayName = "PackageCardSkeleton";

export default memo(PackageCardSkeleton);
