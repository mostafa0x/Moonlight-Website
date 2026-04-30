import type { HomeDataType } from "@/shared/global";
import Section from "@/features/home/components/Section";
import HeroSection from "@/features/home/hero-section/index";
import HomeClientContent from "./components/HomeClientContent";

interface HomeProps {
  data: HomeDataType[];
  locale: string;
}

/**
 * Home — Performance-Optimized Hybrid Architecture
 */
function Home({ data, locale }: HomeProps) {
  return (
    <HomeClientContent
      data={data}
      heroSection={
        <Section id="hero">
          <HeroSection locale={locale} />
        </Section>
      }
    />
  );
}

Home.displayName = "Home";
export default Home;
