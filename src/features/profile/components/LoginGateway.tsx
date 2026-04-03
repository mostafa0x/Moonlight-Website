import React from "react";
import { LoginButton } from "./LoginButton";

/**
 * LoginGateway: A Server Component for the restricted profile access view.
 * 
 * Optimized for:
 * - 0% Client JS for the descriptive and themed elements.
 * - Maximum performance using server-side rendering for complex SVG/Layout.
 */
export const LoginGateway: React.FC = () => {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle Egyptian Themed Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-62.5 md:w-100 h-37.5 md:h-50 bg-[#F2C975]/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />

      {/* Thematic Pharaonic Card */}
      <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 text-center max-w-95 w-full bg-neutral-950/90 backdrop-blur-md border-[1.5px] border-[#F2C975]/30 p-6 md:p-8 rounded-[30px] shadow-[0_0_40px_rgba(242,201,117,0.08)]">
        {/* Eye of Horus Icon - Minimalist */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#F2C975]/20 blur-xl rounded-full scale-110 group-hover:bg-[#F2C975]/30 transition-all duration-1000" />
          <svg
            viewBox="0 0 100 100"
            className="relative w-16 h-16 md:w-20 md:h-20 group-hover:scale-105 transition-transform duration-700 brightness-110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 50 Q25 15 50 15 Q75 15 90 50 Q75 85 50 85 Q25 85 10 50Z" stroke="#F2C975" strokeWidth="3" />
            <circle cx="50" cy="50" r="10" fill="#F2C975" />
            <path d="M40 70 L40 85" stroke="#F2C975" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 65 Q75 85 90 80" stroke="#F2C975" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2 md:gap-4">
          <h2 className="text-2xl md:text-3xl font-bold font-cairo uppercase tracking-[0.2em] text-[#F2C975]">
            Moonlight Gateway
          </h2>
          <div className="h-px w-24 md:w-32 bg-linear-to-r from-transparent via-[#F2C975] to-transparent" />
          <p className="text-zinc-400 font-cairo text-sm md:text-base italic tracking-wide px-2">
            "Unveil your history and secure your voyage by connecting with your vessel."
          </p>
        </div>

        <LoginButton />

        <div className="opacity-20 invert brightness-200 grayscale scale-75">
          <img src="/icons/sign-out.svg" className="w-6 h-6" alt="Moonlight Symbol" />
        </div>
      </div>
    </div>
  );
};
