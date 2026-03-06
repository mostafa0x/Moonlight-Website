import SocialIcon from "@/shared/components/icons/SocialIcon";
import Link from "next/link";
import { memo } from "react";
const PAGES = [
  { name: "Terms of use", link: "#" },
  { name: "Privacy Policy", link: "#" },
  { name: "About us", link: "#" },
  { name: "Contact", link: "#" },
];
function FooterPage({ page }: { page: number }) {
  const isInView = page === 3;
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className=" space-y-[48px]">
        <div className=" items-center flex flex-col">
          Logo
          <h1 className="text-5xl text-[#F2C975] font-cairo font-medium ">
            MOON LIGHT
          </h1>
        </div>
        <div className="flex flex-row gap-[66px]  items-center justify-center ">
          <SocialIcon icon="facebook" />
          <SocialIcon icon="tiktok" />
          <SocialIcon icon="instagram" />
        </div>
        <div className="space-x-[50px]  items-center justify-center ">
          {PAGES.map((page) => (
            <Link
              key={page.name}
              href={page.link}
              className="text-[20px] font-cairo text-[#8B8B8B] font-bold hover:text-gray-200"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-[80px]  ">
        <div className=" outline-1 outline-[#8B8B8B] w-[788px] justify-center items-center " />
        <div className="flex items-start justify-between">
          <span className="text-[#8B8B8B] text-[16px] font-bold font-cairo">
            © 2026 All Rights Reserved.
          </span>
          <span className="text-[#8B8B8B] text-[16px] font-bold font-cairo">
            Designed by  Echo+
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(FooterPage);
