import { getTranslations } from "next-intl/server";
import ReviewsCarousel from "./ReviewsCarousel";

/**
 * ReviewsSection — Server Component
 *
 * Renders the reviews section with TripAdvisor badge.
 * The carousel slider is a client component for interactivity.
 * Static header content remains server-rendered.
 */
export default async function ReviewsSection() {
  const t = await getTranslations("packageDetails");

  return (
    <section aria-labelledby="reviews-heading">
      <h2
        id="reviews-heading"
        className="text-xl md:text-3xl font-bold text-orange-300 font-cairo mb-4 md:mb-6"
      >
        {t("reviewsTitle")}
      </h2>

      <div className="bg-zinc-800/40 rounded-[28px] backdrop-blur-sm p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h3 className="text-2xl md:text-4xl font-bold text-neutral-50 font-jakarta">
            {t("reviews.title")}
          </h3>
          <p className="text-sm md:text-base text-gray-200 font-jakarta mt-2 max-w-[680px] mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* Reviews Content */}
        <ReviewsCarousel />

        {/* TripAdvisor Badge */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="px-4 py-2 md:px-5 md:py-3 bg-white rounded-2xl shadow-[0px_12px_32px_0px_rgba(15,23,42,0.12)] flex items-center gap-3">
            <div className="relative w-9 h-9 md:w-10 md:h-10 bg-neutral-100 rounded-[19px] overflow-hidden p-1">
              <img
                src="/icons/TripAdvisor.svg"
                alt="TripAdvisor"
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[#00af87] text-sm md:text-base font-bold leading-5 md:leading-7 font-jakarta">
                TripAdvisor
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[#4a4a4a] text-sm md:text-base font-normal leading-5 md:leading-7 font-jakarta">
                  4.9/5
                </span>
                <span className="text-yellow-500 text-sm md:text-base font-normal leading-5 md:leading-7">
                  ★★★★★
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
