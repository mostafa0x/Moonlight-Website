import SelectDestinationsItem from "@/features/booking-modal/components/step2/SelectDestinationsItem";
import { memo } from "react";

function SelectDestinations() {
  return (
    <div className="mb-6.25 md:mb-1.25">
      <h2 className="text-base text-[#F2C975] font-medium">
        Select Destinations
      </h2>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-2.5 my-1.25 ">
        <SelectDestinationsItem label="Grand Egyptian Museum" />
        <SelectDestinationsItem label="Museum or Civilization Museum" />
      </div>
    </div>
  );
}
export default memo(SelectDestinations);
