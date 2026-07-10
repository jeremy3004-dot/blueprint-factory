import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { MediaFrame } from "../../components/MediaFrame";
import { siteContent } from "../../content/site";

export default function AboutPage() {
  const { about } = siteContent;
  const copy = siteContent.pageCopy.about;
  const aboutMedia = siteContent.media.find((asset) => asset.id === "about");

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        summary={copy.summary}
        action={{ href: "/services", label: "Explore our services" }}
      />

      <section className="aboutStory" aria-labelledby="about-story-heading">
        <div className="aboutStoryCopy">
          <p className="sectionEyebrow">{copy.sectionEyebrow}</p>
          <h2 id="about-story-heading">{copy.sectionHeading}</h2>
          <p>{about.story}</p>
          <p>{about.setting} {about.inclusivity}</p>
          <EditorialLink href="/contact">Plan your visit</EditorialLink>
        </div>
        {aboutMedia ? (
          <MediaFrame
            className="aboutStoryMedia"
            src={aboutMedia.src}
            alt={aboutMedia.alt}
            aspectRatio={`${aboutMedia.width} / ${aboutMedia.height}`}
          />
        ) : null}
      </section>
    </main>
  );
}
