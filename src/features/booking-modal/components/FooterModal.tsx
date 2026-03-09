import BackBtn from "@/features/booking-modal/components/BackBtn";
import ConfirmBooking from "@/features/booking-modal/components/ConfirmBooking";
import NextStepBtn from "@/features/booking-modal/components/NextStepBtn";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import clsx from "clsx";
import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";

function FooterModal({ step }: { step: number }) {
  const { nextStep, prevStep } = useBookingContext();
  const { control } = useFormContext();
  const name = "totalPrice";
  const {
    field: { value = 0 },
  } = useController({ name, control, defaultValue: 0 });

  return (
    <div className=" flex flex-row justify-between items-center border-t border-[#313131] pt-3.5">
      <BackBtn prevStep={prevStep} />
      <div
        className={clsx(
          "flex md:flex-row items-center gap-4",
          step === 4 && "flex-col-reverse",
        )}
      >
        {step === 4 ? (
          <div className="flex flex-row gap-1.5">
            <img
              src={"/icons/visa.webp"}
              alt="visa"
              className="w-[30] h-7.5 md:w-12.5 md:h-12.5"
            />
            <img
              src={"/icons/master-card.webp"}
              alt="master card"
              className="w-[30] h-7.5 md:w-12.5 md:h-12.5"
            />
            <img
              src={"/icons/paypal.webp"}
              alt="paypal"
              className="w-[30] h-7.5 md:w-12.5 md:h-12.5"
            />
          </div>
        ) : (
          <div className="flex flex-col text-right">
            <span className="text-base text-[#8B8B8B] font-semibold">
              Total Price
            </span>
            <span className="text-[20px] text-[#F2C975] font-medium">
              {value}$
            </span>
          </div>
        )}
        {step === 4 ? (
          <ConfirmBooking callback={() => {}} />
        ) : (
          <NextStepBtn nextStep={nextStep} />
        )}
      </div>
    </div>
  );
}

export default memo(FooterModal);
