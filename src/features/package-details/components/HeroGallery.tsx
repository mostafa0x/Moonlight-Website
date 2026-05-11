import HeroGalleryClient from "./HeroGalleryClient";

/**
 * HeroGallery — Server Component
 *
 * Wraps the interactive HeroGalleryClient.
 * Architecture ensures static parts are server-rendered 
 * while maintaining interactivity with "use client" in the inner component.
 */
interface HeroGalleryProps {
  image: string | string[];
  name: string;
}

export default function HeroGallery({ image, name }: HeroGalleryProps) {
  // Safe normalization to handle cached responses that might still be strings
  const imagesArray = Array.isArray(image) ? image : (typeof image === "string" ? [image] : []);
  
  if (imagesArray.length === 0) return null;

  return <HeroGalleryClient images={imagesArray} name={name} />;
}
