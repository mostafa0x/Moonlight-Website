import clsx from "clsx";
import { memo } from "react";

function StepsInfoItem({ id, step }: { id: number; step: number }) {
  const isActive = step > id;
  return (
    <div className="flex flex-row  items-center">
      <div
        className={clsx(
          "flex w-4.5 h-4.5 rounded-full items-center justify-center",
          !isActive && "border border-[#F2C975]",
        )}
      >
        {!isActive ? (
          <span className="text-[12px] text-[#F2C975] font-medium">{id}</span>
        ) : (
          <img src={"/icons/check-fill.svg"} alt="check icon" />
        )}
      </div>
      {id < 4 && (
        <div
          className={clsx(
            "bg-[#F2C975] w-22.5 sm:w-34 outline-1",
            isActive ? "outline-[#F2C975]" : "outline-[#343434]",
          )}
        />
      )}
    </div>
  );
}

export default memo(StepsInfoItem);
