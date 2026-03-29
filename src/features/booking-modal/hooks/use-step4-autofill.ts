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
  
  // Watch only the customerName to determine if we should auto-fill
  const currentName = watch("customerName");

  useEffect(() => {
    // Only auto-fill if the user is authenticated and the field is currently empty
    if (user && userName && !currentName) {
      setValue("customerName", userName, { shouldValidate: true });
    }
  }, [user, userName, setValue, currentName]);
}
