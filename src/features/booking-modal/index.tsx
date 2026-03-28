import HeaderModal from "@/features/booking-modal/components/HeaderModal";
import CloseBtn from "@/shared/button/CloseBtn";
import StepsInfo from "@/features/booking-modal/components/StepsInfo";
import FooterModal from "@/features/booking-modal/components/FooterModal";
import { FormProvider } from "react-hook-form";
import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { 
  useGetPackage, 
  useBookingForm, 
  usePriceCalculation, 
  usePackageDefaults 
} from "./hooks/index";
import EgyptianLoader from "@/shared/components/EgyptianLoader";
import { useEffect, useMemo } from "react";
import { supabase } from "@/shared/lib/supabase";
import StepRenderer from "./components/StepRenderer";

/**
 * BookingModal acts as the container for the booking flow.
 * It manages form state, dynamic price calculations, and step navigation.
 */
export default function BookingModal() {
  const { step, tourId } = useBookingState();
  const { setTotalSteps } = useBookingActions();

  const { data: pkg, isLoading } = useGetPackage(tourId);
  
  // Initialize form with default values and validation schema
  const methods = useBookingForm(pkg);
  
  // Custom hooks to handle complex business logic
  usePriceCalculation(pkg, methods);
  usePackageDefaults(pkg, methods);

  // Derive helper state based on current package
  const hasCustomizations = useMemo(() => 
    !!(pkg?.customizations && pkg.customizations.length > 0), 
    [pkg?.customizations]
  );

  // Optional: Session logging for debugging
  useEffect(() => {
    const logSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Supabase session active for booking.");
      }
    };
    logSession();
  }, []);

  // Update total steps in context based on package customization
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
              
              {/* Progress information - hide on step 1 to keep layout clean */}
              {step !== 1 && (
                <div>
                  <StepsInfo step={step} />
                </div>
              )}

              {/* Centralized step rendering logic extracted for performance */}
              <StepRenderer 
                step={step} 
                pkg={pkg} 
                hasCustomizations={hasCustomizations} 
              />

              {/* Navigation footer - hide on step 1 as it might have its own buttons */}
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

