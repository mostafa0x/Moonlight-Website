import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

const STORAGE_KEY = "pending_booking_data";

interface PendingBooking {
  tourId: string;
  formValues: any;
  step: number;
}

/**
 * useBookingPersistence: Manages saving and restoring booking form state across sessions/reloads.
 * Use case: Retaining user input while they go through the authentication flow.
 */
export function useBookingPersistence() {
  
  const savePendingBooking = useCallback((tourId: string, formValues: any, step: number) => {
    const data: PendingBooking = { tourId, formValues, step };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const getPendingBooking = useCallback((currentTourId: string): PendingBooking | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      const data: PendingBooking = JSON.parse(saved);
      // Only restore if it's for the same tour
      if (data.tourId === currentTourId) {
        return data;
      }
    } catch (e) {
      console.error("Failed to parse pending booking data", e);
    }
    return null;
  }, []);

  const clearPendingBooking = useCallback(() => {
    // console.log("Clearing pending booking data");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { savePendingBooking, getPendingBooking, clearPendingBooking };
}
