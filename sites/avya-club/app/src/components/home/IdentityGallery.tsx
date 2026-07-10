"use client";

import { useState } from "react";

import { siteContent } from "../../content/site";
import { EditorialLink } from "../EditorialLink";
import { MediaFrame } from "../MediaFrame";

const identityChapters = [
  {
    title: "Fitness & performance",
    body: `${siteContent.services[1].summary}. ${siteContent.services[2].summary}.`,
    href: "/services",
    media: siteContent.media.find((asset) => asset.id === "pure-energy")!
  },
  {
    title: "Recovery & wellbeing",
    body: `${siteContent.services[4].summary}. ${siteContent.services[5].summary}.`,
    href: "/about",
    media: siteContent.media.find((asset) => asset.id === "deep-recovery")!
  }
] as const;

export function IdentityGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="identityGallery" aria-labelledby="identity-gallery-title">
      <h2 className="srOnly" id="identity-gallery-title">
        The Avya identity
      </h2>
      <div className="identityMedia" aria-live="polite">
        {identityChapters.map((chapter, index) => (
          <MediaFrame
            alt={index === activeIndex ? chapter.media.alt : ""}
            aria-hidden={index !== activeIndex}
            className={`identityMediaLayer${index === activeIndex ? " isActive" : ""}`}
            key={chapter.title}
            src={chapter.media.src}
          />
        ))}
      </div>
      <div className="identityCards" role="list" aria-label="Avya identity chapters">
        {identityChapters.map((chapter, index) => (
          <article
            className={`identityCard${index === activeIndex ? " isActive" : ""}`}
            key={chapter.title}
            onMouseEnter={() => setActiveIndex(index)}
            role="listitem"
          >
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Show ${chapter.title}`}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{chapter.title}</strong>
            </button>
            <p>{chapter.body}</p>
            <EditorialLink href={chapter.href}>Explore</EditorialLink>
          </article>
        ))}
      </div>
    </section>
  );
}
