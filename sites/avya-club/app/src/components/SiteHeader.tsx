import { MobileMenu } from "./MobileMenu";
import { siteContent } from "../content/site";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <nav className="siteHeaderNav" aria-label="Primary navigation">
        <a className="siteLogo" href="/" aria-label="Avya Club home">
          Avya Club
        </a>

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
