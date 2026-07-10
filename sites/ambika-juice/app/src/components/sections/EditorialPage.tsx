import Link from "next/link";

interface EditorialPageProps {
  title: string;
  label?: string;
}

export function EditorialPage({ title, label = "Onyx Coffee Lab" }: EditorialPageProps) {
  return (
    <main id="main-content" className="editorialPage">
      <section className="innerHero">
        <p>{label}</p>
        <h1>{title}</h1>
      </section>
      <section className="innerStory">
        <p className="sectionEyebrow">Quality · Truth · Accountability</p>
        <h2>Built around hospitality, craft and a transparent journey.</h2>
        <p>This reference route preserves the donor's oversized editorial typography, warm-paper rhythm, compact labels, and image-led storytelling template.</p>
        <Link className="textLink" href="/pages/locations">Explore locations <span aria-hidden="true">→</span></Link>
      </section>
      <section className="innerMedia" aria-hidden="true"><span>ONYX</span></section>
    </main>
  );
}

