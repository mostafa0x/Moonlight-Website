import Image from "next/image";

export default function SliderItemSkeleton() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative  w-52 md:w-85 lg:w-101.25 xl:w-75 2xl:w-15 h-95.75 md:h-112.5 lg:h-136.25 select-none ">
        <Image
          src="/imgs/placeholder.webp"
          alt="loading"
          fill
          sizes="(max-width: 768px) 100vw, 405px"
          className="object-contain blur-sm"
        />
      </div>
    </div>
  );
}
