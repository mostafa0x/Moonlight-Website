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
    <div className={cn("relative overflow-hidden rounded-2xl bg-black/20 transition-all duration-500", className)}>
      {/* Premium Placeholder Image Loader — Responsive & Centered */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 rounded-2xl">
          <div className="relative w-72 h-32 md:w-64 md:h-64 lg:w-96 lg:h-96 opacity-30 animate-pulse">
            <Image
              src="/imgs/placeholder.webp"
              alt="Loading..."
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 256px, 384px"
            />
          </div>
        </div>
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
        onError={onLoad} // Still mark as loaded to hide placeholder on error
        className={cn(
          "object-contain transition-all duration-1200 cubic-bezier(0.4, 0, 0.2, 1)",
          isLoaded
            ? "opacity-100 scale-100 blur-0"
            : "opacity-0 scale-105 blur-sm"
        )}
      />
    </div>
  );
}

export default memo(SliderImage);
