import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";
import { SectionMedia } from "./SectionMedia";

export function CampaignGrid({ section }: { section: HomeSection }) {
  return (
    <section className="campaignGrid" data-section={section.order}>
      {section.media?.map((asset, index) => (
        <Link href={section.href ?? "/"} className="campaignCard" key={asset.src}>
          <SectionMedia asset={asset} />
          <span>{index === 0 ? section.title.split(" / ")[0] : section.title.split(" / ")[1] ?? section.title}</span>
        </Link>
      ))}
    </section>
  );
}

