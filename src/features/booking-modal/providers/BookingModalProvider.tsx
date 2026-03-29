"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  // Automatic Re-opening Logic
  useEffect(() => {
    // Only check for restoration if no modal is currently open
    if (!isOpen) {
      const saved = typeof window !== "undefined" ? localStorage.getItem("pending_booking_data") : null;
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.tourId) {
            // console.log("Detected pending booking, auto-opening modal for tour:", data.tourId);
            
            // Just set the state. BookingContextProvider's 2-way sync will maintain the URL.
            handleSetTourId(data.tourId);
          }
        } catch (e) {
          console.error("Failed to parse pending booking for auto-open", e);
        }
      }
    }
  }, [isOpen, handleSetTourId]);


  if (!isOpen) return null;

  return <BookingModal />;
}



