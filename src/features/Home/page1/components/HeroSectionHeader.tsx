"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

/**
 * HeroSectionHeader Component
 * Premium animated header for the home page.
 * Features staggered entrance animations and cinematic typography.
 */
function HeroSectionHeader() {
  const t = useTranslations("home.hero");

  return (
    <div className="relative flex flex-col w-full h-full justify-center items-center z-20 select-none px-6 text-center">
      {/* Decorative vertical line for high-end feel */}
      <div className="w-px h-16 bg-linear-to-b from-transparent via-[#F2C975] to-transparent mb-8" />

      <header className="space-y-4 md:space-y-6 max-w-5xl contain-content">
        {/* Static Title - Optimized as LCP candidate */}
        <h2 className={cn(
          "text-2xl sm:text-3xl md:text-5xl font-cairo font-bold text-white tracking-[0.2em] uppercase",
          "[text-shadow:0_0_15px_rgba(242,201,117,0.4)] antialiased font-synthesis-none"
        )}>
          {t("title")}
        </h2>

        {/* Static Subtitle - Optimized as LCP candidate */}
        <h1 className={cn(
          "text-4xl sm:text-6xl md:text-8xl font-cairo font-black leading-tight",
          "bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent",
          "[text-shadow:0_10px_30px_rgba(0,0,0,0.5)] antialiased font-synthesis-none"
        )}>
          {t("subtitle")}
        </h1>
      </header>

      {/* Hero Footnote / Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 cursor-pointer">
        <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
          {t("journey")}
        </span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </div>
  );
}

export default memo(HeroSectionHeader);
