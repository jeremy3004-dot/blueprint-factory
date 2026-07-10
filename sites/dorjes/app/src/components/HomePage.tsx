import Link from "next/link";
import { BookingClose } from "./BookingClose";
import { Reveal } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { LakeAperture } from "./LakeAperture";
import { experiences, worldStories } from "../lib/content";

export function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="site-main">
        <section className="lake-hero page-shell" aria-labelledby="hero-title">
          <LakeAperture />
          <Reveal className="hero-caption">
            <p className="eyebrow">Sedi Hills · Pokhara</p>
            <h1 id="hero-title">Where comfort meets serenity</h1>
            <Link className="text-link" href="/accommodation-in-pokhara">Discover the stay</Link>
          </Reveal>
        </section>

        <section className="feature-pair page-shell" aria-label="Stay and wellness">
          <Reveal className="feature-card feature-card-wide">
            <div className="feature-media media-frame"><img src="/media/resort-overview.jpg" alt="Dorje's Resort cottages in the green Sedi Hills" /></div>
            <div className="feature-copy">
              <p className="eyebrow">Comfort</p>
              <h2>Hand-crafted outside. Quietly modern within.</h2>
              <p>Eighteen rooms and suites bring local stone and timber together with clear interiors and views toward Phewa Lake.</p>
              <Link className="text-link" href="/accommodation-in-pokhara">Explore rooms &amp; suites</Link>
            </div>
          </Reveal>
          <Reveal className="feature-card" delay={120}>
            <div className="feature-media feature-media-portrait media-frame"><img src="/media/spa.jpg" alt="A restorative spa treatment at Dorje's" /></div>
            <div className="feature-copy">
              <p className="eyebrow">Rejuvenate</p>
              <h2>Space to return to yourself</h2>
              <p>Pool, outdoor jacuzzi and warm wellness rituals unfold against the quiet of the hills.</p>
              <a className="text-link" href="https://dorjes.com/spa-and-wellness/">Discover wellness</a>
            </div>
          </Reveal>
        </section>

        <section className="experience-section page-shell" aria-labelledby="experience-title">
          <Reveal className="experience-intro">
            <p className="eyebrow">The essence of Dorje&apos;s</p>
            <h2 id="experience-title" className="section-title">The best of Pokhara, close at hand</h2>
            <p>Food from nearby farms, water, lake light and the people of Sedi shape every day at the resort.</p>
            <span className="rail-hint" aria-hidden="true">Scroll to explore →</span>
          </Reveal>
          <div className="experience-rail" tabIndex={0} aria-label="Dorje's experiences">
            {experiences.map((story, index) => (
              <Reveal className="experience-card" delay={index * 90} key={story.title}>
                <a href={story.href}>
                  <div className="experience-media media-frame"><img src={story.image} alt="" /></div>
                  <p className="eyebrow">{story.eyebrow}</p>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <span className="text-link">Discover more</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="lake-interlude" aria-labelledby="lake-interlude-title">
          <div className="lake-interlude-media media-frame">
            <img src="/media/lake-sunrise.jpg" alt="Morning light across Phewa Lake and the hills surrounding Pokhara" />
          </div>
          <Reveal className="lake-interlude-copy">
            <p className="eyebrow">Sedi Hills · Phewa Lake</p>
            <h2 id="lake-interlude-title">Between the lake and the mountains, the day finds its own rhythm.</h2>
          </Reveal>
        </section>

        <section className="world-section page-shell" aria-labelledby="world-title">
          <Reveal className="world-heading">
            <span aria-hidden="true" />
            <h2 id="world-title" className="section-title">The world of Dorje&apos;s</h2>
          </Reveal>
          <div className="world-grid">
            {worldStories.map((story, index) => (
              <Reveal className="world-card" delay={index * 100} key={story.title}>
                <a href={story.href}>
                  <div className="world-media media-frame"><img src={story.image} alt="" /></div>
                  <p className="eyebrow">{story.eyebrow}</p>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                  <span className="text-link">Discover more</span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="founder-band">
          <div className="founder-band-image media-frame"><img src="/media/sustainability.webp" alt="Locally grown produce connected to Dorje's Resort" /></div>
          <div className="founder-band-copy">
            <p className="eyebrow">Beyond sustainability</p>
            <h2 className="section-title">A resort with its community at heart</h2>
            <p>Local produce, training and hand-made ceramics keep the property connected to livelihoods and craft in the hills around it.</p>
            <a className="text-link" href="https://dorjes.com/sustainability/">Read the story</a>
          </div>
        </Reveal>

        <section className="inspire-strip" aria-labelledby="inspire-title">
          <h2 id="inspire-title">A note from the hills</h2>
          <p>Tell our team what would make your time in Pokhara feel unhurried.</p>
          <a className="text-link" href="mailto:info@dorjes.com">Plan with our team</a>
        </section>

        <BookingClose />
      </main>
      <SiteFooter />
    </>
  );
}
