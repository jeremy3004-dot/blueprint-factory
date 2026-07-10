import { siteContent } from "../../content/site";
import { EditorialLink } from "../EditorialLink";

export function IntroStory() {
  return (
    <section className="introStory" aria-labelledby="intro-story-title">
      <div className="introStoryLayout">
        <h2 id="intro-story-title">{siteContent.about.heading}</h2>
        <EditorialLink href="/about">Discover Avya</EditorialLink>
      </div>
    </section>
  );
}
