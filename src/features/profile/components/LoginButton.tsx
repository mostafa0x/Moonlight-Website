"use client";

import { signInWithGoogle } from "@/shared/lib/supabase";

/**
 * LoginButton: A small Client Component for initiating authentication.
 */
export const LoginButton: React.FC = () => {
  return (
    <button
      onClick={() => signInWithGoogle()}
      className="group relative w-full overflow-hidden px-6 py-3.5 md:py-4 bg-linear-to-r from-[#8C6D2E] via-[#F2C975] to-[#8C6D2E] text-black rounded-xl font-cairo font-black text-base md:text-lg hover:shadow-[0_0_20px_#F2C975] transition-all duration-300 active:scale-95 mt-1"
    >
      <span className="relative flex items-center justify-center gap-3 group-hover:tracking-wider transition-all duration-300">
        <svg className="w-5 h-5 bg-white rounded-full p-1 shadow-sm" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
        SIGN WITH GOOGLE
      </span>
    </button>
  );
};
