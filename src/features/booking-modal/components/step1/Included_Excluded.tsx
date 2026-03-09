import Included_Excluded_Item from "@/features/booking-modal/components/step1/Included_Excluded_Item";
import type { Included_ExcludedType } from "@/features/booking-modal/types";
import { memo } from "react";

function Included_Excluded({ data = [] }: { data: Included_ExcludedType[] }) {
  return (
    <div className="flex flex-row justify-between gap-[15px] md:gap-[30px]   select-none">
      {/* <h2 className="text-[20px] text-[#F2C975] font-medium">Overview</h2> */}
      <div className="w-full h-[300px] scrollbar-custom overflow-y-auto snap-y snap-mandatory  md:h-[340px] xl:h-[280px]  bg-[#131313]  border border-[#313131] px-[8px] py-[15px] rounded-[20px]">
        <div className=" flex flex-row justify-evenly gap-[10px]">
          <div className="flex flex-row gap-[5px] mb-[19px] items-center">
            <img src={"/icons/check.svg"} alt="check icon" />
            <h2 className="text-base text-[#00D26A] font-medium">Included</h2>
          </div>
          <span className="text-base text-white"> And </span>
          <div className="flex flex-row gap-[5px] mb-[19px]">
            <img src={"/icons/minus.svg"} alt="minus icon" />
            <h2 className="text-base text-[#FF5454] font-medium">Excluded</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3  gap-[10px] ">
          {data.map((item, index) => (
            <Included_Excluded_Item
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
      {/* <div className="w-full max-h-[37vh] md:max-h-[50vh] bg-[#131313]  border border-[#313131] px-[23px] py-[15px] rounded-[20px]">
        <div className="flex flex-row gap-[5px] mb-[19px]">
          <img src={"/icons/minus.svg"} alt="minus icon" />
          <h2 className="text-base text-[#FF5454] font-medium">Excluded</h2>
        </div>
        <div className="flex flex-col gap-[7px]">
          {excluded.map((item) => (
            <Included_Excluded_Item key={item} title={item} icon="red" />
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default memo(Included_Excluded);
