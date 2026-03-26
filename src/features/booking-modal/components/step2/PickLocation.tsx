import { useFormContext } from "react-hook-form";
import { memo } from "react";

function PickLocation({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: { label: string; value: string }[];
}) {
  const { register } = useFormContext();
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-base text-[#8B8B8B] font-medium select-none"
      >
        {label}
      </label>
      <select
        aria-label={`${name} select`}
        id={name}
        {...register(name)}
        className="w-full h-[60px] bg-[#131313] border border-[#313131] rounded-[15px] px-3.5 text-white"
        defaultValue={options[0]?.value}
      >
        {options.map((item) => (
          <option
            className="text-[12px] text-white font-medium bg-[#131313]"
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(PickLocation);
