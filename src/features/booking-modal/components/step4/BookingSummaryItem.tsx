import { memo } from "react";

function BookingSummary({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <h2 className="text-sm text-[#8B8B8B] font-medium">{label}</h2>
      <span className="text-sm text-white font-medium">{hint}</span>
    </div>
  );
}

export default memo(BookingSummary);
