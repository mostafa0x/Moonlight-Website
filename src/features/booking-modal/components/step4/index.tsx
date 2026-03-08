import BookingSummary from "@/features/booking-modal/components/step4/BookingSummary";
import PaymentMethod from "@/features/booking-modal/components/step4/PaymentMethod";
import PromoCode from "@/features/booking-modal/components/step4/PromoCode";
import { memo } from "react";

function Step4() {
  return (
    <div>
      <BookingSummary />
      <div className="mt-[8px]">
        <PromoCode />
      </div>
      <div className="mt-[19px]">
        <PaymentMethod />
      </div>
    </div>
  );
}

export default memo(Step4);
