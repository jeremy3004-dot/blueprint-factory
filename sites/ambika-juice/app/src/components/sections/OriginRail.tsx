import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";
import { SectionMedia } from "./SectionMedia";

const names = ["Mango", "Avocado", "Watermelon"];
const links = ["/products/mango-juice", "/products/creamy-avocado", "/products/watermelon-juice"];

export function OriginRail({ section }: { section: HomeSection }) {
  return (
    <section className="originSection" data-section={section.order}>
      <div className="originHeader"><p>AMBIKA FAVOURITES</p><h2>{section.title}</h2></div>
      <div className="originRail" role="list" aria-label="Signature drinks">
        {section.media?.map((asset, index) => (
          <Link className="originCard" href={links[index]} key={`${asset.src}-${index}`} role="listitem">
            <SectionMedia asset={asset} />
            <h3 data-reveal>{names[index]}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
