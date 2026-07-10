import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { MediaFrame } from "../../components/MediaFrame";
import { siteContent } from "../../content/site";

export default function AboutPage() {
  const { about } = siteContent;
  const aboutMedia = siteContent.media.find((asset) => asset.id === "about");

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow="About Avya"
        heading={about.heading}
        summary={about.summary}
        action={{ href: "/services", label: "Explore our services" }}
      />

      <section className="aboutStory" aria-labelledby="about-story-heading">
        <div className="aboutStoryCopy">
          <p className="sectionEyebrow">Pure &amp; first light</p>
          <h2 id="about-story-heading">Wellbeing with room to grow</h2>
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
