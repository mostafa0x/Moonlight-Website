"use client";

import { memo } from "react";
import type { LandmarksType } from "@/shared/global";
import SliderImage from "./SliderImage";
import { useImageLoader } from "@/features/slider-items/hooks/useImageLoader";

interface LandmarkSlideProps {
  item: LandmarksType;
  isVisible: boolean;
  slideNumber: string;
  totalSlides: string;
}

/**
 * LandmarkSlide Component
 * Professional/Luxury edition: Static version with cinematic overlays.
 * Removed Framer Motion and CSS animations for maximum performance.
 */
function LandmarkSlide({ item, isVisible, slideNumber, totalSlides }: LandmarkSlideProps) {
  const { isLoaded, onImageLoad } = useImageLoader(item.imageUrl);

  // Still use isVisible for conditional rendering if needed, 
  // but let swiper handle the primary slide transitions.
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="h-full w-full">
          <SliderImage
            src={item.imageUrl}
            alt={item.title}
            isLoaded={isLoaded}
            priority={false}
            onLoad={onImageLoad}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Cinematic Layered Overlays */}
        {/* 1. Dramatic Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/60 z-10" />
        {/* 2. Content Gradient (Bottom-up) */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
        {/* 3. Subtle Side Gradient for offset text */}
        <div className="absolute inset-x-0 inset-y-0 bg-linear-to-r from-black/50 via-transparent to-transparent z-10" />
      </div>

      {/* Premium Content Layer */}
      <div className="relative h-full w-full flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-32 md:pb-48 lg:pb-64 z-20">
        <div className="max-w-5xl">

          {/* Title with Luxury Typography */}
          <h2 className="font-cairo text-3xl md:text-3xl  font-bold text-[#F2C975] mb-6 lg:mb-10 uppercase leading-[0.85] tracking-tighter bg-linear-to-b from-white via-white to-white/40 bg-clip-text [text-shadow:0_20px_50px_rgba(0,0,0,0.5)]">
            {item.title}
          </h2>

          {/* Description with Classic Styling */}
          <p className="font-cairo text-lg md:text-2xl lg:text-3xl text-white/70  max-w-3xl font-bold">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

LandmarkSlide.displayName = "LandmarkSlide";
export default memo(LandmarkSlide);
