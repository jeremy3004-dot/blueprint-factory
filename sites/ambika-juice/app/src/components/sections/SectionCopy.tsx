import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";

export function SectionCopy({ section }: { section: HomeSection }) {
  return (
    <div className="sectionCopy">
      {section.eyebrow && <p className="sectionEyebrow">{section.eyebrow}</p>}
      <h2>{section.title}</h2>
      {section.body && <p className="sectionBody">{section.body}</p>}
      {section.cta && section.href && <Link className="textLink" href={section.href}>{section.cta}<span aria-hidden="true">→</span></Link>}
    </div>
  );
}

