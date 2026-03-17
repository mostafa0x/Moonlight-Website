import { memo } from "react";

function CustomInput({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: "text" | "date" | "tel";
  placeholder: string;
}) {
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
        className="bg-[#131313] border border-[#313131] w-full h-8 rounded-[5px] px-3.75 py-1.5 text-sm text-[#8B8B8B] font-medium"
        name={name}
        placeholder={placeholder}
        type={type}
        min={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}

export default memo(CustomInput);
