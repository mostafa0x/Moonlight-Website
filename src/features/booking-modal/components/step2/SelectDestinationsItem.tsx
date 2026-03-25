import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";

function SelectDestinationsItem({
  label,
  groupId,
  optionId,
  maxSelect,
}: {
  label: string;
  groupId: string;
  optionId: string;
  maxSelect: number;
}) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name: groupId,
    control,
    defaultValue: maxSelect === 1 ? "" : [],
  });

  const isChecked = maxSelect === 1 ? value === optionId : value.includes(optionId);

  const handleClick = () => {
    if (maxSelect === 1) {
      onChange(value === optionId ? "" : optionId);
    } else {
      const newValue = value.includes(optionId)
        ? value.filter((id: string) => id !== optionId)
        : value.length < maxSelect
        ? [...value, optionId]
        : value;
      onChange(newValue);
    }
  };
  return (
    <button
      type="button"
      aria-label="select option"
      onClick={handleClick}
      className="flex flex-row items-center p-1.5 h-10.25 w-fit bg-[#131313] border border-[#313131] rounded-[5px] gap-1.5 select-none cursor-pointer hover:border-[#F2C975] transition-colors"
    >
      {isChecked ? (
        <img src={"/icons/check-box.svg"} alt="check-box icon" />
      ) : (
        <div className="w-4.75 h-4.75 bg-white rounded-[2px]" />
      )}
      <span className="text-sm text-white truncate">{label}</span>
    </button>
  );
}
export default memo(SelectDestinationsItem);
