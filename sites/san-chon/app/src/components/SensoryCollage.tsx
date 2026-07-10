"use client";

import { type CSSProperties, useRef } from "react";

import { useScrollReveal } from "./StoryBand";

const collageImages = [
  { src: "/images/grill-fire.png", alt: "Flame rising from the tabletop grill", className: "sensory__image--fire" },
  { src: "/images/menu-spread.png", alt: "Korean dishes arranged across a shared table", className: "sensory__image--spread" },
  { src: "/images/dining-room.png", alt: "The calm interior at San Chon", className: "sensory__image--room" },
  { src: "/images/hero-table.png", alt: "A Korean barbecue table ready for guests", className: "sensory__image--table" },
  { src: "/images/shared-feast.png", alt: "A colorful Korean feast for sharing", className: "sensory__image--feast" },
] as const;

export default function SensoryCollage() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  return (
    <section className="sensory" ref={rootRef} aria-labelledby="sensory-title">
      <div className="sensory__canvas container">
        <p className="eyebrow sensory__eyebrow" data-reveal>Fire. Sizzle. Stillness.</p>
        <h2 className="display sensory__title" data-reveal id="sensory-title" style={{ "--delay": "80ms" } as CSSProperties}>
          A table worth slowing down for.
        </h2>
        {collageImages.map((image, index) => (
          <figure
            className={`sensory__image ${image.className}`}
            data-reveal
            key={image.className}
            style={{ "--delay": `${(index % 2) * 100}ms` } as CSSProperties}
          >
            <img alt={image.alt} src={image.src} />
          </figure>
        ))}
      </div>
    </section>
  );
}
