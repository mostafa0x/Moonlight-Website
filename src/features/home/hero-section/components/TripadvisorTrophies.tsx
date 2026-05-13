import React from "react";
import { TRIPADVISOR_TROPHIES } from "../data/trophies";

/**
 * TripadvisorTrophies - React Server Component
 * 
 * Performance Optimized:
 * - Pure Server Component (zero client JS shipped for this section).
 * - Enforces single-line horizontal scrolling (`overflow-x-auto`) natively without wrapping.
 * - Displays pure unboxed award graphics directly paired with award title and acquisition year.
 */
export default function TripadvisorTrophies() {
  return (
    <div className="w-full pt-6 md:pt-8 flex flex-col items-center animate-fade-in select-none">
      {/* Horizontal Scrollable Container (Never wraps onto multiple lines) */}
      <div className="w-full max-w-full overflow-x-auto scrollbar-hide py-2">
        <div className="flex items-center justify-start md:justify-center gap-8 sm:gap-12 min-w-max px-4 mx-auto">
          {TRIPADVISOR_TROPHIES.map((trophy) => (
            <article
              key={trophy.id}
              className="flex items-center gap-3 group cursor-default shrink-0"
            >
              {/* Pure Award Image without any background wrappers or extras */}
              <img
                src={trophy.icon}
                alt={trophy.title}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="w-11 h-11 sm:w-14 sm:h-14 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] shrink-0"
              />

              {/* Award Name and Acquisition Year only */}
              <div className="flex flex-col text-left">
                <span className="text-white font-bold text-xs sm:text-sm font-cairo tracking-wide whitespace-nowrap antialiased [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
                  {trophy.title}
                </span>

                <span className="text-emerald-400 font-bold font-cairo text-[10px] sm:text-xs tracking-widest antialiased [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] mt-0.5 leading-none">
                  {trophy.year}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}




