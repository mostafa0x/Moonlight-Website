import Link from "next/link";
import { getTranslations } from "next-intl/server";
import FooterPage from "@/shared/components/footer";
import Section from "@/features/home/components/Section";

export default async function PaymentSuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bookingModal.payment.success" });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative overflow-hidden mt-20">
      {/* Success Card */}
      <div className="relative flex flex-col items-center justify-center h-auto max-h-[85dvh] w-full max-w-[90%] sm:max-w-md md:max-w-lg bg-[#0D0D0D] border-2 border-[#F2C975]/30 rounded-3xl md:rounded-4xl px-4 py-5 md:py-8 text-center shadow-[0_20px_60px_-15px_rgba(242,201,117,0.15)] animate-in zoom-in-95 duration-700 overflow-y-auto scrollbar-hide">
        {/* Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-1 bg-[#F2C975] blur-md opacity-40 rounded-full" />

        {/* Animated Icon */}
        <div className="relative mb-3 inline-block">
          <div className="absolute inset-0 bg-[#F2C975]/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-12 h-12 md:w-16 md:h-16 bg-[#1A1A1A] border-2 border-[#F2C975] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(242,201,117,0.3)]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 text-[#F2C975] animate-in slide-in-from-bottom-2 duration-700" fill="none" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-lg sm:text-xl md:text-2xl text-[#F2C975] font-serif tracking-widest uppercase mb-1 [text-shadow:0_0_15px_rgba(242,201,117,0.3)] px-2">
          {t("title")}
        </h1>
        <p className="text-[#A1A1A1] text-[9px] md:text-xs tracking-[0.2em] uppercase font-medium mb-3 md:mb-4 px-2">
          {t("subtitle")}
        </p>

        <div className="w-10 md:w-16 h-0.5 bg-[#F2C975]/30 mx-auto mb-2 md:mb-4 rounded-full" />

        <p className="text-[#8B8B8B] text-[11px] md:text-sm leading-relaxed max-w-xs mx-auto mb-4 md:mb-6 px-1">
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
      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
