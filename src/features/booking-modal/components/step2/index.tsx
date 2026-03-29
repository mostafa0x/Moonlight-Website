import { memo } from "react";
import PeopleCounter from "@/features/booking-modal/components/step2/PeopleCounter";
import TourLanguageSelector from "@/features/booking-modal/components/step2/TourLanguageSelector";
import PickLocation from "@/features/booking-modal/components/step2/PickLocation";
import { useTranslations } from "next-intl";

/**
 * Step2: Travelers and Logistics configuration step.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Reduced main-thread blocking by removing unnecessary context subscribers.
 * - Re-renders: Wrapped in memo and removed useBookingContext.
 * - Accessibility: Uses semantic h2 for the travelers title and ensures consistent label hierarchy.
 * - Bundle Size: Removed unused imports (SelectDestinations).
 */
function Step2() {
  const t = useTranslations("bookingModal.step2");

  return (
    <div className="space-y-6 pb-24" aria-labelledby="travelers-heading">
      <h2 
        id="travelers-heading"
        className="text-[18px] md:text-[20px] text-[#F2C975] font-semibold tracking-tight"
      >
        {t("travelersTitle")}
      </h2>
      
      <div className="flex flex-col gap-6">
        {/* Unified grouping for travelers count inputs */}
        <div role="group" aria-labelledby="travelers-heading" className="space-y-4">
          <PeopleCounter />
        </div>

        {/* Individual logistic configuration units */}
        <TourLanguageSelector />
        
        <PickLocation
          name="pickupLocation"
          label={t("pickupTitle")}
          options={Object.entries(
            t.raw("pickupLocations") as Record<string, string>
          ).map(([value, label]) => ({
            label,
            value,
          }))}
        />
      </div>
    </div>
  );
}

Step2.displayName = "Step2";

export default memo(Step2);
