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
 * Section — High-performance scroll-snap section wrapper.
 * Uses CSS 'content-visibility' to skip off-screen rendering and isolates
 * animations to an inner container for zero-lag snapping.
 */
export default function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      style={{ 
        contentVisibility: "auto", 
        containIntrinsicSize: "100vh",
        scrollSnapStop: "always", // Key for fullpage.js feel
        willChange: "transform"
      } as any}
      className={cn(
        "h-screen w-full snap-start snap-always relative overflow-hidden contain-layout contain-paint",
        className
      )}
    >
       <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true, amount: 0.1 }}
         transition={{ duration: 0.8 }}
         className="h-full w-full"
       >
         {children}
       </motion.div>
    </section>
  );
}




