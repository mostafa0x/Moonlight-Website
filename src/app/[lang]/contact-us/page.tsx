import CustomTextarea from "@/features/booking-modal/components/step3/CustomTextarea";
import CustomInput from "@/shared/custom-input";

export default function page() {
  return (
    <div className="flex justify-center items-center w-full h-full pt-20 px-6.25 pb-7.5">
      <div className="flex flex-col h-full px-6.25 py-9 gap-3 md:gap-6 bg-black w-107 md:w-157 rounded-[20px]">
        <h1 className="text-white text-center font-bold text-4xl mb-5.5">
          Contact <span className="text-[#F2C975]">Us</span>
        </h1>
        <h2 className="text-[#8B8B8B] text-center font-medium text-base px-7.5 lg:px-20">
          Reach out to our concierge team to begin planning your bespoke
          Egyptian adventure.
        </h2>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-43.75">
          <a
            href="tel:0212031212"
            className="flex items-center gap-3.5 mt-3.5 text-[#8B8B8B] font-medium text-[14px] hover:text-white transition-colors"
          >
            <img src="/icons/phone.svg" alt="phone" />
            <span>0212031212</span>
          </a>

          <a
            href="mailto:echo@gmail.com"
            className="flex items-center gap-3.5 mt-3.5 text-[#8B8B8B] font-medium text-[14px] hover:text-white transition-colors"
          >
            <img src="/icons/mail.svg" alt="email" />
            <span>echo@gmail.com</span>
          </a>
        </div>
        <div className="space-y-5.25">
          <div className="flex flex-row gap-2.5 ">
            <CustomInput
              label={"First Name "}
              name={"firstName"}
              type={"text"}
              placeholder={"fris tName"}
            />
            <CustomInput
              label={"Last Name"}
              name={"lastName"}
              type={"text"}
              placeholder={"las tName"}
            />
          </div>
          <CustomInput
            label={"Last Name"}
            name={"lastName"}
            type={"text"}
            placeholder={"las tName"}
          />
          <CustomTextarea
            name={"message"}
            label={"message"}
            placeholder={"enter any message"}
          />
          <button
            aria-label=" send message contact us"
            className="bg-[#F2C975] hover:bg-[#b69555] text-base rounded-[10px] px-6 py-1.75 cursor-pointer text-black font-medium"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
