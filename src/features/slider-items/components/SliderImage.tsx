"use client";

import { memo } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface SliderImageProps {
  src: string;
  alt: string;
  isLoaded: boolean;
  priority?: boolean;
  onLoad: () => void;
  className?: string;
}

/**
 * SliderImage Component
 * Optimized image with skeleton loading and smooth transitions.
 */
function SliderImage({ 
  src, 
  alt, 
  isLoaded, 
  priority = false, 
  onLoad, 
  className 
}: SliderImageProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl transition-all duration-500", className)}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div
          className="skeleton absolute inset-0 z-10 rounded-2xl opacity-50"
          aria-hidden="true"
        />
      )}

      <Image
        key={src} // Reset internal image state when src changes
        src={src}
        alt={alt}
        fill
        quality={60}
        priority={priority}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 730px"
        onLoad={onLoad}
        onError={onLoad} // Still mark as loaded to hide skeleton on error
        className={cn(
          "object-contain transition-all duration-1000 ease-out",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
        )}
      />

    </div>
  );
}

export default memo(SliderImage);
