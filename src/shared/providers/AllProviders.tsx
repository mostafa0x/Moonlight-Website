import BookingModalProvider from "@/features/booking-modal/prodviders/BookingModalProvider";
import React from "react";

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BookingModalProvider />
    </>
  );
}
