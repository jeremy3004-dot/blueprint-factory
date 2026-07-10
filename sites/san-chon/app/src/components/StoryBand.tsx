"use client";

import { type RefObject, useEffect } from "react";

export function useScrollReveal<T extends HTMLElement>(rootRef: RefObject<T | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [rootRef]);
}

const stories = [
  {
    eyebrow: "A quiet corner of Lakeside",
    title: "A calm room after a long day.",
    body: "Settle into a spacious dining room where warm wood, green walls, and a small reading corner invite you to stay a little longer.",
    image: "/images/dining-room.png",
    imageAlt: "San Chon's warm green and wood dining room",
  },
  {
    eyebrow: "Gather around the grill",
    title: "The best tables are shared.",
    body: "Bring friends, pass the banchan, and let dinner unfold over the tabletop fire. For groups, a quick call ahead helps the team prepare your table.",
    image: "/images/grill-fire.png",
    imageAlt: "Pork belly cooking over a tabletop Korean grill",
  },
] as const;

export default function StoryBand() {
  return (
    <>
      {stories.map((story, index) => (
        <section
          aria-labelledby={`story-band-title-${index}`}
          className={`story-band${index % 2 ? " story-band--reverse" : ""}`}
          key={story.title}
        >
          <div className="story-band__media" data-reveal>
            <img alt={story.imageAlt} src={story.image} />
          </div>
          <div className="story-band__copy">
            <p className="eyebrow" data-reveal>{story.eyebrow}</p>
            <h2
              className="display"
              data-reveal
              id={`story-band-title-${index}`}
              style={{ "--delay": "100ms" } as React.CSSProperties}
            >
              {story.title}
            </h2>
            <p data-reveal style={{ "--delay": "180ms" } as React.CSSProperties}>{story.body}</p>
            {index === 1 ? (
              <a data-reveal href="/visit" style={{ "--delay": "240ms" } as React.CSSProperties}>
                Plan your table <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
