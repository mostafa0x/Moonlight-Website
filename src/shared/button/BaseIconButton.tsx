"use client";

import { memo } from "react";
import { cn } from "@/shared/lib/utils";

/**
 * BaseIconButton Interface
 */
export interface BaseIconButtonProps {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel: string;
  children: React.ReactNode;
}

/**
 * BaseIconButton: A reusable, performant icon button base for the entire app.
 * Optimized with React.memo and following Vercel/React best practices.
 */
const BaseIconButton = ({
  onClick,
  disabled,
  className,
  ariaLabel,
  children,
}: BaseIconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full select-none text-white transition-all duration-200 outline-none active:scale-90",
        "bg-[#262626] focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#1f1f1f] disabled:text-[#4d4d4d] disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
};

BaseIconButton.displayName = "BaseIconButton";

export default memo(BaseIconButton);
