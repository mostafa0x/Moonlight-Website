"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { useBookingPersistence } from "@/features/booking-modal/hooks/use-booking-persistence";

/**
 * Lazy-loaded BookingModal to optimize bundle size and FCP/LCP.
 */
const BookingModal = dynamic(() => import("@/features/booking-modal"), {
  ssr: false,
});


/**
 * BookingModalProvider: Controls the conditional mounting of the Dynamic Modal.
 * Now includes initialization logic to auto-reopen pending bookings after auth redirect.
 */
export default function BookingModalProvider() {
  const { isOpen } = useBookingState();
  const { handleSetTourId } = useBookingActions();
  const { clearPendingBooking } = useBookingPersistence();
  const router = useRouter();

  // Automatic Re-opening Logic
  useEffect(() => {
    // Only check for restoration if no modal is currently open
    if (!isOpen) {
      const saved = typeof window !== "undefined" ? localStorage.getItem("pending_booking_data") : null;
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.tourId) {
            // Restore the state to trigger the modal opening via URL
            handleSetTourId(data.tourId);
            
            // NOTE: We don't clear storage here. The inner BookingModal component
            // will pick up the data, restore form fields, and then clear it.
          }
        } catch (e) {
          console.error("Failed to parse pending booking for auto-open", e);
        }
      }
    }
  }, [isOpen, handleSetTourId, clearPendingBooking]);


  if (!isOpen) return null;

  return <BookingModal />;
}



