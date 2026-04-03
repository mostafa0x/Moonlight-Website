"use client";

import { useTransition } from "react";
import { cancelBookingAction } from "../actions/bookingActions";

/**
 * CancelButton: A small Client Component for booking cancellation logic.
 * 
 * Optimized for:
 * - Minimalist interactivity.
 * - Native React useTransition for non-blocking UI updates (INP).
 * - No dependency on heavy React Query for simple mutations.
 */
export const CancelButton: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const [isPending, startTransition] = useTransition();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to request cancellation for this booking?")) return;

    startTransition(async () => {
      const result = await cancelBookingAction(bookingId);
      if (!result.success) {
        alert(result.error || "Failed to cancel booking.");
      }
    });
  };

  return (
    <button
      onClick={handleCancel}
      disabled={isPending}
      className="flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors disabled:opacity-50"
    >
      <div className="w-4 h-4 bg-rose-500 rounded-sm" />
      <span className="text-base font-semibold font-cairo">
        {isPending ? "Cancelling..." : "Cancel Booking"}
      </span>
    </button>
  );
};
