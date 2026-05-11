import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";
export const dynamicParams = false;

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

  return <Home data={updatedData} locale={locale} />;
}
