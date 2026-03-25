import MinusBtn from "@/shared/button/MinusBtn";
import PlusBtn from "@/shared/button/PlusBtn";
import { useCallback, memo } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

interface PeopleCounterProps {
  label: string;
  hint: string;
  name: "adultsNumber" | "kidsNumber";
}

function PeopleCounterItem({ label, hint, name }: PeopleCounterProps) {
  const isAdults = name === "adultsNumber";
  const { control } = useFormContext();
  const minLimit = isAdults ? 1 : 0;
  const maxTotal = 12;

  const adultsValue = useWatch({ control, name: "adultsNumber", defaultValue: 1 });
  const kidsValue = useWatch({ control, name: "kidsNumber", defaultValue: 0 });
  const totalTravelers = adultsValue + kidsValue;

  const {
    field: { value = 0, onChange },
  } = useController({
    name,
    control,
    defaultValue: isAdults ? 1 : 0,
  });

  const increment = useCallback(() => {
    if (totalTravelers < maxTotal) {
      onChange(value + 1);
    }
  }, [value, onChange, totalTravelers]);

  const decrement = useCallback(() => {
    if (value > minLimit) onChange(value - 1);
  }, [value, onChange, minLimit]);

  return (
    <div className="flex justify-between items-center bg-[#131313] border border-[#313131] rounded-2xl px-3.5 h-16.5 select-none">
      <div className="flex flex-col">
        <h2 className="text-base text-white font-medium">{label}</h2>
        <span className="text-sm text-[#8B8B8B] font-medium">{hint}</span>
      </div>

      <div className="flex flex-row gap-2.5">
        <MinusBtn callback={decrement} disabled={value <= minLimit} />
        <span className="text-base text-white font-normal">{value}</span>
        <PlusBtn callback={increment} disabled={totalTravelers >= maxTotal} />
      </div>
    </div>
  );
}

export default memo(PeopleCounterItem);
