import { SiteShell } from "@/components/site-shell";
import { travelFaqItems } from "@/data/green-pastures";

export default function FaqPage() {
  return (
    <SiteShell>
      <section className="pageHero shell">
        <p className="kicker">Trail notes</p>
        <h1>
          Clear answers before the mountain gets <em>real</em>.
        </h1>
        <p>
          Permits, altitude, insurance, women-led guide matching, private departures, and the little
          details that make a Himalayan trip feel held.
        </p>
      </section>
      <section className="faqList shell">
        {travelFaqItems.map((item) => (
          <article key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
