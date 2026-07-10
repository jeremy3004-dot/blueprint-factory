import { EditorialLink } from "./EditorialLink";
import { MediaFrame } from "./MediaFrame";

interface InnerHeroProps {
  readonly action?: {
    readonly href: string;
    readonly label: string;
  };
  readonly eyebrow: string;
  readonly heading: string;
  readonly media?: {
    readonly alt: string;
    readonly src: string;
  };
  readonly summary: string;
}

export function InnerHero({ action, eyebrow, heading, media, summary }: InnerHeroProps) {
  return (
    <section className={`innerHero${media ? " innerHeroWithMedia" : ""}`}>
      {media ? (
        <>
          <MediaFrame className="innerHeroMedia" src={media.src} alt={media.alt} />
          <span className="innerHeroScrim" aria-hidden="true" />
        </>
      ) : null}
      <div className="innerHeroCopy">
        <p className="sectionEyebrow">{eyebrow}</p>
        <h1>{heading}</h1>
        <p className="innerHeroSummary">{summary}</p>
        {action ? <EditorialLink href={action.href}>{action.label}</EditorialLink> : null}
      </div>
    </section>
  );
}
