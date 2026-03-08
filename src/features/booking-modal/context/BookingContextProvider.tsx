"use client";
import type { BookingContextProps } from "@/features/booking-modal/types";
import { useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";

const BookingContext = createContext<BookingContextProps>({
  isOpen: false,
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
});

export default function BookingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const query = useSearchParams();
  const tourId = query.get("tourId");
  const isOpen = !!tourId;
  const [step, setStep] = useState(1);

  const nextStep = useCallback(() => {
    setStep((s) => (s < 5 ? s + 1 : 4));
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => (s !== 1 ? s - 1 : 1));
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, step, nextStep, prevStep }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBookingContext = () => useContext(BookingContext);
