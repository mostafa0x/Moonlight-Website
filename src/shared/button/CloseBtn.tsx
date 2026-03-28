"use client";

import Link from "next/link";
import { memo } from "react";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { cn } from "@/shared/lib/utils";

/**
 * CloseBtn Component
 * A specialized link-button used to close the booking modal and return to the home page.
 * Optimized for performance and design consistency.
 */
function CloseBtn() {
  const { lang } = useBookingContext();

  return (
    <Link
      aria-label="close booking modal"
      href={`/${lang}`}
      prefetch={false}
      className={cn(
        "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F2C975]/50 active:scale-95"
      )}
    >
      <img
        src="/icons/close.svg"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
    </Link>
  );
}

CloseBtn.displayName = "CloseBtn";

export default memo(CloseBtn);
