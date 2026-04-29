import FooterPage from "@/shared/components/footer/index";
import Section from "@/features/home/components/Section";

import type { HomeDataType } from "@/shared/global";
import ScrollContainer from "@/features/home/components/ScrollContainer";
import Page1 from "@/features/home/page1/index";
import LandMarks from "@/features/home/land-marks/index";
import PackagesPage from "@/features/home/packages-page/index";




import Testimonials from "@/features/testimonials";


interface HomeProps {
  data: HomeDataType[];
  locale: string
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
function Home({ data, locale }: HomeProps) {

  return (
    <ScrollContainer>
      {/* Section 0: Hero — Always visible on load */}
      <Section id="hero">
        <Page1 locale={locale} />
      </Section>

      {/* Dynamic Journey: Each governorate gets its own Landmark and Packages sections */}
      {data.flatMap((item, idx) => [
        /* Landmark Section: Cultural Horizontal Slide */
        <Section key={`landmarks-${item.governorate}-${idx}`} id={`landmarks-${item.governorate}`}>
          <LandMarks
            key={`landmarks-comp-${item.governorate}-${idx}`}
            landmarks={item.landmarks}
          />
        </Section>,

        /* Packages Section: Vertical Package List */
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

      {/* Social Proof: Testimonials Section */}
      <Section id="testimonials">
        <Testimonials />
      </Section>

      {/* Last Section: Footer */}
      <Section id="footer" >
        <FooterPage />
      </Section>
    </ScrollContainer>
  );
}



Home.displayName = "Home";
export default Home;
