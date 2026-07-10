import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { EmailIcon, MapPinIcon, PhoneIcon } from "../../components/icons";
import { siteContent } from "../../content/site";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Avya+Club+Gharipatan+Pokhara+Nepal";

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export default function ContactPage() {
  const { contact } = siteContent;

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow="Visit Avya"
        heading="Contact Avya Club"
        summary="Call, email, or get directions to Avya Club in Gharipatan, Pokhara."
        action={{ href: directionsUrl, label: "Get directions" }}
      />

      <section className="contactSplit" aria-labelledby="contact-details-heading">
        <div className="contactStatement">
          <p className="sectionEyebrow">Pokhara, Nepal</p>
          <h2 id="contact-details-heading">Come as you are.</h2>
          <address>
            {contact.street}<br />
            {contact.city}, {contact.country}
          </address>
          <p className="contactHours">{contact.hours}</p>
        </div>

        <div className="contactActions" aria-label="Contact actions">
          <a className="contactAction" href={`mailto:${contact.email}`}>
            <EmailIcon />
            <span><small>Email</small>{contact.email}</span>
          </a>
          {contact.phones.map((phone) => (
            <a className="contactAction" href={phoneHref(phone)} key={phone}>
              <PhoneIcon />
              <span><small>Call</small>{phone}</span>
            </a>
          ))}
          <a className="contactAction" href={directionsUrl} target="_blank" rel="noreferrer">
            <MapPinIcon />
            <span><small>Directions</small>Gharipatan, Pokhara</span>
          </a>
          <EditorialLink href="/services">Explore services</EditorialLink>
        </div>
      </section>
    </main>
  );
}
