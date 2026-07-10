import "@/styles/pages.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imagePosition?: string;
};

export function PageHero({ eyebrow, title, copy, image, imagePosition = "center" }: PageHeroProps) {
  return (
    <section className="pageHero" aria-labelledby="page-title">
      <img
        className="pageHero__image"
        src={image}
        alt=""
        style={{ objectPosition: imagePosition }}
      />
      <div className="pageHero__scrim" />
      <div className="pageHero__copy container" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display" id="page-title">{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}
