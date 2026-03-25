import { useFormContext } from "react-hook-form";
import { memo } from "react";
import clsx from "clsx";

function CustomInput({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: "text" | "date" | "tel" | "email";
  placeholder: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="flex w-full flex-col gap-1">
      <label
        className="text-base text-[#8B8B8B] font-medium select-none"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        aria-label={`${label} input`}
        {...register(name)}
        onInput={(e) => {
          if (type === "tel") {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/\D/g, "");
          }
        }}
        className={clsx(
          "bg-[#131313] border w-full h-8 rounded-[5px] px-3.75 py-1.5 text-sm text-[#8B8B8B] font-medium transition-colors focus:outline-none",
          error ? "border-red-500" : "border-[#313131] focus:border-[#F2C975]",
          type === "date" && "[&::-webkit-calendar-picker-indicator]:invert-[1] [&::-webkit-calendar-picker-indicator]:brightness-200 cursor-pointer"
        )}
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        min={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
      />
      {error && (
        <span className="text-sm text-red-500 font-medium">
          {error.message as string}
        </span>
      )}
    </div>
  );
}

export default memo(CustomInput);
