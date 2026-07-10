import type { Metadata } from "next";
import { EditorialIntro, ImageStory, InnerHero, InquiryBand } from "@/components/page-sections";
import { facts } from "@/data/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Seasonal yoga, fitness, workshops, kirtan, open-mic jamming, and art talks in North Lakeside.",
};

export default function EventsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Community at the Juicery"
        title="Gather around something good."
        lede="Movement, music, workshops, and conversation in season."
        image="/images/juicery/event-kirtan.jpg"
        imageAlt="A candlelit kirtan gathering at The Juicery Cafe"
      />
      <EditorialIntro label="What happens here" title="The cafe, after the plates are cleared.">
        <p>{facts.events}</p>
        <p>Programming changes with the season. Contact the cafe for the current calendar.</p>
      </EditorialIntro>
      <ImageStory
        image="/images/juicery/event-workshop.jpg"
        imageAlt="A group fitness and yoga class at The Juicery Cafe"
        label="Move together"
        title="Yoga, fitness, and workshops."
      >
        <p>The cafe's yogashala hosts seasonal classes and practical workshops.</p>
      </ImageStory>
      <ImageStory
        image="/images/juicery/event-kirtan.jpg"
        imageAlt="People gathered for kirtan at The Juicery Cafe"
        label="Listen together"
        title="Kirtan, open mics, and art talks."
        reverse
      >
        <p>Weekly kirtan, open-mic jamming, and art talks are part of the community programme.</p>
      </ImageStory>
      <InquiryBand label="Current schedule" title="Ask what's on while you're in Pokhara.">
        <p>Dates and booking details are not published reliably on the current site, so please contact the cafe directly.</p>
      </InquiryBand>
    </>
  );
}
