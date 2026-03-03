import BackgroundVideo from "@/shared/components/background-video/BackgroundVideo";
import FullPagesProvider from "@/shared/providers/FullPageProvider";
import Image from "next/image";

export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FullPagesProvider />
    </div>
  );
}
