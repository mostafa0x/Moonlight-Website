"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import BaseIconButton from "./BaseIconButton";

interface MinusBtnProps {
  callback: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * MinusBtn Component
 * Optimized interactive button for decrementing or removing items.
 * 
 * Best Practices:
 * - Uses BaseIconButton for logic reuse and design consistency.
 * - Memoized to prevent re-renders when parent state changes.
 * - Semantic button typing and accessibility attributes.
 */
function MinusBtn({ callback, disabled, className }: MinusBtnProps) {
  return (
    <BaseIconButton
      onClick={callback}
      disabled={disabled}
      ariaLabel="minus button"
      className={cn(
        "hover:bg-[#747171] focus:ring-zinc-500/50",
        className
      )}
    >
      <span className="text-lg font-bold leading-none -translate-y-px" aria-hidden="true">-</span>
    </BaseIconButton>
  );
}

MinusBtn.displayName = "MinusBtn";

export default memo(MinusBtn);
