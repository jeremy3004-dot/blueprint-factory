import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import { createPageMetadata, writingCollectionJsonLd } from "../authority";

const path = "/writing";
const title = "Writing | Jeremy Joseph Curry";
const description =
  "Current engineering notes by Jeremy Joseph Curry on iOS releases, product interfaces, data contracts, bounded AI behavior, and deployment evidence.";

const articles = [
  {
    path: "/writing/shipping-ios-app-from-nepal",
    label: "Release engineering / iOS",
    title: "Shipping an iOS App from Nepal: My Release Evidence Method",
    description:
      "A practical evidence chain connecting reviewed source, IPA identity, TestFlight distribution, App Store metadata, and the public product page."
  },
  {
    path: "/writing/five-product-contracts",
    label: "Product engineering / Architecture",
    title: "From Idea to Launch: The Five Product Contracts I Define Before I Build",
    description:
      "Five concise contracts for keeping the problem, interface, data, AI behavior, and release path coherent from idea to launch."
  }
];

export const metadata: Metadata = createPageMetadata({
  path,
  title,
  description,
  type: "website"
});

export default function WritingIndex() {
  const jsonLd = writingCollectionJsonLd({ path, title, description, articles });

  return (
    <main className="subpage">
      <SiteNav />
      <div className="subpageBackdrop" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="writingIndexPage" aria-labelledby="writing-index-title">
        <header className="writingIndexHeader">
          <p className="eyebrow">Engineering writing</p>
          <h1 id="writing-index-title">Writing from the system boundaries outward.</h1>
          <p>{description}</p>
        </header>

        <div className="writingIndexGrid">
          {articles.map((article) => (
            <Link className="writingIndexCard" href={article.path} key={article.path}>
              <span>{article.label}</span>
              <strong>{article.title}</strong>
              <p>{article.description}</p>
              <span className="cardArrow" aria-hidden="true">
                Read the article -&gt;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <strong>Jeremy Joseph Curry</strong>
        <span>Software Engineer &amp; App Developer / Nepal</span>
        <span>
          <Link href="/about">About</Link> / <Link href="/links">All links</Link>
        </span>
        <a href="mailto:hello@jeremyjosephcurry.com">hello@jeremyjosephcurry.com</a>
      </footer>
    </main>
  );
}
