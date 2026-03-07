import BackBtn from "@/features/booking-modal/components/BackBtn";
import NextStepBtn from "@/features/booking-modal/components/NextStepBtn";
import { useBookingModal } from "@/features/booking-modal/hooks";
import { memo } from "react";

function FooterModal() {
  const { step, nextStep, prevStep } = useBookingModal();

  return step !== 1 ? (
    <div className=" flex flex-row justify-between items-center border-t border-[#313131] pt-[14px]">
      <BackBtn prevStep={prevStep} />
      <div className="flex flex-row items-center gap-[16px]">
        <div className="flex flex-col text-right">
          <span className="text-base text-[#8B8B8B] font-semibold">
            Total Price
          </span>
          <span className="text-[20px] text-[#F2C975] font-medium">240$</span>
        </div>
        <NextStepBtn nextStep={nextStep} />
      </div>
    </div>
  ) : null;
}

export default memo(FooterModal);
