import BookingContextProvider from "@/features/booking-modal/context/BookingContextProvider";
import BookingModalProvider from "@/features/booking-modal/providers/BookingModalProvider";
import ReactQueryProvider from "@/shared/providers/ReactQueryProvider";
import React from "react";
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
        <BookingContextProvider>
          {children}
          {/* 
            These are client-side components that don't block the main page content.
            The individual providers now handle their own Suspense if they use 
            hooks like useSearchParams that require it.
          */}
          <BookingModalProvider />
          <LoginModal />
        </BookingContextProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
