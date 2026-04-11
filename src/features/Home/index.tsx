import FooterPage from "@/shared/components/footer/index";

import type { HomeDataType } from "@/shared/global";
import ScrollContainer from "@/features/home/components/ScrollContainer";
import Section from "@/features/home/components/Section";
import Page1 from "@/features/home/page1/index";
import LandMarks from "@/features/home/land-marks/index";
import PackagesPage from "@/features/home/packages-page/index";





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
  // 1 (Hero) + (data.length * 2) + 1 (Footer)
  const dotCount = 2 + (data.length * 2);

  return (
    <ScrollContainer dotCount={dotCount}>
      {/* Section 0: Hero — Always visible on load */}
      <Section id="hero">
        <Page1 locale={locale} />
      </Section>

      {/* Dynamic Journey: Each governorate gets its own Landmark and Packages sections */}
      {data.flatMap((item) => [
        /* Landmark Section: Cultural Horizontal Slide */
        <Section key={`landmarks-${item.governorate}`} id={`landmarks-${item.governorate}`}>
          <LandMarks
            landmarks={item.landmarks}
            titleHeader={item.name}
          />
        </Section>,

        /* Packages Section: Vertical Package List */
        <Section key={`packages-${item.governorate}`} id={`packages-${item.governorate}`}>
          <div className="h-full w-full overflow-y-auto pt-10 md:pt-16 px-6 lg:px-20 scrollbar-hide">
            <PackagesPage
              packages={item.packages}
              titleHeader={item.name}
            />
          </div>
        </Section>
      ])}

      {/* Last Section: Footer */}
      <Section id="footer" >
        <FooterPage />
      </Section>
    </ScrollContainer>
  );
}



Home.displayName = "Home";
export default Home;
