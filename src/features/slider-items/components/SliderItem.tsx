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
    <div className="relative w-[405px] h-[545px] select-none">
      <div
        className={`
          absolute w-full h-full transition-all duration-400 ease-in-out
          ${
            isExiting
              ? "opacity-0 translate-x-full"
              : ` ${isInView ? "translate-x-34 opacity-100" : "translate-x-full opacity-0"}`
          }
          hover:scale-105 hover:rotate-5`}
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
