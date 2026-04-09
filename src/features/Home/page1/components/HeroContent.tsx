interface HeroContentProps {
  title: string;
  subtitle: string;
  journey: string;
}

/**
 * HeroContent - Server Component
 * Uses Tailwind CSS animations (tailwindcss-animated) for high-performance LCP.
 * No JavaScript runtime required for the initial entrance animations.
 */
export default function HeroContent({ title, subtitle, journey }: HeroContentProps) {
  return (
    <div className="relative flex flex-col w-full h-full justify-center items-center z-20 select-none px-6 text-center">
      {/* Decorative vertical line with CSS fade-down */}
      <div className="w-px h-16 bg-linear-to-b from-transparent via-[#F2C975] to-transparent mb-8 animate-fade-down animate-duration-[1500ms] animate-ease-out" />

      <header className="space-y-4 md:space-y-6 max-w-5xl contain-content">
        {/* Title H2 - Optimized CSS Fade-up */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-cairo font-bold text-white tracking-[0.2em] uppercase [text-shadow:0_0_15px_rgba(242,201,117,0.4)] antialiased animate-fade-up animate-duration-1000 animate-delay-[300ms]">
          {title}
        </h2>

        {/* Subtitle H1 - Optimized CSS Fade-up with Delay */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-cairo font-black leading-tight bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent [text-shadow:0_10px_30px_rgba(0,0,0,0.5)] antialiased animate-fade-up animate-duration-1000 animate-delay-[600ms]">
          {subtitle}
        </h1>
      </header>

      {/* Hero Footnote / Scroll Indicator with CSS Fade and Bounce */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer animate-fade animate-duration-1000 animate-delay-[1200ms]">
        <span className="text-white text-[10px] font-bold tracking-[0.4em] uppercase whitespace-nowrap">
          {journey}
        </span>
        <div className="w-px h-12 bg-white/40 animate-bounce animate-infinite animate-duration-[2000ms]" />
      </div>
    </div>
  );
}
