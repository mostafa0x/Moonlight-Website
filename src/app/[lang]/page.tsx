import Home from "@/features/home";
import type { HomeDataType } from "@/shared/global";
import dynamic from "next/dynamic";
const BackgroundImage = dynamic(
  () => import("@/shared/components/background-image/BackgroundImage"),
);

async function fetchData(lang: string) {
  const res = await fetch(
    `https://moonlight-steel.vercel.app/api/home?lang${lang}`,
  );
  return res.json();
}

export default async function page({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const { data } = await fetchData(lang);
  console.log(data);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Home data={data} />
      <BackgroundImage />
    </div>
  );
}
