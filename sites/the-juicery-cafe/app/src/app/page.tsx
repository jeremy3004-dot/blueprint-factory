import Image from "next/image";
import type { CSSProperties } from "react";
import { HomeHero } from "../components/home-hero";
import { FramedImage, OutlineLink, SectionLabel } from "../components/page-sections";
import { facts } from "../data/site";

type RevealStyle = CSSProperties & { "--delay"?: string };

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="story-section pattern-field">
        <div className="narrow-copy">
          <div data-reveal>
            <SectionLabel>Our story</SectionLabel>
          </div>
          <h2 data-reveal style={{ "--delay": "100ms" } as RevealStyle}>
            Started with a press.
            <br />
            Grown around a table.
          </h2>
          <p data-reveal style={{ "--delay": "180ms" } as RevealStyle}>
            {facts.story}
          </p>
          <div data-reveal style={{ "--delay": "240ms" } as RevealStyle}>
            <OutlineLink href="/food">Taste the story</OutlineLink>
          </div>
        </div>
      </section>

      <section className="food-image-section pattern-field" aria-label="Featured food">
        <FramedImage
          src="/images/juicery/bowl-wide.jpg"
          alt="A fruit, seed, and coconut smoothie bowl served at The Juicery Cafe"
        />
      </section>
      <section className="food-copy-section pattern-field">
        <div className="narrow-copy food-feature-copy">
          <div data-reveal>
            <SectionLabel>Our food</SectionLabel>
          </div>
          <h2 data-reveal style={{ "--delay": "100ms" } as RevealStyle}>
            Bright, seasonal, and made with care.
          </h2>
          <p data-reveal style={{ "--delay": "180ms" } as RevealStyle}>
            {facts.food}
          </p>
          <div data-reveal style={{ "--delay": "240ms" } as RevealStyle}>
            <OutlineLink href="/food">Explore food & drink</OutlineLink>
          </div>
        </div>
      </section>

      <section className="community-section pattern-field">
        <div className="community-copy">
          <div data-reveal>
            <SectionLabel>Beyond brunch</SectionLabel>
          </div>
          <h2 data-reveal style={{ "--delay": "100ms" } as RevealStyle}>
            A place to move, listen, and gather.
          </h2>
          <p data-reveal style={{ "--delay": "180ms" } as RevealStyle}>
            {facts.events}
          </p>
          <div data-reveal style={{ "--delay": "240ms" } as RevealStyle}>
            <OutlineLink href="/events">See community events</OutlineLink>
          </div>
        </div>
      </section>

      <section className="visit-band">
        <Image
          src="/images/juicery/cafe-counter.jpg"
          alt="The open-air counter at The Juicery Cafe in North Lakeside"
          fill
          sizes="100vw"
        />
        <div className="visit-band-veil" />
        <div className="visit-band-copy" data-reveal>
          <SectionLabel>North Lakeside · Pokhara</SectionLabel>
          <h2>Come as you are. Leave well fed.</h2>
          <OutlineLink href="/contact">Find the cafe</OutlineLink>
        </div>
      </section>
    </>
  );
}
