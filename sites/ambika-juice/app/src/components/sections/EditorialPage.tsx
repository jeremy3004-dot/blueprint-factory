import Link from "next/link";
import { businessFacts, referenceProducts } from "@/content/ambika-content";

interface EditorialPageProps {
  title: string;
  label?: string;
}

export function EditorialPage({ title, label = "Ambika Juice · Pokhara" }: EditorialPageProps) {
  const isVisit = title.includes("Visit");
  const isMenu = title.includes("Menu");
  return (
    <main id="main-content" className="editorialPage">
      <section className="innerHero">
        <p>{label}</p>
        <h1>{title}</h1>
      </section>
      <section className="innerStory">
        <p className="sectionEyebrow">Fresh fruit · Made to order</p>
        <h2>{isMenu ? `${referenceProducts.length} favourites, one fresh counter.` : isVisit ? "Find us at Rastra Bank Chowk." : "A Pokhara stop for something fresh."}</h2>
        <p>{isVisit ? `${businessFacts.address}. ${businessFacts.hours}. Call ${businessFacts.phone}.` : "Ambika serves fresh juices, smoothies, lassi, milkshakes, fruit salads and house combinations, prepared when you order."}</p>
        <a className="textLink" href={isMenu ? "/collections/fresh-juices" : businessFacts.directionsUrl}>{isMenu ? "Browse the menu" : "Get directions"} <span aria-hidden="true">→</span></a>
      </section>
      <section className="innerMedia ambikaInnerMedia" aria-label="Ambika Juice counter"><span>AMBIKA</span></section>
    </main>
  );
}
