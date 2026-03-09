import BookNowBtn from "@/features/booking-modal/components/step1/BookNowBtn";
import Destinations from "@/features/booking-modal/components/step1/Destinations";
import Included_Excluded from "@/features/booking-modal/components/step1/Included_Excluded";
import Overview from "@/features/booking-modal/components/step1/Overview";
import { memo } from "react";

function Step1() {
  return (
    <div className="flex flex-col w-full ">
      <div className="mb-3">
        <Overview
          description="Experience the majesty of the ancient world with our exclusive VIP tour
        Experience the majesty of the ancient world with our exclusive VIP tour"
        />
      </div>
      <div className="mb-5">
        <Destinations
          destinations={[
            "Giza",
            "Cairo",
            "Alexandria",
            "Luxor",
            "Aswan",
            "Sharm El Sheikh",
            "Hurghada",
            "Marsa Alam",
            "Dahab",
            "Nuweiba",
            "Taba",
            "Siwa Oasis",
            "Fayoum",
            "Ain Sokhna",
            "Port Said",
            "Ismailia",
            "Suez",
            "El Gouna",
            "Safaga",
            "El Quseir",
            "Abu Simbel",
            "Kom Ombo",
            "Edfu",
            "Minya",
            "Sohag",
            "Qena",
          ]}
        />
      </div>
      <div>
        <Included_Excluded included={[]} excluded={[]} />
      </div>
      <div className=" absolute bottom-4.5 right-6.75 md:right-9">
        <div className="flex justify-end pt-4.25">
          <BookNowBtn />
        </div>
      </div>
    </div>
  );
}
export default memo(Step1);
