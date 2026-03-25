import PackageProfileTime from "@/shared/components/package-profile/PackageProfileTime";
import clsx from "clsx";
import Image from "next/image";
import { memo } from "react";

function PackageProfile() {
  return (
    <div className="flex w-full h-[376px] md:h-[222px]  flex-col md:flex-row bg-[#131313] rounded-[10px] gap-[17px] ">
      <div className="relative h-[136px] md:h-full w-full md:w-[144px] rounded-[10px] overflow-hidden ">
        <Image
          src={"/imgs/placeholder-prolfile.png"}
          alt="loading"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between py-0 lg:py-[17px] px-[17px]">
        <div className=" relative w-full ">
          <div className="flex  flex-row justify-between">
            <div className="flex flex-row w-full justify-between md:justify-start gap-[17px]">
              <h2 className="text-white text-[20px] font-semibold truncate max-w-[500px]">
                title large 123456435 title large 123456435title large
                123456435title large 123456435title large 123456435title large
                123456435
              </h2>

              <PackageProfileTime time={"UpComing"} />
            </div>
            <span className="text-2xl text-white hidden md:block">100$</span>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div>
              <span className="text-[#8B8B8B] mt-1.25 text-base font-semibold">
                Tomorrow, 09:00 AM
              </span>
              <div className="flex flex-row gap-1.5 items-center mt-1.5">
                <img src={"/icons/paymentIcon.svg"} alt="icon" />
                <span className="text-[#8B8B8B] mt-1.25 text-base font-semibold">
                  full Payment
                </span>
              </div>
            </div>
            <span className="text-2xl text-white  md:hidden">100$</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-[15spx] md:justify-between items-center h-full">
          <button className="text-white w-full md:w-fit text-xl font-semibold border md:border-0   border-[##86868B] md:hover:underline underline-offset-2">
            View Ticket
          </button>
          <div className="flex bg-[#7E0000] md:bg-transparent w-full md:w-fit justify-center md:hover:bg-[#FF54541A] items-center flex-row  gap-[10px] px-[10px] py-[13px] rounded-[10px]">
            <img
              src={"/icons/closeIcon.svg"}
              alt="icon"
              className="w-[18px] h-[18px]"
            />
            <button className="text-white text-xl font-semibold">
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PackageProfile);
