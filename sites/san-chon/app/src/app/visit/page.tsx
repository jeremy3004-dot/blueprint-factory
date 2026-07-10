import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { RevealProvider } from "@/components/RevealProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VisitPanel } from "@/components/VisitPanel";

export const metadata: Metadata = {
  title: "Visit",
  description: "Find San Chon Korean Restaurant on Street 16 in Lakeside, Pokhara.",
};

const visitNotes = [
  {
    eyebrow: "Reservations",
    title: "A quick call helps.",
    text: "Public listings say reservations are accepted. Call ahead, especially for a group or a busy dinner hour.",
  },
  {
    eyebrow: "At the table",
    title: "Order to share.",
    text: "Guest reports often describe generous portions and a table that works best when barbecue, bowls, and sides are shared.",
  },
  {
    eyebrow: "First Korean meal?",
    title: "Ask the team.",
    text: "The staff are publicly noted for guiding guests through unfamiliar dishes and the tabletop grill.",
  },
  {
    eyebrow: "Hours",
    title: "Confirm before you go.",
    text: "Online listings commonly show daily noon–10 PM, but hours can change. Check Instagram before traveling.",
  },
] as const;

export default function VisitPage() {
  return (
    <>
      <RevealProvider />
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Street 16 · Lakeside"
          title="Come in. Slow down."
          copy="A calm Korean table in the middle of Lakeside—easy to reach, spacious enough to settle into, and ready for a meal shared over the grill."
          image="/images/dining-room.png"
          imagePosition="center 54%"
        />
        <section className="visitIntro container" aria-labelledby="before-you-visit">
          <h2 className="display" id="before-you-visit" data-reveal>Before you arrive.</h2>
          <div className="visitIntro__notes">
            {visitNotes.map((note, index) => (
              <article
                className="visitNote"
                data-reveal
                key={note.title}
                style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <p className="eyebrow">{note.eyebrow}</p>
                <h3 className="display">{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </section>
        <VisitPanel />
      </main>
      <SiteFooter />
    </>
  );
}
