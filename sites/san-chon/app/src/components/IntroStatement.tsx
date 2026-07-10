import type { CSSProperties } from "react";

import "@/styles/hero.css";

const tablePaths = [
  { label: "Tabletop BBQ", href: "/menu#grill" },
  { label: "Rice & Noodles", href: "/menu#bowls" },
  { label: "Share Plates", href: "/menu#share" },
  { label: "Visit Lakeside", href: "/visit" },
] as const;

export function IntroStatement() {
  return (
    <>
      <section className="intro-statement" aria-labelledby="intro-title">
        <div className="intro-statement__body container">
          <h2 className="intro-statement__title display" id="intro-title" data-reveal>
            Korean comfort, tabletop fire, and a calm Lakeside room—made for meals that unfold together.
          </h2>

          <div
            className="intro-mantra"
            data-reveal
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            <p className="intro-mantra__label display">Our table is simple</p>
            <p className="intro-mantra__formula" lang="ko" aria-describedby="intro-mantra-translation">
              <span>불</span>
              <b aria-hidden="true">+</b>
              <span>밥</span>
              <b aria-hidden="true">+</b>
              <span>함께</span>
              <b aria-hidden="true">=</b>
              <span>산촌</span>
            </p>
            <span className="sr-only" id="intro-mantra-translation">
              Fire plus rice plus togetherness equals San Chon.
            </span>
          </div>

          <p
            className="intro-statement__copy"
            data-reveal
            style={{ "--delay": "220ms" } as CSSProperties}
          >
            Settle in for a shared Korean table of barbecue, bowls, rolls, soups, kimchi, and changing
            banchan. The grill gives the meal its rhythm; warm hospitality gives you room to slow down.
          </p>
        </div>
      </section>

      <section className="table-paths-section" aria-label="Explore the San Chon table">
        <nav className="table-paths">
          {tablePaths.map((item, index) => (
            <a
              data-reveal
              href={item.href}
              key={item.label}
              style={{ "--delay": `${index * 70}ms` } as CSSProperties}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </section>
    </>
  );
}
