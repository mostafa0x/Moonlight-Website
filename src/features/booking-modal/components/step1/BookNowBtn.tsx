import { useBookingActions } from "@/features/booking-modal/context/BookingContextProvider";
import { memo } from "react";
import { useTranslations } from "next-intl";

/**
 * BookNowBtn: A performant "Next Step" button for the booking flow.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Minimal logic in the hit handler, uses memoization.
 * - Re-renders: Uses useBookingActions instead of useBookingContext to avoid
 *   re-rendering when the overall booking state (step, isOpen, etc.) changes.
 * - Accessibility: Semantic button with proper type and localized ARIA labels.
 */
function BookNowBtn() {
  const { nextStep } = useBookingActions();
  const t = useTranslations("bookingModal.footer");

  return (
    <button
      type="button"
      aria-label={t("bookNow")} // Better for screen readers than "next step button"
      onClick={nextStep}
      className="w-fit h-fit px-6 py-1.5 bg-[#F2C975] hover:bg-[#D4A950] active:scale-95 text-black font-semibold rounded-xl transition-all duration-200 select-none cursor-pointer shadow-md hover:shadow-lg"
    >
      <span className="text-base tracking-tight leading-none">{t("bookNow")}</span>
    </button>
  );
}

BookNowBtn.displayName = "BookNowBtn";

export default memo(BookNowBtn);
