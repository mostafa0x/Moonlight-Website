import DestinationsItem from "@/features/booking-modal/components/DestinationsItem";
import { memo } from "react";

function Destinations({ destinations }: { destinations: string[] }) {
  return (
    <>
      <h2 className="text-[20px] text-[#F2C975] font-medium">Destinations</h2>
      <div className="flex flex-row gap-[7px]  ">
        {destinations.map((item) => (
          <DestinationsItem key={item} title={item} />
        ))}
      </div>
    </>
  );
}

export default memo(Destinations);
