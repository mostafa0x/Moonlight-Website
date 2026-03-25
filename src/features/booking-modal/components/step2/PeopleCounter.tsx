import PeopleCounterItem from "@/features/booking-modal/components/step2/PeopleCounterItem";
import { memo } from "react";
import { useTranslations } from "next-intl";

function PeopleCounter() {
  const t = useTranslations("bookingModal.step2");
  return (
    <>
      <PeopleCounterItem
        label={t("adults")}
        hint={t("ageAdult")}
        name="adultsNumber"
      />
      <PeopleCounterItem
        label={t("children")}
        hint={t("ageChild")}
        name="kidsNumber"
      />
    </>
  );
}

export default memo(PeopleCounter);
