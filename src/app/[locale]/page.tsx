import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

async function fetchData(lang: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/packages?lang=${lang}`,
    );
    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

export default async function page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ tourId: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { tourId } = await searchParams;
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

  const messagesMap: any = {
    en: () => import("../../../messages/en.json"),
    fr: () => import("../../../messages/fr.json"),
    it: () => import("../../../messages/it.json"),
    es: () => import("../../../messages/es.json"),
    pt: () => import("../../../messages/pt.json"),
  };

  const allMessages = (await messagesMap[locale]()).default;
  const pageMessages = {
    home: allMessages.home,
    bookingModal: allMessages.bookingModal,
  };

  return (
    <div className="flex flex-col">
      <NextIntlClientProvider locale={locale} messages={pageMessages}>
        <Home data={updatedData} />
      </NextIntlClientProvider>
    </div>
  );
}
