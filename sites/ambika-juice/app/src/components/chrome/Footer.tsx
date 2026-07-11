import Link from "next/link";

import { businessFacts, referenceNavigation } from "@/content/ambika-content";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerGrid">
        <div className="footerNewsletter">
          <p>Fresh in Pokhara</p>
          <h2>Fruit, ice, and a drink made just for you.</h2>
          <a className="darkButton" href={businessFacts.directionsUrl}>GET DIRECTIONS</a>
        </div>
        {referenceNavigation.map((group) => (
          <section key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </section>
        ))}
        <section>
          <p>Visit</p>
          <a href={`tel:${businessFacts.phone.replaceAll(" ", "")}`}>{businessFacts.phone}</a>
          <span>{businessFacts.address}</span>
          <a href={businessFacts.directionsUrl}>Get Directions</a>
        </section>
      </div>
      <div className="footerWordmark" aria-hidden="true">AMBIKA</div>
      <div className="footerLegal">
        <span>© 2026 AMBIKA JUICE · POKHARA</span>
        <Link href="/policies/privacy-policy">PRIVACY</Link>
        <Link href="/policies/terms-of-service">TERMS</Link>
      </div>
    </footer>
  );
}
