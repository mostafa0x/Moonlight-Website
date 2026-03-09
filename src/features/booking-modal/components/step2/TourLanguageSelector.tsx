"use client";

import useClickOutside from "@/shared/hooks/useClickOutside";
import { memo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";

const options = ["English", "Spanish", "French", "Italian"];

function TourLanguageSelector() {
  const [open, setOpen] = useState(false);
  const name = "tourGuideLanguage";
  const { containerRef } = useClickOutside(() => setOpen(false));

  const { control } = useFormContext();
  const {
    field: { value = "English", onChange },
  } = useController({ name, control, defaultValue: "English" });

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#131313] text-[20px] text-white font-semibold cursor-pointer w-full h-16.5 rounded-2xl border border-[#313131] pl-3.5 pr-10 flex items-center"
      >
        {value}
      </button>

      <img
        src="/icons/arrow-down.svg"
        className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />

      <div
        className={`
        absolute -top-5 w-full bg-[#131313] border border-[#313131] rounded-2xl overflow-hidden z-50
        transform transition-all duration-200 origin-top
        ${
          open
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }
      `}
      >
        {options.map((item) => (
          <div
            key={item}
            onClick={() => {
              onChange(item);
              setOpen(false);
            }}
            className="px-3.5 py-4 text-white text-[18px] cursor-pointer hover:bg-[#1f1f1f] transition-colors"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TourLanguageSelector);
