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
      className="flex flex-row items-center gap-[14px] select-none  "
      title={title}
    >
      <img
        src={`/icons/ellipse-${icon}.svg`}
        alt="ellipse icon"
        className="w-[7px] h-[7px]"
      />
      <span className="text-sm text-[#E0E0E0] font-medium truncate">
        {title}
      </span>
    </div>
  );
}

export default memo(Included_Excluded_Item);
