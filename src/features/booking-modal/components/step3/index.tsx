import CustomTextarea from "@/features/booking-modal/components/step3/CustomTextarea";
import PickLocation from "@/features/booking-modal/components/step3/PickLocation";
import CustomInput from "@/shared/custom-input";
import React from "react";

export default function Step3() {
  return (
    <div>
      <h1 className="text-base text-[#F2C975] font-medium">Contact Details</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 space-x-3 space-y-2.75 mt-3">
        <CustomInput
          label="Full Name"
          name="name"
          type="text"
          placeholder="enter your name..."
        />
        <CustomInput
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="enter your phone number..."
        />
        <CustomInput
          label="Tour Date"
          name="name"
          type="date"
          placeholder="date tour"
        />
        <CustomInput
          label="Nationality"
          name="nationality"
          type="text"
          placeholder="enter your nationality..."
        />
      </div>
      <div className="space-y-2.5">
        <PickLocation
          name="pickup or pick off"
          label="Pickup Location"
          options={["one", "two", "three"]}
        />
        <PickLocation
          name="pickOff"
          label="Pick Off Location"
          options={["one", "two", "three"]}
        />
      </div>
      <div>
        <CustomTextarea
          name={"note"}
          label={"Notes"}
          placeholder={"enter notes"}
        />
      </div>
    </div>
  );
}
