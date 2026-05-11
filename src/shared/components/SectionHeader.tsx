import { memo } from "react";

interface SectionHeaderProps {
  title: string;
}

/**
 * SectionHeader Component
 * A reusable, performant header with responsive positioning.
 */
const SectionHeader = memo(({ title }: SectionHeaderProps) => {
  return (
    <h1 className="w-full text-center text-white text-2xl md:text-3xl font-bold z-50">
      {title}
    </h1>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
