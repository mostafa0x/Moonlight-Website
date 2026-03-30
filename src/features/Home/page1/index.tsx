import { memo } from "react";
import Image from "next/image";
import HeroSectionHeader from "@/features/home/page1/components/HeroSectionHeader";
import { cn } from "@/shared/lib/utils";

/**
 * Page1 - Hero Section
 * The primary entry point for the homepage.
 * Optimized for LCP (Largest Contentful Paint) and premium aesthetics.
 */
function Page1({ currentPage }: { currentPage: number }) {
  return (
    <section
      className="h-screen w-full relative overflow-hidden bg-black select-none"
      aria-label="Welcome to Moonlight"
    >
      {/* Background Image Container - Optimized for LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src={"/backgrounds/background.webp"}
          alt="Ancient Egypt Moonlight Experience"
          fill
          priority
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className={cn(
            "object-cover transition-transform duration-8000 ease-out",
            currentPage === 1 ? "scale-110" : "scale-100"
          )}
        />

        {/* Cinematic Overlays Layer */}
        <div className="absolute inset-0 z-10">
          {/* Subtle Vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80 pointer-events-none" />

          {/* Bottom Depth Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent pointer-events-none" />



        </div>
      </div>

      {/* Content Component */}
      <div className="relative z-20 h-full w-full">
        <HeroSectionHeader />
      </div>
    </section>
  );
}

export default memo(Page1);
