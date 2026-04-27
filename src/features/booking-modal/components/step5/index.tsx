import BookingSummary from "@/features/booking-modal/components/step4/BookingSummary";
import PaymentMethod from "@/features/booking-modal/components/step4/PaymentMethod";
import PromoCode from "@/features/booking-modal/components/step4/PromoCode";
import { memo } from "react";

function Step5({ pkg }: { pkg: any }) {
  return (
    <div>
      <BookingSummary pkg={pkg} />
      <div className="mt-2">
        <PromoCode />
      </div>
      <div className="mt-2.75">
        <PaymentMethod />
      </div>
    </div>
  );
}

export default memo(Step5);
