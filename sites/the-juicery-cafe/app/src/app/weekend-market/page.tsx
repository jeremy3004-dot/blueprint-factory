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
        lede="Current dates and participation details are being refreshed."
        image="/images/juicery/smoothies.jpg"
        imageAlt="The entrance to The Juicery Cafe in North Lakeside"
      />
      <EditorialIntro label="A useful reset" title="Real details, not old template copy.">
        <p>
          The previous page mixed in unrelated information about California vendors and events. This rebuilt page
          keeps the market route available without repeating claims the cafe has not confirmed.
        </p>
      </EditorialIntro>
      <ImageStory
        image="/images/juicery/cafe-portrait.jpg"
        imageAlt="Two smoothies served in glass jars at The Juicery Cafe"
        label="Before you visit"
        title="Ask for this weekend's plan."
        reverse
      >
        <p>Contact the cafe for current opening dates, stall information, and ways to take part.</p>
      </ImageStory>
      <InquiryBand label="Needs client input" title="Dates, vendors, and participation details.">
        <p>This page is ready for confirmed market information as soon as the cafe provides it.</p>
      </InquiryBand>
    </>
  );
}
