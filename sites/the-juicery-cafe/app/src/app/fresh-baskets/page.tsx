import type { Metadata } from "next";
import { EditorialIntro, ImageStory, InnerHero, InquiryBand } from "../../components/page-sections";

export const metadata: Metadata = {
  title: "Fresh baskets",
  description: "Ask The Juicery Cafe about current fresh basket availability and delivery details in Pokhara.",
};

export default function FreshBasketsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Fresh baskets"
        title="Bring the season home."
        lede="A simple way to ask what is fresh, local, and available now."
        image="/images/juicery/brunch-wide.jpg"
        imageAlt="Fresh herbs held by a Juicery Cafe team member"
        imagePosition="center 34%"
      />
      <EditorialIntro label="From the cafe" title="Good produce starts with a conversation.">
        <p>
          Fresh baskets follow availability rather than a fixed catalogue. Ask the cafe what is coming in,
          what a basket contains, and whether collection or delivery is available for you.
        </p>
      </EditorialIntro>
      <ImageStory
        image="/images/juicery/bowl-wide.jpg"
        imageAlt="Fresh fruit, seeds, and coconut arranged in a bowl"
        label="Ask what's fresh"
        title="A simple conversation first."
      >
        <p>Message the cafe for today's produce, basket size, price, and the simplest way to receive it.</p>
      </ImageStory>
      <InquiryBand label="Fresh this week" title="Ask what is going into the next basket.">
        <p>Availability and contents change. A quick message is the best way to get the current details.</p>
      </InquiryBand>
    </>
  );
}
