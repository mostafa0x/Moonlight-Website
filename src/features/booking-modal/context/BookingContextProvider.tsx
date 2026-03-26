"use client";
import type { BookingContextProps } from "@/features/booking-modal/types";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const BookingContext = createContext<BookingContextProps>({
  isOpen: false,
  tourId: "",
  lang: "en",
  step: 1,
  totalSteps: 5,
  nextStep: () => {},
  prevStep: () => {},
  handleSetTourId: () => {},
  setTotalSteps: () => {},
});

export default function BookingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useParams();
  const lang = locale as string;
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(5);

  const [tourId, setTourId] = useState("");
  const searchParams = useSearchParams();
  const bookingParam = searchParams.get("tourId");

  const isOpen = !!tourId;
  const nextStep = useCallback(() => {
    setStep((s) => (s < totalSteps ? s + 1 : totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setStep((s) => (s !== 1 ? s - 1 : 1));
  }, []);

  const handleSetTourId = useCallback((tour: string) => {
    setTourId(tour);
    setStep(1); // reset step when tour changes
  }, []);

  useEffect(() => {
    handleSetTourId(bookingParam || "");
  }, [bookingParam, handleSetTourId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        lang,
        tourId,
        step,
        totalSteps,
        nextStep,
        prevStep,
        handleSetTourId,
        setTotalSteps,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBookingContext = () => useContext(BookingContext);
