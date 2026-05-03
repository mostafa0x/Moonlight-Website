"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

/**
 * EgyptianLoader Component
 * Immersive Pharaonic-themed loading experience.
 * Optimized for performance and accessibility.
 */
function EgyptianLoader({ fullScreen = false }: { fullScreen?: boolean } = {}) {
  const t = useTranslations("loader");

  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center overflow-hidden bg-black/90 select-none backdrop-blur-md",
        fullScreen
          ? "fixed inset-0 z-100000"
          : "relative h-full min-h-screen w-full rounded-[20px]"
      )}
    >
      {/* Animation Container */}
      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute h-40 w-40 animate-pulse rounded-full bg-[#F2C975]/15 blur-3xl" aria-hidden="true" />

        {/* Spinning Rings - Pharaonic Style */}
        <div
          className="absolute h-32 w-32 animate-spin rounded-full border border-b-[#F2C975]/20 border-l-transparent border-r-transparent border-t-[#F2C975]"
          style={{ animationDuration: '4s' }}
          aria-hidden="true"
        />
        <div
          className="absolute h-36 w-36 animate-reverse-spin rounded-full border border-b-transparent border-l-[#F2C975]/40 border-r-[#F2C975]/40 border-t-transparent"
          style={{ animationDuration: '3s' }}
          aria-hidden="true"
        />

        {/* The Eye of Horus - Centerpiece */}
        <svg
          viewBox="0 0 100 100"
          className="h-24 w-24 brightness-110 drop-shadow-[0_0_15px_rgba(242,201,117,1)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Eye Outline */}
          <path
            d="M10 50 Q25 15 50 15 Q75 15 90 50 Q75 85 50 85 Q25 85 10 50Z"
            stroke="#F2C975"
            strokeWidth="3"
            className="animate-pulse"
          />
          {/* Pupil */}
          <circle cx="50" cy="50" r="12" fill="#F2C975">
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Egyptian stylistic marks beneath eye */}
          <path
            d="M40 70 L40 90 Q30 90 30 75"
            stroke="#F2C975"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M60 65 Q75 90 90 85"
            stroke="#F2C975"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Orbiting particles */}
        <div className="absolute h-full w-full" aria-hidden="true">
          <div className="animate-spin-orbit absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-4 rounded-full bg-[#F2C975] shadow-[0_0_8px_#F2C975]" />
        </div>
      </div>

      {/* Loading Text & Status */}
      <div className="z-10 mt-12 text-center">
        <h2 className="mb-3 animate-pulse font-serif text-xl tracking-[0.4em] text-[#F2C975] uppercase [text-shadow:0_0_10px_rgba(242,201,117,0.5)]">
          Moonlight
        </h2>
        <p className="mt-1 text-sm font-medium tracking-widest text-[#F2C975]/60">
          {t("unlockingWonders")}
        </p>

        {/* Animated Bouncing Dots */}
        <div className="mt-6 flex justify-center gap-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-linear-to-b from-[#F2C975] to-[#8C6D2E] shadow-[0_0_5px_#F2C975]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

EgyptianLoader.displayName = "EgyptianLoader";

export default memo(EgyptianLoader);
