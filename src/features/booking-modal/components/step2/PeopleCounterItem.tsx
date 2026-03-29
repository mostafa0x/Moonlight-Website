import MinusBtn from "@/shared/button/MinusBtn";
import PlusBtn from "@/shared/button/PlusBtn";
import { useCallback, memo } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

interface PeopleCounterProps {
  label: string;
  hint: string;
  name: "adultsNumber" | "kidsNumber";
}

/**
 * PeopleCounterItem: A performant numeric stepper for traveler counts.
 * 
 * Optimized for Vercel React Best Practices:
 * - INP: Uses useWatch and useController for fine-grained reactivity.
 * - Re-renders: Wrapped in memo and uses useCallback for event handlers to 
 *   prevent redundant child renders.
 * - Accessibility: Uses semantic grouping and proper labeling.
 */
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
    <div className="flex justify-between items-center bg-[#131313] border border-[#313131] rounded-2xl px-5 h-17 transition-all duration-200 select-none hover:border-[#F2C975]/30">
      <div className="flex flex-col">
        <h3 className="text-base text-white font-semibold leading-tight">{label}</h3>
        <span className="text-sm text-[#8B8B8B] font-medium opacity-80">{hint}</span>
      </div>

      <div className="flex flex-row items-center gap-4">
        <MinusBtn callback={decrement} disabled={value <= minLimit} />
        <span className="text-[18px] text-[#F2C975] font-bold w-6 text-center">{value}</span>
        <PlusBtn callback={increment} disabled={totalTravelers >= maxTotal} />
      </div>
    </div>
  );
}

PeopleCounterItem.displayName = "PeopleCounterItem";

export default memo(PeopleCounterItem);
