"use client";
import { useFormContext, useFormState } from "react-hook-form";
import clsx from "clsx";

function CustomTextarea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  const { register, control } = useFormContext();
  const { errors } = useFormState({ control, name: name as any });
  
  const error = errors[name];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label htmlFor={name} className="text-base text-[#8B8B8B] font-medium">
          {label}
        </label>
      </div>
      <textarea
        id={name}
        {...register(name)}
        className={clsx(
          "w-full bg-[#131313] border resize-none rounded-[5px] px-2 py-1.5 text-sm md:text-base text-white transition-colors focus:outline-none",
          error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]",
        )}
        rows={4}
        placeholder={placeholder}
      />
      {error && (
        <span className="text-sm text-red-500 font-medium">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

export default CustomTextarea;
