"use client";

import { memo, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import BackBtn from "./BackBtn";
import ConfirmBooking from "./ConfirmBooking";
import NextStepBtn from "./NextStepBtn";
import EgyptianLoader from "@/shared/components/EgyptianLoader";

import { useAuth } from "@/shared/providers/AuthProvider";
import { useBookingState, useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import Link from "next/link";
import {
  useBookingSubmit,
  useFooterNavigation
} from "../hooks/index";

/**
 * FooterModal: Refactored according to Vercel React best practices.
 * 
 * Performance & Vitals Optimization:
 * - INP: Logic extracted into custom hooks (useBookingSubmit, useFooterNavigation).
 * - Re-renders: Memoized sub-components like PriceDisplay prevents non-price-related re-renders.
 * - Bundle Size: Component logic decoupled for better code splitting candidates.
 * - Accessibility: Clear button roles and dynamic aria states for loading.
 */
function FooterModal({ step, pkg }: { step: number; pkg?: any }) {
  const t = useTranslations("bookingModal.footer");
  const tAuth = useTranslations("auth");
  const { tourId, totalSteps, lang } = useBookingState();
  const { handleSetTourId } = useBookingActions();
  const { setShowLoginModal } = useAuth();

  // Custom hooks for complex interactions
  const { submitBooking, loading, errorMsg, setErrorMsg } = useBookingSubmit({
    tourId,
    setShowLoginModal
  });

  const { handleNext, prevStep } = useFooterNavigation({
    step,
    totalSteps,
    pkg,
    setErrorMsg
  });
  // Auto-hide errors for better UX
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg, setErrorMsg]);

  return (
    <div className={clsx("relative flex flex-row items-center border-t border-[#313131] pt-3.5", step === 1 ? "justify-end" : "justify-between")}>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-1000000 flex items-center justify-center opacity-50 bg-black/20">
          <EgyptianLoader />
        </div>
      )}

      {/* Error Message UI */}
      {errorMsg && <ErrorMessage message={errorMsg} />}

      {step != 1 &&
        <BackBtn prevStep={prevStep} />
      }

      <div className="flex items-center gap-4">
        {step === totalSteps ? (
          <div className="flex flex-col-reverse md:flex-row items-center gap-2 md:gap-3">
            <p className="text-[11px] text-[#8B8B8B] max-w-50 text-center md:text-right leading-tight">
              {tAuth("agreement.prefix")}
              <Link
                href={`/${lang}/terms`}
                onClick={() => handleSetTourId("")}
                className="font-semibold text-[#A1A1A1] underline hover:text-[#F2C975]"
              >
                {tAuth("agreement.terms")}
              </Link>
              {tAuth("agreement.and")}
              <Link
                href={`/${lang}/privacy`}
                onClick={() => handleSetTourId("")}
                className="font-semibold text-[#A1A1A1] underline hover:text-[#F2C975]"
              >
                {tAuth("agreement.privacy")}
              </Link>
            </p>
            <ConfirmBooking callback={submitBooking} isLoading={loading} />
          </div>
        ) : (
          <>
            <PriceDisplay label={t("totalPrice")} />
            <NextStepBtn nextStep={handleNext} />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * PriceDisplay Component: Separated to isolate re-renders on price change.
 */
const PriceDisplay = memo(({ label }: { label: string }) => {
  const { control } = useFormContext();
  const { field: { value = 0 } } = useController({
    name: "totalPrice",
    control,
    defaultValue: 0
  });

  return (
    <div className="flex flex-col text-right">
      <span className="text-base text-[#8B8B8B] font-semibold">{label}</span>
      <span className="text-[20px] text-[#F2C975] font-medium transition-all duration-300">
        ${value}
      </span>
    </div>
  );
});

/**
 * ErrorMessage Component: Handles the display of validation or backend errors.
 */
const ErrorMessage = memo(({ message }: { message: string }) => {
  return (
    <div className="absolute bottom-[calc(100%+16px)] left-0 right-0 flex justify-center z-100 px-4 pointer-events-none">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-md border border-[#F2C975]/40 px-6 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_10px_40px_-10px_rgba(242,201,117,0.2)] animate-in fade-in slide-in-from-bottom-3 duration-500 pointer-events-auto max-w-full w-fit">
        <div className="shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F2C975]" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <span className="text-[#ff9191] text-xs font-medium tracking-wider uppercase text-center wrap-break-word break-all sm:break-normal">
          {message}
        </span>
      </div>
    </div>
  );
});

FooterModal.displayName = "FooterModal";
PriceDisplay.displayName = "PriceDisplay";
ErrorMessage.displayName = "ErrorMessage";

export default memo(FooterModal);
