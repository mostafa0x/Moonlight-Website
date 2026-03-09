import PeopleCounter from "@/features/booking-modal/components/step2/PeopleCounter";
import SelectDestinations from "@/features/booking-modal/components/step2/SelectDestinations";
import TourLanguageSelector from "@/features/booking-modal/components/step2/TourLanguageSelector";
import { useBookingContext } from "@/features/booking-modal/context/BookingContextProvider";

export default function Step2() {
  const { step } = useBookingContext();

  return (
    step === 2 && (
      <div className="  ">
        <SelectDestinations />
        <h1 className="text-base text-[#F2C975] font-medium mb-4">
          Number of Travelers
        </h1>
        <div className="space-y-2">
          <PeopleCounter />
          <div className=" relative">
            <h2 className="text-sm text-[#8B8B8B] font-medium mb-4">
              Tour Guide Language
            </h2>
            <TourLanguageSelector />
          </div>
        </div>
      </div>
    )
  );
}
