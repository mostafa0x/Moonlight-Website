import { memo } from "react";
import Image from "next/image";
import HeroSectionHeader from "@/features/home/page1/components/HeroSectionHeader";

/**
 * Page1 - Hero Section
 * The primary entry point for the homepage.
 * Optimized for LCP (Largest Contentful Paint) and premium aesthetics.
 */
function Page1({ locale }: { locale: string }) {
  return (
    <section
      className="h-screen w-full relative overflow-hidden bg-transparent select-none"
      aria-label="Welcome to Moonlight"
    >


      {/* Content Component */}
      <div className="relative z-20 h-full w-full">
        <HeroSectionHeader locale={locale} />
      </div>
    </section>
  );
}

export default memo(Page1);
