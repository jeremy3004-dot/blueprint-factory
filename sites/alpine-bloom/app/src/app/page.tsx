const routes = [
  {
    title: "Annapurna",
    note: "Women-led ridge trek / 10 days",
    image: "annapurna-hikers.jpg"
  },
  {
    title: "Everest",
    note: "Base camp sisterhood / 15 days",
    image: "everest-base-camp.jpg"
  },
  {
    title: "Ghandruk",
    note: "Village trails + bloom season / 7 days",
    image: "ghandruk-route.jpg"
  },
  {
    title: "Tengboche",
    note: "Monastery route / 12 days",
    image: "tengboche-monastery.jpg"
  },
  {
    title: "Langtang",
    note: "Quiet valley return / 9 days",
    image: "snowy-everest-route.jpg"
  }
];

const way = [
  ["STAND STRONG", "We climb as a small group, keep watch for one another, and treat altitude with respect."],
  ["DREAM BIG", "Himalayan routes are planned for women who want wonder, challenge, and honest support."],
  ["PRIORITIZE PEOPLE", "Local partners, women guides, and porter welfare stay at the center of every route."]
];

export default function Home() {
  return (
    <main>
      <header className="topbar" aria-label="Alpine Bloom navigation">
        <button className="menuButton" type="button" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
        <a className="whoaLogo" href="#top" aria-label="Alpine Bloom home">
          <span>ALPINE</span>
          <b>BLOOM</b>
        </a>
      </header>

      <section className="heroClone" id="top">
        <div className="heroScrapbook" aria-label="Women trekking in Nepal with local guides">
          <figure className="heroPhoto main">
            <img src="/alpine-bloom-assets/nepal-public-domain/annapurna-hikers.jpg" alt="Trekkers walking toward Annapurna in Nepal" />
          </figure>
          <figure className="heroPhoto side">
            <img src="/alpine-bloom-assets/nepal-public-domain/tengboche-monastery.jpg" alt="Tengboche monastery on the Everest Base Camp route" />
          </figure>
          <figure className="heroPhoto small">
            <img src="/alpine-bloom-assets/nepal-public-domain/ghandruk-route.jpg" alt="Trail near Ghandruk on the Annapurna trekking route" />
          </figure>
          <div className="guideRibbon">Nepali guides + women-only groups</div>
        </div>
      </section>

      <section className="introClone">
        <div className="headlineClone" aria-label="Let's climb and move mountains">
          <span>LET'S</span>
          <span>CLIMB AND</span>
          <strong>MOVE</strong>
          <strong>MOUNTAINS</strong>
        </div>
        <div className="introCopy">
          <p>
            Hi, we're Alpine Bloom, a boutique, women-powered Himalayan adventure company with big
            dreams. We believe traveling is about being changed, and being the change you want to see
            in the world.
          </p>
          <p>
            Our passion is designing sustainable adventures that help women reach new peaks in the
            mountains we climb and beyond. We believe travel, when done right, has a ripple effect that
            will transform you and the world.
          </p>
        </div>
      </section>

      <section className="photoScatter" aria-label="Alpine Bloom adventures">
        {routes.map((route) => (
          <article className="routePolaroid" key={route.title}>
            <img src={`/alpine-bloom-assets/nepal-public-domain/${route.image}`} alt="" />
            <h2>{route.title}</h2>
            <p>{route.note}</p>
          </article>
        ))}
      </section>

      <div className="centerCta">
        <a href="mailto:adventure@alpinebloom.example">View all adventures</a>
      </div>

      <section className="pressClone">
        <p>Look who's talking</p>
        <div>
          <img src="/alpine-bloom-assets/whoa-source/press-afar.webp" alt="AFAR" />
          <img src="/alpine-bloom-assets/whoa-source/press-nyt.webp" alt="The New York Times" />
          <img src="/alpine-bloom-assets/whoa-source/press-travel.webp" alt="Travel press" />
        </div>
      </section>

      <section className="filmBlock" aria-label="Himalayan route film">
        <div className="filmFrame">
          <img src="/alpine-bloom-assets/nepal-public-domain/everest-base-camp.jpg" alt="Everest Base Camp trekking scene in Nepal" />
          <button type="button" aria-label="Play route film">▶</button>
          <span>Himalayas</span>
        </div>
      </section>

      <section className="wayClone">
        <h2>The Bloom Way</h2>
        <div className="wayGrid">
          {way.map(([title, copy]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="founderClone">
        <div className="founderScrapbook" aria-hidden="true">
          <img src="/alpine-bloom-assets/nepal-public-domain/annapurna-hikers.jpg" alt="" />
          <img src="/alpine-bloom-assets/rhododendron.jpg" alt="" />
          <img src="/alpine-bloom-assets/nepal-public-domain/tengboche-monastery.jpg" alt="" />
          <strong>WITH LOVE,<br />Alpine Bloom</strong>
        </div>
        <div>
          <p className="pinkLabel">A note from Alpine Bloom</p>
          <p>
            When we started Alpine Bloom, we were two women looking for more out of travel than
            performance and pressure. We wanted the Himalayas to feel challenging, beautiful, and
            deeply held.
          </p>
          <p>
            Our curiosity, preparation, and willingness to learn are still here and growing. We prepare
            from our hearts, believe there is a bigger purpose in the adventures we take, and are ready
            to be beside you on yours.
          </p>
        </div>
      </section>

      <footer className="footer" id="connect">
        <div className="footerTop">
          <section>
            <h2>Let's connect</h2>
            <a href="mailto:adventure@alpinebloom.example">adventure@alpinebloom.example</a>
            <p>+977 980-000-0000</p>
            <div className="socials">
              <span>◎</span>
              <span>f</span>
            </div>
          </section>
          <section>
            <h2>Join us</h2>
            <p>Even inboxes need a dose of thin air and prayer flags.</p>
            <form>
              <input aria-label="Email address" placeholder="Email Address" />
              <button type="button">Let's do this</button>
            </form>
          </section>
        </div>
        <div className="footerPress">
          <span>As featured in</span>
          <img src="/alpine-bloom-assets/whoa-source/press-afar.webp" alt="AFAR" />
          <img src="/alpine-bloom-assets/whoa-source/press-nyt.webp" alt="The New York Times" />
        </div>
        <nav>
          <a href="#top">About Alpine Bloom</a>
          <a href="#top">Upcoming Adventures</a>
          <a href="#top">Private Trips</a>
          <a href="#top">Reviews</a>
          <a href="#top">FAQ</a>
          <a href="#top">Sustainability</a>
        </nav>
        <small>Alpine Bloom is a Himalayan concept translation using WHOA Travel as the pixel reference.</small>
      </footer>
    </main>
  );
}
