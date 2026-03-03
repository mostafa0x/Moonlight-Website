import { AnimatePresence, motion } from "motion/react";
import React from "react";

export default function SliderItemHeader({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="pt-[131px] space-y-[16px] "
        key={name}
      >
        <h2 className="text-[#F2C975] font-cairo font-bold text-2xl ">
          {name}
        </h2>
        <p className="text-[#E0E0E0] font-cairo font-medium text-[20px] max-w-[611px]">
          {desc}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
