"use client";

import { memo } from "react";
import BookingSummaryItem from "./BookingSummaryItem";
import { useSummaryData } from "../../hooks/index";

/**
 * BookingSummary: Component for displaying choices before final confirmation.
 * 
 * Optimized for Vercel React best practices:
 * - Performance (INP): logic extracted to useSummaryData with targeted useWatch subscriptions.
 * - UX: Handles long package names gracefully via improved Sub-component.
 * - Accessibility: Clear hierarchical structure with h1 and h2 headings.
 * - Animation: Entrance animation for smooth perceptual performance (FCP).
 */
function BookingSummary() {
  const {
    pkg,
    tourDate,
    travelerText,
    tourguideLanguage,
    destinationsCount,
    totalPrice,
    translations: t
  } = useSummaryData();

  return (
    <div className="flex flex-col justify-between bg-[#131313] border border-[#313131] w-full min-h-68 rounded-lg px-4.5 py-4 transition-all duration-300 shadow-md">
      <div className="animate-in fade-in slide-in-from-top-1 duration-500">
        <h1 className="text-base text-[#F2C975] font-semibold tracking-wide uppercase mb-4">
          {t.summaryTitle}
        </h1>

        {/* Dynamic List: only rendered when data is ready or with fallbacks */}
        <div className="flex flex-col gap-4">
          <BookingSummaryItem
            label={t.tour}
            hint={pkg?.packageName}
          />
          <BookingSummaryItem
            label={t.date}
            hint={tourDate || t.notSelected}
          />
          <BookingSummaryItem
            label={t.travelers}
            hint={travelerText}
          />
          <BookingSummaryItem
            label={t.language}
            hint={tourguideLanguage}
          />
          {destinationsCount > 0 && (
            <BookingSummaryItem
              label={t.destinations}
              hint={`${destinationsCount} selected`}
            />
          )}
        </div>
      </div>

      {/* Footer: Isolated price section with better visual hierarchy */}
      <div className="flex flex-row justify-between items-center border-t border-[#313131]/60 mt-5 pt-3.5">
        <h2 className="text-sm md:text-base text-[#8B8B8B] font-medium leading-none">
          {t.totalPrice}
        </h2>
        <span className="text-[20px] md:text-[22px] text-[#F2C975] font-bold tracking-tight">
          {totalPrice}$
        </span>
      </div>
    </div>
  );
}

BookingSummary.displayName = "BookingSummary";

export default memo(BookingSummary);
