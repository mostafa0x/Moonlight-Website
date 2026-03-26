import PeopleCounter from "@/features/booking-modal/components/step2/PeopleCounter";
import SelectDestinations from "@/features/booking-modal/components/step2/SelectDestinations";
import TourLanguageSelector from "@/features/booking-modal/components/step2/TourLanguageSelector";
import PickLocation from "@/features/booking-modal/components/step2/PickLocation";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { useTranslations } from "next-intl";

export default function Step2() {
  const { step } = useBookingContext();
  const t = useTranslations("bookingModal.step2");

  return (
    step === 2 && (
      <div className="space-y-4">
        <h1 className="text-base text-[#F2C975] font-medium">
          {t("travelersTitle")}
        </h1>
        <div className="space-y-4">
          <PeopleCounter />
          <div className="relative">
            <h2 className="text-sm text-[#8B8B8B] font-medium mb-4">
              {t("guideLanguage")}
            </h2>
            <TourLanguageSelector />
          </div>
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
    )
  );
}
