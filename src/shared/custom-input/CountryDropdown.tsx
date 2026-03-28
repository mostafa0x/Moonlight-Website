"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import useClickOutside from "@/shared/hooks/useClickOutside";
import { Country } from "./types";

interface CountryDropdownProps {
  onSelect: (c: Country) => void;
  placeholder: string;
  selectedCode?: string;
  selectedName?: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  search: string;
  setSearch: (s: string) => void;
  filteredCountries: Country[];
  customTrigger?: React.ReactNode;
}

const CountryDropdown = memo(({
  onSelect,
  placeholder,
  selectedCode,
  selectedName,
  isOpen,
  setIsOpen,
  search,
  setSearch,
  filteredCountries,
  customTrigger
}: CountryDropdownProps) => {
  const { containerRef } = useClickOutside(() => {
    setIsOpen(false);
    setSearch("");
  });

  return (
    <div ref={containerRef} className={cn("relative", !customTrigger && "w-full")}>
      {customTrigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{customTrigger}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-[#313131] bg-[#131313] px-4 text-sm text-white transition-all hover:border-[#F2C975]"
        >
          <span className={cn(!(selectedName || selectedCode) && "text-[#4b4b4b]")}>
            {selectedName || placeholder}
          </span>
          <img
            src="/icons/arrow-down.svg"
            className={cn("w-2.5 transition-transform duration-300", isOpen && "rotate-180")}
            alt=""
          />
        </button>
      )}

      {isOpen && (
        <div className="absolute top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-[#313131] bg-[#1a1a1a]/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 border-b border-[#313131]">
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-[#313131] bg-[#131313] px-3 py-2 text-xs text-white focus:border-[#F2C975] focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-60 overflow-y-auto scrollbar-hide">
            {filteredCountries.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => onSelect(c)}
                className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-xs text-white transition-colors hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{c.emoji}</span>
                  <span>{c.name}</span>
                </div>
                <span className="font-mono text-[#8B8B8B]">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

CountryDropdown.displayName = "CountryDropdown";

export default CountryDropdown;
