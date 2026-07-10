import type { HomeSection } from "@/content/home-sections";
import { SectionCopy } from "./SectionCopy";
import { SectionMedia } from "./SectionMedia";

export function EditorialSplit({ section }: { section: HomeSection }) {
  const asset = section.media?.[0];
  return (
    <section className="editorialSplit" data-orientation={section.orientation ?? "left"} data-section={section.order}>
      <div className="editorialMedia">{asset && <SectionMedia asset={asset} />}</div>
      <SectionCopy section={section} />
    </section>
  );
}

