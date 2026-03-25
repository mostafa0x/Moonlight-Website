"use client";
import type { BookingContextProps } from "@/features/booking-modal/types";
import { createContext, useCallback, useContext, useState } from "react";

const BookingContext = createContext<BookingContextProps>({
  isOpen: false,
  tourId: "",
  step: 1,
  nextStep: () => {},
  prevStep: () => {},
  handleSetTourId: () => {},
});

export default function BookingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const query = useSearchParams();
  // const tourId = query.get("tourId");
  const [step, setStep] = useState(1);

  const [tourId, setTourId] = useState("");
  const isOpen = !!tourId;
  const nextStep = useCallback(() => {
    setStep((s) => (s < 5 ? s + 1 : 4));
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => (s !== 1 ? s - 1 : 1));
  }, []);

  const handleSetTourId = useCallback((tour: string) => {
    setTourId(tour);
  }, []);

  return (
    <BookingContext.Provider
      value={{ isOpen, tourId, step, nextStep, prevStep, handleSetTourId }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBookingContext = () => useContext(BookingContext);
