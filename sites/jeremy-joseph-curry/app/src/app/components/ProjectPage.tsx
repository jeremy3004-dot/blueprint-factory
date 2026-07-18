import ContentPage, { ContentBlock } from "./ContentPage";
import { articleJsonLd } from "../authority";

type ProjectPageProps = {
  label: string;
  title: string;
  intro: string;
  detail: string;
  capabilities: string[];
  href: string;
  linkLabel: string;
  path: string;
  metadataTitle: string;
  metadataDescription: string;
};

export default function ProjectPage({
  label,
  title,
  intro,
  detail,
  capabilities,
  href,
  linkLabel,
  path,
  metadataTitle,
  metadataDescription
}: ProjectPageProps) {
  const projectJsonLd = articleJsonLd({
    path,
    title: metadataTitle,
    description: metadataDescription
  });

  return (
    <ContentPage eyebrow={label} title={title} intro={intro}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="projectLayout">
        <ContentBlock title="What it is">
          <p>{detail}</p>
          <a className="textLink" href={href} target="_blank" rel="noreferrer">
            {linkLabel} <span aria-hidden="true">-&gt;</span>
          </a>
        </ContentBlock>
        <ContentBlock title="What it demonstrates">
          <ul className="detailList">
            {capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </ContentBlock>
      </div>
      <ContentBlock title="Jeremy's role">
        <p>
          Jeremy Joseph Curry — Software Engineer &amp; App Developer. This project is presented as
          part of Jeremy&apos;s public software engineering portfolio.
        </p>
        <a className="textLink" href="/about">About Jeremy Joseph Curry</a>
      </ContentBlock>
      <div className="subpageCta">
        <p className="eyebrow">Have a product in mind?</p>
        <h2>Bring the idea. Let&apos;s build the useful version.</h2>
        <a className="button buttonPrimary" href="mailto:hello@jeremyjosephcurry.com">
          Start a conversation
        </a>
      </div>
    </ContentPage>
  );
}
