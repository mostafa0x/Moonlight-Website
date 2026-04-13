interface HeroContentProps {
  title: string;
  subtitle: string;
}

/**
 * HeroContent - Server Component
 * Uses Tailwind CSS animations (tailwindcss-animated) for high-performance LCP.
 * No JavaScript runtime required for the initial entrance animations.
 */
export default function HeroContent({ title, subtitle }: HeroContentProps) {
  return (
    <div className="relative flex flex-col w-full h-full justify-center items-center z-20 select-none px-6 text-center">

      <header className="space-y-4 md:space-y-6 max-w-5xl contain-content">
        {/* Title H2 - Optimized CSS Fade-up */}
        <h2 className="text-4xl sm:text-6xl md:text-5xl font-cairo font-bold text-white tracking-[0.2em] uppercase [text-shadow:0_0_15px_rgba(242,201,117,0.4)] antialiased animate-fade-up animate-duration-1000 animate-delay-300">
          {title}
        </h2>

        {/* Subtitle H1 - Optimized CSS Fade-up with Delay */}
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-cairo font-bold leading-tight bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent [text-shadow:0_10px_30px_rgba(0,0,0,0.5)] antialiased animate-fade-up animate-duration-1000 animate-delay-600">
          {subtitle}
        </h1>
      </header>


    </div>
  );
}
