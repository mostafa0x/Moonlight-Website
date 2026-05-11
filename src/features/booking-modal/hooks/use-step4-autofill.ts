import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAuth } from "@/shared/hooks/useAuth";

/**
 * useStep4Autofill: Custom hook to automatically pre-fill user contact details.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Logic is isolated, preventing main-thread blocking in the UI component.
 * - Re-renders: Uses watch() with a specific field to minimize trigger frequency.
 */
export function useStep4Autofill() {
  const { user, userName } = useAuth();
  const { setValue, watch } = useFormContext();
  
  // Watch fields to determine if we should auto-fill
  const currentName = watch("customerName");
  const currentPhone = watch("customerPhone");
  const currentNationality = watch("nationality");

  useEffect(() => {
    // Only auto-fill if the user is authenticated and the field is currently empty
    if (user && userName && !currentName) {
      setValue("customerName", userName, { shouldValidate: true });
    }

    if (typeof window !== "undefined") {
      const savedPhone = localStorage.getItem("customerPhone");
      if (savedPhone && !currentPhone) {
        setValue("customerPhone", savedPhone, { shouldValidate: true });
      }

      const savedNationality = localStorage.getItem("nationality");
      if (savedNationality && !currentNationality) {
        setValue("nationality", savedNationality, { shouldValidate: true });
      }
    }
  }, [user, userName, setValue, currentName, currentPhone, currentNationality]);
}
