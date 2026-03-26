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
import { useEffect, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { getBookingSchema } from "./schema";
import { useTranslations } from "next-intl";

export default function BookingModal() {
  const { step, tourId, lang, setTotalSteps } = useBookingContext();
  const { data: pkg, isLoading } = useGetPackage(tourId);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const t = useTranslations("bookingModal");
  const methods = useForm({
    resolver: zodResolver(getBookingSchema(t)),
    mode: "onChange",
    defaultValues: {
      adultsNumber: 12,
      kidsNumber: 0,
      tourguideLanguage: "en",
      totalPrice: pkg?.startingPrice || 0,
      selectedDestinations: [] as string[],
      tourDate: "",
      customerName: "",
      customerPhone: "",
      nationality: "",
      pickupLocation: "Giza",
      address: "",
      promoCode: "",
      paymentPreference: "full",
    },
  });
 
  const { setValue, control, watch } = methods;

  const hasCustomizations = pkg?.customizations && pkg.customizations.length > 0;

  useEffect(() => {
    if (pkg) {
      setTotalSteps(hasCustomizations ? 5 : 4);
    }
  }, [hasCustomizations, pkg, setTotalSteps]);

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
        pickupLocation: values.pickupLocation || "",
        promoCode: values.promoCode || "",
        paymentPreference: values.paymentPreference || "full",
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

    // Set default selections for specific packages
    if (pkg.packageId === "1d0e1402-78a2-4366-a59b-13f38d9a8486") {
      pkg.customizations?.forEach((group) => {
        if (group.options.some((o) => o.id === "dest-nmec")) {
          const other = group.options.find((o) => o.id !== "dest-nmec")?.id;
          const defaults = other ? ["dest-nmec", other] : ["dest-nmec"];
          setValue(
            group.groupId as any,
            group.maxSelect === 1
              ? "dest-nmec"
              : defaults.slice(0, Math.min(group.maxSelect, 2))
          );
        } else if (group.options.length > 0) {
          setValue(
            group.groupId as any,
            group.maxSelect === 1 ? group.options[0].id : [group.options[0].id]
          );
        }
      });
    } else if (pkg.packageId === "617ff210-e29a-4ebe-bfa7-6e904275e9f5") {
      pkg.customizations?.forEach((group) => {
        if (group.maxSelect >= 3) {
          setValue(
            group.groupId as any,
            group.options.slice(0, 3).map((o) => o.id)
          );
        }
      });
    }

    // Initial calculation
    calculatePrice();

    // Subscribe to changes with debounce
    const subscription = methods.watch((value, { name }) => {
      // Log specifically when phone number changes for the user
      if (name === "customerPhone") {
        console.log("Phone changed! Full value (E.164):", value.customerPhone);
      }

      const triggerFields = [
        "adultsNumber",
        "kidsNumber",
        "tourguideLanguage",
        "pickupLocation",
        "promoCode",
        "paymentPreference",
        "customerPhone",
        ...(pkg.customizations?.map((c) => c.groupId) || []),
      ];

      if (name && triggerFields.includes(name)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          calculatePrice();
        }, 500);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pkg, methods, setValue]);

  if (!tourId) return null;

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 modal-fade-up pt-8 pb-6 backdrop-blur-sm">
        <div className="relative w-92.25 sm:w-157 h-full rounded-[20px] bg-black overflow-hidden flex flex-col">
          <div className="absolute right-4.25 top-4.25 z-1000">
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
