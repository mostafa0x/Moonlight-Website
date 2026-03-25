import PeopleCounterItem from "@/features/booking-modal/components/step2/PeopleCounterItem";
import { memo } from "react";

function PeopleCounter() {
  return (
    <>
      <PeopleCounterItem
        label="Adults"
        hint="Age 12+"
        name="adultsNumber"
      />
      <PeopleCounterItem
        label="Children"
        hint="Age 2-11( Kids are 50% off )"
        name="kidsNumber"
      />
    </>
  );
}

export default memo(PeopleCounter);
