import BookNowBtn from "@/features/booking-modal/components/step1/BookNowBtn";
import Destinations from "@/features/booking-modal/components/step1/Destinations";
import Included_Excluded from "@/features/booking-modal/components/step1/Included_Excluded";
import Overview from "@/features/booking-modal/components/step1/Overview";
import PickOfHit from "@/features/booking-modal/components/step1/PickOfHit";
import { memo } from "react";

function Step1() {
  return (
    <div className="flex flex-col w-full ">
      <div className="mb-3">
        <Overview description="Experience the majesty of the ancient world with our exclusive VIP tour" />
      </div>
      <div className="mb-3 md:mb-[24px]">
        <Destinations destinations={["Giza", "Cairo", "Al2ex", "2312"]} />
      </div>
      <div className="mb-[14px]">
        <Included_Excluded
          included={[
            "sas sdfsd sdfsd fsd2 fsd 1",
            "Entry tiwckets2",
            "x21",
            "sas sasddfsd sdfsd fsd fsd 1",
            "Entry tickets2",
            "x22",
            "sa213s sdfsd sdfsd fsd fsd 1",
          ]}
          excluded={["y"]}
        />
      </div>
      <div className=" absolute bottom-[18px] right-[27px] md:right-[36px]">
        <div className="flex justify-end pt-[17px]">
          <BookNowBtn />
        </div>
      </div>
    </div>
  );
}
export default memo(Step1);
