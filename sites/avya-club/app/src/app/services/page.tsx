import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { siteContent } from "../../content/site";

const serviceIcons: Readonly<Record<string, string>> = {
  "swimming-pool": "/icons/avya-swimming-pool.png",
  "gym-fitness": "/icons/avya-gym-fitness.png",
  "functional-fitness": "/icons/avya-functional-fitness.png",
  "tennis-court": "/icons/avya-tennis-court.png",
  physiotherapy: "/icons/avya-physiotherapy.png",
  "massage-spa": "/icons/avya-massage-spa.png",
  "club-house": "/icons/avya-club-house.png",
  "wellbeing-nutrition": "/icons/avya-wellbeing-nutrition.png"
};

export default function ServicesPage() {
  const copy = siteContent.pageCopy.services;

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        summary={copy.summary}
        action={{ href: "/contact", label: "Ask Avya about services" }}
      />

      <section className="serviceIndex" aria-label="Avya Club services">
        {siteContent.services.map((service, index) => (
          <article className="serviceCard" key={service.slug}>
            <div className="serviceCardNumber" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <img
              className="serviceCardIcon"
              src={serviceIcons[service.slug]}
              alt=""
              width="64"
              height="64"
            />
            <h2>{service.name}</h2>
            <p>{service.summary}</p>
            <EditorialLink href="/contact">Contact Avya</EditorialLink>
          </article>
        ))}
      </section>
    </main>
  );
}
