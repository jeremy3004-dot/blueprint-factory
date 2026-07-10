import { site } from "../lib/content";

export function BookingClose({ eyebrow = "Above Phewa Lake", title = "Ready for a quieter stay in Pokhara?" }: { eyebrow?: string; title?: string }) {
  return (
    <section className="booking-close">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p>Our team can help with rooms, dining, transfers and the details of your time in Sedi Hills.</p>
      <a className="book-link" href={site.booking}>Check availability</a>
    </section>
  );
}
