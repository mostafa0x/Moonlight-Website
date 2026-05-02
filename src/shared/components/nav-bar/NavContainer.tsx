"use client";

import { useEffect, useState, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface NavContainerProps {
  children: ReactNode;
}

export default function NavContainer({ children }: NavContainerProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for navbar background
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement | Document;
      const top =
        (target as HTMLElement).scrollTop ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.scrollY ||
        0;
      setIsScrolled(top > 20);
    };
    document.addEventListener("scroll", handleScroll, true);
    return () => document.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full flex items-center justify-between px-6 lg:px-20 transition-all duration-500 border-b",
        isScrolled
          ? "py-3 md:py-4 bg-zinc-900/80 backdrop-blur-md shadow-lg border-white/10"
          : "pt-6 bg-transparent border-transparent"
      )}
      aria-label="Main Navigation"
    >
      {children}
    </nav>
  );
}
