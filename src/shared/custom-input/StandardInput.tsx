"use client";

import { memo, useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import FieldWrapper from "./FieldWrapper";

const StandardInput = ({ label, name, type, placeholder, error, register }: any) => {
  const minDate = useMemo(() => {
    if (type !== "date") return undefined;
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, [type]);

  return (
    <FieldWrapper label={label} name={name} error={error}>
      <input
        id={name} type={type} {...register(name)}
        className={cn("bg-[#131313] border w-full h-10 rounded-lg px-4 text-sm font-medium text-white transition-all outline-none", 
          error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]",
          type === "date" && "[&::-webkit-calendar-picker-indicator]:invert-[1] cursor-pointer"
        )}
        placeholder={placeholder} autoComplete="off" min={minDate}
        onKeyDown={(e) => type === "date" && e.preventDefault()}
        onClick={(e) => type === "date" && e.currentTarget.showPicker()}
      />
    </FieldWrapper>
  );
};


StandardInput.displayName = "StandardInput";

export default StandardInput;
