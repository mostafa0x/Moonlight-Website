"use client";
import { useExitSlider } from "@/features/slider-items/hooks";
import type { ItemSliderType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { memo } from "react";

function SliderItem({
  item,
  index = 0,
  isVisible,
}: {
  item: ItemSliderType;
  index: number;
  isVisible: boolean;
}) {
  const { displayItem, isExiting } = useExitSlider(item);
  const isFirstItem = index === 0;

  return (
    <div className="relative w-full lg:w-75 xl:w-75 2xl:w-15 h-95.75 md:h-112.5 lg:h-136.25 select-none">
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 md:w-85 lg:w-101.25 h-full transition-all duration-400 ease-in-out",
          isExiting
            ? "opacity-0 translate-x-full"
            : `${isVisible ? " opacity-100" : "translate-x-full opacity-0"}`,
        )}
      >
        <Image
          src={displayItem.src}
          alt={displayItem.name}
          fill
          priority={isFirstItem}
          quality={isFirstItem ? 45 : 30}
          sizes="(max-width: 768px) 100vw, 405px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
export default memo(SliderItem);
