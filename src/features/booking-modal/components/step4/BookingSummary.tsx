import BookingSummaryItem from "@/features/booking-modal/components/step4/BookingSummaryItem";
import { memo } from "react";

function BookingSummary() {
  return (
    <div className="flex flex-col justify-between bg-[#131313] border border-[#313131] w-full h-[258px] rounded-[5px] px-[15px] py-[6px] ">
      <div>
        <h1 className="text-base text-[#F2C975] font-medium">
          Booking Summary
        </h1>
        <div className="mt-[11px] space-y-[15px]">
          <BookingSummaryItem
            label="tour"
            hint="Museum or Civilization Museum"
          />
          <BookingSummaryItem label="Date" hint="25/1/2030" />
          <BookingSummaryItem label="Travelers" hint="1 Adults, 0 Children" />
          <BookingSummaryItem label="Guide Language" hint="English" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center border-t pt-[11px]">
        <h2 className="text-base text-[#8B8B8B]">Total Price</h2>
        <span className="text-[20px] text-[#F2C975] font-medium">100$</span>
      </div>
    </div>
  );
}

export default memo(BookingSummary);
