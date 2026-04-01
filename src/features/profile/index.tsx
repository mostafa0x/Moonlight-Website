"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/shared/hooks/useAuth";
import { useProfileBookings } from "./hooks/use-profile-bookings";
import { BookingCard } from "./components/BookingCard";
import EgyptianLoader from "@/shared/components/EgyptianLoader";
import { useTranslations } from "next-intl";

/**
 * ProfileFeature: The main entry point for the profile page.
 * 
 * Features:
 * - Dynamic booking list segregation (Upcoming vs Past)
 * - Real-time auth state handling
 * - Responsive layout based on Figma designs
 * - Premium feel with subtle hover effects and optimized images
 */
export const ProfileFeature: React.FC = () => {
  const { user, userEmail, userName, signOut, signInWithGoogle, loading: authLoading } = useAuth();
  const { bookings, isLoading: bookingsLoading, cancelBooking, isCancelling, error: bookingsError, refetch } = useProfileBookings();
  const t = useTranslations("profile");

  if (authLoading || bookingsLoading) {
    return <EgyptianLoader />;
  }

  // API Error View
  if (bookingsError) {
    return (
      <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-500/5 blur-[120px] rounded-full" />
        <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-md">
          <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center border border-rose-500/30">
            <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold font-cairo text-white">{t("errorTitle")}</h2>
            <p className="text-slate-400 font-cairo leading-relaxed">
              {t("errorDescription")}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-10 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl font-cairo font-bold hover:bg-zinc-800 transition-all active:scale-95"
          >
            {t("retryButton")}
          </button>
        </div>
      </div>
    );
  }

  // Auth Guard: If not logged in, show restricted view
  if (!user) {
    return (
      <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle Egyptian Themed Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[150px] md:h-[200px] bg-[#F2C975]/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />

        {/* Thematic Pharaonic Card - Ultra Compact for screen fit */}
        <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6 text-center max-w-[380px] w-full bg-neutral-950/90 backdrop-blur-md border-[1.5px] border-[#F2C975]/30 p-6 md:p-8 rounded-[30px] shadow-[0_0_40px_rgba(242,201,117,0.08)]">

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
            <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-[#F2C975] to-transparent" />
            <p className="text-zinc-400 font-cairo text-sm md:text-base italic tracking-wide px-2">
              "Unveil your history and secure your voyage by connecting with your vessel."
            </p>
          </div>

          <button
            onClick={() => signInWithGoogle()}
            className="group relative w-full overflow-hidden px-6 py-3.5 md:py-4 bg-gradient-to-r from-[#8C6D2E] via-[#F2C975] to-[#8C6D2E] text-black rounded-xl font-cairo font-black text-base md:text-lg hover:shadow-[0_0_20px_#F2C975] transition-all duration-300 active:scale-95 mt-1"
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

          <div className="opacity-20 invert brightness-200 grayscale scale-75">
            <img src="/icons/sign-out.svg" className="w-6 h-6" alt="Moonlight Symbol" />
          </div>
        </div>
      </div>
    );
  }

  const upcomingTrips = bookings.filter(b => b.status.toLowerCase() === "upcoming");
  const pastTrips = bookings.filter(b => b.status.toLowerCase() !== "upcoming");

  const avatarSrc = user?.user_metadata?.avatar_url || "/imgs/placeholder.webp";

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-auto scrollbar-custom">
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-10 md:pt-20 pb-40 md:pb-60 flex flex-col gap-10 md:gap-20 px-4">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-zinc-800 shadow-xl shadow-white/5">
              <Image
                src={avatarSrc}
                alt={userName || "Profile"}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-right flex flex-col gap-2">
              <h1 className="text-3xl md:text-4xl font-bold font-cairo uppercase">
                {userName || "USER"}
              </h1>
              <p className="text-slate-400 text-base md:text-lg font-normal font-cairo">
                {userEmail}
              </p>
              {/* Sign Out (Mobile) */}
              <button
                onClick={() => signOut()}
                className="md:hidden mt-2 bg-rose-500 rounded-[10px] px-6 py-2 flex items-center justify-center gap-2.5 hover:bg-rose-600 transition-colors"
              >
                <img src={"/icons/sign-out.svg"} alt="sign out" />
                <span className="text-white text-sm font-normal font-cairo">{t("signOut")}</span>
              </button>
            </div>
          </div>

          {/* Sign Out (Desktop) */}
          <div className="hidden md:flex flex-col gap-4">
            <button
              onClick={() => signOut()}
              className="w-40 h-14 bg-rose-500/40 hover:bg-rose-500 rounded-[20px] flex items-center justify-center gap-2.5 hover:bg-rose-600 transition-shadow shadow-lg shadow-rose-500/20"
            >
              <img src={"/icons/sign-out.svg"} alt="sign out" />
              <span className="text-white text-xl font-normal font-cairo">{t("signOut")}</span>
            </button>
          </div>
        </div>

        {/* Trips Section */}
        <div className="flex flex-col gap-12 md:gap-16">

          {/* Upcoming Trips */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-cairo px-4 md:px-0">
              {t("upcomingTrips")}
            </h2>
            <div className="flex flex-col gap-4 md:px-10">
              {upcomingTrips.length > 0 ? (
                upcomingTrips.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={cancelBooking}
                    isCancelling={isCancelling}
                  />
                ))
              ) : (
                <div className="py-10 text-center text-zinc-600 font-cairo text-lg italic border border-dashed border-zinc-800 rounded-xl">
                  {t("noUpcoming")}
                </div>
              )}
            </div>
          </div>

          {/* Past Trips */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-cairo px-4 md:px-0">
              {t("pastTrips")}
            </h2>
            <div className="flex flex-col gap-4 md:px-10">
              {pastTrips.length > 0 ? (
                pastTrips.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={cancelBooking}
                  />
                ))
              ) : (
                <div className="py-10 text-center text-zinc-600 font-cairo text-lg italic border border-dashed border-zinc-800 rounded-xl">
                  {t("noPast")}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
