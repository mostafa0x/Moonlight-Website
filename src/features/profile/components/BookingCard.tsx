import React from "react";
import { Booking } from "../types";
import { getTranslations } from "next-intl/server";
import { CancelButton } from "./CancelButton";

interface BookingCardProps {
  booking: Booking;
}

/**
 * BookingCard: A Server Component for displaying booking details.
 * 
 * Optimized for:
 * - Direct server rendering of booking data.
 * - Reduced client-side JavaScript.
 * - Accurate SEO.
 */
export const BookingCard: React.FC<BookingCardProps> = async ({ booking }) => {
  const t = await getTranslations("profile.bookingCard");
  
  // Normalizing status for logic checks (handling both PascalCase and snake_case)
  const normalizedStatus = booking.status?.toLowerCase().replace(/_/g, " ") || "";
  
  const isCancellable = normalizedStatus === "confirmed" || normalizedStatus === "confirmed deposit" || normalizedStatus === "pending";
  const isCancelled = normalizedStatus === "cancelled";
  const isRequested = normalizedStatus === "cancellation requested";
  const isFailed = normalizedStatus === "failed";

  const statusStyles = {
    confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500",
    confirmedDeposit: "bg-teal-500/10 text-teal-500 border-teal-500",
    requested: "bg-orange-500/10 text-orange-500 border-orange-500",
    cancelled: "bg-rose-500/10 text-rose-500 border-rose-500",
    failed: "bg-zinc-800/10 text-zinc-500 border-zinc-500",
    pending: "bg-white/5 text-white/70 border-white/20",
  };

  const currentStatusStyle = (() => {
    switch (normalizedStatus) {
      case "confirmed": return statusStyles.confirmed;
      case "confirmed deposit": return statusStyles.confirmedDeposit;
      case "cancellation requested": return statusStyles.requested;
      case "cancelled": return statusStyles.cancelled;
      case "failed": return statusStyles.failed;
      case "pending": return statusStyles.pending;
      default: return statusStyles.pending;
    }
  })();

  return (
    <div className="w-full flex flex-col md:flex-row bg-neutral-900 rounded-[10px] border border-zinc-800 overflow-hidden min-h-56 group hover:border-zinc-700 transition-colors">
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between relative">
        <div className="flex flex-col gap-1">
          {/* Header & Status */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white text-xl font-semibold font-cairo">
              {booking.packageName}
            </h3>
            <div className={`px-2.5 py-1 rounded-[10px] border text-base font-normal font-cairo capitalize ${currentStatusStyle}`}>
              {booking.status?.replace(/_/g, " ")}
            </div>
          </div>

          {/* Tour Details */}
          <div className="text-zinc-500 text-base font-semibold font-cairo">
            {booking.tourDate}, {booking.tourTime || "--:--:--"}
          </div>

          {/* Payment Type */}
          <div className="flex items-center gap-2 mt-2">
            <img 
              src={booking.paymentType === "deposit" ? "/icons/cash.svg" : "/icons/paymentIcon.svg"} 
              alt="payment" 
              className="w-5 h-5"
            />
            <span className="text-zinc-500 text-base font-semibold font-cairo uppercase">
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
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("viewTicket")}
              </a>
            )}

            {isCancellable && (
              <CancelButton bookingId={booking.id} />
            )}
          </div>

          {/* Price Section */}
          <div className="text-white text-2xl font-normal font-cairo self-end">
            {booking.price} {booking.currency || "$"}
          </div>
        </div>
      </div>
    </div>
  );
};
