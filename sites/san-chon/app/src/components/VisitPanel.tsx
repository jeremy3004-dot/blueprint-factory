import { ArrowIcon, InstagramIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { site } from "@/data/site";

export function VisitPanel() {
  return (
    <section className="visit-panel" id="visit" aria-labelledby="visit-title">
      <div
        className="visit-panel__map"
        aria-label="Stylized street map showing San Chon on Street 16 in Lakeside"
        role="img"
      >
        <div className="street-grid" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
          <i className="street-grid__road street-grid__road--horizontal" />
          <i className="street-grid__road street-grid__road--vertical" />
          <b className="street-grid__label street-grid__label--lakeside">Lakeside</b>
          <b className="street-grid__label street-grid__label--street">Street 16</b>
          <span className="street-grid__marker"><span lang="ko">산촌</span></span>
        </div>
      </div>

      <div className="visit-panel__info">
        <p className="eyebrow">Come find us</p>
        <h2 className="display" id="visit-title">A Korean table<br />in Lakeside.</h2>
        <p className="visit-panel__lede">
          Settle in for tabletop barbecue, comforting bowls, and an unhurried meal on Street 16.
        </p>

        <dl className="visit-panel__details">
          <div>
            <dt><MapPinIcon /> Location</dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>{site.hours}<small>{site.hoursQualifier}</small></dd>
          </div>
          <div>
            <dt><PhoneIcon /> Contact</dt>
            <dd><a href={site.phoneHref}>{site.phoneDisplay}</a></dd>
          </div>
        </dl>

        <div className="visit-panel__actions">
          <a className="shell-button shell-button--cream" href={site.phoneHref}>Call to reserve</a>
          <a className="shell-button" href={site.directions} target="_blank" rel="noreferrer">
            Open directions <ArrowIcon />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="visit-panel__instagram" href={site.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon /> Instagram <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
