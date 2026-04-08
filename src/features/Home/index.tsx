import FooterPage from "@/shared/components/footer";

import type { HomeDataType } from "@/shared/global";
import ScrollContainer from "@/features/home/components/ScrollContainer";
import Section from "@/features/home/components/Section";


import Page1 from "@/features/home/page1";
import GovernorateSections from "@/features/home/components/GovernorateSections";



interface HomeProps {
  data: HomeDataType[];
}

/**
 * Home — Next-Gen Server-First Architecture
 * 
 * Performance gains over previous client-heavy implementation:
 * 1. Zero initial JavaScript for layout (CSS Scroll Snap).
 * 2. 100% Server Rendered HTML for all sections (Better SEO & LCP).
 * 3. Individual Section Hydration: Each section tracks its own visibility
 *    independently via Framer Motion's useInView (IntersectionObserver).
 * 4. Eliminated 'Progressive Hydration' hacks that were blocking the main thread.
 */
function Home({ data }: HomeProps) {
  return (
    <ScrollContainer>
      {/* Section 0: Hero — Always visible on load */}
      <Section id="hero">
        <Page1 />
      </Section>

      {/* Dynamic Data-Driven Sections — Each governorate gets its own Landmark + Packages blocks */}
      <GovernorateSections data={data} />



      {/* Last Section: Footer */}
      <Section id="footer" className="bg-black">
        <FooterPage />
      </Section>
    </ScrollContainer>
  );
}

Home.displayName = "Home";
export default Home;
