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
    <div 
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{ position: 'relative' }} // Explicitly ensure relative for Next.js Image fill
    >

      {/* Simple Spinner Loader */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}

      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        quality={65}
        fetchPriority={priority ? "high" : "low"}
        onLoad={onLoad}
        onError={onLoad}
        className={cn(
          "transition-opacity duration-700 ease-out",
          // If object-fit class is passed in className, tailwind-merge might not apply it to Image
          // So we should ideally parse it, but for now we'll ensure object-contain/cover is handled
          className?.includes("object-cover") ? "object-cover" : "object-contain",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>

  );
}

export default memo(SliderImage);
