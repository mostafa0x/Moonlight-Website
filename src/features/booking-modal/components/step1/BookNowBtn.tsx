import Link from "next/link";
import { memo } from "react";

function BookNowBtn({ nextStep }: { nextStep: string }) {
  return (
    <Link
      aria-label="next step button"
      href={nextStep}
      className="w-fit h-fit px-[16px] py-[3px] bg-[#F2C975] hover:bg-[#a88b4f] rounded-[10px] select-none"
    >
      <span className="text-base text-black font-semibold">BOOK NOW</span>
    </Link>
  );
}

export default memo(BookNowBtn);
