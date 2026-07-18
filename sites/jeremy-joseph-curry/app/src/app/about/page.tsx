import type { Metadata } from "next";
import Image from "next/image";
import ContentPage, { ContentBlock } from "../components/ContentPage";
import {
  authorityGraph,
  createPageMetadata,
  personJsonLd,
  PORTRAIT_ALT,
  profilePageJsonLd,
  VERIFIED_PROFILE_LINKS
} from "../authority";

export const metadata: Metadata = createPageMetadata({
  path: "/about",
  title: profilePageJsonLd.name,
  description:
    "About Jeremy Joseph Curry, a software engineer and independent app developer based in Nepal.",
  type: "profile"
});

export default function AboutPage() {
  const profileJsonLd = authorityGraph([personJsonLd, profilePageJsonLd]);

  return (
    <ContentPage
      eyebrow="About Jeremy"
      title="Software engineer, app developer, and product builder."
      intro="Jeremy Joseph Curry builds mobile apps, web applications, websites, backend systems, and AI-powered software from Nepal for people and teams anywhere."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <div className="projectLayout">
        <ContentBlock title="The short version">
          <Image
            className="aboutPortrait"
            src="/images/jeremy-joseph-curry-1x1.jpg"
            alt={PORTRAIT_ALT}
            width={1200}
            height={1200}
          />
          <p>
            I work across the whole product surface: shaping an idea, designing the interface,
            writing the app and backend, connecting the data, and getting the result into users&apos; hands.
          </p>
        </ContentBlock>
        <ContentBlock title="How I work">
          <p>
            I like practical software with a clear job to do. That means straightforward interfaces,
            dependable data flows, thoughtful mobile behavior, and enough polish that the product feels
            ready rather than merely demonstrated.
          </p>
        </ContentBlock>
      </div>
      <ContentBlock title="Focus areas">
        <div className="focusGrid">
          {[
            "iOS and Android apps",
            "React and Next.js web applications",
            "SaaS, dashboards, and business tools",
            "APIs, databases, and integrations",
            "AI features and automation",
            "Cloud deployment and product delivery"
          ].map((item) => <span key={item}>{item}</span>)}
        </div>
      </ContentBlock>
      <ContentBlock title="Verified profiles">
        <p>Jeremy Joseph Curry — Software Engineer &amp; App Developer in Nepal.</p>
        <div className="profileLinks">
          <a href={VERIFIED_PROFILE_LINKS[0]} target="_blank" rel="noreferrer">
            GitHub profile
          </a>
          <a href={VERIFIED_PROFILE_LINKS[1]} target="_blank" rel="noreferrer">
            Apple App Store developer page
          </a>
        </div>
      </ContentBlock>
      <div className="subpageCta">
        <p className="eyebrow">Work together</p>
        <h2>Freelance, product collaboration, or contract engineering.</h2>
        <a className="button buttonPrimary" href="mailto:hello@jeremyjosephcurry.com">Email Jeremy</a>
      </div>
    </ContentPage>
  );
}
