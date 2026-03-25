import CustomTextarea from "@/features/booking-modal/components/step3/CustomTextarea";
import CustomInput from "@/shared/custom-input";

export default function Step4() {
  return (
    <div>
      <h1 className="text-base text-[#F2C975] font-medium">Contact Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] space-x-3 space-y-2.75 mt-3">
        <CustomInput
          label="Full Name"
          name="customerName"
          type="text"
          placeholder="enter your name..."
        />
        <CustomInput
          label="Phone Number"
          name="customerPhone"
          type="tel"
          placeholder="enter your phone number..."
        />
        <CustomInput
          label="Tour Date"
          name="tourDate"
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
      <div className="mt-4">
        <CustomTextarea
          name={"address"}
          label={"Address (Hotel / Local Address)"}
          placeholder={"enter your address..."}
        />
      </div>
    </div>
  );
}
