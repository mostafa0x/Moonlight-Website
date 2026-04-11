"use client";

import { useTransition, useState } from "react";
import dynamic from "next/dynamic";
import { cancelBookingAction } from "../../actions/bookingActions";
import { useTranslations } from "next-intl";

// Performance Optimization: Dynamic imports for Modals (Only loaded when user interacts)
const ConfirmationModal = dynamic(() => import("./ConfirmationModal"), { 
  ssr: false,
  loading: () => null // Keep UI stable during quick load
});

const ErrorModal = dynamic(() => import("./ErrorModal"), { 
  ssr: false,
  loading: () => null
});

/**
 * CancelButton: Optimized client-side entry point for booking cancellation.
 * 
 * Performance gains:
 * - Code-splitting for heavy modal UIs.
 * - Minimal main-thread work for initial render (Improved FCP/LCP).
 * - React Server Actions for secure, fast mutations.
 */
export const CancelButton: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const t = useTranslations("profile.bookingCard");

  const handleConfirm = async () => {
    startTransition(async () => {
      const result = await cancelBookingAction(bookingId);
      if (result.success) {
        setShowModal(false);
      } else {
        setShowModal(false);
        setErrorKey(result.error || "CANCEL_FAILED");
      }
    });
  };


  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isPending}
        className="group relative flex items-center gap-2 text-rose-500/80 hover:text-rose-500 transition-all duration-300 disabled:opacity-50 cursor-pointer"
        aria-label="Cancel Booking"
      >
        <div className="relative overflow-hidden p-1.5 rounded-lg border border-rose-500/20 group-hover:border-rose-500/50 transition-colors">
          <img src="/icons/closeIcon.svg" className="w-3.5 h-3.5" alt="close" />
        </div>
        <span className="text-base font-bold font-cairo tracking-wide uppercase">
          {isPending ? "..." : t("cancelBooking")}
        </span>
      </button>

      {/* Modals are only mounted and loaded on interaction */}
      {showModal && (
        <ConfirmationModal 
          onConfirm={handleConfirm} 
          onClose={() => setShowModal(false)} 
          isPending={isPending} 
        />
      )}

      {errorKey && (
        <ErrorModal 
          errorKey={errorKey} 
          onClose={() => setErrorKey(null)} 
        />
      )}

    </>
  );
};
