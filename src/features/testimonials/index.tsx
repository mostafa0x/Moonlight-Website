import TestimonialsSection from "@/features/testimonials/components/TestimonialsSection";

/**
 * Testimonials — Premium Social Proof Section
 * 
 * Architecture:
 * - Server Component by default (Better SEO, minimal initial JS).
 * - Client-side interactivity limited to the Swiper slider.
 * - Optimized asset loading for the main showcase image.
 */
export default async function Testimonials() {
  // In the future, data fetching could happen here:
  // const data = await getTestimonials();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <TestimonialsSection />
    </div>
  );
}
