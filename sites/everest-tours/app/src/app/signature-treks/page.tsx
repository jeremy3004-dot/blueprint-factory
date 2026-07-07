import Link from "next/link";
import { images, treks } from "../content";

export default function SignatureTreks() {
  return (
    <main className="site">
      <header className="nav">
        <nav className="navLinks" aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/signature-treks">Signature Treks</Link>
          <a href="#seasons">Seasons</a>
        </nav>
        <Link className="brand" href="/">Everest Tours</Link>
        <div className="navActions">
          <a href="tel:+9779800000000">+977 9800 000000</a>
          <a className="buttonGhost" href="#enquire">Enquire</a>
        </div>
      </header>

      <section className="pageHero">
        <img src={images.ridge} alt="High Himalayan ridge trail" />
        <div className="pageHeroContent">
          <p className="eyebrow">Signature Treks</p>
          <h1>Routes chosen for pace, place, and judgment</h1>
          <p>
            Small groups, conservative altitude planning, and clear USD pricing for travelers who want the
            mountain handled with care.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="sectionNarrow">
          <p className="eyebrow">By travel style</p>
          <h2>Not every trek needs the same kind of support</h2>
          <p>
            Choose the route, then we tune the pacing, guide team, lodge plan, and contingency around your dates
            and experience.
          </p>
        </div>
        <div className="listingGrid">
          {treks.map((trek) => (
            <article className="listingCard" key={trek.title}>
              <Link className="trekCard" href={trek.slug}>
                <img src={trek.image} alt="" />
                <div className="trekCardContent">
                  <p className="eyebrow">{trek.days}</p>
                  <h3>{trek.title}</h3>
                </div>
              </Link>
              <div className="listingBody">
                <p>{trek.summary}</p>
                <p><strong>{trek.price}</strong> · {trek.season}</p>
                <Link className="buttonDark" href={trek.slug}>View route</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section darkBand" id="seasons">
        <div>
          <p className="eyebrow">Season notes</p>
          <h2>Good dates matter more than crowded promises</h2>
        </div>
        <div className="metaGrid">
          <article><strong>Spring</strong> Stable mornings, rhododendron forests, busier trails.</article>
          <article><strong>Autumn</strong> Clearer air, colder nights, the most requested departure window.</article>
          <article><strong>Winter</strong> Quiet routes with limited lodge options and colder high camps.</article>
          <article><strong>Monsoon</strong> Better for Mustang and culture-led itineraries than classic high treks.</article>
        </div>
      </section>

      <section className="ctaBand" id="enquire">
        <h2>Ask for the right route</h2>
        <p>Tell us your dates, fitness, and travel style. We will suggest a measured starting point.</p>
        <a className="buttonDark" href="mailto:hello@everest-tours.test">Email Everest Tours</a>
      </section>
    </main>
  );
}
