import MinusBtn from "@/shared/button/MinusBtn";
import PlusBtn from "@/shared/button/PlusBtn";
import { memo } from "react";

function PeopleCounter({
  label,
  hint,
  count = 1,
}: {
  label: string;
  hint: string;
  count: number;
}) {
  return (
    <div className="flex justify-between items-center bg-[#131313] border border-[#313131] rounded-2xl px-[14px] h-[66px] select-none">
      <div className="flex flex-col ">
        <h2 className="text-base text-white font-medium">{label}</h2>
        <span className="text-sm text-[#8B8B8B] font-medium">{hint}</span>
      </div>
      <div className="flex flex-row gap-[10px]">
        <MinusBtn />
        <span className="text-base text-white font-normal">{count}</span>
        <PlusBtn />
      </div>
    </div>
  );
}

export default memo(PeopleCounter);
