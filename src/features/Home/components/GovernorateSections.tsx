import { memo } from "react";
import type { HomeDataType } from "@/shared/global";
import LandMarks from "@/features/home/land-marks";
import PackagesPage from "@/features/home/packages-page";
import Section from "@/features/home/components/Section";

interface GovernorateSectionsProps {
  data: HomeDataType[];
}

/**
 * GovernorateSections
 * Renders the dynamic Landmarks + Packages section pairs for each governorate.
 * Optimized for performance using the new Section-based architecture.
 */
function GovernorateSections({ data }: GovernorateSectionsProps) {
  return (
    <>
      {data.flatMap((item) => [
        ...item.landmarks.map((landmark, lIdx) => (
          <LandMarks
            key={`${item.governorate}-landmark-${lIdx}`}
            id={`${item.governorate}-landmark-${lIdx}`}
            landmark={landmark}
            titleHeader={item.name}
            index={lIdx}
            total={item.landmarks.length}
          />
        )),
        <Section 
          key={`${item.governorate}-packages`} 
          id={`${item.governorate}-packages`}
        >
          <PackagesPage
            packages={item.packages}
            titleHeader={item.name}
          />
        </Section>
      ])}
    </>
  );
}


GovernorateSections.displayName = "GovernorateSections";
export default memo(GovernorateSections);

