"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/shared/components/Logo";

export default function LogoLink({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={`/${locale}`}
      onClick={(e) => {
        if (pathname === `/${locale}`) {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("scroll-to-top"));
        }
      }}
      className="z-50 transition-transform hover:scale-105"
    >
      <Logo />
    </Link>
  );
}
