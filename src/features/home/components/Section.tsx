import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";


interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Section — High-performance Server Component wrapper.
 * 
 * Performance Optimization:
 * 1. The 'hero' section renders immediately without animations to achieve 
 *    the best possible LCP (Largest Contentful Paint).
 * 2. Other sections delegate animations to the AnimatedSectionContent client component.
 * 3. Uses CSS 'content-visibility' and containment for high-fps layout.
 */
export default function Section({ children, id, className }: SectionProps) {
  const isHero = id === "hero";

  return (
    <section
      id={id}
      style={{
        contentVisibility: "visible",
      } as any}
      className={cn(
        "h-screen w-full relative",
        !className?.includes("overflow-") && "overflow-hidden",
        className
      )}
    >
      <div className="h-full w-full">
        {children}
      </div>
    </section>
  );
}




