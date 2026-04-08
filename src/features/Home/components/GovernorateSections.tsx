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
      {data.map((item) => (
        <div key={item.name} className="contents">
          {/* Landmark Sections (Multiple) */}
          <LandMarks
            landmarks={item.landmarks}
            titleHeader={item.name}
          />

          {/* Packages Section */}
          <Section id={`${item.governorate}-packages`}>
            <PackagesPage
              packages={item.packages}
              titleHeader={item.name}
            />
          </Section>
        </div>
      ))}
    </>
  );
}

GovernorateSections.displayName = "GovernorateSections";
export default memo(GovernorateSections);

