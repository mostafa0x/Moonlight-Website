"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";
import BaseIconButton from "./BaseIconButton";

interface PlusBtnProps {
  callback: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * PlusBtn Component
 * Optimized interactive button for incrementing or adding items.
 * 
 * Best Practices:
 * - Uses BaseIconButton for logic reuse and design consistency.
 * - Memoized to prevent re-renders when parent state changes.
 * - Semantic button typing and accessibility attributes.
 */
function PlusBtn({ callback, disabled, className }: PlusBtnProps) {
  return (
    <BaseIconButton
      onClick={callback}
      disabled={disabled}
      ariaLabel="plus button"
      className={cn(
        "hover:bg-emerald-700 focus:ring-emerald-500/50",
        className
      )}
    >
      <span className="text-lg font-bold leading-none -translate-y-px" aria-hidden="true">+</span>
    </BaseIconButton>
  );
}

PlusBtn.displayName = "PlusBtn";

export default memo(PlusBtn);
