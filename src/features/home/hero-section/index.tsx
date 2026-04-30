import { getTranslations } from "next-intl/server";

interface HeroSectionProps {
  locale: string;
}

/**
 * HeroSection - Performance-Optimized Hero Section
 * 
 * Optimized for LCP (Largest Contentful Paint):
 * 1. Server-side translation fetching to prevent hydration mismatch and delays.
 * 2. Flattened component structure to reduce React tree depth and processing.
 * 3. Static rendering (no entrance animations) for instantaneous LCP.
 * 4. High-priority text rendering with antialiasing and text-shadow for premium feel.
 */
export default async function HeroSection({ locale }: HeroSectionProps) {
  // Fetch translations directly in the server component for best performance
  const t = await getTranslations({ locale, namespace: "home.hero" });

  return (
    <section
      className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-transparent select-none px-6 text-center"
      aria-label="Welcome to Moonlight"
    >
      <header className="space-y-4 md:space-y-6 max-w-5xl contain-content z-20">
        {/* Main Title - EXPLORE EGYPT (LCP Element) */}
        <h2 className="text-4xl sm:text-6xl md:text-5xl font-cairo font-bold text-white tracking-[0.2em] uppercase [text-shadow:0_0_15px_rgba(242,201,117,0.4)] antialiased">
          {t("title")}
        </h2>

        {/* Subtitle - Slogan */}
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-cairo font-bold leading-tight bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent [text-shadow:0_10px_30px_rgba(0,0,0,0.5)] antialiased">
          {t("subtitle")}
        </h1>
      </header>

      {/* Optional: Subtle Overlay for better text legibility */}
      <div 
        className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-10" 
        aria-hidden="true" 
      />
    </section>
  );
}
