"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";

interface SimpleCloseBtnProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

/**
 * SimpleCloseBtn Component
 * A highly optimized close button for modals and overlays.
 * 
 * Best Practices:
 * - Uses React.memo for optimal performance.
 * - Explicitly sets type="button" to prevent accidental form submissions.
 * - Optimized accessible labeling and interactive states.
 */
function SimpleCloseBtn({ onClick, className }: SimpleCloseBtnProps) {
  return (
    <button
      type="button"
      aria-label="close modal"
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F2C975]/50 active:scale-95",
        className
      )}
    >
      <img
        src="/icons/close.svg"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
    </button>
  );
}

SimpleCloseBtn.displayName = "SimpleCloseBtn";

export default memo(SimpleCloseBtn);
