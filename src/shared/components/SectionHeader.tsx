"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  textColor?: string;
}

/**
 * SectionHeader Component
 * A reusable, performant header with motion animations and responsive positioning.
 */
const SectionHeader = memo(({ title, textColor = "text-[#F2C975]" }: SectionHeaderProps) => {
  return (
    <motion.h1
      initial={{ y: -10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`absolute top-32 left-1/2 -translate-x-1/2 w-full text-center ${textColor} text-2xl md:text-3xl font-bold z-50 pointer-events-none`}
    >
      {title}
    </motion.h1>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
