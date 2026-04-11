import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";
export const dynamicParams = false;

async function fetchData(lang: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(
      `${baseUrl}/packages?lang=${lang}`,
    );
    return res.json();
  } catch (err) {
    return [];
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
      name: t("sections.giza"),
      governorate: "giza",
      page: 1,
      packages: [],
      landmarks: t.raw("landmarks.giza"),
    },
    {
      name: t("sections.cairo"),
      governorate: "cairo",
      page: 3,
      packages: [],
      landmarks: t.raw("landmarks.cairo"),
    },
    {
      name: t("sections.alexandria"),
      governorate: "alexandria",
      page: 5,
      packages: [],
      landmarks: t.raw("landmarks.alexandria"),
    },
    {
      name: t("sections.nile"),
      page: 7,
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

  return (
    <div className="flex flex-col">
      <Home data={updatedData} locale={locale} />
    </div>
  );
}
