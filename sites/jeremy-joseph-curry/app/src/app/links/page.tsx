import type { Metadata } from "next";
import ContentPage, { ContentBlock } from "../components/ContentPage";
import { createPageMetadata } from "../authority";

export const metadata: Metadata = createPageMetadata({
  path: "/links",
  title: "Jeremy Joseph Curry Links | Apps and Projects",
  description: "Official links for Jeremy Joseph Curry, including public apps, websites, and software projects.",
  type: "website"
});

const links = [
  ["LinkedIn profile", "Public professional profile", "https://www.linkedin.com/in/jeremyjosephcurry"],
  ["GitHub profile", "Public developer profile and selected work", "https://github.com/jeremy3004-dot"],
  ["Apple App Store developer page", "Public iOS releases and developer profile", "https://apps.apple.com/us/developer/jeremy-joseph-curry/id1867562495"],
  ["Bible Trivia Quest", "Bible trivia and study app for iPhone and iPad", "https://apps.apple.com/qa/app/bible-trivia-quest/id6762559649"],
  ["HimalRx", "Pharmacy operations software for Nepal", "https://himalrx.com"],
  ["GPTrek", "Trekking discovery and planning platform", "https://gptrek.com"],
  ["Gurkha Fit", "Training and fitness app", "https://www.gurkhafit.app"]
];

export default function LinksPage() {
  return (
    <ContentPage
      eyebrow="Official links"
      title="The current Jeremy Joseph Curry trail."
      intro="A compact index of the public apps, products, and project sites connected to Jeremy Joseph Curry&apos;s work as a software engineer and app developer."
    >
      <ContentBlock title="Projects and profiles">
        <div className="linkList">
          {links.map(([title, detail, href]) => (
            <a className="linkRow" href={href} target="_blank" rel="noreferrer" key={href}>
              <span><strong>{title}</strong><small>{detail}</small></span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          ))}
        </div>
      </ContentBlock>
      <ContentBlock title="Contact">
        <p>For software projects, app development, product collaborations, and remote contract work:</p>
        <a className="textLink" href="mailto:hello@jeremyjosephcurry.com">hello@jeremyjosephcurry.com</a>
      </ContentBlock>
    </ContentPage>
  );
}
