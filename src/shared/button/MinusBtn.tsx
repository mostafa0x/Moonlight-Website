"use client";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { memo } from "react";

function MinusBtn({ callback }: { callback: () => void }) {
  return (
    <button
      onClick={callback}
      aria-label="minus button"
      className="flex flex-row justify-center items-center bg-[#262626] disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[#747171]  w-[26px] h-[26px] rounded-full select-none cursor-pointer"
    >
      -
    </button>
  );
}

export default memo(MinusBtn);
