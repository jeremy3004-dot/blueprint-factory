import Link from "next/link";
import { site } from "../lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <img src="/media/mark.svg" alt="Dorje's Resort & Spa" />
          <p>Comfort, taste and quiet rejuvenation above Phewa Lake in Sedi Hills, Pokhara.</p>
        </div>
        <div className="footer-column">
          <h2>Inside Dorje&apos;s</h2>
          <Link href="/accommodation-in-pokhara">Stay</Link>
          <Link href="/tastes">Taste</Link>
          <a href="https://dorjes.com/spa-and-wellness/">Wellness</a>
          <a href="https://dorjes.com/resort/">The resort</a>
        </div>
        <div className="footer-column">
          <h2>Discover</h2>
          <a href="https://dorjes.com/about-dorje/">About Dorje</a>
          <a href="https://dorjes.com/sustainability/">Sustainability</a>
          <a href="https://dorjes.com/media-gallery/">Gallery</a>
          <a href="https://dorjes.com/contact/">Contact</a>
        </div>
        <div className="footer-column">
          <h2>Contact</h2>
          <span>{site.location}</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a>
          <a href={site.instagram}>Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dorje&apos;s Resort & Spa</span>
        <span>Client concept · booking remains with Dorje&apos;s existing system</span>
      </div>
    </footer>
  );
}
