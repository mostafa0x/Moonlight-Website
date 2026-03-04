import FullPagesProvider from "@/shared/providers/FullPageProvider";
import dynamic from "next/dynamic";
const BackgroundVideo = dynamic(
  () => import("@/shared/components/background-video/BackgroundVideo"),
);
export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FullPagesProvider />
      <BackgroundVideo />
    </div>
  );
}
