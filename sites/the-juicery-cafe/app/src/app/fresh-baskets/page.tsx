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
        lede="Availability, contents, pricing, and delivery areas need confirmation from the cafe."
        image="/images/juicery/brunch-wide.jpg"
        imageAlt="Fresh herbs held by a Juicery Cafe team member"
        imagePosition="center 34%"
      />
      <EditorialIntro label="From the current site" title="The basket idea stays. Unsupported promises go.">
        <p>
          The cafe maintains a Fresh Baskets page, but its current copy is an unfinished template. This version
          offers a direct inquiry path without promising stock, pricing, contents, or free delivery.
        </p>
      </EditorialIntro>
      <ImageStory
        image="/images/juicery/bowl-wide.jpg"
        imageAlt="Fresh fruit, seeds, and coconut arranged in a bowl"
        label="Ask what's fresh"
        title="A simple conversation first."
      >
        <p>Contact the cafe to ask whether baskets are currently available and what is included.</p>
      </ImageStory>
      <InquiryBand label="Needs client input" title="Availability, contents, price, and delivery area.">
        <p>This page is ready to become a live offer once those four details are confirmed.</p>
      </InquiryBand>
    </>
  );
}
