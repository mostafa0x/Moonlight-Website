import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });

  const title = t("title");
  const description = t("description");
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: t("keywords"),
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "Moonlight Egypt",
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: `${baseUrl}/icon.png`,
          width: 512,
          height: 512,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/icon.png`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        it: "/it",
        es: "/es",
        pt: "/pt",
        "x-default": "/en",
      },
    },
  };
}

async function fetchData(lang: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/packages?lang=${lang}`);
    if (!res.ok) return { data: [] };
    return res.json();
  } catch {
    return { data: [] };
  }
}

export default async function page({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const dataAll: HomeDataType[] = [
    {
      packageTitle: t("packageTitles.giza"),
      governorate: "giza",
      packages: [],
      landmarks: t.raw("landmarks.giza"),
    },
    {
      packageTitle: t("packageTitles.cairo"),
      governorate: "cairo",
      packages: [],
      landmarks: t.raw("landmarks.cairo"),
    },
    {
      packageTitle: t("packageTitles.alexandria"),
      governorate: "alexandria",
      packages: [],
      landmarks: t.raw("landmarks.alexandria"),
    },
    {
      packageTitle: t("packageTitles.nile"),
      governorate: "nile",
      packages: [],
      landmarks: t.raw("landmarks.nile"),
    },
  ];

  const { data = [] } = await fetchData(locale);

  const updatedData = dataAll.map((section) => {
    const filteredPackages = data.filter((pkg: any) =>
      pkg.governorate.toLowerCase().includes(section.governorate.toLowerCase()),
    );

    return {
      ...section,
      packages: filteredPackages,
    };
  });

  const tLayout = await getTranslations({ locale, namespace: "layout" });
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_WEBSITE_NAME || "Moonlight Egypt";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteName,
    url: `${baseUrl}/${locale}`,
    description: tLayout("description"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home data={updatedData} locale={locale} />
    </>
  );
}
