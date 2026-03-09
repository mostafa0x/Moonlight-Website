import MinusBtn from "@/shared/button/MinusBtn";
import PlusBtn from "@/shared/button/PlusBtn";
import { memo, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";

interface PeopleCounterProps {
  label: string;
  hint: string;
  name: "adults" | "children";
}

function PeopleCounterItem({ label, hint, name }: PeopleCounterProps) {
  const isAdults = name === "adults";
  const { control, setValue } = useFormContext();
  const minLimit = isAdults ? 1 : 0;

  const {
    field: { value = 0, onChange },
  } = useController({
    name,
    control,
    defaultValue: 0,
  });

  const increment = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const decrement = useCallback(() => {
    if (value > minLimit) onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex justify-between items-center bg-[#131313] border border-[#313131] rounded-2xl px-3.5 h-16.5 select-none">
      <div className="flex flex-col">
        <h2 className="text-base text-white font-medium">{label}</h2>
        <span className="text-sm text-[#8B8B8B] font-medium">{hint}</span>
      </div>

      <div className="flex flex-row gap-2.5">
        <MinusBtn callback={decrement} />
        <span className="text-base text-white font-normal">{value}</span>
        <PlusBtn callback={increment} />
      </div>
    </div>
  );
}

export default memo(PeopleCounterItem);
