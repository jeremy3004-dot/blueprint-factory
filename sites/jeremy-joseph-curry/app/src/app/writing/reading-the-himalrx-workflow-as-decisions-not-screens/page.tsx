import type { Metadata } from "next";
import Link from "next/link";
import ApprovedMarkdownArticle from "../../components/ApprovedMarkdownArticle";
import SiteNav from "../../components/SiteNav";
import { createPageMetadata, publishedArticleJsonLd } from "../../authority";

const path = "/writing/reading-the-himalrx-workflow-as-decisions-not-screens";
const title = "Reading the HimalRx Workflow as Decisions, Not Screens";
const description =
  "Jeremy Joseph Curry examines the publicly presented HimalRx workflow through batch-aware inventory, connected counter actions, role-specific views, alerts, history, and operational evidence.";
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

export default function ReadingTheHimalRxWorkflowAsDecisionsNotScreens() {
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
      <ApprovedMarkdownArticle sourceFile="himalrx-engineering-case-study.md" />

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
