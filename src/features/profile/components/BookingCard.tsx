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
  const isUpcoming = booking.status.toLowerCase() === "upcoming";
  const isCancelled = booking.status.toLowerCase() === "cancelled";
  const isCompleted = booking.status.toLowerCase() === "completed";

  const statusStyles = {
    upcoming: "bg-yellow-500/10 text-yellow-500 border-yellow-500",
    cancelled: "bg-rose-500/10 text-rose-500 border-rose-500",
    completed: "bg-zinc-800/10 text-zinc-500 border-zinc-500",
  };

  const currentStatusStyle = isUpcoming 
    ? statusStyles.upcoming 
    : isCancelled 
      ? statusStyles.cancelled 
      : statusStyles.completed;

  return (
    <div className="w-full flex flex-col md:flex-row bg-neutral-900 rounded-[10px] border border-zinc-800 overflow-hidden min-h-56 group hover:border-zinc-700 transition-colors">
      {/* Image Section */}
      <div className="relative w-full md:w-36 h-34 md:h-auto overflow-hidden">
        <Image
          src={booking.imageUrl || "https://placehold.co/144x222"}
          alt={booking.packageName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between relative">
        <div className="flex flex-col gap-1">
          {/* Header & Status (Mobile/Desktop variation) */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white text-xl font-semibold font-cairo">
              {booking.packageName}
            </h3>
            
            {/* Price (Desktop) */}
            <div className="hidden md:block text-white text-2xl font-normal font-cairo">
              {booking.price} {booking.currency || "$"}
            </div>
            
            {/* Status Badge (Absolute Position Mockup or Flex) */}
            <div className={`px-2.5 py-1 rounded-[10px] border text-base font-normal font-cairo ${currentStatusStyle} md:absolute md:right-37.5 md:top-3.5`}>
              {booking.status}
            </div>
          </div>

          <div className="text-zinc-500 text-base font-semibold font-cairo">
             {booking.tourDate}, {booking.tourTime || "09:00 AM"}
          </div>

          {/* Payment Type */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-5 h-4 border border-orange-300 flex items-center justify-center rounded-xs">
               <div className={`w-3.5 h-1.5 ${booking.paymentType.toLowerCase().includes("full") ? "bg-orange-300" : "border-t border-orange-300"}`} />
            </div>
            <span className="text-zinc-500 text-base font-semibold font-cairo">
              {booking.paymentType}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {booking.status.toLowerCase() !== "cancelled" && (
                <a 
                href={booking.ticketUrl || "#"} 
                className="text-white text-lg font-semibold font-sans underline hover:text-white/80 transition-colors"
                >
                View Ticket
                </a>
            )}
            
            {isUpcoming && (
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
          <div className="md:hidden text-white text-2xl font-normal font-cairo self-end">
            {booking.price} {booking.currency || "$"}
          </div>
        </div>
      </div>
    </div>
  );
};
