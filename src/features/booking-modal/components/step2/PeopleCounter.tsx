import PeopleCounterItem from "@/features/booking-modal/components/step2/PeopleCounterItem";
import { calculatePrice } from "@/features/booking-modal/utils";
import { memo, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

function PeopleCounter() {
  const adults = "adults";
  const children = "children";

  const { control, setValue } = useFormContext();
  const adultsValue = useWatch({ control, name: adults, defaultValue: 1 });
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
  console.log(childrenValue + " children count");
  console.log(adultsValue + " Adults Count");
  const totalPersons = adultsValue + childrenValue;
  console.log(totalPersons + " TP");

  useEffect(() => {
    const childrenPrice =
      calculatePrice(totalPersons, childrenValue, pricingTiers) / 2;
    const totalPrice = calculatePrice(totalPersons, adultsValue, pricingTiers);

    setValue("totalPrice", totalPrice + childrenPrice);
  }, [totalPersons, pricingTiers]);

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
