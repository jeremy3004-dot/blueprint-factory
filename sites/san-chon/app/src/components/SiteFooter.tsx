import { InstagramIcon } from "@/components/Icons";
import { navItems, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top container">
        <a className="site-footer__crest" href="/" aria-label="San Chon home">
          <span lang="ko" aria-hidden="true">산촌</span>
          <span>San Chon</span>
        </a>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {navItems.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="site-footer__contact">
          <p>{site.shortAddress}</p>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon /> Instagram <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="site-footer__wordmark" aria-hidden="true">SAN CHON</div>

      <div className="site-footer__legal container">
        <span>© {new Date().getFullYear()} San Chon Korean Restaurant</span>
        <span>Pokhara, Nepal</span>
      </div>
    </footer>
  );
}
