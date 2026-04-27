import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PackageDetailsPage from "@/features/package-details";
import type { PackageDetailsType } from "@/shared/global";

/**
 * SSG Configuration
 * Pages are statically generated at build time with ISR revalidation.
 */
export const revalidate = 3600; // Revalidate every hour for fresh data

/**
 * Generate static params for all packages across all locales.
 * This pre-renders package detail pages at build time for optimal TTFB.
 */
export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const locales = ["en", "fr", "it", "es", "pt"];

  try {
    // Fetch all packages once to get IDs
    const res = await fetch(`${baseUrl}/packages?lang=en`);
    const { data = [] } = await res.json();

    // Generate param combinations for each locale + package
    return locales.flatMap((locale) =>
      data.map((pkg: any) => ({
        locale,
        id: pkg.packageId,
      }))
    );
  } catch {
    return [];
  }
}

/**
 * Server-side data fetching for a single package.
 * Uses force-cache for SSG with ISR revalidation.
 */
async function fetchPackageDetails(
  id: string,
  locale: string
): Promise<PackageDetailsType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/packages/${id}?lang=${locale}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return (json.data || json) as PackageDetailsType;
  } catch {
    return null;
  }
}

/**
 * Dynamic metadata generation for SEO.
 * Each package page gets its own title, description, and OG tags.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const pkg = await fetchPackageDetails(id, locale);
  const t = await getTranslations({ locale, namespace: "packageDetails" });

  if (!pkg) {
    return {
      title: t("notFound"),
    };
  }

  return {
    title: pkg.packageName,
    description: pkg.description?.slice(0, 160),
    openGraph: {
      title: pkg.packageName,
      description: pkg.description?.slice(0, 160),
      images: pkg.packageImage ? [{ url: pkg.packageImage }] : [],
    },
  };
}

/**
 * Package Details Page — Server Component
 *
 * Architecture:
 * - Server-rendered at build time (SSG) with ISR revalidation
 * - Data is fetched on the server, zero client-side data fetching for initial load
 * - Client interactivity is limited to accordion toggles and booking modal trigger
 * - Optimized for LCP: Hero images are priority-loaded, all above-fold content is server-rendered
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const pkg = await fetchPackageDetails(id, locale);

  if (!pkg) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F2C975] font-cairo mb-4">
            Package Not Found
          </h1>
          <p className="text-neutral-400 font-cairo">
            The tour package you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return <PackageDetailsPage pkg={pkg} locale={locale} />;
}
