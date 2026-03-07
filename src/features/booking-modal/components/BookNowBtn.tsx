import { memo } from "react";

function BookNowBtn() {
  return (
    <div className="w-fit h-fit px-[16px] py-[3px] bg-[#F2C975] hover:bg-[#a88b4f] rounded-[10px] select-none cursor-pointer">
      <span className="text-base text-black font-semibold">BOOK NOW</span>
    </div>
  );
}

export default memo(BookNowBtn);
