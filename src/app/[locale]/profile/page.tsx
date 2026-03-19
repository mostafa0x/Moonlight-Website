import Avatar from "@/shared/components/avatar";

export default function page() {
  return (
    <div className="flex flex-col  justify-center  mt-[105px] px-[350px]">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-row items-center gap-[14px] ">
          <Avatar size={123} />
          <div>
            <div className="flex flex-col">
              <span className="text-white text-4xl">Alex</span>
              <span className="text-[#A3ABC6] text-base">alex@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row rounded-[20px] p-[9px] bg-[#FF545466] hover:bg-[#FF5454]">
          <img src={"/icons/sign-out.svg"} alt="sign-out" />
          <button
            aria-label="sign out button"
            className="text-white text-[20px]"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-[82px]">
        <h1 className="text-white text-4xl font-bold">Upcoming Trips</h1>
      </div>
      <div className="mt-[17px]">
        <h1 className="text-white text-4xl font-bold">Past Trips</h1>
      </div>
    </div>
  );
}
