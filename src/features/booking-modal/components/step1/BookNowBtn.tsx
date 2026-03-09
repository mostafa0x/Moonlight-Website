import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import Link from "next/link";
import { memo } from "react";

function BookNowBtn() {
  const { nextStep } = useBookingContext();

  return (
    <button
      aria-label="next step button"
      onClick={nextStep}
      className="w-fit h-fit px-4 py-0.75 bg-[#F2C975] hover:bg-[#a88b4f] rounded-[10px] select-none cursor-pointer"
    >
      <span className="text-base text-black font-semibold">BOOK NOW</span>
    </button>
  );
}

export default memo(BookNowBtn);
