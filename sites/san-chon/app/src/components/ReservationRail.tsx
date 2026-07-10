import type { CSSProperties } from "react";

import { site } from "@/data/site";
import "@/styles/hero.css";

export function ReservationRail({ headingId = "plan-a-meal-title" }: { headingId?: string }) {
  return (
    <section className="reservation-rail brass-line" aria-labelledby={headingId}>
      <div className="reservation-rail__inner container">
        <div data-reveal>
          <p className="eyebrow">Plan a meal</p>
          <h2 className="display" id={headingId}>
            Gather around the grill in Lakeside.
          </h2>
          <p>Call ahead to reserve a table, or open directions to Street 16.</p>
        </div>

        <div
          className="reservation-rail__actions"
          data-reveal
          style={{ "--delay": "140ms" } as CSSProperties}
        >
          <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
          <a href={site.directions} rel="noreferrer" target="_blank">
            Get directions
          </a>
        </div>
      </div>
    </section>
  );
}
