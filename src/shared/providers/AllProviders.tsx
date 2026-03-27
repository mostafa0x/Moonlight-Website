import BookingContextProvider from "@/features/booking-modal/context/BookingContextProvider";
import BookingModalProvider from "@/features/booking-modal/prodviders/BookingModalProvider";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import React, { Suspense } from "react";
import { AuthProvider } from "@/shared/providers/AuthProvider";
import LoginModal from "@/shared/components/LoginModal";

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <Suspense fallback={null}>
          <BookingContextProvider>
            {children}
            <BookingModalProvider />
            <LoginModal />
          </BookingContextProvider>
        </Suspense>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
