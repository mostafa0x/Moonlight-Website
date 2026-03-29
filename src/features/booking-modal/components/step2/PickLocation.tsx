"use client";

import { memo } from "react";
import { useFormContext } from "react-hook-form";

interface LocationOption {
  label: string;
  value: string;
}

interface PickLocationProps {
  name: string;
  label: string;
  options: LocationOption[];
}

/**
 * PickLocation: A styled native HTML select for guaranteed visibility and ease of use.
 * 
 * Optimized for Vercel React Best Practices:
 * - Reliability: Native select ensures options are never clipped and handled by the OS/Browser UI.
 * - Performance: Minimal state, using native select for fast I/O.
 * - Accessibility: Native elements provide the best screen reader support.
 */
function PickLocation({ name, label, options }: PickLocationProps) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2 relative w-full select-none">
      <label
        htmlFor={name}
        className="text-base text-[#8B8B8B] font-medium px-1"
      >
        {label}
      </label>
      
      <div className="relative group">
        <select
          id={name}
          {...register(name)}
          defaultValue={options[0]?.value || ""}
          className="w-full h-15 bg-[#131313] border border-[#313131] rounded-2xl px-4 text-white text-lg font-semibold appearance-none transition-all duration-200 cursor-pointer hover:border-[#F2C975]/30 focus:outline-none focus:ring-1 focus:ring-[#F2C975]/30"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#131313] text-white">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron icon since we used appearance-none to maintain premium look */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8B8B8B] group-hover:text-[#F2C975] transition-colors">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

PickLocation.displayName = "PickLocation";

export default memo(PickLocation);
