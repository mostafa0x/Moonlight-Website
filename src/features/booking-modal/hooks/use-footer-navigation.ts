import { useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/shared/providers/AuthProvider";

interface UseFooterNavigationProps {
  step: number;
  totalSteps: number;
  pkg: any;
}

/**
 * useFooterNavigation: Logic for step navigation and contact step validation.
 * 
 * Benefits:
 * - Better INP: Isolated navigation logic prevents unnecessary UI complexity.
 * - Modularity: Validation logic is shared between Step-level and Footer-level triggers.
 */
export function useFooterNavigation({ step, totalSteps, pkg }: UseFooterNavigationProps) {
  const { nextStep, prevStep } = useBookingActions();
  const { trigger } = useFormContext();
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const handleNext = async () => {
    // Specifically enforce validation before moving to the final stage (Summary)
    const isMovingToSummary = step === totalSteps - 1;

    if (isMovingToSummary) {
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

  return { handleNext, prevStep };
}
