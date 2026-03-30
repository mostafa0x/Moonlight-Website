"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";
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
 * A unified, fully-responsive slide containing both image and textual content.
 * Optimized for CLS and premium aesthetics.
 */
function LandmarkSlide({ item, isVisible, slideNumber, totalSlides }: LandmarkSlideProps) {
  const { isLoaded, onImageLoad } = useImageLoader(item.imageUrl);

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out",
        isVisible ? "opacity-100 scale-100 rotate-0 blur-0 z-20" : "opacity-0 scale-105 rotate-1 blur-lg z-10 pointer-events-none"
      )}
    >
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <SliderImage
          src={item.imageUrl}
          alt={item.title}
          isLoaded={isLoaded}
          priority={isVisible}
          onLoad={onImageLoad}
          className={cn(
            "h-full w-full object-cover transition-transform duration-4000 ease-linear",
            isVisible ? "scale-110" : "scale-100"
          )}
        />
        {/* Dynamic Overlays for depth and legibility */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent z-10" />
      </div>

      {/* Content Layer */}
      <div className="relative h-full w-full flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-20 lg:pb-24 z-20">
        <div className={cn(
          "max-w-4xl transition-all duration-1000 delay-300 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        )}>
          {/* Slide Indicator */}
          {/* <div className="flex items-center gap-4 mb-4 lg:mb-8">
            <span className="text-[#F2C975] text-sm lg:text-base font-bold tracking-[0.3em] uppercase">
              {slideNumber}
            </span>
            <div className="w-12 h-px bg-[#F2C975]" />
            <span className="text-white/60 text-sm lg:text-base font-medium tracking-widest">{totalSlides}</span>
          </div> */}

          <h2 className={cn(
            "font-cairo text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 uppercase leading-[0.9]",
            "bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
          )}>
            {item.title}
          </h2>

          <p className="font-cairo text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
            {item.description}
          </p>

          {/* <div className="mt-8 lg:mt-12">
            <button className="px-8 py-3 bg-[#F2C975] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white transition-colors duration-300">
              Explore More
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default memo(LandmarkSlide);
