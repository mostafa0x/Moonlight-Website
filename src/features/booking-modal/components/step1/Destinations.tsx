import DestinationsItem from "@/features/booking-modal/components/step1/DestinationsItem";
import useDragScroll from "@/shared/hooks/useDragScroll";
import clsx from "clsx";
import { memo } from "react";

function Destinations({ destinations }: { destinations: string[] }) {
  const { ref, events } = useDragScroll("X");

  return (
    <div className=" space-y-2.5">
      <h2 className="text-[20px] text-[#F2C975] font-medium">Destinations</h2>
      <div
        ref={ref}
        {...events}
        className={clsx(
          "grid grid-rows-1 grid-flow-col auto-cols-max gap-3.5 scrollbar-custom overflow-x-auto pb-3.75 cursor-grab active:cursor-grabbing scroll-smooth",
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
