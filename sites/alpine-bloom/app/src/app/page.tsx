const journeys = [
  {
    title: "Annapurna Bloom Trek",
    meta: "10 days / gentle-moderate / Mar-May",
    copy: "Rhododendron forests, teahouse warmth, sunrise ridges, and a pace that leaves room to actually breathe.",
    price: "From $3,840"
  },
  {
    title: "Everest Base Camp Sisterhood",
    meta: "15 days / strong / Sep-Nov",
    copy: "A supported ascent with built-in acclimatization days, women guides, porter welfare standards, and cultural context.",
    price: "From $5,950"
  },
  {
    title: "Mustang Quiet Kingdom",
    meta: "12 days / moderate / Apr-Oct",
    copy: "Wind-carved valleys, monastery stays, and private transport through one of Nepal's most cinematic regions.",
    price: "From $4,720"
  }
];

const proof = [
  "Women-led expedition design",
  "Local Himalayan guide network",
  "Small groups of 8-12",
  "Acclimatization-first pacing"
];

const finder = ["First Himalayan trek", "High-altitude ready", "Culture plus walking"];

export default function Home() {
  return (
    <main>
      <header className="siteNav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Alpine Bloom home">
          <span className="brandMark" aria-hidden="true" />
          Alpine Bloom
        </a>
        <nav>
          <a href="#journeys">Journeys</a>
          <a href="#guides">Guides</a>
          <a href="#plan">Plan</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroPhoto" aria-hidden="true">
          <img src="/alpine-bloom-assets/himalayas-nepal.jpg" alt="" />
          <div className="routeMap">
            <span className="routeDot start" />
            <span className="routeLine" />
            <span className="routeDot bloom" />
          </div>
        </div>

        <div className="heroCopy">
          <p className="eyebrow">Himalayan journeys for women</p>
          <h1>Climb into the mountains without leaving yourself behind.</h1>
          <p className="lede">
            Alpine Bloom designs women-led trekking and cultural journeys across Nepal with careful pacing,
            local expertise, and a group culture built for courage, not conquest.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#plan">Find your route</a>
            <a className="textLink" href="#journeys">View journeys</a>
          </div>
        </div>

        <form className="tripFinder" id="plan" aria-label="Trip finder">
          <div>
            <span>Region</span>
            <strong>Annapurna / Everest / Mustang</strong>
          </div>
          <div>
            <span>Best season</span>
            <strong>Spring or autumn</strong>
          </div>
          <div>
            <span>Your pace</span>
            <strong>{finder.join(" / ")}</strong>
          </div>
          <button type="button">Match me</button>
        </form>
      </section>

      <section className="trustBand" aria-label="Alpine Bloom trip standards">
        {proof.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </section>

      <section className="intro">
        <div>
          <p className="eyebrow">Not a summit factory</p>
          <h2>Trips planned around altitude, attention, and belonging.</h2>
        </div>
        <p>
          The best Himalayan days are both expansive and practical: the right tea stop, the right rest day,
          the right woman beside you when the trail gets quiet. Alpine Bloom makes the logistics feel held
          so the mountain can feel alive.
        </p>
      </section>

      <section className="journeys" id="journeys">
        <div className="sectionHead">
          <p className="eyebrow">Featured routes</p>
          <h2>Choose the shape of your first bloom.</h2>
        </div>
        <div className="journeyGrid">
          {journeys.map((journey, index) => (
            <article className="journeyCard" key={journey.title}>
              <span className="cardNumber">{String(index + 1).padStart(2, "0")}</span>
              <p>{journey.meta}</p>
              <h3>{journey.title}</h3>
              <p>{journey.copy}</p>
              <strong>{journey.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="guideStory" id="guides">
        <img src="/alpine-bloom-assets/annapurna-rhododendron.jpg" alt="Pink rhododendron flowers in the Annapurna conservation area" />
        <div>
          <p className="eyebrow">The guide promise</p>
          <h2>Every route is held by women who know the trail and the room.</h2>
          <p>
            We pair local mountain leadership with pre-trip preparation, plain-language gear support,
            and daily check-ins that make space for body, weather, spirit, and group pace.
          </p>
          <ul>
            <li>Private pre-departure route call</li>
            <li>Altitude-aware itinerary design</li>
            <li>Porter welfare and local partner standards</li>
          </ul>
        </div>
      </section>

      <section className="community">
        <p className="eyebrow">Field note</p>
        <blockquote>
          "You do not have to become someone harder to enter high places. You can bring softness,
          preparation, laughter, and still arrive."
        </blockquote>
        <a className="primaryButton" href="mailto:hello@alpinebloom.example">Start planning</a>
      </section>
    </main>
  );
}
