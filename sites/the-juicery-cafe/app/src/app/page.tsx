import Image from "next/image";
import type { CSSProperties } from "react";
import { HomeHero } from "../components/home-hero";
import { FramedImage, OutlineLink, SectionLabel } from "../components/page-sections";
import { contact, dayRhythm, facts } from "../data/site";

type RevealStyle = CSSProperties & { "--delay"?: string };

export default function HomePage() {
  return (
    <>
      <section className="home-opening" aria-labelledby="home-hero-title">
        <HomeHero />

        <div className="facts-rail" aria-label="At a glance">
          <div>
            <span>Open daily</span>
            <strong>{contact.hours}</strong>
          </div>
          <div>
            <span>Find us</span>
            <strong>North Lakeside · Pokhara</strong>
          </div>
          <div>
            <span>Come for</span>
            <strong>Juice · brunch · community</strong>
          </div>
        </div>
      </section>

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
        <p className="image-caption" data-reveal>
          Fruit, seeds, coconut, and whatever the season is doing best.
        </p>
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

      <section className="community-chapter">
        <div className="community-section pattern-field">
          <div className="community-collage" aria-label="Life around The Juicery Cafe">
            <div className="community-photo community-photo-main" data-reveal>
              <Image
                src="/images/juicery/event-kirtan.jpg"
                alt="A candlelit community gathering at The Juicery Cafe"
                fill
                sizes="(max-width: 900px) 86vw, 42vw"
              />
            </div>
            <div className="community-photo community-photo-side" data-reveal style={{ "--delay": "120ms" } as RevealStyle}>
              <Image
                src="/images/juicery/event-workshop.jpg"
                alt="A movement workshop at The Juicery Cafe"
                fill
                sizes="(max-width: 900px) 46vw, 23vw"
              />
            </div>
            <span className="community-stamp" aria-hidden="true">
              Move · listen · gather
            </span>
          </div>
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
        </div>
        <div className="day-rhythm" role="region" aria-labelledby="day-rhythm-title">
          <div className="day-rhythm-heading" data-reveal>
            <SectionLabel>One cafe, many rhythms</SectionLabel>
            <p className="day-rhythm-display" id="day-rhythm-title">From first press to last song.</p>
          </div>
          <div className="day-rhythm-list">
            {dayRhythm.map((moment, index) => (
              <article key={moment.time} data-reveal style={{ "--delay": `${index * 80}ms` } as RevealStyle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{moment.time}</p>
                <p className="day-rhythm-title">{moment.title}</p>
                <p>{moment.note}</p>
              </article>
            ))}
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
