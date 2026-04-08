"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
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
 * Restored to the original premium design with high-performance Framer Motion transitions.
 */
function LandmarkSlide({ item, isVisible, slideNumber, totalSlides }: LandmarkSlideProps) {
  const { isLoaded, onImageLoad } = useImageLoader(item.imageUrl);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={item.imageUrl}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {/* Immersive Background Image */}
          <div className="absolute inset-0 z-0">
            <motion.div
              animate={{ scale: 1.1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="h-full w-full"
            >
              <SliderImage
                src={item.imageUrl}
                alt={item.title}
                isLoaded={isLoaded}
                priority={isVisible}
                onLoad={onImageLoad}
                className="h-full w-full object-contain"
              />
            </motion.div>
            {/* Dynamic Overlays */}
            {/* Soft Transparent Overlays for readability only */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10" />
          </div>

          {/* Content Layer */}
          <div className="relative h-full w-full flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-12 lg:pb-24 z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >

              <div className="flex items-center gap-4 mb-4">
                <span className="text-[#F2C975] font-mono text-base md:text-lg tracking-widest">{slideNumber}</span>
                <div className="w-8 md:w-12 h-px bg-white/20" />
                <span className="text-white/40 font-mono text-base md:text-lg tracking-widest">{totalSlides}</span>
              </div>

              <h2 className="font-cairo text-4xl md:text-6xl lg:text-9xl font-black text-white mb-4 lg:mb-6 uppercase leading-[1] md:leading-[0.9] bg-linear-to-r from-white via-white to-white/60 bg-clip-text">
                {item.title}
              </h2>


              <p className="font-cairo text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

LandmarkSlide.displayName = "LandmarkSlide";
export default memo(LandmarkSlide);


