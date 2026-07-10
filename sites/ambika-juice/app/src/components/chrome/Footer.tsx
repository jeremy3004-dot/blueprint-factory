import Link from "next/link";

import { referenceNavigation } from "@/content/onyx-reference";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerPicks">
        {referenceNavigation[0].items.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
        ))}
      </div>
      <div className="footerGrid">
        <section className="footerNewsletter">
          <p>Join our pilgrimage</p>
          <h2>Quality, truth and accountability in coffee.</h2>
          <form>
            <label className="srOnly" htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" placeholder="Email address" />
            <button type="submit">GO</button>
          </form>
        </section>
        {referenceNavigation.map((group) => (
          <section key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </section>
        ))}
        <section>
          <p>Connect</p>
          <a href="https://www.instagram.com/onyxcoffeelab/">Instagram</a>
          <a href="https://www.youtube.com/@onyxcoffeelab">YouTube</a>
          <Link href="/pages/support">Contact</Link>
        </section>
      </div>
      <div className="footerWordmark" aria-hidden="true">ONYX</div>
      <div className="footerLegal">
        <span>© 2026 ONYX COFFEE LAB</span>
        <Link href="/policies/privacy-policy">PRIVACY</Link>
        <Link href="/policies/terms-of-service">TERMS</Link>
      </div>
    </footer>
  );
}

