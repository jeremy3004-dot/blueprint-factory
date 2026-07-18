import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="siteHeader" aria-label="Site header">
      <Link className="brand" href="/" aria-label="Jeremy Joseph Curry home">
        <span className="brandMark">J</span>
        <span>Jeremy Joseph Curry</span>
      </Link>
      <nav className="siteNav" aria-label="Primary navigation">
        <Link href="/writing">Writing</Link>
        <Link href="/about">About</Link>
        <Link href="/links">Links</Link>
        <a className="headerLink" href="mailto:hello@jeremyjosephcurry.com">
          Contact
        </a>
      </nav>
    </header>
  );
}
