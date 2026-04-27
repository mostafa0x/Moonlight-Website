import type { PackageDetailsType } from "@/shared/global";
import HeroGallery from "./components/HeroGallery";
import PackageInfo from "./components/PackageInfo";
import OverviewSection from "./components/OverviewSection";
import IncludedExcludedSection from "./components/IncludedExcludedSection";
import ItinerarySection from "./components/ItinerarySection";
import HighlightsSection from "./components/HighlightsSection";
import FAQSection from "./components/FAQSection";
import BookingBar from "./components/BookingBar";

/**
 * PackageDetailsPage — Server Component
 *
 * Architecture:
 * - 100% Server Component for zero client JS overhead
 * - Only BookingBar and accordion components use "use client"
 * - All static content rendered on the server for optimal LCP/FCP
 * - Responsive layout: mobile-first with desktop breakpoints
 */
interface PackageDetailsPageProps {
  pkg: PackageDetailsType;
  locale: string;
}

export default function PackageDetailsPage({
  pkg,
  locale,
}: PackageDetailsPageProps) {
  return (
    <main className="relative min-h-screen flex flex-col pb-60 lg:pb-54">
      {/* Hero Section */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 lg:px-20 pt-12 md:pt-28">
        {/* Package Title & Info */}
        <PackageInfo pkg={pkg} />

        {/* Image Gallery */}
        <HeroGallery image={pkg.packageImage} name={pkg.packageName} />
      </div>

      {/* Content Sections */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-16 lg:px-20 mt-4 flex flex-col gap-3 md:gap-20">
        {/* Overview */}
        <OverviewSection description={pkg.description} />
        {/* Itinerary */}
        <ItinerarySection destinations={pkg.destinations} />

        {/* Included & Excluded */}
        <IncludedExcludedSection
          included={pkg.included}
          excluded={pkg.excluded}
        />


        {/* Highlights */}
        <HighlightsSection />

        {/* FAQ */}
        <FAQSection />
      </div>

      {/* Sticky Booking Bar */}
      <BookingBar
        price={pkg.startingPrice}
        currency={pkg.currency}
        packageId={pkg.packageId}
      />
    </main>
  );
}
