import { siteContent } from "../../content/site";
import { EditorialLink } from "../EditorialLink";

const primaryMembership = siteContent.memberships[0];

export function MembershipCta() {
  return (
    <section className="homeMembershipCta" aria-labelledby="membership-cta-title">
      <div className="membershipStatement">
        <p className="sectionEyebrow">Avya Club membership</p>
        <h2 id="membership-cta-title">Pure energy. First light.</h2>
      </div>
      <div className="membershipSummary">
        <p className="sectionEyebrow">{primaryMembership.name}</p>
        <h3>Choose your way into Avya</h3>
        <ul className="membershipOptions">
          {primaryMembership.options.map((option) => (
            <li key={option}>{option}</li>
          ))}
        </ul>
        <ul className="membershipGroups" aria-label="More Avya membership groups">
          {siteContent.memberships.slice(1).map((membership) => (
            <li key={membership.slug}>{membership.name}</li>
          ))}
        </ul>
        <div className="membershipActions">
          <EditorialLink href="/membership">Explore membership</EditorialLink>
          <EditorialLink href={siteContent.registrationUrl}>Register with Avya</EditorialLink>
        </div>
      </div>
    </section>
  );
}
