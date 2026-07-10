import Link from "next/link";

import { MobileMenu } from "./MobileMenu";
import { siteContent } from "../content/site";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <nav className="siteHeaderNav" aria-label="Primary navigation">
        <Link className="siteLogo" href="/" aria-label="Avya Club home">
          <img src="/brand/avya-club-logo.png" alt="Avya Club" width="133" height="72" />
        </Link>

        <ul className="desktopNav">
          {siteContent.routes.map((route) => (
            <li key={route.href}>
              <a href={route.href}>{route.label}</a>
            </li>
          ))}
        </ul>

        <a
          className="membershipCta"
          href={siteContent.registrationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Membership
        </a>

        <MobileMenu routes={siteContent.routes} registrationUrl={siteContent.registrationUrl} />
      </nav>
    </header>
  );
}
