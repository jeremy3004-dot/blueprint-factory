import { siteContent } from "../../content/site";
import { EditorialLink } from "../EditorialLink";
import { MediaFrame } from "../MediaFrame";

const [aboutMedia, identityMedia] = siteContent.media.filter((asset) =>
  ["about", "identity"].includes(asset.id)
);

const overviewChapters = [
  {
    eyebrow: "Our origin",
    heading: `Founded in ${siteContent.about.foundedYear}`,
    body: siteContent.about.story,
    media: aboutMedia
  },
  {
    eyebrow: "One comprehensive club",
    heading: `${siteContent.about.campusSquareFeet.toLocaleString("en-US")}-square-foot club`,
    body: `${siteContent.about.heading} in ${siteContent.contact.city}, ${siteContent.contact.country}.`,
    media: identityMedia
  },
  {
    eyebrow: "The Avya experience",
    heading: "Fitness, healing, and mindfulness",
    body: siteContent.about.summary,
    media: aboutMedia
  }
] as const;

export function ClubOverview() {
  return (
    <section className="clubOverview" aria-label="About Avya Club">
      {overviewChapters.map((chapter, index) => (
        <article
          className={`overviewRow${index % 2 === 1 ? " overviewRowReverse" : ""}`}
          key={chapter.eyebrow}
        >
          <MediaFrame
            alt={chapter.media?.alt ?? ""}
            className="overviewMedia"
            objectPosition={index === 1 ? "center" : "center 42%"}
            src={chapter.media?.src ?? ""}
          />
          <div className="overviewCard">
            <p className="sectionEyebrow">{chapter.eyebrow}</p>
            <h2>{chapter.heading}</h2>
            <p>{chapter.body}</p>
            <EditorialLink href="/about">Our story</EditorialLink>
          </div>
        </article>
      ))}
    </section>
  );
}
