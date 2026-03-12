import HeaderModal from "@/features/booking-modal/components/HeaderModal";
import CloseBtn from "@/shared/button/CloseBtn";
import Step1 from "@/features/booking-modal/components/step1";
import StepsInfo from "@/features/booking-modal/components/StepsInfo";
import Step2 from "@/features/booking-modal/components/step2";
import FooterModal from "@/features/booking-modal/components/FooterModal";
import { FormProvider, useForm } from "react-hook-form";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import Step3 from "@/features/booking-modal/components/step3";
import Step4 from "@/features/booking-modal/components/step4";

export default function BookingModal() {
  const methods = useForm({
    defaultValues: {
      adults: 1,
      children: 0,
      tourGuideLanguage: "English",
      totalPrice: 0,
      destinations: "none",
    },
  });
  const { step } = useBookingContext();

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 z-9999  flex items-center justify-center bg-black/50 modal-fade-up pt-8 pb-6">
        <div className=" relative w-92.25 sm:w-157 h-full rounded-[20px] bg-black overflow-hidden">
          <div>
            <div className=" absolute right-2.75 top-1.25 z-2">
              <CloseBtn />
            </div>
            <HeaderModal
              titleTour="Giza All-Inclusive VIP Tour"
              price="100"
              image="/packages/gize/package1.png"
            />
          </div>
          {step !== 1 && (
            <div>
              <StepsInfo step={step} />
            </div>
          )}
          {step === 1 && (
            <div className="flex px-2.5 lg:px-5.25 py-4">
              <Step1 />
            </div>
          )}
          {step === 2 && (
            <div className="px-3.5 lg:px-14.25 py-4">
              <Step2 />
            </div>
          )}
          {step === 3 && (
            <div className="px-3.5 lg:px-14.25 py-4">
              <Step3 />
            </div>
          )}
          {step === 4 && (
            <div className="px-3.5 lg:px-14.25 py-4">
              <Step4 />
            </div>
          )}
          {step !== 1 && (
            <div className=" absolute bottom-0 left-0 w-full px-5.25 py-4">
              <FooterModal step={step} />
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
