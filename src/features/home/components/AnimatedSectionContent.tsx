"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface AnimatedSectionContentProps {
  children: ReactNode;
}

/**
 * AnimatedSectionContent - Handles the fade-in animation for sections.
 * This is a Client Component to enable Intersection Observer based animations.
 */
export default function AnimatedSectionContent({ children }: AnimatedSectionContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
