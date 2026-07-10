import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { siteContent } from "../../content/site";

const serviceIcons: Readonly<Record<string, string>> = {
  "swimming-pool": "https://avya.club/assets/img/icons/swim.png",
  "gym-fitness": "https://avya.club/assets/img/icons/gym.png",
  "functional-fitness": "https://avya.club/assets/img/icons/fitness.png",
  "tennis-court": "https://avya.club/assets/img/icons/court.png",
  physiotherapy: "https://avya.club/assets/img/icons/therapy.png",
  "massage-spa": "https://avya.club/assets/img/icons/spa.png",
  "club-house": "https://avya.club/assets/img/icons/club.png",
  "wellbeing-nutrition": "https://avya.club/assets/img/icons/wellbeing.png"
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
