"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useBodyScrollLock } from "../hooks/use-body-scroll-lock";

/**
 * State and dispatch contexts are split to optimize performance.
 * This prevents components that only need actions (like nextStep) 
 * from re-rendering when the state (like step) changes.
 */

interface BookingState {
  isOpen: boolean;
  tourId: string;
  lang: string;
  step: number;
  totalSteps: number;
}

interface BookingActions {
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  handleSetTourId: (tour: string) => void;
  setTotalSteps: (total: number) => void;
}

const BookingStateContext = createContext<BookingState | undefined>(undefined);
const BookingActionsContext = createContext<BookingActions | undefined>(undefined);

/**
 * Main Provider component for the booking feature.
 * Coordinates state, URL synchronization, and side effects.
 */
export default function BookingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useParams();
  const lang = (locale as string) || "en";
  
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(5);
  const [tourId, setTourId] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingParam = searchParams.get("tourId");

  const isOpen = !!tourId;

  // Handle body scroll locking via specialized hook
  useBodyScrollLock(isOpen);

  // --- ACTIONS ---
  
  const nextStep = useCallback(() => {
    setStep((s) => (s < totalSteps ? s + 1 : totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setStep((s) => (s !== 1 ? s - 1 : 1));
  }, []);

  const handleSetTourId = useCallback((tour: string) => {
    setTourId(tour);
    setStep(1); // Reset step when switching tours
  }, []);

  // --- SYNC LOGIC ---

  // 1. Sync FROM URL to STATE (Only on mount or when URL param actually changes)
  useEffect(() => {
    if (bookingParam && tourId !== bookingParam) {
      setTourId(bookingParam);
      setStep(1);
    }
  }, [bookingParam]); // Minimal dependencies to prevent loops

  // 2. Sync FROM STATE to URL (To maintain consistency when programmatically opened)
  useEffect(() => {
    const currentParam = searchParams.get("tourId") || "";
    if (tourId && tourId !== currentParam) {
      // Push state to URL so it persists and works with browser back/forward
      const params = new URLSearchParams(searchParams.toString());
      params.set("tourId", tourId);
      router.replace(`?${params.toString()}`, { scroll: false });
    } else if (!tourId && currentParam) {
      // Clear URL if modal is closed
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tourId");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [tourId, router, searchParams]);


  // --- CONTEXT VALUES ---

  const stateValue = useMemo(
    (): BookingState => ({
      isOpen,
      lang,
      tourId,
      step,
      totalSteps,
    }),
    [isOpen, lang, tourId, step, totalSteps]
  );

  const actionsValue = useMemo(
    (): BookingActions => ({
      nextStep,
      prevStep,
      setStep,
      handleSetTourId,
      setTotalSteps,
    }),
    [nextStep, prevStep, setStep, handleSetTourId, setTotalSteps]
  );

  return (
    <BookingStateContext.Provider value={stateValue}>
      <BookingActionsContext.Provider value={actionsValue}>
        {children}
      </BookingActionsContext.Provider>
    </BookingStateContext.Provider>
  );
}

/**
 * Custom hooks for accessing the contexts with built-in null checks.
 */

export const useBookingState = () => {
  const context = useContext(BookingStateContext);
  if (context === undefined) {
    throw new Error("useBookingState must be used within a BookingContextProvider");
  }
  return context;
};

export const useBookingActions = () => {
  const context = useContext(BookingActionsContext);
  if (context === undefined) {
    throw new Error("useBookingActions must be used within a BookingContextProvider");
  }
  return context;
};

/**
 * Compatibility hook for existing consumers of useBookingContext.
 * Note: Components using this will re-render whenever state OR actions change.
 */
export const useBookingContext = () => {
  const state = useBookingState();
  const actions = useBookingActions();
  return { ...state, ...actions };
};

