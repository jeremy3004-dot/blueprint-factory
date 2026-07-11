import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";
import { SectionMedia } from "./SectionMedia";

export function CampaignGrid({ section }: { section: HomeSection }) {
  return (
    <section className="campaignGrid" data-section={section.order}>
      <h2 className="srOnly">{section.title}</h2>
      {section.media?.map((asset, index) => (
        <Link href={section.href ?? "/"} className="campaignCard" key={asset.src}>
          <SectionMedia asset={asset} />
          <h3 data-reveal>{index === 0 ? section.title.split(" / ")[0] : section.title.split(" / ")[1] ?? section.title}</h3>
        </Link>
      ))}
    </section>
  );
}
