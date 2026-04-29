import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { createClient } from '@/shared/lib/supabase-server';
import { TicketCard, TicketResponse } from '@/features/ticket';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import EgyptianLoader from '@/shared/components/EgyptianLoader';
import FooterPage from "@/shared/components/footer";
import Section from "@/features/home/components/Section";

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string; locale: string }>
}): Promise<Metadata> {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ticket' });

  return {
    title: `${t('title')}`,
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
 * TicketPage: Server-First Ticket View.
 * 
 * Performance Strategy (Next.js 16):
 * - TTFB: Direct data fetching from the API using Server Components.
 * - LCP: Ticket card is server-rendered for immediate visibility.
 * - Zero Client JS: This page requires no client interactivity for display.
 */

async function getTicketData(id: string, token: string, locale: string): Promise<TicketResponse | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/ticket?id=${id}&lang=${locale}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return null;
  }
}

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ticket' });
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    // Redirect to login or handle unauthenticated state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-cairo text-black mb-4">{t('errorTitle')}</h1>
          <p className="text-zinc-600 mb-6">{t('errorDescription')}</p>
          <Link href={`/${locale}/profile`} className="px-6 py-3 bg-black text-white rounded-lg font-bold">
            {t('backToProfile')}
          </Link>
        </div>
      </div>
    );
  }

  const ticketResponse = await getTicketData(id, session.access_token, locale);

  if (!ticketResponse || ticketResponse.status !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center  p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-cairo text-black mb-4">{t('errorTitle')}</h1>
          <p className="text-zinc-600 mb-6">{t('errorDescription')}</p>
          <Link href={`/${locale}/profile`} className="px-6 py-3 bg-black text-white rounded-lg font-bold">
            {t('backToProfile')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Suspense fallback={<EgyptianLoader />}>
        <main className="flex-1 pt-8 pb-16  px-4 flex flex-col items-center  justify-center gap-2">
          {/* Premium Ticket Card */}
          <TicketCard data={ticketResponse.data} referenceId={id} locale={locale} />
          {/* Back Link */}
          <Link
            href={`/${locale}/profile`}
            className="group flex items-center gap-2 text-zinc-200 hover:text-zinc-500 transition-colors"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold text-center font-cairo underline underline-offset-4">
              {t('backToProfile')}
            </span>
          </Link>
        </main>
      </Suspense>
      <Section id="footer">
        <FooterPage />
      </Section>
    </div>
  );
}
