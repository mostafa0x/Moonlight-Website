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
      if (!isLoggedIn) {
        // --- Persistence Logic ---
        // Save form state to localStorage before opening login modal
        const formValues = getValues();
        savePendingBooking(pkg.packageId, formValues, step);
        
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

  return { handleNext, prevStep };
}

