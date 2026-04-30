"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { reviews } from "../data/reviews";
const TOTAL_REVIEWS = 1093;

/**
 * TestimonialsSection Client Component
 * Implements a responsive carousel of traveler reviews.
 */
export default function TestimonialsSection() {
    const t = useTranslations("home.testimonials");
    const [swiper, setSwiper] = useState<any>(null);
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-10 md:px-10 font-jakarta select-none">
            <div className="w-full max-w-275 max-h-[90vh] md:max-h-[85vh] bg-zinc-800/50 rounded-4xl border border-white/5 backdrop-blur-sm flex flex-col overflow-hidden">
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pt-4 md:px-8 md:pt-4 flex flex-col gap-4 md:gap-6">
                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center gap-1 md:gap-1.5">
                        <h2 className="text-lg md:text-2xl font-bold text-neutral-50">
                            <span className="md:hidden text-color-grey-96">{t("mobileTitle")}</span>
                            <span className="hidden md:inline">{t("desktopTitle")}</span>
                        </h2>
                        <p className="text-[10px] md:text-sm text-emerald-50 md:text-gray-200 max-w-75 md:max-w-155">
                            <span className="md:hidden">{t("mobileSubtitle")}</span>
                            <span className="hidden md:inline">{t("desktopSubtitle")}</span>
                        </p>
                    </div>

                    {/* Content Box */}
                    <div className="flex flex-col lg:flex-row items-stretch w-full min-h-0">
                        {/* Visual - High-Quality Image */}
                        <div className="relative flex-1 min-h-75 md:min-h-90   md:h-full rounded-3xl hidden lg:block overflow-hidden">
                            <Image
                                src="/imgs/travelers-at-the-pyramids.webp"
                                alt="Experience Egypt"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                className="object-fill"
                                priority
                            />
                        </div>
                        {/* Testimonial Slider Card */}
                        <div className="relative flex-1 min-h-65 md:min-h-80 bg-zinc-800 rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg overflow-hidden flex flex-col">
                            {/* Card Top Meta */}
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <span className="text-white md:text-pink-50 text-[10px] md:text-xs font-normal">
                                    {TOTAL_REVIEWS} {t("reviews")}
                                </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-white md:text-pink-50 text-[10px] md:text-xs font-normal">
                                        4.93
                                    </span>
                                    <span className="text-yellow-500 text-[10px] md:text-xs">★★★★★</span>
                                </div>
                            </div>
                            {/* Swiper Slider Area */}
                            <div className="flex-1 min-h-0">
                                <Swiper
                                    modules={[Navigation]}
                                    onSwiper={setSwiper}
                                    className="h-full w-full"
                                    loop={true}
                                    spaceBetween={30}
                                >
                                    {reviews.map((review) => (
                                        <SwiperSlide key={review.id} className="flex flex-col h-full bg-transparent">
                                            <div className="flex flex-col gap-4 md:gap-6">
                                                {/* Avatar */}
                                                <img src={"/icons/quote.webp.svg"} alt="quote" className="w-9 h-9" />
                                                {/* Review Text */}
                                                <p className="text-emerald-50 md:text-white text-sm md:text-base font-normal">
                                                    "{review.text}"
                                                </p>
                                                {/* Author Info */}
                                                <div className="flex flex-col">
                                                    <h4 className="text-white text-sm md:text-xl font-bold leading-tight">
                                                        {review.name}
                                                    </h4>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            {/* Navigation Buttons */}
                            <div className="absolute right-6 bottom-6 md:right-10 md:bottom-10 flex gap-2 md:gap-4 z-10">
                                <div
                                    onClick={() => swiper?.slidePrev()}
                                    className="w-8 h-8 md:w-12 md:h-12 bg-neutral-900 rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center cursor-pointer hover:bg-neutral-950 transition-all active:scale-95 border border-white/5"
                                >
                                    <span className="text-orange-300 md:text-white text-lg md:text-2xl select-none">‹</span>
                                </div>
                                <div
                                    onClick={() => swiper?.slideNext()}
                                    className="w-8 h-8 md:w-12 md:h-12 bg-neutral-900 rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center cursor-pointer hover:bg-neutral-950 transition-all active:scale-95 border border-white/5"
                                >
                                    <span className="text-orange-300 md:text-white text-lg md:text-2xl select-none">›</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TripAdvisor Partner Badge Area (Always at bottom) */}
                <div className="w-full flex justify-center py-4 md:py-6">
                    <div className="px-3 py-1 sm:px-5 sm:py-3 bg-color-white-solid rounded-2xl shadow-[0px_12px_32px_0px_rgba(15,23,42,0.12)] flex justify-start items-center gap-3">
                        <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-neutral-100 rounded-[19px] overflow-hidden p-1">
                            <img
                                src="/icons/TripAdvisor.svg"
                                alt="TripAdvisor"
                                className="object-contain w-10 h-10 sm:w-14 sm:h-14"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col leading-tight">
                                <span className="text-color-cyan-35 text-base font-bold leading-5 md:leading-7">{t("tripAdvisor")}</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-color-grey-53 text-base font-normal leading-5 md:leading-7">4.93/5 </span>
                                    <span className="text-yellow-500 text-base font-normal leading-5 md:leading-7">★★★★★</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
