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
            <div className="w-32 h-11 px-2 py-3.5 bg-black/70 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center gap-2">
                <img src="/icons/flame.svg" alt="" className="w-4.25 h-5.25" />
                <div className="flex flex-col justify-center text-left">
                    <span className="text-white text-base font-bold font-cairo leading-none">
                        {t("bestSeller")}
                    </span>
                    <span className="text-orange-500 text-base font-semibold font-cairo leading-none">
                        1.1k
                    </span>
                </div>
            </div>
        </div>
    );
}

export default memo(BestSeller);

