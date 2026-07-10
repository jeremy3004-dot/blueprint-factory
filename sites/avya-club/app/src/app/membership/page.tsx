import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { siteContent } from "../../content/site";

export default function MembershipPage() {
  const { contact, memberships, registrationUrl } = siteContent;

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow="Join Avya"
        heading="Membership"
        summary="Choose the Avya experience that fits how you move, recover, and recharge."
        action={{ href: registrationUrl, label: "Register with Avya" }}
      />

      <section className="membershipIndex" aria-label="Membership options">
        {memberships.map((group, index) => (
          <article className="membershipGroup" key={group.slug}>
            <p className="membershipGroupNumber">{String(index + 1).padStart(2, "0")}</p>
            <h2>{group.name}</h2>
            <ul>
              {group.options.map((option) => <li key={option}>{option}</li>)}
            </ul>
            <p className="membershipPriceNote">Contact Avya for current pricing</p>
          </article>
        ))}
      </section>

      <section className="membershipRegister" aria-labelledby="membership-register-heading">
        <div>
          <p className="sectionEyebrow">Ready when you are</p>
          <h2 id="membership-register-heading">Make Avya part of your rhythm.</h2>
        </div>
        <div className="membershipRegisterActions">
          <EditorialLink href={registrationUrl}>Register with Avya</EditorialLink>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={`tel:${contact.phones[0].replace(/\D/g, "")}`}>{contact.phones[0]}</a>
        </div>
      </section>
    </main>
  );
}
