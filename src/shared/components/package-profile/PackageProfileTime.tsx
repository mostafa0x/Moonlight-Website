import clsx from "clsx";
import { memo } from "react";

function PackageProfileTime({
  time = "UpComing",
}: {
  time: "Cancelled" | "UpComing" | "Completed";
}) {
  return (
    <span
      className={clsx(
        "bg-[#FFB7001A] border px-2.5 rounded-[10px]  text-[15px] flex items-center justify-center ",
        time === "UpComing" &&
          "text-[#FFB700] bg-[#FFB7001A] border border-[#FFB700]",
        time === "Cancelled" &&
          "text-[#FF5454] bg-[#FF54541A] border border-[#FF5454]",
        time === "Completed" &&
          "text-[#8B8B8B] bg-[#3131311A] border border-[#8B8B8B]",
      )}
    >
      {time}
    </span>
  );
}

export default memo(PackageProfileTime);
