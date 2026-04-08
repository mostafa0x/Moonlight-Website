"use client";

import { ReactNode } from "react";

import { motion } from "motion/react";
import { cn } from "@/shared/lib/utils";


interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Section — A premium scroll-snap section wrapper.
 * Optimized as a Server Component for maximum performance.
 */
export default function Section({ children, id, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "h-screen w-full snap-start snap-always relative overflow-hidden",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

