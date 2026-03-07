import Home from "@/features/home";
import dynamic from "next/dynamic";
const BackgroundImage = dynamic(
  () => import("@/shared/components/background-image/BackgroundImage"),
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
      <BackgroundImage />
    </div>
  );
}
