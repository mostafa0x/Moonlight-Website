import FullPagesProvider from "@/shared/providers/FullPageProvider";
import Image from "next/image";

export default function page() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
      }}
    >
      <div className=" relative w-full h-full">
        <Image
          src="/imgs/HeroSection.png"
          alt="hero section"
          fill
          fetchPriority="high"
          priority
          className="w-full h-full object-cover lg:object-fill absolute top-0 left-0 z-[-1]"
        />
      </div>
      <FullPagesProvider />
    </div>
  );
}
