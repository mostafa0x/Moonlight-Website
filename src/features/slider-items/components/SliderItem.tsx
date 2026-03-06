"use client";
import { useExitSlider } from "@/features/slider-items/hooks";
import type { ItemSliderType } from "@/shared/global";
import Image from "next/image";
import { memo } from "react";

function SliderItem({
  slide,
  index = 0,
  isInView,
}: {
  slide: ItemSliderType;
  index: number;
  isInView: boolean;
}) {
  const { displaySlide, isExiting } = useExitSlider(slide);
  const firstItem = index === 0;

  return (
    <div className="relative w-full lg:w-125 h-95.75 md:h-112.5 lg:h-136.25 select-none">
      <div
        className={`
    absolute left-1/2 top-1/2 
    -translate-x-1/2 -translate-y-1/2
    w-52 md:w-85 lg:w-101.25 h-full 
    transition-all duration-400 ease-in-out
    ${
      isExiting
        ? "opacity-0 translate-x-full"
        : `${isInView ? "opacity-100" : "translate-x-full opacity-0"}`
    }
    hover:scale-105 hover:rotate-5
  `}
      >
        <Image
          src={displaySlide.src}
          alt="slide"
          fill
          priority={firstItem}
          quality={firstItem ? 45 : 30}
          sizes="(max-width: 768px) 100vw, 405px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default memo(SliderItem);
