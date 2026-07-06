"use client";

/* ==========================================================================
   carousel.tsx
   React / Next.js client component. Tab-filtered prev/active/next carousel.

   Faithful to the four-seasons `.propertyStage` featured carousel:
   - ARIA tablist with roving tabIndex + arrow-key handler.
   - Modulo wrap for previousIndex / nextIndex / next / previous.
   - The entrance keyframes re-fire because the backdrop uses key={active.image}
     and the card uses key={active.location} — remounting the node replays the
     CSS animation with no JS animation code.

   Pair with carousel.css (class names are prefixed `crs-`).
   ========================================================================== */

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useState } from "react";

export type CarouselSlide = {
  location: string;
  type: string;
  image: string;
  copy: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  /** Optional CTA click handler (e.g. open a booking sheet). */
  onSelect?: (slide: CarouselSlide) => void;
};

function slug(text: string) {
  return text.replace(/\s+/g, "-").toLowerCase();
}

export default function Carousel({ slides, onSelect }: CarouselProps) {
  // Unique tab types, in first-seen order.
  const types = slides.reduce<string[]>((acc, slide) => {
    if (!acc.includes(slide.type)) acc.push(slide.type);
    return acc;
  }, []);

  const [activeType, setActiveType] = useState(types[0]);
  const [active, setActive] = useState(0);

  const pool = slides.filter((slide) => slide.type === activeType);
  const activeIndex = pool.length > 0 ? active % pool.length : 0;
  const current = pool[activeIndex] ?? slides[0];
  const previousIndex = (activeIndex - 1 + pool.length) % pool.length;
  const nextIndex = (activeIndex + 1) % pool.length;
  const previousPreview = pool[previousIndex];
  const nextPreview = pool[nextIndex];

  function next() {
    setActive((value) => (value + 1) % pool.length);
  }

  function previous() {
    setActive((value) => (value - 1 + pool.length) % pool.length);
  }

  function selectType(type: string) {
    setActiveType(type);
    setActive(0);
  }

  function handleTypeKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    type: string
  ) {
    const currentIndex = types.indexOf(type);
    const offset =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (offset === 0) return;
    event.preventDefault();
    const nextType = types[(currentIndex + offset + types.length) % types.length];
    selectType(nextType);
    document.getElementById(`crs-tab-${slug(nextType)}`)?.focus();
  }

  return (
    <section className="crs-root">
      <div className="crs-tabs" role="tablist" aria-label="Categories">
        {types.map((type) => (
          <button
            type="button"
            key={type}
            id={`crs-tab-${slug(type)}`}
            role="tab"
            aria-selected={activeType === type}
            aria-controls="crs-panel"
            tabIndex={activeType === type ? 0 : -1}
            className={activeType === type ? "isActive" : ""}
            onClick={() => selectType(type)}
            onKeyDown={(event) => handleTypeKeyDown(event, type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div
        className="crs-stage"
        id="crs-panel"
        role="tabpanel"
        aria-live="polite"
        aria-labelledby={`crs-tab-${slug(activeType)}`}
      >
        {/* key={current.image} remounts -> re-fires crs-imageIn */}
        <img className="crs-backdrop" key={current.image} src={current.image} alt="" />

        {previousPreview && pool.length > 1 && (
          <button
            type="button"
            className="crs-preview"
            onClick={() => setActive(previousIndex)}
            aria-label={`Show ${previousPreview.location}`}
          >
            <img src={previousPreview.image} alt="" />
            <span>Previous</span>
            <strong>{previousPreview.location}</strong>
          </button>
        )}

        {/* key={current.location} remounts -> re-fires crs-cardIn */}
        <article className="crs-card" key={current.location}>
          <img
            className="crs-card-media"
            src={current.image}
            alt={`${current.location} preview`}
          />
          <div className="crs-card-body">
            <p>{current.type}</p>
            <h3>{current.location}</h3>
            <span>{current.copy}</span>
            <button type="button" onClick={() => onSelect?.(current)}>
              View
            </button>
          </div>
        </article>

        {nextPreview && pool.length > 1 && (
          <button
            type="button"
            className="crs-preview"
            onClick={() => setActive(nextIndex)}
            aria-label={`Show ${nextPreview.location}`}
          >
            <img src={nextPreview.image} alt="" />
            <span>Next</span>
            <strong>{nextPreview.location}</strong>
          </button>
        )}
      </div>

      <div className="crs-controls">
        <button type="button" onClick={previous} aria-label="Previous">
          <span aria-hidden="true" />
        </button>
        <span>
          {activeIndex + 1} / {pool.length}
        </span>
        <button type="button" onClick={next} aria-label="Next">
          <span aria-hidden="true" />
        </button>
      </div>

      <div className="crs-dots" aria-label="Carousel position">
        {pool.map((slide, index) => (
          <button
            type="button"
            key={slide.location}
            className={index === activeIndex ? "isActive" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.location}`}
          />
        ))}
      </div>
    </section>
  );
}
