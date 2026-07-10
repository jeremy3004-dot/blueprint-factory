import type { HomeSection } from "@/content/home-sections";
import { SectionCopy } from "./SectionCopy";
import { SectionMedia } from "./SectionMedia";

export function FullBleedMedia({ section }: { section: HomeSection }) {
  const asset = section.media?.[0];
  return (
    <section className="fullBleed" data-section={section.order}>
      {asset && <SectionMedia asset={asset} className="sectionBackdrop" />}
      <div className="mediaScrim" />
      <SectionCopy section={section} />
    </section>
  );
}

