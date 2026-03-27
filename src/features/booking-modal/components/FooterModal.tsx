import BackBtn from "./BackBtn";
import ConfirmBooking from "./ConfirmBooking";
import NextStepBtn from "./NextStepBtn";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { useGetPackage } from "@/features/booking-modal/hooks";
import clsx from "clsx";
import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useAuth } from "@/shared/providers/AuthProvider";

function FooterModal({ step }: { step: number }) {
  const { nextStep, prevStep, tourId } = useBookingContext();
  const { data: pkg } = useGetPackage(tourId);
  const { control, trigger } = useFormContext();
  const t = useTranslations("bookingModal.footer");
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const handleNext = async () => {
    const hasCustomizations =
      pkg?.customizations && pkg.customizations.length > 0;
    const isContactStep = hasCustomizations ? step === 4 : step === 3;

    if (isContactStep) {
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
      const isValid = await trigger([
        "customerName",
        "customerPhone",
        "tourDate",
        "nationality",
        "address",
      ]);
      if (isValid) nextStep();
    } else {
      nextStep();
    }
  };

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
          step === 5 && "flex-col-reverse",
        )}
      >
        {step === 5 ? (
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
              {t("totalPrice")}
            </span>
            <span className="text-[20px] text-[#F2C975] font-medium">
              {value}$
            </span>
          </div>
        )}
        {step === 5 ? (
          <ConfirmBooking callback={() => {}} />
        ) : (
          <NextStepBtn nextStep={handleNext} />
        )}
      </div>
    </div>
  );
}

export default memo(FooterModal);
