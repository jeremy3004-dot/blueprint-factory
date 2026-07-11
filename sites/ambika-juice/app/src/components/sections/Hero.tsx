import Link from "next/link";

import type { HomeSection } from "@/content/home-sections";
import { SectionMedia } from "./SectionMedia";

export function Hero({ section }: { section: HomeSection }) {
  const asset = section.media?.[0];
  return (
    <section className="homeHero" data-section={section.order}>
      {asset && <SectionMedia asset={asset} className="sectionBackdrop" />}
      <div className="mediaScrim" />
      <div className="heroMark" aria-hidden="true">Ambika</div>
      <div className="heroCopy" data-reveal>
        <p>FRESH FRUIT · MADE TO ORDER · POKHARA</p>
        <h1>{section.title}</h1>
        <p>{section.body}</p>
        {section.href && <Link className="lightLink" href={section.href}>{section.cta} <span aria-hidden="true">→</span></Link>}
      </div>
      <span className="scrollCue">SCROLL</span>
    </section>
  );
}
