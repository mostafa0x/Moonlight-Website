import HeaderModal from "@/features/booking-modal/components/HeaderModal";
import CloseBtn from "@/shared/button/CloseBtn";
import Step1 from "@/features/booking-modal/components/step1";
import StepsInfo from "@/features/booking-modal/components/StepsInfo";

export default function BookingModal() {
  return (
    <div className="fixed inset-0 z-9999 over flex items-center justify-center bg-black/50 modal-fade-up pt-[32px] pb-[24px]">
      <div className=" relative w-[628px] h-full rounded-[20px] bg-black overflow-hidden">
        <div>
          <div className=" absolute right-2.75 top-1.25 z-2">
            <CloseBtn />
          </div>
          <HeaderModal
            titleTour="Giza All-Inclusive VIP Tour"
            price="100"
            image="/packages/gize/package1.png"
          />
        </div>
        <div>
          <StepsInfo />
        </div>
        <div className="px-[21px] py-[16px]">
          <Step1 />
        </div>
      </div>
    </div>
  );
}
