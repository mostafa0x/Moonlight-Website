"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";

interface SectionDotsProps {
  sectionIds: string[];
}

/**
 * SectionDots navigation for fullpage.js experience.
 */
export default function SectionDots({ sectionIds }: SectionDotsProps) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-100 hidden lg:flex flex-col gap-4">
      {sectionIds.map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={cn(
            "w-3 h-3 rounded-full border-2 border-white/50 transition-all duration-300 hover:scale-125",
            activeSection === id ? "bg-white scale-125 border-white shadow-[0_0_10px_white]" : "bg-transparent"
          )}
          aria-label={`Scroll to ${id}`}
        />
      ))}
    </nav>
  );
}
