import React from "react";
import Image from "next/image";
import { Booking } from "../types";
import { useTranslations } from "next-intl";

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
  isCancelling?: boolean;
}

/**
 * BookingCard: A responsive card for displaying booking details.
 * 
 * Features:
 * - Responsive layout: Horizontal on desktop, vertical on mobile.
 * - Dynamic status styling based on booking state.
 * - Accessibility: Clear button roles and readable text.
 */
export const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel, isCancelling }) => {
  const t = useTranslations("profile.bookingCard");
  const isCancellable = booking.status === "Confirmed" || booking.status === "Confirmed deposit";
  const isCancelled = booking.status === "Cancelled";
  const isRequested = booking.status === "Cancellation requested";
  const isFailed = booking.status === "Failed";

  const statusStyles = {
    confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500",
    confirmedDeposit: "bg-teal-500/10 text-teal-500 border-teal-500",
    requested: "bg-orange-500/10 text-orange-500 border-orange-500",
    cancelled: "bg-rose-500/10 text-rose-500 border-rose-500",
    failed: "bg-zinc-800/10 text-zinc-500 border-zinc-500",
  };

  const getStatusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "Confirmed": return statusStyles.confirmed;
      case "Confirmed deposit": return statusStyles.confirmedDeposit;
      case "Cancellation requested": return statusStyles.requested;
      case "Cancelled": return statusStyles.cancelled;
      case "Failed": return statusStyles.failed;
      default: return statusStyles.failed;
    }
  };

  const currentStatusStyle = getStatusStyle(booking.status);

  return (
    <div className="w-full flex flex-col md:flex-row bg-neutral-900 rounded-[10px] border border-zinc-800 overflow-hidden min-h-56 group hover:border-zinc-700 transition-colors">


      {/* Content Section */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between relative">
        <div className="flex flex-col gap-1">
          {/* Header & Status (Mobile/Desktop variation) */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white text-xl font-semibold font-cairo">
              {booking.packageName}
            </h3>

            {/* Status Badge (Absolute Position Mockup or Flex) */}
            <div className={`px-2.5 py-1 rounded-[10px] border text-base font-normal font-cairo ${currentStatusStyle}`}>
              {booking.status}
            </div>
          </div>

          <div className="text-zinc-500 text-base font-semibold font-cairo">
            {booking.tourDate}, {booking.tourTime || "--:--:--"}
          </div>

          {/* Payment Type */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-5 h-4 border border-orange-300 flex items-center justify-center rounded-xs">
              <div className={`w-3.5 h-1.5 ${(booking.paymentType || "").toLowerCase().includes("full") ? "bg-orange-300" : "border-t border-orange-300"}`} />
            </div>
            <span className="text-zinc-500 text-base font-semibold font-cairo">
              {booking.paymentType || "N/A"}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {!isCancelled && !isFailed && !isRequested && (
              <a
                href={booking.ticketUrl || "#"}
                className="text-white text-lg font-semibold font-sans underline hover:text-white/80 transition-colors"
              >
                View Ticket
              </a>
            )}

            {isCancellable && (
              <button
                onClick={() => onCancel(booking.id)}
                disabled={isCancelling}
                className="flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors disabled:opacity-50"
              >
                <div className="w-4 h-4 bg-rose-500 rounded-sm" />
                <span className="text-base font-semibold font-cairo">Cancel Booking</span>
              </button>
            )}
          </div>

          {/* Price (Mobile) */}
          <div className="text-white text-2xl font-normal font-cairo self-end">
            {booking.price} {booking.currency || "$"}
          </div>
        </div>
      </div>
    </div>
  );
};
