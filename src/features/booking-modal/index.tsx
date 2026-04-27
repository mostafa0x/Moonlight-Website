"use client";

import { useEffect, useMemo } from "react";
import { FormProvider } from "react-hook-form";

import HeaderModal from "./components/HeaderModal";
import CloseBtn from "@/shared/button/CloseBtn";
import StepsInfo from "./components/StepsInfo";
import FooterModal from "./components/FooterModal";
import StepRenderer from "./components/StepRenderer";
import EgyptianLoader from "@/shared/components/EgyptianLoader";

import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import {
  useGetPackage,
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

  useEffect(() => {
    if (pkg) {
      console.log("Package Data initialized in Modal", pkg.packageId);
    }
  }, [pkg])

  // Custom hooks to handle complex business logic
  usePriceCalculation(pkg, methods);
  usePackageDefaults(pkg, methods);

  // Persistence hook for login-success flow
  const { getPendingBooking, clearPendingBooking } = useBookingPersistence();

  const hasCustomizations = useMemo(() =>
    !!(pkg?.customizations && pkg.customizations.length > 0),
    [pkg?.customizations]
  );

  /**
   * Restoration & Initialization Effect:
   * If user was redirected, restores their data. Otherwise, sets the pkg default prices.
   */
  useEffect(() => {
    if (!pkg) return;

    const pendingData = getPendingBooking(pkg.packageId);
    if (pendingData) {
      // Restore all user input with 'keepDefaultValues' to avoid overwrites
      reset(pendingData.formValues, { keepDefaultValues: true });

      // Determine the correct step to jump to for continuing
      const targetStep = hasCustomizations ? 3 : 2;
      setStep(targetStep);

      // Clear persistence to ensure clean future launches
      clearPendingBooking();
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
  }, [pkg, hasCustomizations, reset, setStep, getPendingBooking, clearPendingBooking]);


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
const ModalContent = ({ pkg, step, hasCustomizations }: any) => (
  <>
    <div>
      <HeaderModal
        titleTour={pkg.packageName}
        price={pkg.startingPrice.toString()}
        image={pkg.packageImage}
      />
    </div>

    <div className="animate-in fade-in duration-500">
      <StepsInfo step={step} />
    </div>

    <StepRenderer
      step={step}
      pkg={pkg}
      hasCustomizations={hasCustomizations}
    />

    <div className="mt-auto px-5.25 py-4 border-t border-white/5 bg-[#0D0D0D]">
      <FooterModal step={step} pkg={pkg} />
    </div>
  </>
);
