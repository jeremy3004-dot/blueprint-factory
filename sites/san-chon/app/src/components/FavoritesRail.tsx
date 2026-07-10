"use client";

import { useRef, useState } from "react";

import { favorites } from "@/data/site";
import "../styles/home.css";

export default function FavoritesRail() {
  const [activeIndex, setActiveIndex] = useState(1);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeFavorite = favorites[activeIndex];

  function selectFavorite(index: number, shouldScroll = false) {
    setActiveIndex(index);
    if (shouldScroll) {
      cardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  function move(direction: number) {
    const nextIndex =
      (activeIndex + direction + favorites.length) % favorites.length;
    selectFavorite(nextIndex, true);
  }

  return (
    <section className="favorites" aria-labelledby="favorites-title">
      <div className="favorites__intro container">
        <p className="eyebrow">From the Korean table</p>
        <h2 className="display" id="favorites-title">
          Familiar favorites, made for passing around.
        </h2>
        <p>
          A selection of dishes documented by San Chon and its guests—not a
          complete current menu.
        </p>
      </div>

      <div className="favorites__rail" aria-label="Featured dishes">
        {favorites.map((favorite, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              aria-pressed={isActive}
              className={`favorites__card${isActive ? " is-active" : ""}`}
              key={favorite.title}
              onClick={() => selectFavorite(index)}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              type="button"
            >
              <img
                alt={favorite.title}
                src={favorite.image}
                style={{ objectPosition: favorite.imagePosition }}
              />
              <span className="favorites__shade" aria-hidden="true" />
              <span className="favorites__label">
                <span className="eyebrow">{favorite.eyebrow}</span>
                <strong className="display">{favorite.title}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <div className="favorites__caption container" aria-live="polite">
        <div>
          <p className="eyebrow">{activeFavorite.eyebrow}</p>
          <h3 className="display">{activeFavorite.title}</h3>
          <p>{activeFavorite.description}</p>
        </div>
        <div className="favorites__controls" aria-label="Favorite dish controls">
          <button onClick={() => move(-1)} type="button">
            <span aria-hidden="true">←</span>
            <span className="sr-only">Previous dish</span>
          </button>
          <span aria-hidden="true">
            {String(activeIndex + 1).padStart(2, "0")} / {String(favorites.length).padStart(2, "0")}
          </span>
          <button onClick={() => move(1)} type="button">
            <span aria-hidden="true">→</span>
            <span className="sr-only">Next dish</span>
          </button>
        </div>
      </div>
    </section>
  );
}
