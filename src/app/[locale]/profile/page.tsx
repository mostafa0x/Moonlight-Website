import React, { Suspense } from 'react';
import { ProfileFeature } from '@/features/profile';
import { Metadata } from 'next';
import { createClient } from '@/shared/lib/supabase-server';
import { Booking } from '@/features/profile/types';
import EgyptianLoader from '@/shared/components/EgyptianLoader';

export const metadata: Metadata = {
  title: 'My Profile | Moonlight Egypt',
  description: 'Manage your upcoming and past Egyptian adventures with Moonlight.',
};

/**
 * ProfilePage: Server-First Dashboard
 * 
 * Performance Benefits (Next.js 16):
 * - TTFB: Fast server-side logic with optimized Supabase client.
 * - LCP: Above-the-fold content (Header + First Booking) is server-rendered.
 * - FCP: No client-side JS needed for initial paint.
 * - INP: Granular client components (buttons) for minimal main-thread blocking.
 */
export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const user = session?.user ?? null;

  // Data pre-fetching on the server
  const fetchBookings = async (): Promise<Booking[]> => {
    if (!session) return [];

    try {
      const response = await fetch("https://moonlight-steel.vercel.app/api/bookings", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        cache: 'no-store', // Dynamic data per user
      });

      if (!response.ok) return [];

      const result = await response.json();
      console.log(result);

      const rawData = result.data || [];

      // Mapping logic moves to the server (0% client JS penalty)
      return rawData.map((item: any) => ({
        id: item.id,
        packageName: item.package_name || "Moonlight Experience",
        tourDate: item.tour_date,
        tourTime: item.tour_time || "09:00 AM",
        status: item.status,
        paymentType: item.due_amount === 0 ? "full" : "deposit",
        price: item.total_amount,
        currency: item.currency || "$",
        imageUrl: item.image_url || "/imgs/placeholder.webp",
        ticketUrl: item.ticket_url,
      })) as Booking[];
    } catch (error) {
      console.error("Server-side Fetching Error (Bookings):", error);
      return [];
    }
  };

  // Parallelize Data Fetching (if more requests added)
  const bookings = await fetchBookings();

  return (
    <main className="w-full min-h-screen bg-black pt-20">
      <Suspense fallback={<EgyptianLoader />}>
        {/* ProfileFeature is now a Server Component */}
        <ProfileFeature bookings={bookings} user={user} />
      </Suspense>
    </main>
  );
}
