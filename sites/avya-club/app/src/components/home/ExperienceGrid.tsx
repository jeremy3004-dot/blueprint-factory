"use client";

import { useState } from "react";

import { siteContent, type Service } from "../../content/site";
import { EditorialLink } from "../EditorialLink";
import { MediaFrame } from "../MediaFrame";

interface ExperienceChapter {
  readonly title: string;
  readonly services: readonly Service[];
  readonly mediaId: "pure-energy" | "deep-recovery" | "club-house";
}

const experienceChapters: readonly ExperienceChapter[] = [
  {
    title: "GYM & Fitness",
    services: siteContent.services.slice(0, 4),
    mediaId: "pure-energy"
  },
  {
    title: "Physiotherapy",
    services: [siteContent.services[4], siteContent.services[5], siteContent.services[7]],
    mediaId: "deep-recovery"
  },
  {
    title: "Club House",
    services: [siteContent.services[6]],
    mediaId: "club-house"
  }
];

export function ExperienceGrid() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="experienceGrid" aria-labelledby="experience-grid-title">
      <div className="experienceMedia" aria-live="polite">
        {experienceChapters.map((chapter, index) => {
          const asset = siteContent.media.find((item) => item.id === chapter.mediaId)!;
          return (
            <MediaFrame
              alt={index === activeIndex ? asset.alt : ""}
              aria-hidden={index !== activeIndex}
              className={`experienceMediaLayer${index === activeIndex ? " isActive" : ""}`}
              key={chapter.title}
              src={asset.src}
            />
          );
        })}
      </div>

      <div className="experienceHeading">
        <p className="sectionEyebrow">What we provide</p>
        <h2 id="experience-grid-title">Move, recover, belong</h2>
      </div>

      <div className="experienceCards" role="list" aria-label="Avya experiences">
        {experienceChapters.map((chapter, index) => (
          <article
            className={`experienceCard${index === activeIndex ? " isActive" : ""}`}
            key={chapter.title}
            onMouseEnter={() => setActiveIndex(index)}
            role="listitem"
          >
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Show ${chapter.title}`}
              className="experienceCardSelect"
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{chapter.title}</strong>
            </button>
            <ul>
              {chapter.services.map((service) => (
                <li key={service.slug}>
                  <span>{service.name}</span>
                  <small>{service.summary}</small>
                </li>
              ))}
            </ul>
            <EditorialLink href="/services">Explore services</EditorialLink>
          </article>
        ))}
      </div>
    </section>
  );
}
