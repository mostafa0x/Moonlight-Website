import PaymentMethodCard from "@/features/booking-modal/components/step4/PaymentMethodCard";
import { memo } from "react";

function PaymentMethod() {
  return (
    <div>
      <h1 className="text-base text-[#F2C975] font-medium">Payment Method</h1>
      <div className="flex flex-row justify-between gap-5.5 mt-5.5">
        <PaymentMethodCard type="card" isActive />
        <PaymentMethodCard type="cash" isActive={false} />
      </div>
    </div>
  );
}

export default memo(PaymentMethod);
