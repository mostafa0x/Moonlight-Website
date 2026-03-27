"use client";

import Link from "next/link";
import { memo } from "react";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";

/**
 * زرار إغلاق مودال الحجز:
 * بيقوم بالرجوع لصفحة الهوم (أو المسار الرئيسي باللغة المختارة)
 */
function CloseBtn() {
  const { lang } = useBookingContext();

  return (
    <Link
      aria-label="close booking modal"
      href={`/${lang}`}
      prefetch={false}
      className="flex items-center justify-center w-8.5 h-8.5 select-none transition-transform hover:scale-110 cursor-pointer"
    >
      <img
        src={"/icons/close.svg"}
        alt="close icon"
        className="w-8.5 h-8.5"
      />
    </Link>
  );
}

export default memo(CloseBtn);
