"use client";

/* ==========================================================================
   media-gallery.tsx
   React / Next.js client component. Folding three-panel gallery.

   Faithful to the one-and-only-resorts `.foldingGallery`:
   - Click a panel to promote it (.isActive -> lift + full opacity); inactive
     panels dim/desaturate via CSS.
   - Prev/Next controls wrap with modulo, mirroring `nextJourney(direction)`.
   - The active caption is derived from the active index.

   Pair with media-gallery.css (class names are prefixed `mg-`).
   ========================================================================== */

import { useState } from "react";

export type GalleryItem = {
  title: string;
  label: string;
  image: string;
  copy: string;
};

type GalleryProps = {
  items: GalleryItem[];
};

export default function MediaGallery({ items }: GalleryProps) {
  const [active, setActive] = useState(0);
  const current = items[active];

  function move(direction: number) {
    setActive((current) => (current + direction + items.length) % items.length);
  }

  return (
    <section className="mg-root">
      <div className="mg-gallery" aria-live="polite">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.title}
            className={`mg-panel ${index === active ? "isActive" : ""}`}
            onClick={() => setActive(index)}
            aria-label={`Show ${item.title}`}
          >
            <img src={item.image} alt="" />
          </button>
        ))}
      </div>

      <article className="mg-caption">
        <h3>{current.title}</h3>
        <p>{current.copy}</p>
        <a href="#">Explore {current.label}</a>
        <div className="mg-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous" />
          <span />
          <button type="button" onClick={() => move(1)} aria-label="Next" />
        </div>
      </article>
    </section>
  );
}
