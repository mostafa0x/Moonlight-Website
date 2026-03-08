import SelectDestinationsItem from "@/features/booking-modal/components/step2/SelectDestinationsItem";
import { memo } from "react";

function SelectDestinations() {
  return (
    <div>
      <h2 className="text-base text-[#F2C975] font-medium">
        Select Destinations
      </h2>
      <div className="flex flex-row justify-between items-center gap-[10px] my-[5px]">
        <SelectDestinationsItem label="Grand Egyptian Museum" />
        <SelectDestinationsItem label="Museum or Civilization Museum" />
      </div>
    </div>
  );
}
export default memo(SelectDestinations);
