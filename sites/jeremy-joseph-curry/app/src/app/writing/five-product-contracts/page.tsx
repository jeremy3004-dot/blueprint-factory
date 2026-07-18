import type { Metadata } from "next";
import Link from "next/link";
import ApprovedMarkdownArticle from "../../components/ApprovedMarkdownArticle";
import SiteNav from "../../components/SiteNav";
import { createPageMetadata, publishedArticleJsonLd } from "../../authority";

const path = "/writing/five-product-contracts";
const title = "From Idea to Launch: The Five Product Contracts I Define Before I Build";
const description =
  "Jeremy Joseph Curry explains five product contracts for problem definition, interface states, data integrity, bounded AI behavior, and release evidence.";
const publicationDate = "2026-07-18";
const publicationDateTime = `${publicationDate}T00:00:00.000Z`;

export const metadata: Metadata = createPageMetadata({
  path,
  title,
  description,
  type: "article",
  publishedTime: publicationDateTime,
  modifiedTime: publicationDateTime
});

export default function FiveProductContracts() {
  const jsonLd = publishedArticleJsonLd({
    path,
    title,
    description,
    datePublished: publicationDate,
    dateModified: publicationDate
  });

  return (
    <main className="subpage">
      <SiteNav />
      <div className="subpageBackdrop" aria-hidden="true" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link className="articleBack" href="/writing">
        &lt;- Back to Writing
      </Link>
      <ApprovedMarkdownArticle sourceFile="product-from-idea-to-launch.md" />

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
