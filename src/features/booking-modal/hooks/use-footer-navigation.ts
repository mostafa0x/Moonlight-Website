import { useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/shared/providers/AuthProvider";
import { useBookingPersistence } from "./use-booking-persistence";
import { useTranslations } from "next-intl";

interface UseFooterNavigationProps {
  step: number;
  totalSteps: number;
  pkg: any;
  setErrorMsg?: (msg: string | null) => void;
}

/**
 * useFooterNavigation: Logic for step navigation and contact step validation.
 */
export function useFooterNavigation({ step, totalSteps, pkg, setErrorMsg }: UseFooterNavigationProps) {
  const { nextStep, prevStep } = useBookingActions();
  const { trigger, getValues } = useFormContext();
  const { isLoggedIn, setShowLoginModal } = useAuth();
  const { savePendingBooking } = useBookingPersistence();
  const t = useTranslations("bookingModal.errors");

  const handleNext = async () => {
    // 1. Validation for Customizations (Step 2 if hasCustomizations)
    const hasCustomizations = !!(pkg?.customizations && pkg.customizations.length > 0);
    
    if (hasCustomizations && step === 2) {
      const formValues = getValues();
      let isValidCustomization = true;
      
      for (const group of pkg.customizations) {
        const val = formValues[group.groupId];
        
        if (group.maxSelect === 1) {
          if (!val) {
            isValidCustomization = false;
            break;
          }
        } else if (group.maxSelect > 1) {
          if (!Array.isArray(val) || val.length !== group.maxSelect) {
            isValidCustomization = false;
            break;
          }
        }
      }
      
      if (!isValidCustomization) {
        if (setErrorMsg) {
          setErrorMsg(t("customization"));
        }
        return;
      }
    }

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

      const formValues = getValues();

      if (typeof window !== "undefined") {
        if (formValues.customerPhone) {
          localStorage.setItem("customerPhone", formValues.customerPhone);
        }
        if (formValues.nationality) {
          localStorage.setItem("nationality", formValues.nationality);
        }
      }

      // 2. Only check for login AFTER we ensure the data is valid
      if (!isLoggedIn) {
        savePendingBooking(pkg.packageId, formValues, step);
        setShowLoginModal(true);
        return;
      }
      
      // 3. User is logged in and data is valid -> proceed
      savePendingBooking(pkg.packageId, formValues, step + 1);
      nextStep();
    } else {
      savePendingBooking(pkg.packageId, getValues(), step + 1);
      nextStep();
    }
  };

  return { handleNext, prevStep };
}

