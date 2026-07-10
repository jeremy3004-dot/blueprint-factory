import type { HomeSection } from "@/content/home-sections";
import { SectionMedia } from "./SectionMedia";

export function PressRail({ section }: { section: HomeSection }) {
  return (
    <section className="pressRail" aria-label={section.title} data-section={section.order}>
      {section.media?.map((asset) => <div key={asset.src}><SectionMedia asset={asset} /></div>)}
    </section>
  );
}

