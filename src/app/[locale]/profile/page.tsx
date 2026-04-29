import React, { Suspense } from 'react';
import { ProfileFeature } from '@/features/profile';
import { Metadata } from 'next';
import { createClient } from '@/shared/lib/supabase-server';
import { Booking } from '@/features/profile/types';
import EgyptianLoader from '@/shared/components/EgyptianLoader';
import FooterPage from "@/shared/components/footer/index";
import Section from "@/features/home/components/Section";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'profile' });

  return {
    title: `${t('title')} | Moonlight Egypt`,
    description: t('description'),
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: `${t('title')} | Moonlight Egypt`,
      description: t('description'),
      type: 'website',
    }
  };
}

/**
 * ProfilePage: Server-First Dashboard
 * 
 * Performance Benefits (Next.js 16):
 * - TTFB: Fast server-side logic with optimized Supabase client.
 * - LCP: Above-the-fold content (Header + First Booking) is server-rendered.
 * - FCP: No client-side JS needed for initial paint.
 * - INP: Granular client components (buttons) for minimal main-thread blocking.
 */

const fetchBookings = async (session: any, locale: string): Promise<Booking[]> => {
  if (!session) return [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/bookings?lang=${locale}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      cache: 'no-store', // Dynamic data per user
    });

    if (!response.ok) return [];

    const result = await response.json();
    console.log(session.access_token);
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
    return [];
  }
};

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser(); // Secure verification
  const { data: { session } } = await supabase.auth.getSession(); // Still needed for access_token



  // Parallelize Data Fetching (if more requests added)
  const bookings = await fetchBookings(session, locale);

  return (
    <main className="w-full min-h-screen pt-12 pb-12 flex flex-col">
      <Suspense fallback={<EgyptianLoader />}>
        {/* ProfileFeature is now a Server Component */}
        <ProfileFeature bookings={bookings} user={user} locale={locale} />
      </Suspense>
      <Section id="footer">
        <FooterPage />
      </Section>
    </main>
  );
}
