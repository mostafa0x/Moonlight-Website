import React from "react";
import { Booking } from "../types";
import { getTranslations } from "next-intl/server";
import { CancelButton } from "./CancelButton";
import Link from "next/link";

interface BookingCardProps {
  booking: Booking;
  locale: string;
}

/**
 * BookingCard: A Server Component for displaying booking details.
 * 
 * Optimized for:
 * - Direct server rendering of booking data.
 * - Reduced client-side JavaScript.
 * - Accurate SEO.
 */
export async function BookingCard({ booking, locale }: BookingCardProps) {
  const t = await getTranslations({ locale, namespace: "profile.bookingCard" });

  // Normalizing status for logic checks (handling both PascalCase and snake_case)
  const normalizedStatus = booking.status?.toLowerCase().replace(/_/g, " ") || "";

  const isCancellable = normalizedStatus === "confirmed" || normalizedStatus === "confirmed deposit" || normalizedStatus === "pending";
  const isCancelled = normalizedStatus === "cancelled";
  const isRequested = normalizedStatus === "cancellation requested";
  const isFailed = normalizedStatus === "failed";

  const statusStyles = {
    confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    confirmedDeposit: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    requested: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    failed: "bg-zinc-800/50 text-zinc-400 border-zinc-700",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
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

  const getStatusKey = (status: string) => {
    switch (status) {
      case "confirmed": return "confirmed";
      case "confirmed deposit": return "confirmedDeposit";
      case "cancellation requested": return "cancellationRequested";
      case "cancelled": return "cancelled";
      case "failed": return "failed";
      case "pending": return "pending";
      default: return "pending";
    }
  };

  return (
    <div className="relative w-full flex flex-col bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden group hover:border-[#F2C975]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(242,201,117,0.05)]">
      {/* <Link href={`/${locale}/ticket/${booking.id}`} className="absolute inset-0 z-10" /> */}
      {/* Content Section */}
      <div className="flex-1 p-5 md:p-8 flex flex-col justify-between relative z-0 bg-neutral-900/40 select-none">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-bold font-cairo tracking-wide mb-3 group-hover:text-[#F2C975] transition-colors">
                {booking.packageName}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-zinc-400">
                <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                  <svg className="w-4 h-4 text-[#F2C975]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium font-cairo">
                    {booking.tourDate}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg">
                  <svg className="w-4 h-4 text-[#F2C975]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium font-cairo">
                    {booking.tourTime || "--:--"}
                  </span>
                </div>
              </div>
            </div>
            {/* Status Badge */}
            <div className={`px-4 py-2 rounded-xl border text-xs md:text-sm font-semibold uppercase tracking-wider text-center shrink-0 ${currentStatusStyle}`}>
              {t(`status.${getStatusKey(normalizedStatus)}`)}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{t("totalAmount")}</span>
              <div className="text-white text-2xl font-bold font-cairo flex items-center gap-1.5">
                <span className="text-[#F2C975] text-lg">{booking.currency}</span>
                {booking.price}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{t("paymentType")}</span>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                  <img
                    src={booking.paymentType === "deposit" ? "/icons/cash.svg" : "/icons/paymentIcon.svg"}
                    alt="payment"
                    className="w-4 h-4 opacity-80"
                  />
                </div>
                <span className="text-zinc-300 text-lg font-medium font-cairo capitalize">
                  {booking.paymentType ? t(`paymentTypes.${booking.paymentType.toLowerCase()}` as any) : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-row items-center justify-between gap-4 pt-5 border-t border-white/5">
          <div className="flex items-center gap-4 relative z-20">
            {!isCancelled && !isFailed && !isRequested && (
              <Link
                href={`/${locale}/ticket/${booking.id}`}
                className="flex items-center gap-2 text-[#F2C975] text-base font-semibold hover:text-white transition-colors px-6 py-2.5 rounded-xl bg-[#F2C975]/10 hover:bg-[#F2C975]/20 border border-[#F2C975]/20 hover:border-[#F2C975]/40"
                target="_blank"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                {t("viewTicket")}
              </Link>
            )}
          </div>

          {isCancellable && (
            <div className="shrink-0 relative z-20">
              <CancelButton bookingId={booking.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
