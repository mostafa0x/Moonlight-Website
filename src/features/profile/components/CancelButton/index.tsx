"use client";

import { useCancellation } from "../../context/CancellationContext";
import { useTranslations } from "next-intl";

/**
 * CancelButton: Optimized client-side entry point for booking cancellation.
 * 
 * Performance gains:
 * - Shared modal state via CancellationProvider.
 * - Reduced per-card JS overhead.
 */
export const CancelButton: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { openCancelModal, isPending } = useCancellation();
  const t = useTranslations("profile.bookingCard");

  return (
    <button
      onClick={() => openCancelModal(bookingId)}
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
  );
};
