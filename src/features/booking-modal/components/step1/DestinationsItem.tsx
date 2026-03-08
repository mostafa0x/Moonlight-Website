import { memo } from "react";

function DestinationsItem({ title }: { title: string }) {
  return (
    <div className="flex items-center w-fit bg-[#171717] border border-[#343434] rounded-[20px] gap-[7px] p-[7px] pr-[19px] select-none container">
      <img src="/icons/location-outlined.svg" alt="location" />
      <span className="text-[14px] text-white font-medium whitespace-nowrap">
        {title}
      </span>
    </div>
  );
}

export default memo(DestinationsItem);
