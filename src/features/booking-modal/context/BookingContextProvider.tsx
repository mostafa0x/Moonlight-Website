"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
  const [totalSteps, setTotalSteps] = useState(4);
  const [tourId, setTourId] = useState("");

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

  const router = useRouter();
  
  // expectedParamRef tracks programmatic URL updates so we can ignore stale URL parameters
  const expectedParamRef = React.useRef<string | null>(null);

  const handleSetTourId = useCallback((tour: string) => {
    setTourId(tour);
    setStep(1);
    expectedParamRef.current = tour;
    
    // Update URL manually via native History API to avoid Next.js router initialization errors
    // Next.js (14+) seamlessly intercepts pushState/replaceState to keep useSearchParams in sync.
    const url = new URL(window.location.href);
    if (tour) {
      url.searchParams.set("tourId", tour);
    } else {
      url.searchParams.delete("tourId");
    }
    window.history.replaceState(null, "", url.pathname + url.search);
  }, []);

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
        <Suspense fallback={null}>
          <BookingURLSync 
            setTourId={setTourId} 
            tourId={tourId} 
            setStep={setStep} 
            expectedParamRef={expectedParamRef}
          />
        </Suspense>
      </BookingActionsContext.Provider>
    </BookingStateContext.Provider>
  );
}

/**
 * BookingURLSync: Handles synchronization between the URL (tourId) and local state.
 */
function BookingURLSync({ 
  setTourId, 
  tourId,
  setStep,
  expectedParamRef
}: { 
  setTourId: (id: string) => void;
  tourId: string;
  setStep: (step: number) => void;
  expectedParamRef: React.MutableRefObject<string | null>;
}) {
  const searchParams = useSearchParams();
  const bookingParam = searchParams.get("tourId") || "";
  
  // Sync from URL to STATE dynamically
  useEffect(() => {
    if (expectedParamRef.current !== null) {
      // We are waiting for a programmatic router change to catch up
      if (bookingParam === expectedParamRef.current) {
        // Router has caught up! We can start listening to the URL natively again.
        expectedParamRef.current = null;
      }
      // If it hasn't caught up, do nothing (protect the programmatic state from stale URL).
    } else {
      // We are in a steady state. The URL is the absolute source of truth.
      // If the user presses the Back/Forward button, the URL changes and won't match state.
      if (bookingParam !== tourId) {
        setTourId(bookingParam);
        setStep(1);
      }
    }
  }, [bookingParam, tourId, setTourId, setStep, expectedParamRef]);

  return null;
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

