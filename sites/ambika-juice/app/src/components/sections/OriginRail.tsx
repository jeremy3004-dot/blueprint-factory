import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";
import { SectionMedia } from "./SectionMedia";

const names = ["Peru", "Ecuador", "Colombia"];

export function OriginRail({ section }: { section: HomeSection }) {
  return (
    <section className="originSection" data-section={section.order}>
      <div className="originHeader"><p>SUMMER OFFERINGS</p><h2>{section.title}</h2></div>
      <div className="originRail" role="list" aria-label="Coffee origins">
        {section.media?.map((asset, index) => (
          <Link className="originCard" href={index === 0 ? "/collections/peru-coffees" : index === 1 ? "/collections/ecuador-coffees" : "/collections/colombia-coffees"} key={asset.src} role="listitem">
            <SectionMedia asset={asset} />
            <h3 data-reveal>{names[index]}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
