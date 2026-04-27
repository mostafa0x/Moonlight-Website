"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";

// Lazy load the actual modal component for optimal performance
const BookingModal = dynamic(() => import("@/features/booking-modal"), {
  ssr: false,
});

export default function BookingModalWrapper({ pkg }: { pkg: any }) {
  const { isOpen } = useBookingState();
  const { handleSetTourId } = useBookingActions();

  // Automatic Re-opening Logic after Login Redirect
  useEffect(() => {
    if (!isOpen) {
      const saved = typeof window !== "undefined" ? localStorage.getItem("pending_booking_data") : null;
      if (saved) {
        try {
          const data = JSON.parse(saved);
          // Only auto-open if the saved booking matches the current package page
          if (data.tourId === pkg.packageId) {
            handleSetTourId(data.tourId);
          }
        } catch (e) {
          console.error("Failed to parse pending booking", e);
        }
      }
    }
  }, [isOpen, handleSetTourId, pkg.packageId]);

  if (!isOpen) return null;

  return <BookingModal pkg={pkg} />;
}
