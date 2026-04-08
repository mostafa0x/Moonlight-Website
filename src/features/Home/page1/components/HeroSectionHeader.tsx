"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

/**
 * HeroSectionHeader Component
 * Premium animated header for the home page.
 * Optimized with Framer Motion for high-performance entrance animations.
 */
function HeroSectionHeader() {
  const t = useTranslations("home.hero");

  return (
    <div className="relative flex flex-col w-full h-full justify-center items-center z-20 select-none px-6 text-center">
      {/* Decorative vertical line */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 64 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-px bg-linear-to-b from-transparent via-[#F2C975] to-transparent mb-8" 
      />

      <header className="space-y-4 md:space-y-6 max-w-5xl contain-content">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl sm:text-3xl md:text-5xl font-cairo font-bold text-white tracking-[0.2em] uppercase [text-shadow:0_0_15px_rgba(242,201,117,0.4)] antialiased"
        >
          {t("title")}
        </motion.h2>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl sm:text-6xl md:text-8xl font-cairo font-black leading-tight bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent [text-shadow:0_10px_30px_rgba(0,0,0,0.5)] antialiased"
        >
          {t("subtitle")}
        </motion.h1>
      </header>

      {/* Hero Footnote / Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
      >
        <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
          {t("journey")}
        </span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-white/40" 
        />
      </motion.div>
    </div>
  );
}

HeroSectionHeader.displayName = "HeroSectionHeader";
export default memo(HeroSectionHeader);


