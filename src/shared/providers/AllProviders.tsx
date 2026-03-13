import BookingContextProvider from "@/features/booking-modal/context/BookingContextProvider";
import BookingModalProvider from "@/features/booking-modal/prodviders/BookingModalProvider";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import React, { Suspense } from "react";

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <BookingContextProvider>
        {children}
        <BookingModalProvider />
      </BookingContextProvider>
    </ReactQueryProvider>
  );
}
