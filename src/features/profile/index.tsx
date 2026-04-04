import React from "react";
import { Booking } from "./types";
import { BookingCard } from "./components/BookingCard";
import { ProfileHeader } from "./components/ProfileHeader";
import { LoginGateway } from "./components/LoginGateway";
import { getTranslations } from "next-intl/server";
import { User } from "@supabase/supabase-js";

interface ProfileFeatureProps {
  bookings: Booking[];
  user: User | null;
}

/**
 * ProfileFeature: A high-performance Server Component for the profile dashboard.
 * 
 * Optimized for Next.js 16 (Server-First Architecture):
 * - 100% Server Rendered by default.
 * - Minimal Client Hydration.
 * - Optimized Data Waterfalls (data is passed from page).
 */
export const ProfileFeature: React.FC<ProfileFeatureProps> = async ({ bookings, user }) => {
  const t = await getTranslations("profile");

  if (!user) {
    return <LoginGateway />;
  }

  // Sort logic on the server to save client CPU
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.tourDate).getTime();
    const dateB = new Date(b.tourDate).getTime();
    return dateB - dateA;
  });

  return (
    <div className="h-screen w-full  text-white overflow-y-auto scrollbar-custom">
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-10 md:pt-20 pb-40 md:pb-60 flex flex-col gap-10 md:gap-20 px-4">
        {/* Profile Header (Server Component) */}
        <ProfileHeader user={user} />

        {/* Trips Section */}
        <div className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl font-bold font-cairo px-4 md:px-0">
              {t("myBookings")}
            </h2>
            <div className="flex flex-col gap-4 md:px-10">
              {sortedBookings.length > 0 ? (
                sortedBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                  />
                ))
              ) : (
                <div className="py-10 text-center text-zinc-600 font-cairo text-lg italic border border-dashed border-zinc-800 rounded-xl">
                  {t("noBookings")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
