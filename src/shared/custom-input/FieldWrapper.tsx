"use client";

import { memo } from "react";

interface FieldWrapperProps {
  label: string;
  name: string;
  error?: any;
  children: React.ReactNode;
}

const FieldWrapper = ({ label, name, error, children }: FieldWrapperProps) => (
  <div className="flex w-full flex-col gap-2">
    <label className="text-sm font-bold text-[#8B8B8B] select-none" htmlFor={name}>
      {label}
    </label>
    {children}
    {error && (
      <span className="text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
        {error.message as string}
      </span>
    )}
  </div>
);

FieldWrapper.displayName = "FieldWrapper";

export default FieldWrapper;

