"use client";

import { memo } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
}

/**
 * SectionHeader Component
 * A reusable, performant header with motion animations and responsive positioning.
 */
const SectionHeader = memo(({ title }: SectionHeaderProps) => {
  return (
    <motion.h1
      initial={{ y: +10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full text-center text-white text-2xl md:text-3xl font-bold z-50"
    >
      {title}
    </motion.h1>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
