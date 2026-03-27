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
      className={`text-2xl md:text-4xl font-bold mb-6 text-center font-cairo text-[#F2C975] select-none transition-all duration-700 ease-in-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {title}
    </h1>
  );
}

export default memo(PackageSectionHeader);
