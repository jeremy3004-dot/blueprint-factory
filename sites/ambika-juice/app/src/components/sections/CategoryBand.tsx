import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";
import { referenceNavigation } from "@/content/ambika-content";

export function CategoryBand({ section }: { section: HomeSection }) {
  return (
    <section className="categoryBand" data-section={section.order}>
      <h2 className="srOnly">{section.title}</h2>
      {referenceNavigation[0].items.map((item) => (
        <div key={item.href}>
          <h3>{item.label}</h3>
          <Link href={item.href}>SHOP</Link>
        </div>
      ))}
    </section>
  );
}
