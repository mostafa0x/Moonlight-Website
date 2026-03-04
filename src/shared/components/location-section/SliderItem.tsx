"use client";

import type { ItemSliderType } from "@/shared/global";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { memo } from "react";

function SliderItem({
  slide,
  index = 0,
}: {
  slide: ItemSliderType;
  index: number;
}) {
  const firstItem = index === 0;
  return (
    <div className="relative  w-[405px] h-[545px] select-none ">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.name}
          initial={{ x: "100%", y: -80, opacity: 0 }}
          whileInView={{ x: "50%", opacity: 1 }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute w-full h-full "
        >
          <Image
            src={slide.src}
            alt="slide"
            fill
            priority={firstItem}
            quality={firstItem ? 50 : 30}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            fetchPriority={firstItem ? "high" : "low"}
            loading={firstItem ? "eager" : "lazy"}
            className="object-contain "
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default memo(SliderItem);
