import { useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useBookingState } from "@/features/booking-modal/context/BookingContextProvider";
import { useMemo } from "react";
import { useGetPackage } from "@/features/booking-modal/hooks/use-get-package";

/**
 * useSummaryData: Hook to manage the extraction and formatting of form values for the summary step.
 * 
 * Benefits:
 * - Better Performance: By specifying the exactly watched fields in useWatch, we avoid 
 *   re-rendering the whole summary when unrelated fields (e.g. promo codes, session info) change.
 * - Separation of Concerns: Keeps the UI component clean and focused only on layout.
 */
export function useSummaryData() {
  const t = useTranslations("bookingModal");
  const { control } = useFormContext();
  const { tourId } = useBookingState();
  const { data: pkg } = useGetPackage(tourId);

  // Targeted useWatch to reduce unnecessary re-renders (improves INP)
  const watchedValues = useWatch({
    control,
    name: [
      "tourDate",
      "adultsNumber",
      "kidsNumber",
      "tourguideLanguage",
      "selectedDestinations",
      "totalPrice"
    ]
  });

  const [
    tourDate,
    adultsNumber = 1,
    kidsNumber = 0,
    tourguideLanguage = "EN",
    selectedDestinations = [],
    totalPrice = 0
  ] = watchedValues;

  const travelerText = useMemo(() => {
    const adults = `${adultsNumber} ${t("step2.adults")}`;
    const kids = kidsNumber > 0 ? `, ${kidsNumber} ${t("step2.children")}` : "";
    return `${adults}${kids}`;
  }, [adultsNumber, kidsNumber, t]);

  return {
    pkg,
    tourDate,
    travelerText,
    tourguideLanguage: tourguideLanguage?.toUpperCase(),
    destinationsCount: selectedDestinations?.length || 0,
    totalPrice,
    translations: {
      summaryTitle: t("step5.summaryTitle"),
      tour: t("step5.tour"),
      date: t("step5.date"),
      travelers: t("step5.travelers"),
      language: t("step5.language"),
      destinations: t("step5.destinations"),
      totalPrice: t("step5.totalPrice"),
      notSelected: "Not selected" // Fallback fallback
    }
  };
}
