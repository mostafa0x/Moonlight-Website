"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";

interface MenuBtnProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * MenuBtn - Interactive hamburger button with Ancient Egyptian flare.
 * Refactored for state management and accessibility.
 */
function MenuBtn({ isOpen, onClick, className }: MenuBtnProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={cn(
        "group relative flex h-11 w-11 select-none flex-col items-center justify-center gap-1.5 rounded-full border border-[#F2C975]/30 bg-black/40 shadow-lg transition-all hover:border-[#F2C975]/60 hover:bg-black/60 active:scale-95 cursor-pointer",
        isOpen && "border-[#F2C975] bg-black/80",
        className
      )}
    >
      {/* Ancient Egyptian Style Lines - transforming into X */}
      <span
        className={cn(
          "block h-0.5 w-6 rounded-full bg-[#F2C975] shadow-sm transition-all duration-500 ease-in-out",
          isOpen ? "translate-y-2 rotate-45" : "group-hover:w-5"
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-4 rounded-full bg-[#F2C975] shadow-sm transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-10 opacity-0" : "group-hover:w-6"
        )}
      />
      <span
        className={cn(
          "block h-0.5 w-6 rounded-full bg-[#F2C975] shadow-sm transition-all duration-500 ease-in-out",
          isOpen ? "-translate-y-2 -rotate-45" : "group-hover:w-4"
        )}
      />

      {/* Decorative Glow */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-[#F2C975]/20 blur-md transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )} />
    </button>
  );
}

export default memo(MenuBtn);
