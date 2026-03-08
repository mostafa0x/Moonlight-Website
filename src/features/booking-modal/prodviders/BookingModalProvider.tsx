"use client";
import BookingModal from "@/features/booking-modal";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";

export default function BookingModalProvider() {
  const { isOpen } = useBookingContext();
  return isOpen && <BookingModal />;
}
