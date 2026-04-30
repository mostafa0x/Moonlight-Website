"use client";

import dynamic from "next/dynamic";
import Section from "./Section";
import ScrollContainer from "./ScrollContainer";
import type { HomeDataType } from "@/shared/global";
import { ReactNode } from "react";

// Deferred components for client-side only loading (ssr: false)
const LandMarks = dynamic(() => import("@/features/home/land-marks/index"), {
  loading: () => <div className="h-full w-full bg-zinc-900/10 animate-pulse" />,
  ssr: false
});

const PackagesPage = dynamic(() => import("@/features/home/packages-page/index"), {
  loading: () => <div className="h-full w-full bg-zinc-900/10 animate-pulse" />,
  ssr: false
});

const Testimonials = dynamic(() => import("@/features/testimonials"), {
  ssr: false
});

const FooterPage = dynamic(() => import("@/shared/components/footer/index"), {
  ssr: false
});

interface HomeClientContentProps {
  data: HomeDataType[];
  heroSection: ReactNode;
}

/**
 * HomeClientContent Component
 * This is the main client-side wrapper that orchestrates the Swiper scroll.
 * By rendering the ScrollContainer here, we ensure all sections (including 
 * dynamic ones) are direct children of the Swiper, fixing the scroll issue.
 */
export default function HomeClientContent({ data, heroSection }: HomeClientContentProps) {
  return (
    <ScrollContainer>
      {/* 1. Render the Hero Section (passed from server for LCP) */}
      {heroSection}

      {/* 2. Map over governorates and render their slides */}
      {data.flatMap((item, idx) => [
        /* Landmark Slide */
        <Section key={`landmarks-${item.governorate}-${idx}`} id={`landmarks-${item.governorate}`}>
          <LandMarks
            key={`landmarks-comp-${item.governorate}-${idx}`}
            landmarks={item.landmarks}
          />
        </Section>,

        /* Packages Slide */
        <Section key={`packages-${item.governorate}-${idx}`} id={`packages-${item.governorate}`} className="overflow-visible">
          <div className="h-full w-full overflow-visible scrollbar-hide">
            <PackagesPage
              key={`packages-comp-${item.governorate}-${idx}`}
              packages={item.packages}
              titleHeader={item.packageTitle}
            />
          </div>
        </Section>
      ])}

      {/* 3. Social Proof Slide */}
      <Section id="testimonials">
        <Testimonials />
      </Section>

      {/* 4. Footer Slide */}
      <Section id="footer">
        <FooterPage />
      </Section>
    </ScrollContainer>
  );
}
