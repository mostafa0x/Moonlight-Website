import PeopleCounter from "@/features/booking-modal/components/step2/PeopleCounter";
import TourLanguageSelector from "@/features/booking-modal/components/step2/TourLanguageSelector";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";

export default function Step2() {
  const { step } = useBookingContext();

  return (
    step === 2 && (
      <div className="  ">
        <h1 className="text-base text-[#F2C975] font-medium mb-[16px]">
          Number of Travelers
        </h1>
        <div className="space-y-[8px]">
          <PeopleCounter
            label="Adults"
            hint="Age 12+"
            name="adults"
            pricingTiers={[
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
            ]}
          />
          <PeopleCounter
            label="Children"
            hint="Age 2-11( Kids are 50% off )"
            name="children"
            pricingTiers={[
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
            ]}
          />
          <div className=" relative">
            <h2 className="text-sm text-[#8B8B8B] font-medium mb-[16px]">
              Tour Guide Language
            </h2>
            <TourLanguageSelector />
          </div>
        </div>
      </div>
    )
  );
}
