import { memo } from "react";

function Destinations() {
  return (
    <div className="mb-[17px]">
      <h2 className="text-[20px] text-[#F2C975] font-medium mb-3">
        Destinations
      </h2>
      <div className=" ">
        <div className="flex flex-row w-fit bg-[#171717] border border-[#343434] rounded-[20px] gap-[7px]  p-[7px] pr-[10px] select-none">
          <img src={"/icons/location-outlined.svg"} alt="location" />
          <span className="text-[14px] text-[#FFFFFF] font-medium">
            Giza Pyramids
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Destinations);
