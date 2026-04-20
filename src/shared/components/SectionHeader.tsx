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
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`absolute top-25 left-7 md:top-23 md:left-15.5 lg:top-25 lg:left-17 xl:left-15 ${textColor} text-2xl font-bold z-50 pointer-events-none`}
    >
      {title}
    </motion.h1>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
