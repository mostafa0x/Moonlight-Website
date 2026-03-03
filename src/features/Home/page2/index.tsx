"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useAutoSlider } from "@/shared/hooks/useSectionSlider";

const slides = [
  { src: "/imgs/item1.png", desc: "The Great Pyramid of Giza" },
  { src: "/imgs/item2.png", desc: "Ancient Egyptian Architecture" },
  { src: "/imgs/item3.png", desc: "Historical Wonders of the World" },
];

export default function Page2({ page }: { page: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });

  const index = useAutoSlider(isInView, slides.length);

  return (
    <section
      ref={ref}
      className="h-screen w-full flex items-center justify-center overflow-hidden px-20"
    >
      <div className="flex w-full max-w-7xl items-center justify-between">
        <div className="w-1/2 pr-10">
          <h1 className="text-6xl font-bold mb-6">Gize</h1>

          <div className="h-20 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={slides[index].desc}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl leading-relaxed"
              >
                {slides[index].desc}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative w-[300px] h-[450px] ">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute w-full h-full"
            >
              <Image
                src={slides[index].src}
                alt="slide"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
