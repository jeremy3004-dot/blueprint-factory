import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type RevealStyle = CSSProperties & { "--delay"?: string };

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}

export function OutlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="outline-link" href={href}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function FramedImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`framed-image ${className}`} data-reveal>
      <div className="frame-corner frame-corner-a" aria-hidden="true" />
      <div className="frame-corner frame-corner-b" aria-hidden="true" />
      <div className="frame-corner frame-corner-c" aria-hidden="true" />
      <div className="frame-corner frame-corner-d" aria-hidden="true" />
      <Image src={src} alt={alt} fill sizes="(max-width: 760px) 88vw, 76vw" priority={priority} />
    </div>
  );
}

export function InnerHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  imagePosition,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}) {
  return (
    <section className="inner-hero">
      <Image
        src={image}
        alt={imageAlt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        style={{ objectPosition: imagePosition ?? "center" }}
      />
      <div className="inner-hero-veil" />
      <div className="inner-hero-copy">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </section>
  );
}

export function EditorialIntro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="editorial-intro pattern-field">
      <div className="narrow-copy">
        <div data-reveal>
          <SectionLabel>{label}</SectionLabel>
        </div>
        <h2 data-reveal style={{ "--delay": "100ms" } as RevealStyle}>
          {title}
        </h2>
        <div className="body-copy" data-reveal style={{ "--delay": "180ms" } as RevealStyle}>
          {children}
        </div>
      </div>
    </section>
  );
}

export function ImageStory({
  image,
  imageAlt,
  label,
  title,
  children,
  reverse = false,
  link,
}: {
  image: string;
  imageAlt: string;
  label: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
  link?: { href: string; label: string };
}) {
  return (
    <section className={`image-story ${reverse ? "is-reverse" : ""}`}>
      <div className="image-story-media" data-reveal>
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 760px) 100vw, 55vw" />
      </div>
      <div className="image-story-copy">
        <div data-reveal>
          <SectionLabel>{label}</SectionLabel>
        </div>
        <h2 data-reveal style={{ "--delay": "80ms" } as RevealStyle}>
          {title}
        </h2>
        <div className="body-copy" data-reveal style={{ "--delay": "160ms" } as RevealStyle}>
          {children}
        </div>
        {link ? (
          <div data-reveal style={{ "--delay": "220ms" } as RevealStyle}>
            <OutlineLink href={link.href}>{link.label}</OutlineLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function InquiryBand({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="inquiry-band">
      <div data-reveal>
        <SectionLabel>{label}</SectionLabel>
        <h2>{title}</h2>
        <div className="body-copy">{children}</div>
        <OutlineLink href="/contact">Contact the cafe</OutlineLink>
      </div>
    </section>
  );
}
