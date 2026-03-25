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
import Step5 from "@/features/booking-modal/components/step5";
import { useGetPackage } from "@/features/booking-modal/hooks";
import EgyptianLoader from "@/shared/components/EgyptianLoader";
import { useEffect } from "react";

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
  const { step, tourId, lang, setTotalSteps } = useBookingContext();
  const { data: pkg, isLoading } = useGetPackage(tourId);

  const hasCustomizations = pkg?.customizations && pkg.customizations.length > 0;

  useEffect(() => {
    if (pkg) {
      setTotalSteps(hasCustomizations ? 5 : 4);
    }
  }, [hasCustomizations, pkg, setTotalSteps]);

  if (!tourId) return null;

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 modal-fade-up pt-8 pb-6 backdrop-blur-sm">
        <div className="relative w-92.25 sm:w-157 h-full rounded-[20px] bg-black overflow-hidden flex flex-col">
          <div className="absolute right-2.75 top-1.25 z-1000">
            <CloseBtn />
          </div>

          {isLoading ? (
            <EgyptianLoader />
          ) : pkg ? (
            <>
              <div>
                <HeaderModal
                  titleTour={pkg.packageName}
                  price={pkg.startingPrice.toString()}
                  image={pkg.packageImage}
                />
              </div>
              {step !== 1 && (
                <div>
                  <StepsInfo step={step} />
                </div>
              )}
              {step === 1 && (
                <div className="flex px-2.5 lg:px-5.25 py-4 flex-1 overflow-y-auto scrollbar-hide">
                  <Step1 description={pkg.description} destinations={pkg.destinations} included={pkg.included} excluded={pkg.excluded}/>
                </div>
              )}
              {step === 2 && (
                <div className="px-3.5 lg:px-14.25 py-4 flex-1 overflow-y-auto scrollbar-hide">
                  <Step2 />
                </div>
              )}
              {step === 3 && (
                <div className="px-3.5 lg:px-14.25 py-4 flex-1 overflow-y-auto scrollbar-hide">
                  {hasCustomizations ? (
                     <Step3 customizations={pkg.customizations} />
                  ) : (
                    <Step4 />
                  )}
                </div>
              )}
              {step === 4 && (
                <div className="px-3.5 lg:px-14.25 py-4 flex-1 overflow-y-auto scrollbar-hide">
                  {hasCustomizations ? <Step4 /> : <Step5 />}
                </div>
              )}
              {step === 5 && hasCustomizations && (
                <div className="px-3.5 lg:px-14.25 py-4 flex-1 overflow-y-auto scrollbar-hide">
                  <Step5 />
                </div>
              )}
              {step !== 1 && (
                <div className="mt-auto px-5.25 py-4">
                  <FooterModal step={step} />
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-[#F2C975]">
              Package not found
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
}
