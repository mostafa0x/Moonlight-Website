import SelectDestinationsItem from "@/features/booking-modal/components/step2/SelectDestinationsItem";
import { memo } from "react";

function SelectDestinations() {
  return (
    <div className="mb-[25px] md:mb-[5px]">
      <h2 className="text-base text-[#F2C975] font-medium">
        Select Destinations
      </h2>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-[10px] my-[5px] ">
        <SelectDestinationsItem label="Grand Egyptian Museum" />
        <SelectDestinationsItem label="Museum or Civilization Museum" />
      </div>
    </div>
  );
}
export default memo(SelectDestinations);
