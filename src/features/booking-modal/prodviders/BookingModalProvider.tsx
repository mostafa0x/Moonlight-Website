"use client";
import BookingModal from "@/features/booking-modal";
import { useBookingModal } from "@/features/booking-modal/hooks";
import React from "react";

export default function BookingModalProvider() {
  const { isOpen } = useBookingModal();
  return isOpen && <BookingModal />;
}
