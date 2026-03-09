import { memo } from "react";

function PromoCode() {
  return (
    <div className=" space-y-5.5">
      <h2 className="text-base text-[#F2C975] font-medium">Promo Code</h2>
      <div className="flex flex-row gap-3">
        <input
          placeholder="ENTER CODE"
          type="text"
          className="bg-[#131313] border border-[#313131] rounded-[5px] text-[12px] text-[#8B8B8Bpx] px-3.75 py-1.5 w-full"
        />
        {/* <button
          aria-label="apply button"
          className="w-[84px] h-[32px] bg-[#131313] hover:bg-[#575555] rounded-[5px] border border-[#F2C975] text-[12px] text-[#F2C975]"
        >
          Apply
        </button> */}
      </div>
    </div>
  );
}
export default memo(PromoCode);
