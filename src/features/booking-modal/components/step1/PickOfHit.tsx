import { memo } from "react";

function PickOfHit() {
  return (
    <div className="bg-[#131313] w-full h-[100px] border border-[#F2C975] rounded-[20px] space-y-[5px] pl-[12px] py-[12px]">
      <div className="flex flex-row gap-1.5 items-center">
        <img
          src={"/icons/importend.svg"}
          alt="icon"
          className="w-[18px] h-[18px]"
        />
        <span className="text-base text-[#F2C975] font-medium">
          Important Information
        </span>
      </div>
      <div className="flex flex-row gap-1.5 items-center">
        <img
          src={"/icons/location-outlined.svg"}
          alt="icon"
          className="w-[16px] h-[16px]"
        />
        <span className="text-[12px] text-white font-medium">
          Pickup and drop-off extra charge outside supported areas (Old Cairo,
          Downtown Cairo, Giza).
        </span>
      </div>
      <div className="flex flex-row gap-1.5 items-center">
        <img src={"/icons/time.svg"} alt="icon" className="w-[16px] h-[16px]" />
        <span className="text-sm text-white font-medium">
          Tour times start from 9:00 AM and end at 5:00 PM maximum.
        </span>
      </div>
    </div>
  );
}

export default memo(PickOfHit);
