import type { Metadata } from "next";
import { EditorialIntro, ImageStory, InnerHero, InquiryBand } from "../../components/page-sections";

export const metadata: Metadata = {
  title: "Weekend market",
  description: "Ask The Juicery Cafe about current weekend market dates and participation in Pokhara.",
};

export default function WeekendMarketPage() {
  return (
    <>
      <InnerHero
        eyebrow="Weekend market"
        title="Meet us around the harvest."
        lede="Seasonal produce, familiar faces, and a reason to linger in Lakeside."
        image="/images/juicery/cafe-counter.jpg"
        imageAlt="The open-air counter at The Juicery Cafe in North Lakeside"
        imagePosition="center 48%"
      />
      <EditorialIntro label="When the market is on" title="A slower kind of weekend plan.">
        <p>
          Market dates and participants change through the year. The cafe can tell you what is happening this
          weekend, when to arrive, and whether there is space to take part.
        </p>
      </EditorialIntro>
      <ImageStory
        image="/images/juicery/cafe-portrait.jpg"
        imageAlt="Two smoothies served in glass jars at The Juicery Cafe"
        label="Before you visit"
        title="Ask for this weekend's plan."
        reverse
      >
        <p>Message the cafe for this weekend's date, hours, stalls, and participation details.</p>
      </ImageStory>
      <InquiryBand label="This weekend" title="Find out what is growing, pouring, and gathering.">
        <p>A quick message is the most reliable way to get the current market plan.</p>
      </InquiryBand>
    </>
  );
}
