import { memo } from "react";

function Included_Excluded_Item({
  title,
  icon,
}: {
  title: string;
  icon: "red" | "green";
}) {
  return (
    <div
      className="flex flex-row items-center gap-3.5 select-none  "
      title={title}
    >
      <img
        src={`/icons/ellipse-${icon}.svg`}
        alt="ellipse icon"
        className="w-1.75 h-1.75"
      />
      <span className="text-sm text-[#E0E0E0] font-medium">{title}</span>
    </div>
  );
}

export default memo(Included_Excluded_Item);
