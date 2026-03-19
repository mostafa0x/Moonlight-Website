"use client";

import { useExitSlider } from "@/features/slider-items/hooks";
import type { LandmarksType } from "@/shared/global";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { memo, useState, useEffect } from "react";

const imageCache = new Set<string>();

function SliderItem({
  item,
  index = 0,
  isVisible,
}: {
  item: LandmarksType;
  index: number;
  isVisible: boolean;
}) {
  const { displayItem, isExiting } = useExitSlider(item);
  const isFirstItem = index === 0;

  const [loaded, setLoaded] = useState(imageCache.has(displayItem.imageUrl));

  const handleCacheImage = () => {
    imageCache.add(displayItem.imageUrl);
    setLoaded(true);
  };

  useEffect(() => {
    setLoaded(imageCache.has(displayItem.imageUrl));
  }, [displayItem.imageUrl]);

  return (
    <div className="relative w-full lg:w-75 xl:w-75 2xl:w-15 h-95.75 md:h-112.5 lg:h-136.25 select-none">
      <div
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-[50%] lg:-translate-x-[60%] xl:-translate-x-[70%] -translate-y-1/2 w-[330px] sm:w-[530px] xl:w-[730px] h-full transition-all duration-400 ease-in-out",
          isExiting
            ? "opacity-0 translate-x-full"
            : isVisible
              ? "opacity-100"
              : "translate-x-full opacity-0",
        )}
      >
        {!loaded && (
          <Image
            src="/imgs/placeholder.webp"
            alt="loading"
            fill
            sizes="(max-width: 768px) 100vw, 402px"
            className="object-contain blur-sm"
          />
        )}

        <Image
          src={displayItem.imageUrl}
          alt={displayItem.title}
          fill
          priority={isFirstItem}
          sizes="(max-width: 768px) 100vw, 730px}"
          onLoad={handleCacheImage}
          className={cn(
            "object-contain transition-opacity duration-500 ",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </div>
  );
}

export default memo(SliderItem);
