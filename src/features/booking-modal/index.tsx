import HeaderModal from "@/features/booking-modal/components/HeaderModal";
import CloseBtn from "@/shared/button/CloseBtn";
import Step1 from "@/features/booking-modal/components/step1";
import StepsInfo from "@/features/booking-modal/components/StepsInfo";
import Step2 from "@/features/booking-modal/components/step2";
import FooterModal from "@/features/booking-modal/components/FooterModal";
import { FormProvider, useForm } from "react-hook-form";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";

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
      <div className="fixed inset-0 z-9999  flex items-center justify-center bg-black/50 modal-fade-up pt-[32px] pb-[24px]">
        <div className=" relative w-[369px] md:w-[628px] h-full rounded-[20px] bg-black overflow-hidden">
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
            <div className="flex px-[10px] md:px-[21px] py-[16px]">
              <Step1 />
            </div>
          )}
          {step === 2 && (
            <div className="px-[14px] md:px-[57px] py-[16px]">
              <Step2 />
            </div>
          )}
          {step !== 1 && (
            <div className=" absolute bottom-0 left-0 w-full px-[21px] py-[16px]">
              <FooterModal />
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
