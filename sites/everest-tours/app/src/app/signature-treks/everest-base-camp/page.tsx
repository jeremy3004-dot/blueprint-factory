import Link from "next/link";
import { days, images } from "../../content";

export default function EverestBaseCamp() {
  return (
    <main className="site">
      <header className="nav">
        <nav className="navLinks" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/signature-treks">Signature Treks</Link>
          <a href="#itinerary">Itinerary</a>
        </nav>
        <Link className="brand" href="/">Everest Tours</Link>
        <div className="navActions">
          <a href="tel:+9779800000000">+977 9800 000000</a>
          <a className="buttonGhost" href="#enquire">Enquire</a>
        </div>
      </header>

      <section className="pageHero">
        <img src={images.detailHero} alt="Everest region mountain landscape" />
        <div className="pageHeroContent">
          <p className="eyebrow">15 days · From USD $3,950</p>
          <h1>Everest Base Camp with room to acclimatize</h1>
          <p>
            A measured small-group trek from Kathmandu to Base Camp, with conservative pacing, guide-led decisions,
            and one weather buffer held for the flight corridor.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="detailGrid">
          <div>
            <p className="eyebrow">The route</p>
            <h2>Classic path, careful tempo</h2>
            <p>
              This itinerary follows the familiar Khumbu route through Namche, Tengboche, Dingboche, Lobuche, Base
              Camp, and Kala Patthar. The difference is the planning around it: a guest maximum of eight, daily guide
              briefings, and the freedom to slow the group down when altitude or weather asks for it.
            </p>
            <div className="metaGrid">
              <article><strong>15</strong> days door to door</article>
              <article><strong>5,545m</strong> high point at Kala Patthar</article>
              <article><strong>8</strong> guests maximum</article>
              <article><strong>USD</strong> clear inclusions</article>
            </div>
          </div>
          <aside className="asidePanel" id="enquire">
            <p className="eyebrow">Included</p>
            <h3>Built for fewer surprises</h3>
            <p>Permits, domestic flights, lodges, guide team, porter support, airport transfers, and Kathmandu briefing.</p>
            <a className="button" href="mailto:hello@everest-tours.test">Ask about dates</a>
          </aside>
        </div>
      </section>

      <section className="storyBand">
        <img src={images.prayerFlags} alt="Kathmandu temple and prayer flags" />
        <div className="storyBandContent">
          <p className="eyebrow">Before the trail</p>
          <h2>Kathmandu is part of the journey</h2>
          <p>Gear checks, permits, guide briefings, and one calm day before the flight to Lukla.</p>
        </div>
      </section>

      <section className="section" id="itinerary">
        <div className="detailGrid">
          <div>
            <p className="eyebrow">Day rhythm</p>
            <h2>A simple itinerary with space for judgment</h2>
          </div>
          <div className="itinerary">
            {days.map(([label, text], index) => (
              <details key={label} open={index === 0}>
                <summary>{label}</summary>
                <p>{text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorialSplit">
        <div className="copyBlock">
          <p className="eyebrow">Who this is for</p>
          <h2>Travelers who want the mountain, not a race</h2>
          <p>
            You should be comfortable walking for several hours on consecutive days and ready for basic lodge
            conditions. You do not need to be an elite athlete. You do need a team that treats altitude with respect.
          </p>
          <Link className="buttonDark" href="/signature-treks">Compare treks</Link>
        </div>
        <div className="splitImage">
          <img src={images.mountain} alt="Snow mountain ridge" />
        </div>
      </section>

      <section className="ctaBand">
        <h2>Start with dates, not pressure</h2>
        <p>Send your month, group size, and experience. We will tell you what is realistic.</p>
        <a className="buttonDark" href="mailto:hello@everest-tours.test">Email Everest Tours</a>
      </section>
    </main>
  );
}
