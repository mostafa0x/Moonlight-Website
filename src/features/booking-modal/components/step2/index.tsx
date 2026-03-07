import PeopleCounter from "@/features/booking-modal/components/step2/PeopleCounter";
import { useBookingModal } from "@/features/booking-modal/hooks";
import React from "react";

export default function Step2() {
  const { step, nextStep } = useBookingModal();

  return (
    step === 2 && (
      <div>
        <h1 className="text-base text-[#F2C975] font-medium mb-[16px]">
          Number of Travelers
        </h1>
        <div className="space-y-[8px]">
          <PeopleCounter label="Adults" hint="Age 12+" count={1} />
          <PeopleCounter label="Adults" hint="Age 12+" count={1} />
        </div>
        <div></div>
      </div>
    )
  );
}
