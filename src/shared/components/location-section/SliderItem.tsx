"use client";

import type { ItemSliderType } from "@/shared/global";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

function SliderItem({
  slide,
  index = 0,
}: {
  slide: ItemSliderType;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const firstItem = index === 0;

  useEffect(() => {
    setVisible(false);

    const timeout = setTimeout(() => {
      setVisible(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, [slide]);

  return (
    <div className="relative w-[405px] h-[545px] overflow-hidden select-none">
      <div
        className={`
          absolute inset-0
          transition-all duration-500 ease-in-out
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
          hover:scale-105 hover:rotate-6
        `}
      >
        <Image
          src={slide.src}
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
