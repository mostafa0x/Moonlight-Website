"use client";

import { useEffect, useMemo, useRef } from "react";
import { FormProvider } from "react-hook-form";

import HeaderModal from "./components/HeaderModal";
import CloseBtn from "@/shared/button/CloseBtn";
import StepsInfo from "./components/StepsInfo";
import FooterModal from "./components/FooterModal";
import StepRenderer from "./components/StepRenderer";

import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import {
  useBookingForm,
  usePriceCalculation,
  usePackageDefaults,
  useBookingPersistence
} from "./hooks/index";

/**
 * BookingModal: Main orchestrator for the booking flow.
 * 
 * Performance & Vitals Focus:
 * - INP: Complex initialization logic (defaults, persistence) handled in effects.
 * - FCP: Content rendering is deferred until data is ready to avoid layout jank.
 * - LCP: Priority-loaded Header image is the focal point.
 * 
 * Features:
 * - Auto-restoration: Detects if the user was interrupted (e.g., to login) and 
 *   restores form state to continue where they left off.
 */
export default function BookingModal({ pkg }: { pkg: any }) {

  const { step } = useBookingState();
  const { setTotalSteps, setStep } = useBookingActions();

  // Initialize form with base defaults 
  const methods = useBookingForm(pkg);
  const { reset } = methods;



  // Custom hooks to handle complex business logic
  const { calculatePrice } = usePriceCalculation(pkg, methods);
  usePackageDefaults(pkg, methods);

  // Persistence hook for continuous auto-saving
  const { getPendingBooking, savePendingBooking } = useBookingPersistence();

  const hasCustomizations = useMemo(() =>
    !!(pkg?.customizations && pkg.customizations.length > 0),
    [pkg?.customizations]
  );

  /**
   * Restoration & Initialization Effect:
   * If user reloaded or was redirected, restores their input data and exact step.
   * Otherwise, sets the pkg default prices.
   */
  useEffect(() => {
    if (!pkg) return;

    const pendingData = getPendingBooking(pkg.packageId);
    if (pendingData) {
      // Restore all user input with 'keepDefaultValues' to avoid overwrites
      reset(pendingData.formValues, { keepDefaultValues: true });

      // Determine the correct step to jump to for continuing
      const targetStep = pendingData.step || (hasCustomizations ? 3 : 2);
      setStep(targetStep);
    } else {
      // Normal launch: Hydrate basic defaults like price
      reset(
        (prev: any) => ({
          ...prev,
          totalPrice: pkg.startingPrice || 0
        }),
        { keepDefaultValues: true }
      );
    }
  }, [pkg, hasCustomizations, reset, setStep, getPendingBooking]);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * High-Performance Continuous Auto-Save Effect:
   * Instantly synchronizes high-priority single keys (tourDate, phone, nationality) to localStorage,
   * while debouncing the heavy global JSON persistence by 400ms to guarantee absolute zero typing lag.
   */
  useEffect(() => {
    if (!pkg?.packageId) return;

    const pending = getPendingBooking(pkg.packageId);
    // Avoid saving initial mounting state if restoration hasn't caught up to the target step yet
    if (pending && pending.step && pending.step !== step) {
      return;
    }

    savePendingBooking(pkg.packageId, methods.getValues(), step);

    const subscription = methods.watch((value) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Safely extract only defined properties from live 'value' scope to preserve cache integrity
      const safeValue: any = {};
      if (value) {
        Object.keys(value).forEach((key) => {
          if ((value as any)[key] !== undefined) {
            safeValue[key] = (value as any)[key];
          }
        });
      }
      const latestValues = { ...methods.getValues(), ...safeValue };

      // Instantly persist single individual keys for instant UI state recovery across reloads
      if (typeof window !== "undefined") {
        if (safeValue.customerPhone) localStorage.setItem("customerPhone", safeValue.customerPhone);
        if (safeValue.nationality) localStorage.setItem("nationality", safeValue.nationality);
      }

      // Debounce global object stringification and writing to maximize main-thread responsiveness
      debounceTimerRef.current = setTimeout(() => {
        savePendingBooking(pkg.packageId, latestValues, step);
      }, 400);
    });

    return () => {
      subscription.unsubscribe();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [pkg?.packageId, step, methods, savePendingBooking, getPendingBooking]);


  // Sync total steps based on package customization options
  useEffect(() => {
    if (pkg) {
      setTotalSteps(hasCustomizations ? 4 : 3);
    }
  }, [hasCustomizations, pkg, setTotalSteps]);

  if (!pkg) return null;

  return (
    <FormProvider {...methods}>
      <ModalLayout>
        <ModalContent
          pkg={pkg}
          step={step}
          hasCustomizations={hasCustomizations}
          calculatePrice={calculatePrice}
        />
      </ModalLayout>
    </FormProvider>
  );
}

/**
 * ModalLayout Components: Provides the fixed background and container.
 */
const ModalLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 modal-fade-up pt-8 pb-6 backdrop-blur-sm shadow-2xl overflow-hidden">
    <div className="relative w-92.25 sm:w-157 h-full rounded-[20px] bg-black overflow-hidden flex flex-col border border-white/10">
      <div className="absolute right-4.25 top-4.25 z-1000">
        <CloseBtn />
      </div>
      {children}
    </div>
  </div>
);

/**
 * ModalContent Component: Renders the header, info, steps, and footer.
 * Isolated to prevent unnecessary root-level re-renders.
 */
const ModalContent = ({ pkg, step, hasCustomizations, calculatePrice }: any) => (

  <>
    <div>
      <HeaderModal
        titleTour={pkg.packageName}
        price={pkg.startingPrice.toString()}
        image={Array.isArray(pkg.packageImage) ? pkg.packageImage[0] : pkg.packageImage}
      />
    </div>

    <div className="animate-in fade-in duration-500">
      <StepsInfo step={step} />
    </div>

    <StepRenderer
      step={step}
      pkg={pkg}
      hasCustomizations={hasCustomizations}
      onLocationChange={calculatePrice}
    />

    <div className="mt-auto px-5.25 py-4 border-t border-white/5 bg-[#0D0D0D]">
      <FooterModal step={step} pkg={pkg} />
    </div>
  </>
);
