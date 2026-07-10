import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { siteContent } from "../../content/site";

export default function MembershipPage() {
  const { contact, memberships, registrationUrl } = siteContent;
  const copy = siteContent.pageCopy.membership;

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        summary={copy.summary}
        action={{ href: registrationUrl, label: copy.sectionEyebrow }}
      />

      <section className="membershipIndex" aria-label="Membership options">
        {memberships.map((group, index) => (
          <article className="membershipGroup" key={group.slug}>
            <p className="membershipGroupNumber">{String(index + 1).padStart(2, "0")}</p>
            <h2>{group.name}</h2>
            <ul>
              {group.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section className="membershipRegister" aria-labelledby="membership-register-heading">
        <div>
          <p className="sectionEyebrow">{copy.sectionEyebrow}</p>
          <h2 id="membership-register-heading">{copy.sectionHeading}</h2>
        </div>
        <div className="membershipRegisterActions">
          <EditorialLink href={registrationUrl}>{copy.sectionEyebrow}</EditorialLink>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phones[0].replace(/\D/g, "")}`}>{contact.phones[0]}</a>
        </div>
      </section>
    </main>
  );
}
