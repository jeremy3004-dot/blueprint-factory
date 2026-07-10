import { EditorialLink } from "../../components/EditorialLink";
import { InnerHero } from "../../components/InnerHero";
import { siteContent } from "../../content/site";

export default function GalleryPage() {
  // These are the source-backed Avya media records captured in Task 1. Task 7
  // remains responsible for local download and final production clearance.
  const galleryMedia = siteContent.media.filter((asset) => asset.id !== "logo-main");

  return (
    <main className="innerPage">
      <InnerHero
        eyebrow="Inside Avya"
        heading="Gallery"
        summary="A look at the spaces that bring movement, recovery, and community together."
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
              <EditorialLink href={asset.sourceUrl} aria-label={`View source for ${asset.alt}`}>
                Source
              </EditorialLink>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
