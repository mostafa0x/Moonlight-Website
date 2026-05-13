"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  onConfirm: (reason: string) => void;
  onClose: () => void;
  isPending: boolean;
}

const ConfirmationModal = ({ onConfirm, onClose, isPending }: Props) => {
  const t = useTranslations("profile.bookingCard");
  const [reason, setReason] = useState("");

  // Securely access translation strings with fallbacks
  const reasonLabel = t.has("cancelModal.reasonLabel")
    ? t("cancelModal.reasonLabel")
    : "Cancellation Reason";
  const reasonPlaceholder = t.has("cancelModal.reasonPlaceholder")
    ? t("cancelModal.reasonPlaceholder")
    : "Please provide a reason for cancellation (min. 10 characters)...";

  const isReasonValid = reason.trim().length >= 10;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-500">
      <div className="relative w-full max-w-105 bg-neutral-950/95 border-[1.5px] border-[#F2C975]/30 rounded-[30px] p-8 md:p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#F2C975] to-transparent opacity-60" />

        <div className="flex flex-col items-center gap-6 text-center">
          {/* Protective Eye Icon placeholder behavior */}
          <div className="relative group">
            <div className="absolute inset-0 bg-[#F2C975]/10 blur-xl rounded-full scale-110" />
            <svg viewBox="0 0 100 100" className="relative w-20 h-20 fill-none stroke-[#F2C975] stroke-2 opacity-80" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 Q50 15 90 50 Q50 85 10 50 Z" />
              <circle cx="50" cy="50" r="10" />
              <path d="M40 70 L40 85 M60 65 Q75 85 90 80" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl md:text-3xl font-bold font-cairo text-[#F2C975] uppercase tracking-wider">
              {t("cancelModal.title")}
            </h3>
            <div className="h-px w-20 mx-auto bg-linear-to-r from-transparent via-[#F2C975]/40 to-transparent" />
            <p className="text-zinc-400 font-cairo text-sm md:text-base italic leading-relaxed">
              "{t("cancelModal.message")}"
            </p>
          </div>

          {/* Reason Input Area */}
          <div className="w-full flex flex-col gap-2 text-left mt-2">
            <div className="flex justify-between items-center px-1">
              <label htmlFor="cancellation-reason" className="text-xs md:text-sm font-cairo font-semibold text-[#F2C975]/90 uppercase tracking-wide">
                {reasonLabel}
              </label>

            </div>
            <textarea
              id="cancellation-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isPending}
              placeholder={reasonPlaceholder}
              rows={3}
              className="w-full bg-neutral-900/60 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 text-sm font-cairo outline-none focus:border-[#F2C975]/60 focus:ring-1 focus:ring-[#F2C975]/30 transition-all duration-300 resize-none disabled:opacity-50"
            />
            {!isReasonValid && reason.trim().length > 0 && (
              <p className="text-xs font-cairo text-rose-400/90 px-1 animate-in fade-in duration-200">
                {t.has("cancelModal.reasonMinLength") ? t("cancelModal.reasonMinLength") : "Minimum 10 characters required"}
              </p>
            )}
          </div>

          <div className="flex flex-col w-full gap-4 mt-2">
            <button
              onClick={() => isReasonValid && onConfirm(reason.trim())}
              disabled={isPending || !isReasonValid}
              className="relative overflow-hidden w-full py-4 bg-rose-500/10 border border-rose-500/40 text-rose-500 rounded-2xl font-cairo font-black text-lg hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 shadow-lg shadow-rose-500/5 cursor-pointer disabled:opacity-40 disabled:hover:bg-rose-500/10 disabled:hover:text-rose-500 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>PROCESSING...</span>
                  </>
                ) : (
                  <span>{t("cancelModal.confirm")}</span>
                )}
              </div>
            </button>

            <button
              onClick={onClose}
              disabled={isPending}
              className="w-full py-3 text-zinc-500 font-cairo font-semibold text-base hover:text-[#F2C975] transition-colors duration-300 uppercase tracking-widest cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {!isPending && t("cancelModal.cancel")}
            </button>
          </div>
        </div>

        {/* Thematic Corners */}
        <div className="absolute bottom-4 right-4 text-white/5 font-serif text-sm pointer-events-none">𓂀</div>
        <div className="absolute top-4 left-4 text-white/5 font-serif text-sm pointer-events-none">𓋹</div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
