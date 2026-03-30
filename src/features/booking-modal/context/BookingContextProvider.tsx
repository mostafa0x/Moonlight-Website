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
  const [totalSteps, setTotalSteps] = useState(5);
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
  
  /**
   * handleSetTourId: Updates the state and the URL.
   * Note: This function itself doesn't use useSearchParams to avoid suspending the provider.
   * It relies on next/navigation's router which is safe.
   */
  const handleSetTourId = useCallback((tour: string) => {
    setTourId(tour);
    setStep(1);
    
    // Update URL manually if we want to avoid useSearchParams here.
    // Or we can just let the BookingURLSync handle the URL update via an effect if needed.
    // However, it's safer to just push/replace the URL.
    const url = new URL(window.location.href);
    if (tour) {
      url.searchParams.set("tourId", tour);
    } else {
      url.searchParams.delete("tourId");
    }
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router]);

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
        {/*
          URL Sync is moved to a sibling component wrapped in Suspense.
          This prevents useSearchParams from suspending the entire children tree.
        */}
        <Suspense fallback={null}>
          <BookingURLSync 
            setTourId={setTourId} 
            tourId={tourId} 
            setStep={setStep} 
          />
        </Suspense>
      </BookingActionsContext.Provider>
    </BookingStateContext.Provider>
  );
}

/**
 * BookingURLSync: Handles synchronization between the URL (tourId) and local state.
 * Isolated in a component to localized Suspense impact.
 */
function BookingURLSync({ 
  setTourId, 
  tourId, 
  setStep 
}: { 
  setTourId: (id: string) => void;
  tourId: string;
  setStep: (step: number) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingParam = searchParams.get("tourId");

  // Sync from URL to STATE
  useEffect(() => {
    const nextTourId = bookingParam || "";
    if (tourId !== nextTourId) {
      setTourId(nextTourId);
      setStep(1);
    }
  }, [bookingParam, tourId, setTourId, setStep]);

  // We could also put handleSetTourId logic here if we wanted it to be the source of truth
  // for URL updates, but keeping the state sync is the priority.
  
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

