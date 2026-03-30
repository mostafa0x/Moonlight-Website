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
      <div className="w-px h-16 bg-linear-to-b from-transparent via-[#F2C975] to-transparent mb-8 animate-pulse" />

      <header className="space-y-4 md:space-y-6 max-w-5xl">
        {/* Animated Title */}
        <h2 className={cn(
          "text-2xl sm:text-3xl md:text-5xl font-cairo font-bold text-white tracking-[0.2em] uppercase",
          "drop-shadow-[0_0_15px_rgba(242,201,117,0.4)]",
          "animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
        )}>
          {t("title")}
        </h2>

        {/* Animated Subtitle with Gradient */}
        <h1 className={cn(
          "text-4xl sm:text-6xl md:text-8xl font-cairo font-black leading-tight",
          "bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent",
          "drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
          "animate-in fade-in slide-in-from-bottom-12 duration-1200 delay-300 fill-mode-both"
        )}>
          {t("subtitle")}
        </h1>



      </header>

      {/* Hero Footnote / Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-bounce cursor-pointer">
        <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
          {t("journey")}
        </span>
        <div className="w-px h-12 bg-white/40" />
      </div>
    </div>
  );
}

export default memo(HeroSectionHeader);
