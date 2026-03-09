import { memo } from "react";

function DestinationsItem({ title }: { title: string }) {
  return (
    <div className="flex items-center w-32.5 bg-[#171717] border border-[#343434] rounded-[20px] gap-0.75 p-1.75 pr-4.75 select-none container">
      <img src="/icons/location-outlined.svg" alt="location" />
      <span
        className="text-[14px] text-white font-medium whitespace-nowrap"
        title={title}
      >
        {title}
      </span>
    </div>
  );
}

export default memo(DestinationsItem);
