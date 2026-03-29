"use client";

import dynamic from "next/dynamic";
import { useBookingState } from "@/features/booking-modal/context/BookingContextProvider";
import EgyptianLoader from "@/shared/components/EgyptianLoader";

/**
 * Lazy-loaded BookingModal to optimize bundle size and FCP/LCP.
 * The modal contains heavy form logic and step-rendering which should 
 * not be in the initial page hydration path.
 */
const BookingModal = dynamic(() => import("@/features/booking-modal"), {
  ssr: false,

});

/**
 * BookingModalProvider: Controls the conditional mounting of the Dynamic Modal.
 * 
 * Performance Wins:
 * - Code Splitting: Bundle size -XX KB for early page loads.
 * - Resource Management: JS/Assets for the modal only fetch when 'isOpen' is true.
 * - Interaction (INP): Avoids heavy component initialization during initial app boot.
 */
export default function BookingModalProvider() {
  const { isOpen } = useBookingState();

  if (!isOpen) return null;

  return <BookingModal />;
}

