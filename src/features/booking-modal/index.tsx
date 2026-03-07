import BookNowBtn from "@/features/booking-modal/components/BookNowBtn";
import Destinations from "@/features/booking-modal/components/Destinations";
import HeaderModal from "@/features/booking-modal/components/HeaderModal";
import Included_Excluded from "@/features/booking-modal/components/Included_Excluded";
import Overview from "@/features/booking-modal/components/Overview";
import PickOfHit from "@/features/booking-modal/components/PickOfHit";
import CloseBtn from "@/shared/button/CloseBtn";
import Image from "next/image";

export default function BookingModal() {
  return (
    <div className="fixed inset-0 z-9999 over flex items-center justify-center bg-black/50 pt-[32px] pb-[24px]">
      <div className=" relative w-[628px] h-full rounded-[20px] bg-black overflow-hidden">
        <div>
          <div className=" absolute right-2.75 top-1.25 z-2">
            <CloseBtn />
          </div>
          <HeaderModal />
        </div>
        <div className="px-[21px] py-[16px]">
          <Overview />
          <Destinations />
          <Included_Excluded />
          <PickOfHit />
          <BookNowBtn />
        </div>
      </div>
    </div>
  );
}
