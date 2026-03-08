import { memo } from "react";

function CustomTextarea({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className=" space-y-1">
      <label htmlFor="notes" className="text-[12px] text-[#8B8B8B] font-medium">
        {label}
      </label>
      <textarea
        id={name}
        className="w-full bg-[#131313] border border-[#313131] resize-none rounded-[5px] px-[5px]"
        rows={4}
        placeholder={placeholder}
      />
    </div>
  );
}

export default memo(CustomTextarea);
