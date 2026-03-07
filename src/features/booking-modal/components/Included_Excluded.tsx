import Included_Excluded_Item from "@/features/booking-modal/components/Included_Excluded_Item";
import { memo } from "react";

function Included_Excluded({
  included = [],
  excluded = [],
}: {
  included: string[];
  excluded: string[];
}) {
  return (
    <div className="flex flex-row justify-between gap-[50px] select-none">
      <div className="w-full min-h-[150px] h-fit bg-[#131313] border border-[#313131] px-[23px] py-[15px] rounded-[20px]">
        <div className="flex flex-row gap-[5px] mb-[19px] items-center">
          <img src={"/icons/check.svg"} alt="check icon" />
          <h2 className="text-[16px] text-[#00D26A] font-medium">Included</h2>
        </div>
        <div className="flex flex-col gap-[7px]">
          {included.map((item) => (
            <Included_Excluded_Item key={item} title={item} icon="green" />
          ))}
        </div>
      </div>
      <div className="w-full min-h-[150px] h-fit bg-[#131313] border border-[#313131] px-[23px] py-[15px] rounded-[20px]">
        <div className="flex flex-row gap-[5px] mb-[19px]">
          <img src={"/icons/minus.svg"} alt="minus icon" />
          <h2 className="text-[16px] text-[#FF5454] font-medium">Excluded</h2>
        </div>
        <div className="flex flex-col gap-[7px]">
          {excluded.map((item) => (
            <Included_Excluded_Item key={item} title={item} icon="red" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Included_Excluded);
