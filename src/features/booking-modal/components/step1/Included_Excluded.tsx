import Included_Excluded_Item from "@/features/booking-modal/components/step1/Included_Excluded_Item";
import useDragScroll from "@/shared/hooks/useDragScroll";
import { memo } from "react";

function Included_Excluded({
  included = [],
  excluded = [],
}: {
  included: string[];
  excluded: string[];
}) {
  const { ref, events } = useDragScroll("Y");
  return (
    <div className="w-full h-75 md:h-85 xl:h-70 bg-[#131313] border border-[#313131] p-2.5 rounded-[20px]">
      <div
        ref={ref}
        {...events}
        className="h-full overflow-y-auto scrollbar-custom pr-1.5 cursor-grab active:cursor-grabbing "
      >
        <div className="grid grid-cols-2 px-5 gap-4 select-none">
          <div className="flex flex-row gap-1.25 mb-4.75 items-center">
            <img src={"/icons/check.svg"} alt="check icon" />
            <h2 className="text-base text-[#00D26A] font-medium">Included</h2>
          </div>

          <div className="flex flex-row gap-1.25 mb-4.75 items-center">
            <img src={"/icons/minus.svg"} alt="minus icon" />
            <h2 className="text-base text-[#FF5454] font-medium">Excluded</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-5">
          <div className="space-y-2.5">
            {included.length <= 0 && (
              <span className="text-gray-500 text-sm">
                Empty
              </span>
            )}
            {included.map((item, index) => (
              <Included_Excluded_Item key={index} title={item} icon={"green"} />
            ))}
          </div>
          <div className="space-y-2.5">
            {excluded.length <= 0 && (
              <span className="text-gray-500 text-sm">
                Empty
              </span>
            )}
            {excluded.map((item, index) => (
              <Included_Excluded_Item key={index} title={item} icon={"red"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Included_Excluded);
