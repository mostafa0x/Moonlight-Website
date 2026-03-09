import { memo } from "react";

function PickLocation({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="text-[12px] text-[#8B8B8B] font-medium select-none"
      >
        {label}
      </label>
      <select
        aria-label={`${name} select`}
        id={name}
        className="w-full bg-[#131313] border border-[#313131] rounded-[5px] px-3.5"
        defaultValue={options[0]}
      >
        {options.map((item) => (
          <option className="text-[12px] text-white font-medium" key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(PickLocation);
