"use client";
import { memo } from "react";

function PlusBtn({ callback }: { callback: () => void }) {
  return (
    <button
      onClick={callback}
      aria-label="plus button"
      className="flex flex-row justify-center items-center bg-[#262626] hover:bg-[#05703b]  w-[26px] h-[26px] rounded-full select-none cursor-pointer"
    >
      +
    </button>
  );
}

export default memo(PlusBtn);
