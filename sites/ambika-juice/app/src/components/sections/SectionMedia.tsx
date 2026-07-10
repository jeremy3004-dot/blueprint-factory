import type { HomeMedia } from "@/content/home-sections";

interface SectionMediaProps {
  asset: HomeMedia;
  className?: string;
}

export function SectionMedia({ asset, className }: SectionMediaProps) {
  if (asset.type === "video") {
    return <video className={className} src={asset.src} aria-label={asset.alt} autoPlay muted loop playsInline preload="metadata" />;
  }

  return <img className={className} src={asset.src} alt={asset.alt} loading="lazy" />;
}

