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
          <PeopleCounter label="Adults" hint="Age 12+" count={0} />
          <PeopleCounter
            label="Children"
            hint="Age 2-11( Kids are 50% off )"
            count={1}
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
