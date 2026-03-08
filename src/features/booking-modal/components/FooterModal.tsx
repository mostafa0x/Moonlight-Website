import BackBtn from "@/features/booking-modal/components/BackBtn";
import NextStepBtn from "@/features/booking-modal/components/NextStepBtn";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";

function FooterModal() {
  const { nextStep, prevStep } = useBookingContext();
  const { control } = useFormContext();
  const name = "totalPrice";
  const {
    field: { value = 0 },
  } = useController({ name, control, defaultValue: 0 });

  return (
    <div className=" flex flex-row justify-between items-center border-t border-[#313131] pt-[14px]">
      <BackBtn prevStep={prevStep} />
      <div className="flex flex-row items-center gap-[16px]">
        <div className="flex flex-col text-right">
          <span className="text-base text-[#8B8B8B] font-semibold">
            Total Price
          </span>
          <span className="text-[20px] text-[#F2C975] font-medium">
            {value}$
          </span>
        </div>
        <NextStepBtn nextStep={nextStep} />
      </div>
    </div>
  );
}

export default memo(FooterModal);
