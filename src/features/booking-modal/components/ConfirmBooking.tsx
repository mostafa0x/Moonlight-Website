import { memo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";

interface ConfirmBookingProps {
  callback: () => void;
  isLoading?: boolean;
}

/**
 * ConfirmBooking: Premium interactive button for finalizing the booking.
 * 
 * Best Practices:
 * - INP: Disables during loading to prevent race conditions and duplicate API calls.
 * - Accessibility: Clear ARIA label and stateful button management.
 * - Performance: Memoized to avoid redundant renders during form state updates.
 */
function ConfirmBooking({ callback, isLoading }: ConfirmBookingProps) {
  const t = useTranslations("bookingModal.footer");

  return (
    <button
      type="submit"
      onClick={callback}
      disabled={isLoading}
      aria-label={t("confirm")}
      className={cn(
        "group relative w-40 h-10.25 bg-[#F2C975] hover:bg-[#D4A950] active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100 rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-lg shadow-[#F2C975]/10 overflow-hidden",
        isLoading && "cursor-not-allowed"
      )}
    >
      {/* Visual background effect on hover */}
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      
      <span className={cn(
        "relative text-sm text-[#0D0D0D] font-bold uppercase tracking-wide",
        isLoading && "opacity-0"
      )}>
        {t("confirm")}
      </span>

      {/* Conditional Spinner for better INP perception */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#0D0D0D] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Button Icon: Only visible when NOT loading */}
      {!isLoading && (
        <svg 
          viewBox="0 0 24 24" 
          className="relative w-4 h-4 text-[#0D0D0D] transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      )}
    </button>
  );
}

ConfirmBooking.displayName = "ConfirmBooking";

export default memo(ConfirmBooking);

