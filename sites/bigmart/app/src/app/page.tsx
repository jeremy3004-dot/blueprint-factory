const assetBase = "/bigmart-assets/";

const appFeatures = [
  "My Store: Baluwatar-2",
  "Search by product",
  "Mahabachat offers",
  "In-store purchase"
];

const departments = [
  {
    name: "Fresh market",
    note: "Produce, fruit, bakery, and daily basket staples.",
    image: "grocery-banner.2c56649c9cbe2e19b86f.png"
  },
  {
    name: "Pantry rhythm",
    note: "Weekly shopping with better offer visibility.",
    image: "banner-deal1.0d876b93afaaf6eb4f18.jpg"
  },
  {
    name: "Fast top-up",
    note: "App-led lists, nearby collection, and quick household runs.",
    image: "bm-app.163efd85be34bea2686f.jpeg"
  }
];

const proofPoints = [
  ["2009", "Founded in Kathmandu"],
  ["Neighbor", "The public site promise"],
  ["App + store", "Browse, offer, collect"]
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="BigMart Nepal concept">
        <header className="masthead">
          <a className="logoMark" href="#top" aria-label="BigMart home">
            <img src={`${assetBase}logo.a77926cc00794c2dac7a.png`} alt="BigMart" />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#market">Market</a>
            <a href="#app">App</a>
            <a href="#stores">Stores</a>
          </nav>
        </header>

        <div className="heroBackdrop" aria-hidden="true">
          <div className="shutter shutterLeft" />
          <div className="shutter shutterRight" />
          <img
            className="produceHero"
            src={`${assetBase}grocery-banner.2c56649c9cbe2e19b86f.png`}
            alt=""
          />
          <img
            className="phoneHero"
            src={`${assetBase}bm-app.163efd85be34bea2686f.jpeg`}
            alt=""
          />
          <div className="priceStamp">Mahabachat</div>
        </div>

        <div className="heroCopy">
          <p className="eyebrow">Your Neighbor · तपाईंको छिमेकी</p>
          <h1>BigMart, made cinematic for the daily shop.</h1>
          <p>
            A campaign-style rebuild for Kathmandu shoppers: fresh aisles, visible
            offers, neighborhood stores, and the app as the bridge between intent and pickup.
          </p>
          <div className="heroActions">
            <a href="#app">See the app story</a>
            <a href="#market">Explore the market</a>
          </div>
        </div>

        <div className="ticker" aria-label="Service highlights">
          {appFeatures.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>
      </section>

      <section className="market" id="market" aria-label="BigMart market sections">
        <div className="sectionIntro">
          <p className="eyebrow">Retail with appetite</p>
          <h2>Stop selling groceries like a database. Sell the feeling of a better errand.</h2>
        </div>
        <div className="departmentGrid">
          {departments.map((department) => (
            <article key={department.name}>
              <img src={`${assetBase}${department.image}`} alt="" />
              <div>
                <h3>{department.name}</h3>
                <p>{department.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="appStory" id="app" aria-label="BigMart app story">
        <div className="phoneStage" aria-hidden="true">
          <img src={`${assetBase}bm-app.163efd85be34bea2686f.jpeg`} alt="" />
          <div className="appGlow" />
        </div>
        <div className="appCopy">
          <p className="eyebrow">Store in the pocket</p>
          <h2>The app should feel like a personal entrance, not an afterthought.</h2>
          <p>
            The real app already carries the strongest proof: store selection, product search,
            category browsing, brand rows, and offer rails. The site should stage those moments
            with confidence.
          </p>
          <dl>
            <div>
              <dt>Find</dt>
              <dd>Search and browse by category.</dd>
            </div>
            <div>
              <dt>Save</dt>
              <dd>Surface Mahabachat and voucher moments.</dd>
            </div>
            <div>
              <dt>Collect</dt>
              <dd>Keep the promise rooted in nearby stores.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="stores" id="stores" aria-label="Store promise">
        <div>
          <p className="eyebrow">Neighborhood proof</p>
          <h2>BigMart should own the distance between “I need this” and “I got it.”</h2>
        </div>
        <div className="proofGrid">
          {proofPoints.map(([value, label]) => (
            <article key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
