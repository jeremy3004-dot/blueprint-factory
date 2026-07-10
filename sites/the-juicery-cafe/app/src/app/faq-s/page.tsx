import type { Metadata } from "next";
import { InnerHero, SectionLabel } from "../../components/page-sections";
import { contact, facts } from "../../data/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Opening hours, location, food, events, and contact details for The Juicery Cafe in Pokhara.",
};

const faqs = [
  {
    question: "Where is The Juicery Cafe?",
    answer: contact.address,
  },
  {
    question: "What time is the cafe open?",
    answer: `The current website lists opening hours as ${contact.hours}.`,
  },
  {
    question: "What kind of food and drinks do you serve?",
    answer: `${facts.food} ${facts.menuRange}`,
  },
  {
    question: "Are there vegetarian, vegan, gluten-free, or Halal options?",
    answer: facts.dietary,
  },
  {
    question: "Do you offer a juice cleansing programme?",
    answer: `${facts.cleansing} Contact the cafe for current availability and details.`,
  },
  {
    question: "How can I find the current event schedule?",
    answer: "Programming changes with the season. Contact the cafe directly for current dates and booking details.",
  },
];

export default function FaqPage() {
  return (
    <>
      <InnerHero
        eyebrow="Planning your visit"
        title="The useful details, in one place."
        lede="Confirmed answers from the cafe's current public information."
        image="/images/juicery/cafe-counter.jpg"
        imageAlt="The open-air counter at The Juicery Cafe"
      />
      <section className="faq-section pattern-field">
        <div className="faq-heading" data-reveal>
          <SectionLabel>Frequently asked</SectionLabel>
          <h2>Before you arrive.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question} data-reveal>
              <summary>
                <span>{faq.question}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
