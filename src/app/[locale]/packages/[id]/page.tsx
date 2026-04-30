import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PackageDetailsPage from "@/features/package-details";
import type { PackageDetailsType } from "@/shared/global";

/**
 * SSG Configuration
 * Pages are statically generated at build time.
 */
export const revalidate = false; // Pure SSG, no ISR

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
 * Uses force-cache for pure SSG.
 */
async function fetchPackageDetails(
  id: string,
  locale: string
): Promise<PackageDetailsType | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/packages/${id}?lang=${locale}`, {
      cache: "force-cache",
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
      description: t("notFoundDescription"),
    };
  }

  // Standardize on WEBSITE_URL for consistency across layout and pages
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
  const relativePath = `/${locale}/packages/${id}`;

  // Clean description (removes any stray HTML tags and prevents trailing spaces)
  const cleanDescription = (pkg.description || "")
    .replace(/<[^>]*>?/gm, "")
    .trim()
    .slice(0, 160) + "...";

  // Dynamic SEO Keywords based on package data
  const keywords = [
    pkg.packageName,
    ...t.raw("seoKeywords"),
    ...(pkg.destinations || []),
  ];

  return {
    title: `${pkg.packageName} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME || "Moonlight Tours"}`,
    description: cleanDescription,
    keywords: keywords.join(", "),
    alternates: {
      canonical: relativePath,
      languages: {
        en: `/en/packages/${id}`,
        it: `/it/packages/${id}`,
        es: `/es/packages/${id}`,
        fr: `/fr/packages/${id}`,
        pt: `/pt/packages/${id}`,
        "x-default": `/en/packages/${id}`,
      },
    },
    openGraph: {
      title: `${pkg.packageName} - ${process.env.NEXT_PUBLIC_WEBSITE_NAME || "Moonlight"}`,
      description: cleanDescription,
      url: relativePath,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "Moonlight",
      type: "website",
      locale: locale,
      images: pkg.packageImage
        ? [
          {
            url: pkg.packageImage,
            width: 1200,
            height: 630,
            alt: pkg.packageName,
          },
        ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: pkg.packageName,
      description: cleanDescription,
      images: pkg.packageImage ? [pkg.packageImage] : [],
    },
  };
}

/**
 * Package Details Page — Server Component
 *
 * Architecture:
 * - Server-rendered at build time (SSG)
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
    const t = await getTranslations({ locale, namespace: "packageDetails" });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F2C975] font-cairo mb-4">
            {t("notFound")}
          </h1>
          <p className="text-neutral-400 font-cairo">
            {t("notFoundDescription")}
          </p>
        </div>
      </div>
    );
  }

  return <PackageDetailsPage pkg={pkg} locale={locale} />;
}
