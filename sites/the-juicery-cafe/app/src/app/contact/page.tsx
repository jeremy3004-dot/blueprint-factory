import type { Metadata } from "next";
import { InnerHero, OutlineLink, SectionLabel } from "../../components/page-sections";
import { contact } from "../../data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Visit or contact The Juicery Cafe in North Lakeside, Pokhara.",
};

export default function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="North Lakeside · Pokhara"
        title="See you at the cafe."
        lede={`Open ${contact.hours}, near Street 22A.`}
        image="/images/juicery/cafe-counter.jpg"
        imageAlt="The open-air counter at The Juicery Cafe in North Lakeside, Pokhara"
        imagePosition="center 48%"
      />
      <section className="contact-grid pattern-field">
        <div className="contact-heading" data-reveal>
          <SectionLabel>Visit</SectionLabel>
          <h2>A table in North Lakeside.</h2>
          <p>{contact.address}</p>
          <OutlineLink href={contact.mapHref}>Open in maps</OutlineLink>
        </div>
        <div className="contact-list">
          <div data-reveal>
            <span>Hours</span>
            <strong>{contact.hours}</strong>
          </div>
          <div data-reveal>
            <span>Phone</span>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          </div>
          <div data-reveal>
            <span>WhatsApp</span>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
              {contact.whatsappDisplay}
            </a>
          </div>
          <div data-reveal>
            <span>Email</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </section>
      <section className="contact-note">
        <p data-reveal>
          For current market dates, basket availability, event schedules, and cleansing programme details, contact
          the cafe directly using the details above.
        </p>
      </section>
    </>
  );
}
