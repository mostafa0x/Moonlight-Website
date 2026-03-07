import { memo } from "react";

function MinusBtn() {
  return (
    <button
      aria-label="minus button"
      className="flex flex-row justify-center items-center bg-[#262626] w-[26px] h-[26px] rounded-full select-none cursor-pointer"
    >
      -
    </button>
  );
}

export default memo(MinusBtn);
