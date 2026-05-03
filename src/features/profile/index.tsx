import React from "react";
import { Booking } from "./types";
import { BookingCard } from "./components/BookingCard";
import { ProfileHeader } from "./components/ProfileHeader";
import { LoginGateway } from "./components/LoginGateway";
import { getTranslations } from "next-intl/server";
import { User } from "@supabase/supabase-js";
import { CancellationProvider } from "./context/CancellationContext";

interface ProfileFeatureProps {
  bookings: Booking[];
  user: User | null;
  locale: string;
}

/**
 * ProfileFeature: A high-performance Server Component for the profile dashboard.
 * 
 * Optimized for Next.js 16 (Server-First Architecture):
 * - 100% Server Rendered by default.
 * - Minimal Client Hydration.
 * - Optimized Data Waterfalls (data is passed from page).
 */
export async function ProfileFeature({ bookings, user, locale }: ProfileFeatureProps) {
  const t = await getTranslations({ locale, namespace: "profile" });

  if (!user) {
    return <LoginGateway locale={locale} />;
  }

  // Sort logic on the server to save client CPU
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.tourDate).getTime();
    const dateB = new Date(b.tourDate).getTime();
    return dateB - dateA;
  });

  return (
    <div className="w-full text-white">
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-10 md:pt-20 pb-2  flex flex-col gap-10 md:gap-20 px-4">
        {/* Profile Header (Server Component) */}
        <ProfileHeader user={user} />

        {/* Trips Section */}
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-cairo px-4 md:px-0">
              {t("myBookings")}
            </h2>
            <CancellationProvider>
              <div className="flex flex-col gap-4 md:px-10">
                {sortedBookings.length > 0 ? (
                  sortedBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      locale={locale}
                    />
                  ))
                ) : (
                  <div className="py-10 text-center text-white bg-black/30 rounded-br-2xl font-cairo text-lg italic border border-dashed border-zinc-800 rounded-xl">
                    {t("noBookings")}
                  </div>
                )}
              </div>
            </CancellationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
