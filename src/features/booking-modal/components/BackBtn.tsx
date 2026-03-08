import { memo } from "react";

function BackBtn({ prevStep }: { prevStep: () => void }) {
  return (
    <button
      onClick={prevStep}
      aria-label=" prev step button"
      className="flex flex-row gap-3 cursor-pointer"
    >
      <img src={"/icons/arrow-left.svg"} alt="arrow icon" />
      <span className="text-sm text-[#8B8B8B] hover:text-gray-300 font-semibold">
        Back
      </span>
    </button>
  );
}

export default memo(BackBtn);
