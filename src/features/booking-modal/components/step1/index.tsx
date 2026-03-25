import BookNowBtn from "@/features/booking-modal/components/step1/BookNowBtn";
import Destinations from "@/features/booking-modal/components/step1/Destinations";
import Included_Excluded from "@/features/booking-modal/components/step1/Included_Excluded";
import Overview from "@/features/booking-modal/components/step1/Overview";
import { memo } from "react";

function Step1({included,excluded,destinations,description}:{
  included:string[]
  excluded:string[]
  destinations:string[]
  description:string
}) {
  return (
    <div className="flex flex-col w-full ">
      <div className="mb-3">
        <Overview
          description={description}
        />
      </div>
      <div className="mb-5">
        <Destinations
          destinations={destinations}
        />
      </div>
      <div>
        <Included_Excluded included={included} excluded={excluded} />
      </div>
      <div className=" absolute bottom-4.5 right-6.75 md:right-9">
        <div className="flex justify-end pt-4.25">
          <BookNowBtn />
        </div>
      </div>
    </div>
  );
}
export default memo(Step1);
