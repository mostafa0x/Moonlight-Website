import { memo } from "react";

function Included_Excluded() {
  return (
    <div className="flex flex-row justify-between gap-[50px] mb-[14px]">
      <div className="w-full min-h-[150px] h-fit bg-[#131313] border border-[#313131] px-[23px] py-[15px] rounded-[20px]">
        <div className="flex flex-row gap-[5px] mb-[19px] items-center">
          <img src={"/icons/check.svg"} alt="check icon" />
          <h2 className="text-[16px] text-[#00D26A] font-medium">Included</h2>
        </div>
        <div className="flex flex-col gap-[7px]">
          <div className="flex flex-row items-center gap-[14px]">
            <img
              src={"/icons/ellipse-green.svg"}
              alt="ellipse icon"
              className="w-[7px] h-[7px]"
            />
            <span className="text-[14px] text-[#E0E0E0] font-medium">
              Entry tickets to all sites
            </span>
          </div>
          <div className="flex flex-row items-center gap-[14px]">
            <img
              src={"/icons/ellipse-green.svg"}
              alt="ellipse icon"
              className="w-[7px] h-[7px]"
            />
            <span className="text-[14px] text-[#E0E0E0] font-medium">
              Entry tickets to all sites
            </span>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[150px] h-fit bg-[#131313] border border-[#313131] px-[23px] py-[15px] rounded-[20px]">
        <div className="flex flex-row gap-[5px] mb-[19px]">
          <img src={"/icons/check.svg"} alt="check icon" />
          <h2 className="text-[16px] text-[#00D26A] font-medium">Included</h2>
        </div>
        <div className="flex flex-col gap-[7px]">
          <div className="flex flex-row items-center gap-[14px]">
            <img
              src={"/icons/ellipse-green.svg"}
              alt="ellipse icon"
              className="w-[7px] h-[7px]"
            />
            <span className="text-[14px] text-[#E0E0E0] font-medium">
              Entry tickets to all sites
            </span>
          </div>
          <div className="flex flex-row items-center gap-[14px]">
            <img
              src={"/icons/ellipse-green.svg"}
              alt="ellipse icon"
              className="w-[7px] h-[7px]"
            />
            <span className="text-[14px] text-[#E0E0E0] font-medium">
              Entry tickets to all sites
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Included_Excluded);
