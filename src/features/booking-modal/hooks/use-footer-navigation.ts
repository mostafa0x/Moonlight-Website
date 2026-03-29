import { useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/shared/providers/AuthProvider";
import { useBookingPersistence } from "./use-booking-persistence";

interface UseFooterNavigationProps {
  step: number;
  totalSteps: number;
  pkg: any;
}

/**
 * useFooterNavigation: Logic for step navigation and contact step validation.
 */
export function useFooterNavigation({ step, totalSteps, pkg }: UseFooterNavigationProps) {
  const { nextStep, prevStep } = useBookingActions();
  const { trigger, getValues } = useFormContext();
  const { isLoggedIn, setShowLoginModal } = useAuth();
  const { savePendingBooking } = useBookingPersistence();

  const handleNext = async () => {
    // Specifically enforce validation before moving to the final stage (Summary)
    const isMovingToSummary = step === totalSteps - 1;

    if (isMovingToSummary) {
      // 1. ALWAYS validate the custom contact fields first
      const isValid = await trigger([
        "customerName",
        "customerPhone",
        "tourDate",
        "nationality",
        "address",
      ]);

      if (!isValid) return; // Stop here if form has errors

      // 2. Only check for login AFTER we ensure the data is valid
      if (!isLoggedIn) {
        const formValues = getValues();
        savePendingBooking(pkg.packageId, formValues, step);
        setShowLoginModal(true);
        return;
      }
      
      // 3. User is logged in and data is valid -> proceed
      nextStep();
    } else {
      nextStep();
    }
  };

  return { handleNext, prevStep };
}

