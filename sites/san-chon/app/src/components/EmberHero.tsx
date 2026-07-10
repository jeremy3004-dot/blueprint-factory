import { site } from "@/data/site";
import "@/styles/hero.css";

export function EmberHero() {
  return (
    <section className="ember-hero" aria-labelledby="ember-hero-title">
      <img
        className="ember-hero__image"
        src="/images/hero-table.png"
        alt="A Korean tabletop grill surrounded by a shared meal"
      />
      <div className="ember-hero__scrim" aria-hidden="true" />
      <div className="ember-hero__aperture" aria-hidden="true" />

      <div className="ember-hero__copy">
        <div className="ember-seal" aria-hidden="true">
          <span className="ember-seal__ring" />
          <span className="ember-seal__mark">산</span>
        </div>

        <h1 className="ember-hero__title display" id="ember-hero-title">
          <span>SAN CHON</span>
        </h1>
        <p className="ember-hero__category">{site.category}</p>
        <p className="ember-hero__korean" lang="ko">
          {site.koreanName}
        </p>
        <p className="ember-hero__lede">
          Korean comfort, tabletop fire, and a calm Lakeside room in Pokhara.
        </p>
        <a className="ember-hero__cta" href={site.phoneHref}>
          <span>Call to reserve</span>
        </a>
      </div>
    </section>
  );
}
