"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { LiveDemoProject } from "@/data/projects";

type DemoCarouselProps = {
  projects: LiveDemoProject[];
};

export function DemoCarousel({ projects }: DemoCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const clamped = Math.max(0, Math.min(projects.length - 1, index));
      const card = rail.children.item(clamped) as HTMLElement | null;
      if (!card) return;
      rail.scrollTo({
        left: card.offsetLeft - rail.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth"
      });
      setActiveIndex(clamped);
    },
    [projects.length, reducedMotion]
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      const cards = Array.from(rail.children) as HTMLElement[];
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const delta = Math.abs(center - cardCenter);
        if (delta < distance) {
          distance = delta;
          nearest = index;
        }
      });
      setActiveIndex(nearest);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => rail.removeEventListener("scroll", onScroll);
  }, [projects.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(activeIndex + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, scrollToIndex]);

  return (
    <section className="carouselSection" aria-labelledby="live-demo-carousel-heading">
      <div className="carouselHeader">
        <div>
          <p className="sectionEyebrow">Interactive rail</p>
          <h2 id="live-demo-carousel-heading">Scroll the collection</h2>
        </div>
        <div className="carouselControls" aria-label="Carousel navigation">
          <button
            type="button"
            className="carouselButton"
            aria-label="Show previous live demo"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="carouselButton"
            aria-label="Show next live demo"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="carouselRail"
        role="region"
        aria-roledescription="carousel"
        aria-label="Live demo projects"
        tabIndex={0}
      >
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="carouselCard"
            aria-hidden={index !== activeIndex}
          >
            <div className="carouselMedia">
              <Image
                src={project.screenshot}
                alt={project.screenshotAlt}
                fill
                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 58vw"
                priority={index === 0}
                className="carouselImage"
              />
            </div>
            <div className="carouselBody">
              <div className="carouselMeta">
                <span className="liveDemoBadge">Live Demo</span>
                <p className="carouselCategory">{project.category}</p>
              </div>
              <h3>{project.name}</h3>
              <p className="carouselDescription">{project.description}</p>
              <a
                href={project.url}
                className="demoCta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo for ${project.name}`}
              >
                View Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="carouselPosition" aria-live="polite">
        <span className="positionCurrent">{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="positionDivider" aria-hidden="true" />
        <span className="positionTotal">{String(projects.length).padStart(2, "0")}</span>
        <p className="positionHint">Swipe, scroll, or use arrow keys</p>
      </div>
    </section>
  );
}
