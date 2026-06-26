const aisles = ["Fresh", "Pantry", "Home", "Offers"];

const services = [
  {
    label: "Loyalty",
    title: "Vouchers that feel visible",
    detail: "A receipt-style panel makes savings, purchase history, and offers easy to scan."
  },
  {
    label: "Nearby",
    title: "Store-first convenience",
    detail: "The concept keeps BigMart rooted in neighborhood shopping instead of pretending to be a warehouse."
  },
  {
    label: "Mobile",
    title: "Browse, order, collect",
    detail: "App-led actions are framed around product search, cart building, and pickup confidence."
  }
];

const categories = ["Vegetables", "Dairy", "Snacks", "Cleaning", "Bakery", "Daily Offers"];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="BigMart neighborhood grocery concept">
        <nav className="topbar" aria-label="Primary">
          <a className="brand" href="#top" aria-label="BigMart home">
            <span>Big</span>Mart
          </a>
          <div className="navLinks">
            <a href="#offers">Offers</a>
            <a href="#loyalty">Loyalty</a>
            <a href="#categories">Aisles</a>
          </div>
        </nav>

        <div className="heroCopy">
          <p className="eyebrow">Kathmandu neighborhood grocery</p>
          <h1>Groceries that know the route home.</h1>
          <p className="lede">
            A brighter BigMart concept for nearby aisles, live offers, loyalty receipts,
            and app-assisted collection.
          </p>
          <div className="actions" aria-label="Primary actions">
            <a href="#offers">See today&apos;s offers</a>
            <a href="#loyalty">Track loyalty</a>
          </div>
        </div>

        <div className="routeStage" aria-hidden="true">
          <div className="mapLabel">Neighborhood route</div>
          <div className="routeLine" />
          {aisles.map((aisle, index) => (
            <div className={`aisle aisle${index + 1}`} key={aisle}>
              <span>{aisle}</span>
            </div>
          ))}
          <div className="offerTag">Save Rs. 120</div>
          <div className="pickupTag">Collect nearby</div>
          <div className="receipt">
            <span>BIGMART REWARDS</span>
            <strong>Voucher ready</strong>
            <small>Purchase history synced</small>
          </div>
        </div>
      </section>

      <section className="serviceBand" id="offers" aria-label="BigMart service highlights">
        {services.map((service) => (
          <article key={service.title}>
            <p>{service.label}</p>
            <h2>{service.title}</h2>
            <span>{service.detail}</span>
          </article>
        ))}
      </section>

      <section className="loyalty" id="loyalty" aria-label="Loyalty and app concept">
        <div>
          <p className="eyebrow">Phone to store</p>
          <h2>Make the app feel like a useful shopping companion.</h2>
          <p>
            The page centers the practical things shoppers already expect: offers,
            purchase history, vouchers, product browsing, and a clear collection path.
          </p>
        </div>
        <div className="phoneShell" aria-hidden="true">
          <div className="phoneTop">BigMart</div>
          <div className="savingsMeter">
            <span />
          </div>
          <div className="phoneRows">
            <span>Fresh basket</span>
            <span>Voucher</span>
            <span>Pickup slot</span>
          </div>
        </div>
      </section>

      <section className="categories" id="categories" aria-label="Shopping categories">
        <div className="sectionHead">
          <p className="eyebrow">Aisles with rhythm</p>
          <h2>Everyday categories, treated like a brand system.</h2>
        </div>
        <div className="categoryGrid">
          {categories.map((category) => (
            <article key={category}>
              <span />
              <h3>{category}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
