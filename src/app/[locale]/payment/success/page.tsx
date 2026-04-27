import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function PaymentSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bookingModal.payment.success" });

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Success Card */}
      <div className="relative flex flex-col items-center justify-center min-h-[clamp(450px,65dvh,750px)] w-full max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-2xl bg-[#0D0D0D] border-2 border-[#F2C975]/30 rounded-[30px] md:rounded-[40px] px-6 py-10 md:py-14 text-center shadow-[0_20px_60px_-15px_rgba(242,201,117,0.15)] animate-in zoom-in-95 duration-700">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-1 bg-[#F2C975] blur-md opacity-40 rounded-full" />

        {/* Animated Icon */}
        <div className="relative mb-4 md:mb-5 inline-block">
          <div className="absolute inset-0 bg-[#F2C975]/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#1A1A1A] border-2 border-[#F2C975] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(242,201,117,0.3)]">
            <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-[#F2C975] animate-in slide-in-from-bottom-2 duration-700" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-5xl text-[#F2C975] font-serif tracking-widest uppercase mb-2 [text-shadow:0_0_15px_rgba(242,201,117,0.3)] px-2">
          {t("title")}
        </h1>
        <p className="text-[#A1A1A1] text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium mb-4 md:mb-5 px-4">
          {t("subtitle")}
        </p>

        <div className="w-12 md:w-16 h-0.5 bg-[#F2C975]/30 mx-auto mb-4 md:mb-5 rounded-full" />

        <p className="text-[#8B8B8B] text-sm md:text-base leading-relaxed max-w-sm mx-auto mb-6 md:mb-8 px-2">
          {t("description")}
        </p>

        {/* Back Button */}
        <Link
          href={`/${locale}`}
          className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-3 md:py-3.5 bg-[#F2C975] text-black rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all hover:bg-[#887142] hover:scale-105 active:scale-95 shadow-[0_10px_30px_-5px_rgba(242,201,117,0.4)]"
        >
          <span>{t("button")}</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
