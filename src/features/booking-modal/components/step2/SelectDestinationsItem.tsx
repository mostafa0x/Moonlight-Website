import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";

function SelectDestinationsItem({ label }: { label: string }) {
  const { control } = useFormContext();
  const {
    field: { value = "none", onChange },
  } = useController({
    name: "destinations",
    control,
    defaultValue: "none",
  });
  const isChecked = value === label;

  const handleClick = () => {
    value === label ? onChange("none") : onChange(label);
  };
  return (
    <button
      aria-label="select destinations"
      onClick={handleClick}
      className="flex flex-row items-center p-[6px] h-[41px] w-fit bg-[#131313] border border-[#313131] rounded-[5px] gap-[6px] select-none cursor-pointer"
    >
      {isChecked ? (
        <img src={"/icons/check-box.svg"} alt="check-box icon" />
      ) : (
        <div className="w-[19px] h-[19px] bg-white rounded-[5px]" />
      )}
      <span className="text-sm text-white truncate ">{label}</span>
    </button>
  );
}
export default memo(SelectDestinationsItem);
