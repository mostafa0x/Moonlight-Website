"use client";
import StepsInfoItem from "@/features/booking-modal/components/StepsInfoItem";
import { useBookingModal } from "@/features/booking-modal/hooks";
import clsx from "clsx";
import { memo } from "react";

function StepsInfo() {
  const { step } = useBookingModal();
  return (
    <div className="flex items-center justify-center select-none">
      <div className="flex flex-row items-center">
        <StepsInfoItem id={1} step={step} />
        <StepsInfoItem id={2} step={step} />
        <StepsInfoItem id={3} step={step} />
        <StepsInfoItem id={4} step={step} />
      </div>
    </div>
  );
}

export default memo(StepsInfo);
