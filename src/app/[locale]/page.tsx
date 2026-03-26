import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import { getTranslations, setRequestLocale } from "next-intl/server";

async function fetchData(lang: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/packages?lang=${lang}`,
    );
    return res.json();
  } catch (err) {
    console.log(err);
    return [];
    // throw err;
  }
}

export default async function page({
  searchParams,
  params,
}: {
  searchParams: { tourId: string };
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { tourId } = await searchParams;
  const t = await getTranslations("home");

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Home data={updatedData} />
    </div>
  );
}
