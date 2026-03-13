import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const BackgroundImage = dynamic(
  () => import("@/shared/components/background-image/BackgroundImage"),
);

async function fetchData(lang: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/home?lang=${lang}`,
    );
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default async function page({
  searchParams,
  params,
}: {
  searchParams: { tourId: string };
  params: { lang: string };
}) {
  const { lang } = await params;
  const { tourId } = await searchParams;

  const { data } = await fetchData(lang);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Home data={[]} tourId={tourId} />
      <BackgroundImage />
    </div>
  );
}
