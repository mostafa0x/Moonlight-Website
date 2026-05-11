"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";

/**
 * BestSeller Component
 * 
 * A high-conversion, premium badge for top-performing tour packages.
 * Features a "fiery" aesthetic with glassmorphism, gradients, and subtle animations.
 * Optimized for performance using React.memo and minimal client-side logic.
 */
function BestSeller() {
    const t = useTranslations("home");

    return (
        <div
            className="absolute left-3 top-3 lg:top-5 z-20 pointer-events-none select-none"
            aria-label="Best Seller Badge"
        >
            <div className="relative flex items-center group">
                {/* Ambient Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-600/30 via-red-600/20 to-transparent rounded-full blur-xl animate-pulse" />

                {/* Main Badge Container */}
                <div className="relative flex items-center gap-2.5 bg-black/60 backdrop-blur-xl border border-white/20 pl-2 pr-4 py-1.5 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Fiery Icon Wrapper */}
                    <div className="relative">
                        {/* Inner Icon Glow */}
                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-40 animate-ping" />

                        <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 via-orange-500 to-yellow-400 shadow-lg border border-white/20">
                            <span className="text-lg">🔥</span>
                        </div>
                    </div>

                    {/* Badge Text Content */}
                    <div className="flex flex-col">
                        <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-[0.15em] text-white/80 leading-none">
                            {t("bestSeller")}
                        </span>
                        <div className="mt-0.5 flex items-center gap-1.5">
                            <span className="font-cairo text-sm lg:text-base font-bold text-orange-400 leading-tight">
                                1.2K
                            </span>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default memo(BestSeller);

