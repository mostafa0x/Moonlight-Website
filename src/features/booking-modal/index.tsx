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
   const { step, tourId, lang, setTotalSteps } = useBookingContext();
  const { data: pkg, isLoading } = useGetPackage(tourId);
  const methods = useForm({
    defaultValues: {
      adultsNumber: 12,
      kidsNumber: 0,
      tourguideLanguage: "en",
      totalPrice: pkg?.startingPrice,
      selectedDestinations: [] as string[],
      tourDate: "",
      customerName: "",
      customerPhone: "",
      nationality: "",
      pickupZoneId: "",
      address: "",
      promoCode: "",
      paymentPreference: "deposit",
    },
  });
 
  const { setValue, control, watch } = methods;

  const hasCustomizations = pkg?.customizations && pkg.customizations.length > 0;

  useEffect(() => {
    if (pkg) {
      setTotalSteps(hasCustomizations ? 5 : 4);
    }
  }, [hasCustomizations, pkg, setTotalSteps]);

  const watchedFields = watch([
    "adultsNumber",
    "kidsNumber",
    "tourguideLanguage",
    "pickupZoneId",
    "promoCode",
    "paymentPreference",
    ...(pkg?.customizations?.map((c) => c.groupId) || []),
  ] as any);

  useEffect(() => {
    if (!pkg) return;

    const calculatePrice = async () => {
      const values: any = methods.getValues();
      const selectedDestinations: string[] = [];

      pkg.customizations?.forEach((group) => {
        const groupValue = values[group.groupId];
        if (Array.isArray(groupValue)) {
          selectedDestinations.push(...groupValue);
        } else if (groupValue) {
          selectedDestinations.push(groupValue);
        }
      });

      const body = {
        packageId: pkg.packageId,
        adultsNumber: values.adultsNumber,
        kidsNumber: values.kidsNumber,
        tourguideLanguage: values.tourguideLanguage,
        selectedDestinations,
        pickupZoneId: values.pickupZoneId || "",
        promoCode: values.promoCode || "",
        paymentPreference: values.paymentPreference || "deposit",
      };

      console.log("Calculating price with body:", body);

      try {
        const response = await fetch("/api/bookings/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const result = await response.json();
          
          setValue("totalPrice", result.data.totalAmount || 0);
          setValue("selectedDestinations", selectedDestinations);
        }
      } catch (error) {
        console.error("Calculation error:", error);
      }
    };

    calculatePrice();
  }, [
    ...watchedFields,
    pkg,
    methods,
    setValue,
  ]);

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
