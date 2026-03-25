"use client";
import { memo } from "react";

function PlusBtn({
  callback,
  disabled,
}: {
  callback: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      aria-label="plus button"
      className={`flex flex-row justify-center items-center w-[26px] h-[26px] rounded-full select-none transition-colors ${
        disabled
          ? "bg-[#1f1f1f] text-[#4d4d4d] cursor-not-allowed"
          : "bg-[#262626] hover:bg-[#05703b] text-white cursor-pointer"
      }`}
    >
      +
    </button>
  );
}

export default memo(PlusBtn);
