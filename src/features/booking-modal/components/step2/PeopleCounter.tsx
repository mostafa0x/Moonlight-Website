import PeopleCounterItem from "@/features/booking-modal/components/step2/PeopleCounterItem";
import type { PricingTier } from "@/features/booking-modal/types";
import { calculatePrice } from "@/features/booking-modal/utils";
import MinusBtn from "@/shared/button/MinusBtn";
import PlusBtn from "@/shared/button/PlusBtn";
import { memo, useCallback, useEffect } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

function PeopleCounter() {
  const adults = "adults";
  const children = "children";

  const { control, setValue } = useFormContext();
  const adultsValue = useWatch({ control, name: adults, defaultValue: 0 });
  const childrenValue = useWatch({ control, name: children, defaultValue: 0 });
  const pricingTiers = [
    {
      minPax: 1,
      maxPax: 1,
      pricePerPerson: 120,
    },
    {
      minPax: 2,
      maxPax: 3,
      pricePerPerson: 95,
    },
    {
      minPax: 4,
      maxPax: 6,
      pricePerPerson: 80,
    },
    {
      minPax: 7,
      maxPax: 12,
      pricePerPerson: 65,
    },
  ];

  useEffect(() => {
    const childrenPrice = calculatePrice(childrenValue, pricingTiers) / 2;
    const totalPrice = calculatePrice(adultsValue, pricingTiers);
    console.log(childrenValue + " children count");

    console.log(adultsValue + " Adults Count");

    setValue("totalPrice", totalPrice + childrenPrice);
  }, [adultsValue, childrenValue, pricingTiers]);

  return (
    <>
      <PeopleCounterItem label="Adults" hint="Age 12+" name="adults" />
      <PeopleCounterItem
        label="Children"
        hint="Age 2-11( Kids are 50% off )"
        name="children"
      />
    </>
  );
}

export default memo(PeopleCounter);
