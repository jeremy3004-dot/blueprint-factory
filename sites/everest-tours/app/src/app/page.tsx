import Link from "next/link";
import type { CSSProperties } from "react";
import { images, treks } from "./content";

const journeyTypes = [
  ["Private treks", images.family],
  ["Cultural tours", images.couples],
  ["Small groups", images.groups],
  ["High passes", images.mountain],
  ["Solo travelers", images.solo]
];

const reasons = [
  ["8", "guest maximum"],
  ["1:4", "guide ratio"],
  ["24/7", "Kathmandu support"],
  ["2", "built-in weather buffers"],
  ["USD", "clear pricing"]
];

function Header() {
  return (
    <header className="nav">
      <nav className="navLinks" aria-label="Primary">
        <Link href="/signature-treks">Signature Treks</Link>
        <a href="#culture">Cultural Tours</a>
        <a href="#guides">Guides</a>
      </nav>
      <Link className="brand" href="/">Everest Tours</Link>
      <div className="navActions">
        <a href="tel:+9779800000000">+977 9800 000000</a>
        <a className="buttonGhost" href="#enquire">Enquire</a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer" id="enquire">
      <section>
        <p className="display displaySmall">Everest Tours</p>
        <p>The people who know the mountain. Premium small-group treks and cultural journeys from Kathmandu.</p>
        <form className="newsletter">
          <input aria-label="Email address" placeholder="you@example.com" />
          <button type="button">Send</button>
        </form>
      </section>
      <section>
        <h4>Treks</h4>
        <Link href="/signature-treks/everest-base-camp">Everest Base Camp</Link>
        <Link href="/signature-treks">Annapurna Sanctuary</Link>
        <Link href="/signature-treks">Upper Mustang</Link>
      </section>
      <section>
        <h4>Planning</h4>
        <a href="#guides">Guides</a>
        <a href="#why">Safety</a>
        <a href="#culture">Cultural tours</a>
      </section>
      <section>
        <h4>Kathmandu</h4>
        <a href="mailto:hello@everest-tours.test">hello@everest-tours.test</a>
        <a href="tel:+9779800000000">+977 9800 000000</a>
        <span>Thamel, Kathmandu</span>
      </section>
      <section>
        <h4>Notes</h4>
        <span>Fictional test client.</span>
        <span>No live booking system.</span>
        <span>Preview only.</span>
      </section>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="site">
      <Header />

      <section className="hero">
        <img className="heroImage" src={images.hero} alt="Mountain valley at sunrise" />
        <div className="heroCopy">
          <p className="eyebrow">Kathmandu small-group trekking</p>
          <h1>The people who know the mountain</h1>
          <p>
            Premium treks and cultural journeys in Nepal, planned with careful pacing, local guides, and clear
            logistics from first call to final descent.
          </p>
          <Link className="buttonDark" href="/signature-treks">Plan my trek</Link>
        </div>
        <span className="altitudeLine" aria-hidden="true" />
        <span className="scrollCue">Scroll</span>
      </section>

      <section className="section">
        <div className="sectionNarrow" data-reveal>
          <p className="eyebrow">Every journey starts with a good pace</p>
          <h2>Nepal rewards travelers who do not rush it</h2>
          <p>
            We design small-group treks around acclimatization, guide judgment, permit handling, and the quiet
            parts of the route that make the mountains feel personal. No hype, no crowded bus itinerary, no vague
            promises.
          </p>
          <Link className="buttonDark" href="/signature-treks/everest-base-camp">See Everest Base Camp</Link>
        </div>
        <div className="quoteRow">
          <article><strong>14-15</strong> day Everest pacing</article>
          <article><strong>USD</strong> transparent trip pricing</article>
          <article><strong>Local</strong> Kathmandu operations</article>
          <article><strong>Small</strong> groups, clear decisions</article>
        </div>
      </section>

      <section className="section">
        <div className="sectionNarrow">
          <h2>Start your journey</h2>
          <div className="journeyTabs" aria-label="Journey types">
            <span>By travel style</span>
            <span>Most popular</span>
            <span>By season</span>
            <span>In the spotlight</span>
          </div>
        </div>
        <div className="cardGrid">
          {journeyTypes.map(([label, image], index) => (
            <a className="imageCard" href="/signature-treks" key={label} data-reveal style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
              <img src={image} alt="" />
              <span>{label}</span>
            </a>
          ))}
        </div>
        <div className="centerAction">
          <Link className="buttonDark" href="/signature-treks">View more</Link>
        </div>
      </section>

      <section className="section darkBand">
        <div>
          <p className="eyebrow">Explore our trips</p>
          <p className="display displayMedium">Remarkable routes with a grounded plan</p>
          <p>
            The mountains are unpredictable. The itinerary should not be. These signature treks leave room for
            altitude, weather, and the judgment of guides who walk these paths every season.
          </p>
        </div>
        <div className="tripRail" aria-label="Featured treks">
          {treks.map((trek) => (
            <Link className="trekCard" href={trek.slug} key={trek.title}>
              <img src={trek.image} alt="" />
              <div className="trekCardContent">
                <p className="eyebrow">{trek.days}</p>
                <p className="display displaySmall">{trek.title}</p>
                <p>{trek.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section proofStrip">
        <div className="quoteRow">
          <article><strong>Permits</strong> arranged before arrival</article>
          <article><strong>Routes</strong> adjusted for conditions</article>
          <article><strong>Guides</strong> briefed daily in Kathmandu</article>
          <article><strong>Gear</strong> checked before Lukla</article>
        </div>
      </section>

      <section className="storyBand">
        <img src={images.stars} alt="Night sky above a mountain route" />
        <div className="storyBandContent">
          <p className="eyebrow">Footsteps</p>
          <p className="display displayMedium">Walk with people who read the route</p>
          <p>Weather, altitude, trail repairs, lodge capacity, and group energy all matter. We plan for them.</p>
        </div>
      </section>

      <section className="section editorialSplit" id="guides">
        <div className="copyBlock" data-reveal>
          <p className="eyebrow">What we do and why we do it</p>
          <p className="display displayMedium">Expert does not have to be loud</p>
          <p>
            Everest Tours is built around calm decisions: realistic days, conservative altitude profiles, and
            guides empowered to slow down when the mountain asks for it.
          </p>
          <a className="buttonDark" href="#why">Why that matters</a>
        </div>
        <div className="splitImage">
          <img src={images.guide} alt="Guide standing on a mountain ridge" />
        </div>
      </section>

      <section className="section editorialSplit reverse" id="culture">
        <div className="splitImage">
          <img src={images.lake} alt="Quiet Himalayan lake with mountains beyond" />
        </div>
        <div className="copyBlock" data-reveal>
          <p className="eyebrow">Pursuit of feeling</p>
          <p className="display displayMedium">Not every great Nepal journey is a summit story</p>
          <p>
            We pair mountain days with Kathmandu courtyards, monastery visits, family-run lodges, and slow time in
            villages where the route has a human scale.
          </p>
          <a className="buttonDark" href="#enquire">Ask about culture-led trips</a>
        </div>
      </section>

      <section className="section editorialSplit">
        <div className="copyBlock">
          <p className="eyebrow">Our guide to trekking in Nepal</p>
          <p className="display displayMedium">Good planning is part of the experience</p>
          <p>
            We brief guests on altitude, insurance, tipping, kit, food hygiene, domestic flights, and weather
            buffers before they leave home. The goal is not to remove adventure. It is to remove avoidable doubt.
          </p>
          <Link className="buttonDark" href="/signature-treks">Continue reading</Link>
        </div>
        <div className="splitImage">
          <img src={images.ridge} alt="Trekkers on a high ridge" />
        </div>
      </section>

      <section className="section" id="why">
        <div className="sectionNarrow">
          <h2>Why Everest Tours?</h2>
        </div>
        <div className="reasonRow">
          {reasons.map(([number, label]) => (
            <article key={label}>
              <strong>{number}</strong>
              {label}
            </article>
          ))}
        </div>
      </section>

      <section className="ctaBand">
        <p className="display displayMedium">So, ready to start?</p>
        <p>Tell us when you want to travel and how you want the mountain to feel.</p>
        <a className="buttonDark" href="#enquire">Get in touch</a>
      </section>

      <section className="footerMarks" aria-label="Operating notes">
        <span>Kathmandu office</span>
        <span>Licensed guide partners</span>
        <span>Permit-first planning</span>
      </section>

      <Footer />
    </main>
  );
}
