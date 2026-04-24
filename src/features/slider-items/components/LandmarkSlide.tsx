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

  // We always render the slide content so Swiper can manage transitions
  // even if the section is just partially in view.

  return (
    <div className="relative w-full h-full flex flex-col items-start pt-6 px-10 sm:px-12 md:px-20 lg:px-24 overflow-hidden">
      {/* 2. Central Image Section (Now at the Top) */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center min-h-0 my-0 md:my-2 mt-17.5">
        <div className="relative w-full h-full max-h-[50vh] md:max-h-[60vh] max-w-none rounded-2xl overflow-hidden group">
          <SliderImage
            src={item.imageUrl}
            alt={item.title}
            isLoaded={isLoaded}
            priority={true}
            onLoad={onImageLoad}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* 1. Content Wrapper (Title + Description below image) */}
      <div className="relative z-10 w-full pt-4 pb-32 md:pb-24 space-y-2 md:space-y-4 max-w-5xl">
        <h2 className="font-cairo text-[20px] md:text-3xl font-bold text-[#F2C975]">
          {item.title}
        </h2>
        <p className="font-cairo text-base md:text-xl lg:text-2xl text-white/80 font-semibold leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

LandmarkSlide.displayName = "LandmarkSlide";
export default memo(LandmarkSlide);
