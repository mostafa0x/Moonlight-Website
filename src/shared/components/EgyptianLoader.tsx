"use client";
import { useTranslations } from "next-intl";

export default function EgyptianLoader() {
  const t = useTranslations("loader");

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-100 w-full bg-black/90 backdrop-blur-md rounded-[20px] overflow-hidden relative select-none">


      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute w-40 h-40 bg-[#F2C975]/15 rounded-full blur-3xl animate-pulse" />

        {/* Spinning Rings - Pharaonic Style */}
        <div className="absolute w-32 h-32 border border-t-[#F2C975] border-r-transparent border-b-[#F2C975]/20 border-l-transparent rounded-full animate-spin animate-duration-[4s]" />
        <div className="absolute w-36 h-36 border border-t-transparent border-r-[#F2C975]/40 border-b-transparent border-l-[#F2C975]/40 rounded-full animate-reverse-spin animate-duration-[3s]" />

        {/* The Eye of Horus - Centerpiece */}
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24 drop-shadow-[0_0_15px_rgba(242,201,117,1)] filter brightness-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Eye Outline */}
          <path
            d="M10 50 Q25 15 50 15 Q75 15 90 50 Q75 85 50 85 Q25 85 10 50Z"
            stroke="#F2C975"
            strokeWidth="3"
            className="animate-pulse"
          />
          {/* Pupil */}
          <circle cx="50" cy="50" r="12" fill="#F2C975">
            <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Egyptian stylistic marks beneath eye */}
          <path
            d="M40 70 L40 90 Q30 90 30 75"
            stroke="#F2C975"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M60 65 Q75 90 90 85"
            stroke="#F2C975"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Orbiting particles */}
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#F2C975] rounded-full -translate-x-1/2 -translate-y-4 shadow-[0_0_8px_#F2C975] animate-spin-orbit" />
        </div>
      </div>

      <div className="mt-12 text-center z-10">
        <h2 className="text-[#F2C975] font-serif tracking-[0.4em] text-xl mb-3 animate-pulse uppercase [text-shadow:0_0_10px_rgba(242,201,117,0.5)]">
          Moonlight
        </h2>
        <p className="text-[#F2C975]/60 text-sm font-medium tracking-widest mt-1">
          {t("unlockingWonders")}
        </p>
        <div className="flex gap-3 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-linear-to-b from-[#F2C975] to-[#8C6D2E] rounded-full animate-bounce shadow-[0_0_5px_#F2C975]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-orbit {
          from { transform: rotate(0deg) translateX(80px); }
          to { transform: rotate(360deg) translateX(80px); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 3s linear infinite;
        }
        .animate-spin-orbit {
          animation: spin-orbit 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
