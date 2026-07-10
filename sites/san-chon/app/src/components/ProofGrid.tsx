"use client";

import { type CSSProperties, useRef } from "react";

import { proofPoints } from "@/data/site";
import { useScrollReveal } from "./StoryBand";

export default function ProofGrid() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollReveal(rootRef);

  return (
    <section className="proof" ref={rootRef} aria-labelledby="proof-title">
      <div className="proof__heading container">
        <p className="eyebrow" data-reveal>Why San Chon</p>
        <h2 className="display" data-reveal id="proof-title" style={{ "--delay": "90ms" } as CSSProperties}>
          Korean comfort, grounded in Pokhara.
        </h2>
      </div>
      <ol className="proof__grid container">
        {proofPoints.map((point, index) => (
          <li data-reveal key={point.number} style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
            <span className="proof__number">{point.number}</span>
            <h3 className="display">{point.title}</h3>
            <p>{point.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
