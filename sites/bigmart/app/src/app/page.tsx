const assetBase = "/bigmart-assets/";

const stores = ["Baluwatar-2", "Maharajgunj", "Lazimpat", "Jhamsikhel"];

const marketCards = [
  {
    title: "Fresh basket",
    image: "grocery-banner.2c56649c9cbe2e19b86f.png",
    copy: "Produce, fruit, and daily essentials should lead with appetite before price."
  },
  {
    title: "Mahabachat moments",
    image: "banner-deal1.0d876b93afaaf6eb4f18.jpg",
    copy: "Offer language gets staged like an editorial feature, not a discount dump."
  },
  {
    title: "App to aisle",
    image: "bm-app.163efd85be34bea2686f.jpeg",
    copy: "Store selection, search, categories, brands, and in-store purchase stay visible."
  }
];

const steps = [
  ["Choose your store", "Start with the neighborhood location before showing the basket."],
  ["Build the errand", "Search, browse categories, and keep offers close to intent."],
  ["Collect with confidence", "Keep BigMart rooted in nearby shelves and real stores."]
];

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="BigMart home">
          <img src={`${assetBase}logo.a77926cc00794c2dac7a.png`} alt="BigMart" />
          <strong>BigMart</strong>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#market">Market</a>
          <a href="#app">App</a>
          <a href="#mission">Mission</a>
        </nav>
      </header>

      <section className="hero" aria-label="BigMart store selector concept">
        <img
          className="heroImage"
          src={`${assetBase}grocery-banner.2c56649c9cbe2e19b86f.png`}
          alt=""
        />
        <div className="selectorCard">
          <p>Your Neighbor · तपाईंको छिमेकी</p>
          <h1>Select your nearest BigMart.</h1>
          <div className="storeList" aria-label="Example store choices">
            {stores.map((store) => (
              <button key={store} type="button">
                {store}
              </button>
            ))}
          </div>
          <a href="#app">Open the app story</a>
        </div>
      </section>

      <section className="storyImage" aria-label="BigMart editorial story">
        <img src={`${assetBase}bm-app.163efd85be34bea2686f.jpeg`} alt="" />
        <div>
          <p className="eyebrow">Store to screen</p>
          <h2>What makes an honest neighborhood grocery app?</h2>
          <p>
            It should know where you shop, make the offer visible at the right moment,
            and keep the physical store at the center of the promise.
          </p>
        </div>
      </section>

      <section className="seasonBand" aria-label="Campaign promise">
        <span>Seek freshness</span>
        <strong>find your store</strong>
        <a href="#market">See the market</a>
      </section>

      <section className="market" id="market" aria-label="Market editorial cards">
        <div className="sectionTitle">
          <h2>In store now</h2>
          <a href="#app">App flow</a>
        </div>
        <div className="marketGrid">
          {marketCards.map((card) => (
            <article key={card.title}>
              <img src={`${assetBase}${card.image}`} alt="" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="appBand" id="app" aria-label="BigMart app concept">
        <div>
          <p className="eyebrow">Get more on the app</p>
          <h2>Let the phone do the remembering.</h2>
          <p>
            BigMart already has the pieces of a useful grocery companion: store selection,
            product search, category browsing, offer rails, and purchase context.
          </p>
        </div>
        <img src={`${assetBase}bm-app.163efd85be34bea2686f.jpeg`} alt="" />
      </section>

      <section className="steps" aria-label="How it works">
        {steps.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="mission" id="mission" aria-label="BigMart mission concept">
        <p className="eyebrow">Neighborhood proof</p>
        <h2>BigMart should own the daily distance between “I need this” and “I got it.”</h2>
        <p>
          The production version should confirm current service claims, store coverage, and
          brand approvals. The concept direction is clear: premium food energy, local utility,
          and app convenience without losing the neighborhood store.
        </p>
      </section>
    </main>
  );
}
