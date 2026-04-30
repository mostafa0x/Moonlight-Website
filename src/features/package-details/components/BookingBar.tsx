"use client";

import { memo, useEffect, useState } from "react";
import { useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { useTranslations } from "next-intl";

/**
 * BookingBar — Client Component (sticky bottom bar)
 *
 * Fixed bottom bar with price and "Book Now" CTA.
 * Opens the booking modal (starting from step 2, skipping the details step).
 *
 * INP Optimized: Minimal event handler with direct state update.
 */
interface BookingBarProps {
  price: number;
  currency: string;
  packageId: string;
}

function BookingBar({ price, currency, packageId }: BookingBarProps) {
  const { handleSetTourId } = useBookingActions();
  const t = useTranslations("packageDetails");
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    // Dynamically calculate the exact physical width of the OS scrollbar
    const calculateOffset = () => {
      setScrollbarWidth(window.innerWidth - document.body.clientWidth);
    };
    
    calculateOffset();
    window.addEventListener("resize", calculateOffset);
    return () => window.removeEventListener("resize", calculateOffset);
  }, []);

  const formattedPrice = `${currency === "USD" ? "$" : ` ${currency}`}${price}`;

  const handleBookNow = () => {
    handleSetTourId(packageId);
  };

  return (
    <div 
      className="fixed bottom-0 left-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
      style={{ right: `${scrollbarWidth}px` }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 lg:px-20 py-3 md:py-4 flex items-center justify-between">
        {/* Price Info */}
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-medium text-[#F2C975] font-cairo">
            {formattedPrice}
          </span>
          <span className="text-zinc-100 text-xs md:text-sm font-semibold font-cairo">
            {t("priceVaries")}
          </span>
        </div>

        {/* Book Now Button */}
        <button
          type="button"
          onClick={handleBookNow}
          className="px-8 md:px-12 py-3 md:py-3.5 bg-[#F2C975] hover:bg-[#D4A950] active:scale-95 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl flex items-center gap-3"
        >
          <span className="text-neutral-900 text-base md:text-2xl font-bold font-cairo">
            {t("bookNow")}
          </span>
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-5"
          >
            <path d="M2 2l8 8-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

BookingBar.displayName = "BookingBar";

export default memo(BookingBar);
