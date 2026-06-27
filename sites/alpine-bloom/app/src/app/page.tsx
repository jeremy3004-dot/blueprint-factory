"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

const IMG = "/alpine-bloom-assets/nepal-public-domain";

const routes = [
  {
    n: "01",
    title: "Annapurna Circuit",
    note: "Women-led ridgeline trek · 10 days",
    image: `${IMG}/annapurna-hikers.jpg`
  },
  {
    n: "02",
    title: "Everest Base Camp",
    note: "Base camp sisterhood · 15 days",
    image: `${IMG}/everest-base-camp.jpg`
  },
  {
    n: "03",
    title: "Ghandruk Trail",
    note: "Village trails + bloom season · 7 days",
    image: `${IMG}/ghandruk-route.jpg`
  },
  {
    n: "04",
    title: "Tengboche Monastery",
    note: "Sacred high-valley route · 12 days",
    image: `${IMG}/tengboche-monastery.jpg`
  },
  {
    n: "05",
    title: "Langtang Valley",
    note: "Quiet glacial return · 9 days",
    image: `${IMG}/snowy-everest-route.jpg`
  }
];

const way = [
  [
    "i.",
    "Stand strong",
    "We climb as a small group, keep watch for one another, and treat altitude with the respect it demands — never the summit at the cost of a single woman."
  ],
  [
    "ii.",
    "Dream big",
    "Every Himalayan route is shaped for women who want wonder, real challenge, and honest support in equal measure. No performance. No pressure."
  ],
  [
    "iii.",
    "Lift people",
    "Nepali women guides, fair porter welfare, and local partners stay at the centre of every journey we design — travel that leaves the mountain better."
  ]
];

const footerLinks = [
  "About Alpine Bloom",
  "Upcoming Adventures",
  "Private Trips",
  "Reviews",
  "FAQ",
  "Sustainability"
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // smooth scroll
    let lenis: Lenis | undefined;
    let raf = 0;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    // nav state
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // reveal on scroll
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <main>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} aria-label="Primary">
        <button className="menuButton" type="button" onClick={() => setMenuOpen(true)}>
          <span className="bars">
            <span />
            <span />
          </span>
          <span className="menuLabel">Menu</span>
        </button>
        <a className="wordmark" href="#top" aria-label="Alpine Bloom home">
          <span className="mark">
            Alpine <em>Bloom</em>
          </span>
          <span className="sub">Himalaya · Women-Led</span>
        </a>
        <a className="navCta" href="/book">
          Plan a trip
        </a>
      </nav>

      <div className={`menuOverlay${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <button className="close" type="button" onClick={() => setMenuOpen(false)}>
          Close ✕
        </button>
        {["Journeys", "The Bloom Way", "Our Story", "Connect"].map((item, i) => (
          <a
            key={item}
            href={
              ["/treks", "#way", "#founder", "/book"][i]
            }
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <img
          className="heroFallback"
          src="/alpine-bloom-assets/himalaya-range.jpg"
          alt="Snow-capped Himalayan range at dawn"
        />
        <div className="heroInner shell">
          <p className="kicker heroTag" data-reveal>
            Boutique women-powered trekking · Nepal
          </p>
          <h1 className="heroTitle" data-reveal style={{ "--delay": "120ms" } as React.CSSProperties}>
            Climb high,
            <br />
            move <em>mountains</em>,
            <br />
            come home <span className="pinkword">changed</span>.
          </h1>
          <div className="heroMeta" data-reveal style={{ "--delay": "260ms" } as React.CSSProperties}>
            <p>Small groups. Nepali women guides. Altitude handled with care.</p>
            <a className="btn" href="#journeys">
              Find your journey <span className="arrow">→</span>
            </a>
          </div>
        </div>
        <div className="scrollCue" aria-hidden="true">
          Scroll
          <span className="dot" />
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto shell">
        <div className="grid">
          <div>
            <p className="kicker" data-reveal>
              Who we are
            </p>
            <p className="statement" data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
              We&apos;re <em>Alpine Bloom</em> — a boutique, women-powered Himalayan adventure house
              built on the belief that travel should <span className="pk">change you</span>.
            </p>
          </div>
          <div className="introCopy" data-reveal style={{ "--delay": "160ms" } as React.CSSProperties}>
            <p>
              Our passion is designing sustainable journeys that help women reach new peaks — in the
              mountains we climb, and far beyond them. We plan from the heart, move at the pace of the
              group, and treat the Himalaya as the living place it is.
            </p>
            <p>
              When travel is done right, it has a ripple effect: it transforms the women who walk these
              trails and the communities who welcome them home.
            </p>
          </div>
        </div>
        <div className="statRow">
          {[
            ["100%", "women-led groups", true],
            ["12", "Himalayan routes", false],
            ["2.3k+", "women on the trail", false]
          ].map(([num, lab, pink]) => (
            <div className="stat" key={lab as string} data-reveal>
              <div className="num">
                {pink ? <span>{num}</span> : num}
              </div>
              <div className="lab">{lab}</div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEYS */}
      <section className="journeys shell" id="journeys">
        <div className="sectionHead">
          <div>
            <p className="kicker" data-reveal>
              The collection
            </p>
            <h2 className="sectionTitle" data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
              Journeys for women <em>ready to rise</em>
            </h2>
          </div>
          <p data-reveal style={{ "--delay": "160ms" } as React.CSSProperties}>
            Hand-built routes across Nepal&apos;s great ranges — each one paced, supported, and led by
            women who know these trails by heart.
          </p>
        </div>

        <div className="journeyGrid">
          {routes.map((route, i) => (
            <a
              className="card"
              key={route.title}
              href="/treks"
              data-reveal
              style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="frame">
                <img src={route.image} alt={route.title} loading="lazy" />
              </div>
              <span className="cardArrow" aria-hidden="true">
                ↗
              </span>
              <div className="cardBody">
                <span className="cardNum">{route.n}</span>
                <h3 className="cardTitle">{route.title}</h3>
                <p className="cardNote">{route.note}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="journeysFoot">
          <a className="btn dark" href="/treks" data-reveal>
            View all adventures <span className="arrow">→</span>
          </a>
        </div>
      </section>

      {/* FILM */}
      <section className="film shell">
        <div className="filmFrame" data-reveal>
          <img src={`${IMG}/everest-base-camp.jpg`} alt="Trekkers on the route to Everest Base Camp" />
          <div className="filmInner">
            <span>Watch the film</span>
            <button className="playBtn" type="button" aria-label="Play route film">
              ▶
            </button>
            <h3>
              Three weeks in the high Himalaya,
              <br />
              one unforgettable group of women.
            </h3>
          </div>
        </div>
      </section>

      {/* THE BLOOM WAY */}
      <section className="way" id="way">
        <div className="shell">
          <p className="kicker" data-reveal>
            How we move
          </p>
          <h2 className="sectionTitle" data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
            The <em>Bloom</em> Way
          </h2>
          <div className="wayGrid">
            {way.map(([idx, title, copy], i) => (
              <div
                className="wayItem"
                key={title}
                data-reveal
                style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}
              >
                <span className="idx">{idx}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section className="press shell">
        <p className="kicker center" data-reveal>
          Look who&apos;s talking
        </p>
        <div className="pressLogos" data-reveal style={{ "--delay": "120ms" } as React.CSSProperties}>
          <img src="/alpine-bloom-assets/whoa-source/press-afar.webp" alt="AFAR" />
          <img src="/alpine-bloom-assets/whoa-source/press-nyt.webp" alt="The New York Times" />
          <img src="/alpine-bloom-assets/whoa-source/press-travel.webp" alt="Travel + Leisure" />
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder shell" id="founder">
        <div className="grid">
          <div className="founderArt" data-reveal aria-hidden="true">
            <div className="ph ph1">
              <img src={`${IMG}/annapurna-hikers.jpg`} alt="" />
            </div>
            <div className="ph ph2">
              <img src="/alpine-bloom-assets/rhododendron.jpg" alt="" />
            </div>
            <div className="ph ph3">
              <img src={`${IMG}/tengboche-monastery.jpg`} alt="" />
            </div>
            <div className="seal">
              With
              <br />
              love
            </div>
          </div>
          <div className="founderText">
            <p className="kicker" data-reveal>
              A note from the founders
            </p>
            <p className="statement" data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
              We started Alpine Bloom as two women who wanted <em>more</em> from travel than
              performance and pressure.
            </p>
            <div className="introCopy" data-reveal style={{ "--delay": "160ms" } as React.CSSProperties}>
              <p>
                We wanted the Himalaya to feel challenging, beautiful, and deeply held — a place where
                women could be fully themselves at altitude. That curiosity and care still leads
                everything we plan today.
              </p>
            </div>
            <p className="signature" data-reveal>
              Alpine Bloom
            </p>
            <p className="role">Founders · Kathmandu &amp; Pokhara</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="connect">
        <div className="shell">
          <div className="footerTop">
            <div className="footerJoin">
              <p className="kicker">Join the journey</p>
              <h2>
                Even inboxes deserve <em>thin air</em> &amp; prayer flags.
              </h2>
              <p>
                Trail notes, new departures, and the occasional dispatch from base camp — sent rarely,
                never spam.
              </p>
              <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
                <input type="email" aria-label="Email address" placeholder="Your email address" />
                <button className="btn" type="submit">
                  Let&apos;s do this <span className="arrow">→</span>
                </button>
              </form>
            </div>
            <div className="footerConnect">
              <h3>Let&apos;s connect</h3>
              <a className="big" href="mailto:adventure@alpinebloom.example">
                adventure@alpinebloom.example
              </a>
              <p className="phone">+977 980-000-0000</p>
              <div className="socials">
                <a href="#top" aria-label="Instagram">
                  IG
                </a>
                <a href="#top" aria-label="Facebook">
                  FB
                </a>
              </div>
            </div>
          </div>

          <nav className="footerNav" aria-label="Footer">
            {footerLinks.map((link) => (
              <a key={link} href="#top">
                {link}
              </a>
            ))}
          </nav>

          <div className="footerBase">
            <span>© {new Date().getFullYear()} Alpine Bloom · Himalayan journeys for women.</span>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
