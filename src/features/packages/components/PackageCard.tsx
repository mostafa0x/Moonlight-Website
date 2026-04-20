"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { PackageType } from "@/shared/global";

interface PackageCardProps {
  pkg: PackageType;
  priority?: boolean;
}

/**
 * PackageCard Component
 * Refactored for performance and accessibility based on Vercel/React best practices.
 */
function PackageCard({ pkg, priority = false }: PackageCardProps) {
  const t = useTranslations("home");

  // Destructure for cleaner access
  const { packageName, packageImage, startingPrice, currency } = pkg;

  // Format price if needed or use simple format
  const formattedPrice = useMemo(() => {
    return `${currency === "USD" ? "$" : ` ${currency}`}${startingPrice}`;
  }, [startingPrice, currency]);

  return (
    <article
      className="group relative h-[55vh] min-h-80 max-h-115 lg:max-h-130 w-full cursor-pointer overflow-hidden rounded-2xl select-none shadow-xl transition-all duration-300"
      aria-label={packageName}
    >
      <Image
        src={packageImage}
        alt={`Image of ${packageName} tour`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 308px, (max-width: 1024px) 308px, 511px"
        quality={75}
        fetchPriority="low"
        className="z-0 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />


      {/* Gradient Overlay for Text Legibility */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-black/90 via-black/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 p-6 pb-4">
        <h2 className="font-cairo text-2xl font-bold text-white drop-shadow-md">
          {packageName}
        </h2>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">

            <p className="font-cairo text-[32px] font-bold leading-tight text-[#F2C975]">
              From {formattedPrice}
            </p>
            <p className="font-cairo text-sm font-extralight text-white">
              Price varies by group size
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20 text-[#F2C975] transition-all group-hover:bg-[#F2C975] group-hover:text-black hover:scale-105 active:scale-95 shadow-lg">
            <span className="text-sm font-bold uppercase tracking-tight">
              {t("view")}
            </span>
            {/* Simple arrow icon for better UX */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}

// Named export for better devtool debugging
PackageCard.displayName = "PackageCard";

export default memo(PackageCard);
