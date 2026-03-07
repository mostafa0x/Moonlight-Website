"use client";

import { memo, useEffect, useRef, useState } from "react";

const options = ["English", "Spinach", "French", "ital"];

function TourLanguageSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("English");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-[#131313] text-[20px] text-white font-semibold cursor-pointer w-full h-[66px] rounded-[16px] border border-[#313131] pl-[14px] pr-[40px] flex items-center"
      >
        {value}
      </button>

      <img
        src="/icons/arrow-down.svg"
        className={`absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />

      <div
        className={`
        absolute top-[-20px] w-full bg-[#131313] border border-[#313131] rounded-[16px] overflow-hidden z-50
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
              setValue(item);
              setOpen(false);
            }}
            className="px-[14px] py-[16px] text-white text-[18px] cursor-pointer hover:bg-[#1f1f1f] transition-colors"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TourLanguageSelector);
