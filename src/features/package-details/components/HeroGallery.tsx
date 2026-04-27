import Image from "next/image";

/**
 * HeroGallery — Server Component
 *
 * Displays the package hero images in a responsive grid layout.
 * - Mobile: 2-column mosaic
 * - Desktop: Large primary + 3 smaller thumbnails
 *
 * LCP Optimization: Primary image is priority-loaded.
 */
interface HeroGalleryProps {
  image: string;
  name: string;
}

export default function HeroGallery({ image, name }: HeroGalleryProps) {
  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[1.02fr_1fr] gap-3 h-[450px]">
        {/* Primary Image */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={`${name} - Main`}
            fill
            sizes="(max-width: 1440px) 50vw, 610px"
            className="object-cover"
            priority
          />
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-rows-[1fr_1fr] gap-3">
          {/* Top secondary */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={`${name} - View 2`}
              fill
              sizes="(max-width: 1440px) 50vw, 600px"
              className="object-cover"
            />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={`${name} - View 3`}
                fill
                sizes="(max-width: 1440px) 25vw, 295px"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt={`${name} - View 4`}
                fill
                sizes="(max-width: 1440px) 25vw, 295px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden grid grid-cols-2 gap-2 h-[160px]">
        {/* Primary Image - spans full height */}
        <div className="relative rounded-2xl overflow-hidden row-span-2">
          <Image
            src={image}
            alt={`${name} - Main`}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right column */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={`${name} - View 2`}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>

        {/* Bottom right - split into 2 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={`${name} - View 3`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={`${name} - View 4`}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
