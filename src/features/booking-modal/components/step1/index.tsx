"use client";
import BookNowBtn from "@/features/booking-modal/components/step1/BookNowBtn";
import Destinations from "@/features/booking-modal/components/step1/Destinations";
import Included_Excluded from "@/features/booking-modal/components/step1/Included_Excluded";
import Overview from "@/features/booking-modal/components/step1/Overview";
import PickOfHit from "@/features/booking-modal/components/step1/PickOfHit";
import { useBookingModal } from "@/features/booking-modal/hooks";
import { memo } from "react";

function Step1() {
  const { step, nextStep } = useBookingModal();
  return step === 1 ? (
    <>
      <div>
        <Overview
          description="Experience the majesty of the ancient world with our exclusive VIP tour
        of the Giza Plateau. Enjoy skip-the-line access, a private Egyptologist
        guide, and a luxurious camel ride at sunset."
        />
      </div>
      <div className="mb-3">
        <Destinations destinations={["Giza", "Cairo", "Alex"]} />
      </div>
      <div className="mb-[14px]">
        <Included_Excluded included={["x"]} excluded={["y"]} />
      </div>
      <div className="">
        <PickOfHit />
      </div>
      <BookNowBtn nextStep={nextStep} />
    </>
  ) : null;
}
export default memo(Step1);
