import DestinationsItem from "@/features/booking-modal/components/step1/DestinationsItem";
import { useDragScroll } from "@/features/booking-modal/hooks";
import clsx from "clsx";
import { memo } from "react";

function Destinations({ destinations }: { destinations: string[] }) {
  const { ref, events } = useDragScroll();

  return (
    <div className=" space-y-2.5">
      <h2 className="text-[20px] text-[#F2C975] font-medium">Destinations</h2>
      <div
        ref={ref}
        {...events}
        className={clsx(
          "grid gap-3.5 scrollbar-custom overflow-x-auto snap-x snap-mandatory lg:snap-none pb-3.75",
          destinations.length > 6
            ? "grid-rows-2 grid-flow-col cursor-grab active:cursor-grabbing scroll-smooth"
            : "grid-cols-4",
        )}
      >
        {destinations.map((item) => (
          <div key={item} className="snap-start">
            <DestinationsItem title={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Destinations);
