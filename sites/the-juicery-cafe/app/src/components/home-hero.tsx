"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { contact } from "../data/site";

export function HomeHero() {
  const [cardVisible, setCardVisible] = useState(true);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <Image
        className="hero-media"
        src="/images/juicery/brunch-wide.jpg"
        alt="A Juicery Cafe team member holding fresh herbs in the kitchen"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="hero-veil" />
      <div className="hero-aperture" aria-hidden="true" />

      <div className="hero-copy">
        <p className="hero-kicker">Farm to table · North Lakeside</p>
        <h1 id="home-hero-title">
          <span>The Juicery</span>
          <span>Cafe</span>
        </h1>
        <p className="hero-lede">Cold-pressed mornings. Seasonal brunch. A table shaped by Pokhara.</p>
        <Link className="hero-cta" href="/contact">
          Plan your visit
        </Link>
      </div>

      {cardVisible ? (
        <aside className="hero-details" aria-label="Visit details">
          <div>
            <h2>Today</h2>
            <strong>{contact.hours}</strong>
          </div>
          <div>
            <h2>Find us</h2>
            <strong>Street 22A · Lakeside</strong>
          </div>
          <Link href="/food" aria-label="Explore food and drink">
            Explore food <span aria-hidden="true">↗</span>
          </Link>
          <button type="button" aria-label="Dismiss visit details" onClick={() => setCardVisible(false)}>
            ×
          </button>
        </aside>
      ) : null}
    </section>
  );
}
