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
    <div className="flex flex-col gap-[4px]">
      <label
        className="text-[12px] text-[#8B8B8B] font-medium select-none"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        aria-label={`${label} input`}
        className="bg-[#131313] border border-[#313131] w-full h-[32px] rounded-[5px] px-[15px] py-[6px] text-[12px] font-medium"
        name={name}
        placeholder={placeholder}
        type={type}
        min={new Date().toISOString().split("T")[0]}
      />
    </div>
  );
}

export default memo(CustomInput);
