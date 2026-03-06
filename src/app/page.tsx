import Home from "@/features/home";
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
      <Home />
      {/* <BackgroundVideo />
       */}
    </div>
  );
}
