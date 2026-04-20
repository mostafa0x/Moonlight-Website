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
    <div className="relative w-full h-full flex flex-col items-start pt-10 px-10 sm:px-12 md:pt-3 md:px-20 lg:px-24 overflow-hidden">
      {/* Background Decorative Element */}

      {/* 1. Header/Title Section */}
      <div className="relative z-10 w-full pt-28 md:pt-32 pb-4 text-left">
        <h2 className="font-cairo text-[20px] md:text-3xl font-bold text-[#F2C975]">
          {item.title}
        </h2>
      </div>

      {/* 2. Central Image Section */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center min-h-0 my-0 md:my-2">
        <div className="relative w-full h-full max-h-[75vh] md:max-h-[90vh] max-w-none rounded-2xl overflow-hidden group">
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

      {/* 3. Bottom Description Section */}
      <div className="relative z-10 w-full pt-4 pb-24 md:pb-24 text-left max-w-4xl">
        <p className="font-cairo text-base md:text-xl lg:text-2xl text-white/80 font-semibold">
          {item.description}
        </p>
      </div>
    </div>
  );
}

LandmarkSlide.displayName = "LandmarkSlide";
export default memo(LandmarkSlide);
