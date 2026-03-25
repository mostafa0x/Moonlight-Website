import { useFormContext, useWatch } from "react-hook-form";
import BookingSummaryItem from "@/features/booking-modal/components/step4/BookingSummaryItem";
import { memo } from "react";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";
import { useGetPackage } from "@/features/booking-modal/hooks";
import { useTranslations } from "next-intl";

function BookingSummary() {
  const t = useTranslations("bookingModal");
  const { control } = useFormContext();
  const { tourId } = useBookingContext();
  const { data: pkg } = useGetPackage(tourId);

  const values = useWatch({ control });
  const {
    tourDate,
    adultsNumber,
    kidsNumber,
    tourguideLanguage,
    selectedDestinations,
    totalPrice,
  } = values;

  const travelerText = `${adultsNumber} ${t("step2.adults")}${
    kidsNumber > 0 ? `, ${kidsNumber} ${t("step2.children")}` : ""
  }`;

  return (
    <div className="flex flex-col justify-between bg-[#131313] border border-[#313131] w-full min-h-64.5 rounded-[5px] px-3.75 py-3.5 ">
      <div>
        <h1 className="text-base text-[#F2C975] font-medium">
          {t("step5.summaryTitle")}
        </h1>
        <div className="mt-2.75 space-y-3.75">
          <BookingSummaryItem
            label={t("step5.tour")}
            hint={pkg?.packageName || "Tour Package"}
          />
          <BookingSummaryItem
            label={t("step5.date")}
            hint={tourDate || "Not selected"}
          />
          <BookingSummaryItem
            label={t("step5.travelers")}
            hint={travelerText}
          />
          <BookingSummaryItem
            label={t("step5.language")}
            hint={tourguideLanguage?.toUpperCase() || "EN"}
          />
          {selectedDestinations?.length > 0 && (
            <BookingSummaryItem
              label={t("step5.destinations")}
              hint={selectedDestinations.length + " selected"}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center border-t border-[#313131] mt-4 pt-2.75">
        <h2 className="text-base text-[#8B8B8B]">{t("step5.totalPrice")}</h2>
        <span className="text-[20px] text-[#F2C975] font-medium">
          {totalPrice}$
        </span>
      </div>
    </div>
  );
}

export default memo(BookingSummary);
