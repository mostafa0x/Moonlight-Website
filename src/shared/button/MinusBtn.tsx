"use client";
import { useBookingModal } from "@/features/booking-modal/hooks";
import { memo } from "react";

function MinusBtn() {
  const { handleChangeAdults } = useBookingModal();
  return (
    <button
      onClick={() => handleChangeAdults("decrease")}
      aria-label="minus button"
      className="flex flex-row justify-center items-center bg-[#262626] hover:bg-[#747171]  w-[26px] h-[26px] rounded-full select-none cursor-pointer"
    >
      -
    </button>
  );
}

export default memo(MinusBtn);
