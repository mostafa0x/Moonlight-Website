"use client";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { FullPage } from "react-abohook-fullpage";

import type { HomeDataType } from "@/shared/global";

// Dynamic imports — only loaded when sections scroll into view area.
// SSR disabled because these components use browser-only APIs (IntersectionObserver, etc.)
const LandMarks = dynamic(() => import("@/features/home/land-marks"), {
  ssr: false,
});
const PackagesPage = dynamic(() => import("@/features/home/packages-page"), {
  ssr: false,
});

interface GovernorateSectionsProps {
  data: HomeDataType[];
  currentPage: number;
}

/**
 * GovernorateSections
 * Renders the dynamic Landmarks + Packages section pairs for each governorate.
 *
 * Memoised to prevent re-rendering when only the parent's `currentPage` changes
 * without affecting the section that's actually in view.
 *
 * The `sections` useMemo avoids re-creating the flatMap array on every render —
 * the data prop is stable (comes from SSR) so this only computes once.
 */
function GovernorateSections({ data, currentPage }: GovernorateSectionsProps) {
  const sections = useMemo(
    () =>
      data.flatMap((section) => ({
        key: section.name,
        section,
      })),
    [data]
  );

  return (
    <>
      {sections.map(({ key, section }) => (
        // Each governorate produces 2 FullPage.Sections: Landmarks + Packages
        <GovernorateBlock
          key={key}
          section={section}
          currentPage={currentPage}
        />
      ))}
    </>
  );
}

GovernorateSections.displayName = "GovernorateSections";
export default memo(GovernorateSections);

// ─── Inner Block ────────────────────────────────────────────────────────────────

interface GovernorateBlockProps {
  section: HomeDataType;
  currentPage: number;
}

/**
 * GovernorateBlock
 * A single governorate's Landmarks + Packages pair wrapped in FullPage.Section.
 *
 * Memoised so that a page change only re-renders the block whose `isInView`
 * boolean actually flipped, not every block in the list.
 */
const GovernorateBlock = memo(function GovernorateBlock({
  section,
  currentPage,
}: GovernorateBlockProps) {
  return (
    <>
      <FullPage.Section>
        <LandMarks
          currentPage={currentPage}
          landmarks={section.landmarks}
          titleHeader={section.name}
          page={section.page}
        />
      </FullPage.Section>

      <FullPage.Section>
        <PackagesPage
          currentPage={currentPage}
          packages={section.packages}
          titleHeader={section.name}
          page={section.page + 1}
        />
      </FullPage.Section>
    </>
  );
});

GovernorateBlock.displayName = "GovernorateBlock";
