import { memo } from "react";

function PackageSectionHeader({
  title,
  isInView,
}: {
  title: string;
  isInView: boolean;
}) {
  return (
    <h1
      className={`text-2xl md:text-4xl font-bold mb-6 text-center font-cairo text-[#F2C975] select-none ${isInView && "animate-fade-up"} animate-ease-in-out animate-duration-2500`}
    >
      {title}
    </h1>
  );
}

export default memo(PackageSectionHeader);
