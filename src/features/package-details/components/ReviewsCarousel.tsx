"use client";

import { useRef, memo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const REVIEWS = [
  {
    id: 1,
    text: "The organization was flawless from airport pickup to the very last day. We never had to worry about anything.",
    name: "David",
    title: "Stress-free experience",
  },
  {
    id: 2,
    text: "Our guide made every monument come alive with stories. The kids were captivated the entire trip!",
    name: "Sarah",
    title: "Perfect family trip",
  },
  {
    id: 3,
    text: "Best value for money. The private tour felt truly exclusive. Highly recommend to anyone visiting Egypt.",
    name: "Marco",
    title: "Incredible value",
  },
];

/**
 * ReviewsCarousel — Client Component (minimal scope)
 *
 * Swiper-based carousel for traveler reviews.
 * Only this component is client-side for slider interactivity.
 */
function ReviewsCarousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-4 md:gap-6">
      {/* Image (desktop only) */}
      <div className="relative hidden lg:block flex-1 min-h-[380px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/imgs/travelers-at-the-pyramids.webp"
          alt="Travelers at the Pyramids"
          fill
          sizes="(max-width: 1200px) 50vw, 500px"
          className="object-cover"
        />
      </div>

      {/* Review Card */}
      <div className="relative flex-1 bg-zinc-800 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg flex flex-col">
        {/* Meta */}
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <span className="text-pink-50 text-xs md:text-sm font-normal font-jakarta">
            1093 Reviews
          </span>
          <div className="flex items-center gap-1">
            <span className="text-pink-50 text-xs md:text-sm font-normal font-jakarta">
              4.93
            </span>
            <span className="text-yellow-500 text-xs md:text-sm">★★★★★</span>
          </div>
        </div>

        {/* Swiper */}
        <div className="flex-1 min-h-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="h-full w-full"
            loop={true}
            spaceBetween={30}
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="flex flex-col gap-4 md:gap-6">
                  <img
                    src="/icons/quote.webp.svg"
                    alt=""
                    className="w-8 h-8 md:w-12 md:h-12"
                    aria-hidden="true"
                  />
                  <p className="text-white text-sm md:text-base font-normal font-jakarta leading-relaxed">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex flex-col">
                    <h4 className="text-white text-base md:text-lg font-bold font-jakarta">
                      {review.name}
                    </h4>
                    <span className="text-white/70 text-sm font-normal font-jakarta">
                      {review.title}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            ref={prevRef}
            className="w-10 h-10 bg-neutral-900 rounded-3xl shadow-xl flex items-center justify-center cursor-pointer hover:bg-neutral-950 transition-all active:scale-95 border border-white/5"
            aria-label="Previous review"
          >
            <span className="text-white text-lg select-none">‹</span>
          </button>
          <button
            ref={nextRef}
            className="w-10 h-10 bg-neutral-900 rounded-3xl shadow-xl flex items-center justify-center cursor-pointer hover:bg-neutral-950 transition-all active:scale-95 border border-white/5"
            aria-label="Next review"
          >
            <span className="text-white text-lg select-none">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

ReviewsCarousel.displayName = "ReviewsCarousel";

export default memo(ReviewsCarousel);
