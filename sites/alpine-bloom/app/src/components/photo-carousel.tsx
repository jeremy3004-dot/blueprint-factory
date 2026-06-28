"use client";

import { useEffect, useState } from "react";

type PhotoSlide = {
  title: string;
  eyebrow: string;
  image: string;
};

export function PhotoCarousel({ slides }: { slides: PhotoSlide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="photoCarousel">
      <div className="photoCarouselTrack" style={{ transform: `translateX(-${active * 100}%)` }}>
        {slides.map((slide) => (
          <article className="photoSlide" key={slide.title}>
            <img src={slide.image} alt={slide.title} loading="lazy" />
            <div>
              <span>{slide.eyebrow}</span>
              <h3>{slide.title}</h3>
            </div>
          </article>
        ))}
      </div>
      <div className="photoCarouselDots" aria-label="Photo carousel controls">
        {slides.map((slide, index) => (
          <button
            aria-label={`Show ${slide.title}`}
            className={active === index ? "active" : ""}
            key={slide.title}
            onClick={() => setActive(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
