import CloseBtn from "@/shared/button/CloseBtn";
import Image from "next/image";

export default function BookingModal() {
  return (
    <div className="fixed inset-0 z-9999 over flex items-center justify-center bg-black/50 pt-[32px] pb-[64px]">
      <div className=" relative w-[628px] h-full rounded-[20px] bg-black overflow-hidden">
        <div>
          <div className=" absolute right-2.75 top-1.25 z-2">
            <CloseBtn />
          </div>
          <div className="relative w-[630px] h-[209px] z-1">
            <div className="absolute  bottom-0 left-0  text-white z-3 px-[17px] py-[15px]">
              <h1 className="text-2xl text-white font-bold">
                Giza All-Inclusive VIP Tour
              </h1>
              <div className="flex flex-row gap-[22px] mt-[7px] items-center">
                <span className="text-[20px] text-[#F2C975] font-medium">
                  100$
                </span>
                <div className="flex flex-row gap-[6px] w-full items-center">
                  <img src={"/icons/group.svg"} alt="group icon" />
                  <span className="text-[14px] text-[#00D26A] font-medium">
                    More people, less price
                  </span>
                </div>
              </div>
            </div>
            <div className=" absolute inset-0 w-full h-full bg-linear-to-b from-transparent to-black to-95% z-2" />
            <Image
              src={"/packages/gize/package1.png"}
              alt="modal img"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="px-[21px] py-[16px]">
          {/* دي تاني حاجه  */}
          <div>
            <h2 className="text-[20px] text-[#F2C975] font-medium">Overview</h2>
            <p className="text-[16px] text-[#E0E0E0] font-medium">
              Experience the majesty of the ancient world with our exclusive VIP
              tour of the Giza Plateau. Enjoy skip-the-line access, a private
              Egyptologist guide, and a luxurious camel ride at sunset.
            </p>
          </div>
          <div>
            <h2 className="text-[20px] text-[#F2C975] font-medium mb-3">
              Destinations
            </h2>
            <div className=" ">
              <div className="flex flex-row w-fit bg-[#171717] border border-[#343434] rounded-[20px] gap-[7px]  p-[7px] pr-[10px] select-none">
                <img src={"/icons/location-outlined.svg"} alt="location" />
                <span className="text-[14px] text-[#FFFFFF] font-medium">
                  Giza Pyramids
                </span>
              </div>
            </div>
          </div>
          BookingModal
        </div>
      </div>
    </div>
  );
}
