"use client";
import { useTranslations } from "next-intl";

const ErrorModal = ({ errorKey, onClose }: { errorKey: string; onClose: () => void }) => {
  const t = useTranslations("profile.bookingCard.errorModal");

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-500">
      <div className="relative w-full max-w-105 bg-neutral-950/95 border-[1.5px] border-rose-500/30 rounded-[30px] p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(244,63,94,0.1)] overflow-hidden animate-in zoom-in-95 duration-300 transition-all">
        {/* Thematic Sandstorm/Red Header Decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-rose-500/50 to-transparent opacity-60" />
        
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full scale-125 animate-pulse" />
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/5">
                <span className="text-4xl">🌪️</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl md:text-3xl font-bold font-cairo text-rose-500 uppercase tracking-wider">
              {t("title")}
            </h3>
            <div className="h-px w-20 mx-auto bg-linear-to-r from-transparent via-rose-500/40 to-transparent" />
            <p className="text-zinc-400 font-cairo text-base md:text-lg italic leading-relaxed">
              "{t(`messages.${errorKey}` as any) || t("message")}"
            </p>
          </div>


          <button
            onClick={onClose}
            className="w-full mt-4 py-4 bg-zinc-900 border border-zinc-800 text-[#F2C975] rounded-2xl font-cairo font-black text-lg hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
          >
            {t("close")}
          </button>

        </div>
        
        {/* Thematic Icon Placeholders */}
        <div className="absolute bottom-4 left-4 text-white/5 font-serif text-sm pointer-events-none">𓀾</div>
        <div className="absolute top-4 right-4 text-white/5 font-serif text-sm pointer-events-none">𓁹</div>
      </div>
    </div>
  );
};

export default ErrorModal;
