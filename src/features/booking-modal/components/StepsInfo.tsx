"use client";
import StepsInfoItem from "@/features/booking-modal/components/StepsInfoItem";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { memo } from "react";

function StepsInfo({ step }: { step: number }) {
  const { totalSteps } = useBookingContext();
  return (
    <div className="flex items-center justify-center select-none">
      <div className="flex flex-row items-center">
        {Array.from({ length: totalSteps }, (_, i) => (
          <StepsInfoItem key={i + 1} id={i + 1} step={step} />
        ))}
      </div>
    </div>
  );
}

export default memo(StepsInfo);
