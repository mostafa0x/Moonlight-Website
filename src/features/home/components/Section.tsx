import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Section — Lightweight wrapper for full-page Swiper slides.
 */
export default function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "h-full w-full relative",
        !className?.includes("overflow-") && "overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}
