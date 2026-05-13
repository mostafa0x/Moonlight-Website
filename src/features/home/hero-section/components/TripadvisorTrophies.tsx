import React from "react";
import { TRIPADVISOR_TROPHIES } from "../data/trophies";

/**
 * TripadvisorTrophies - Pure React Server Component (Infinite Marquee)
 * 
 * Performance & Sub-pixel Accuracy Optimized:
 * - Pure Server Component (zero client JS shipped, native CSS GPU acceleration).
 * - Implements a mathematically perfect infinite horizontal marquee loop.
 * - Trailing padding perfectly matches flex gaps to ensure 50% translation is sub-pixel accurate.
 * - Hardware acceleration (`translateZ(0)`) resolves mobile iOS/WebKit mask exit glitches.
 * - Awards seamlessly enter from the left and exit from the right in a continuous loop.
 * - Pauses gracefully on hover for optimal readability.
 */
export default function TripadvisorTrophies() {
  // Repeat trophies array to ensure massive track width coverage for all screen sizes
  const repeatedTrophies = [...TRIPADVISOR_TROPHIES, ...TRIPADVISOR_TROPHIES];

  return (
    <div className="w-full mt-24 pt-16 md:mt-24 md:pt-16 flex flex-col items-center animate-fade-in select-none overflow-hidden">
      {/* Embedded High-Performance CSS Animation & Hardware Accelerated Masking */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          min-width: max-content;
          animation: marquee-ltr 35s linear infinite;
          will-change: transform;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
      `}</style>

      {/* Full-width Marquee Wrapper with Premium Hardware-Accelerated Edge Fading */}
      <div className="w-full overflow-hidden py-2 marquee-mask flex items-center">
        {/* Moving Track Loop (No outer padding/gaps to ensure perfect 50% geometric division) */}
        <div className="animate-marquee-infinite items-center">
          {/* First identical track block */}
          <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0 min-w-max">
            {repeatedTrophies.map((trophy, index) => (
              <article
                key={`block1-${trophy.id}-${index}`}
                className="flex items-center gap-4 group cursor-default shrink-0"
              >
                {/* Pure Award Image without any background wrappers or extras */}
                <img
                  src={trophy.icon}
                  alt={trophy.title}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] shrink-0"
                />

                {/* Award Name and Acquisition Year only */}
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-sm sm:text-lg font-cairo tracking-wide whitespace-nowrap antialiased [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
                    {trophy.title}
                  </span>

                  <span className="text-emerald-400 font-bold font-cairo text-xs sm:text-sm tracking-widest antialiased [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] mt-0.5 leading-none">
                    {trophy.year}
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Second identical track block for seamless infinite reset */}
          <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 shrink-0 min-w-max">
            {repeatedTrophies.map((trophy, index) => (
              <article
                key={`block2-${trophy.id}-${index}`}
                className="flex items-center gap-4 group cursor-default shrink-0"
              >
                {/* Pure Award Image without any background wrappers or extras */}
                <img
                  src={trophy.icon}
                  alt={trophy.title}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 sm:w-20 sm:h-20 object-contain group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] shrink-0"
                />

                {/* Award Name and Acquisition Year only */}
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-sm sm:text-lg font-cairo tracking-wide whitespace-nowrap antialiased [text-shadow:0_2px_10px_rgba(0,0,0,0.9)] leading-tight">
                    {trophy.title}
                  </span>

                  <span className="text-emerald-400 font-bold font-cairo text-xs sm:text-sm tracking-widest antialiased [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] mt-0.5 leading-none">
                    {trophy.year}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
