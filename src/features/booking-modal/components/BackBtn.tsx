import Link from "next/link";
import { memo } from "react";

function BackBtn({ prevStep }: { prevStep: string }) {
  return (
    <Link
      href={prevStep}
      aria-label=" prev step button"
      className="flex flex-row gap-3"
    >
      <img src={"/icons/arrow-left.svg"} alt="arrow icon" />
      <span className="text-sm text-[#8B8B8B] font-semibold">Back</span>
    </Link>
  );
}

export default memo(BackBtn);
