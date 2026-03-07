"use client";

import { useBookingModal } from "@/features/booking-modal/hooks";
import { memo } from "react";

function PlusBtn() {
  const { handleChangeAdults } = useBookingModal();

  return (
    <button
      onClick={() => handleChangeAdults("increase")}
      aria-label="plus button"
      className="flex flex-row justify-center items-center bg-[#262626] hover:bg-[#05703b]  w-[26px] h-[26px] rounded-full select-none cursor-pointer"
    >
      +
    </button>
  );
}

export default memo(PlusBtn);
