import { InnerHero } from "../../components/InnerHero";
import { siteContent } from "../../content/site";

export default function GalleryPage() {
  const galleryMedia = siteContent.media.filter((asset) => asset.id !== "logo-main");
  const copy = siteContent.pageCopy.gallery;

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow={copy.eyebrow}
        heading={copy.heading}
        summary={copy.summary}
        action={{ href: "/contact", label: "Plan your visit" }}
      />

      <section className="galleryGrid" aria-label="Avya Club gallery">
        {galleryMedia.map((asset, index) => (
          <figure className={`galleryFigure galleryFigure${index + 1}`} key={asset.id}>
            <img
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
            />
            <figcaption>
              <span>{asset.alt}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
