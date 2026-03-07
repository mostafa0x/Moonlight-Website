import Link from "next/link";
import { memo } from "react";

function NextStepBtn({ nextStep }: { nextStep: string }) {
  return (
    <Link
      href={nextStep}
      aria-label="next step button"
      className="w-[139px] h-[41px] bg-[#F2C975] hover:bg-[#887142] rounded-[10px] flex flex-row gap-2 items-center justify-center"
    >
      <span className="text-sm text-black font-semibold">Next</span>
      <img src={"/icons/arrow-right.svg"} alt="arrow icon" />
    </Link>
  );
}

export default memo(NextStepBtn);
