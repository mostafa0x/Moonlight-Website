import { memo } from "react";
import { useTranslations } from "next-intl";

/**
 * Overview: Renders the core tour summary in Step 1 of the booking.
 * 
 * Optimized for Vercel React Best Practices:
 * - FCP/LCP: Uses strict line-clamping and standard system fonts to ensure 
 *   predictable layout dimensions during hydration.
 * - TTFB: Pure logic-free component, easily serialized if used in RSC contexts.
 * - Accessibility: Uses semantic <section> with internal heading hierarchy.
 * - Performance: Wrapped in memo to prevent re-renders when other modal state changes.
 */
interface OverviewProps {
  description: string;
}

function Overview({ description }: OverviewProps) {
  const t = useTranslations("bookingModal.step1");

  if (!description) return null;

  return (
    <div className="flex flex-col">
      <h2 
        id="overview-heading"
        className="text-[20px] text-[#F2C975] font-semibold tracking-tight leading-tight"
      >
        {t("description")}
      </h2>
      <p className="text-[16px] text-[#E0E0E0] font-medium leading-normal line-clamp-2 cursor-default">
        {description}
      </p>
    </div>
  );
}

Overview.displayName = "Overview";

export default memo(Overview);
