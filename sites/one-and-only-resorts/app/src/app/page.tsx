"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const assets = {
  hero: "https://dam.kerzner.com/v/kerzner/OOBrandVideoOpener?w=1920&fmt=auto",
  heroVideo: "https://dam.kerzner.com/v/kerzner/OOBrandVideoOpener/mp4_720p_b4000",
  portfolio:
    "https://dam.kerzner.com/i/kerzner/02.%20Water%20Villa%20with%20Pool%20-%20c?poi=0.4128%2C0.4521%2C0%2C0&scaleFit=poi&w=1920&fmt=auto",
  stays:
    "https://dam.kerzner.com/i/kerzner/One&Only_Portonovi_Accomm_VillaTwo_Livingroom_Pool_View_2559_MASTER?w=992&fmt=auto",
  dining:
    "https://dam.kerzner.com/i/kerzner/OO_Kea_Lifestyle_resort?poi=0.4518%2C0.4448%2C0%2C0&scaleFit=poi&w=1920&fmt=auto",
  wellness:
    "https://dam.kerzner.com/i/kerzner/One&Only_Mandarina_Wellness_Spa_Temazcal_Curandero_Wide_1924_MASTER?w=1920&fmt=auto",
  events: "https://dam.kerzner.com/i/kerzner/000196470003?w=1920&fmt=auto",
  mediterranean: "https://dam.kerzner.com/i/kerzner/9_OOPM_LIFESTYLE_GIRL_GUY_BOAT_009?w=1920&fmt=auto",
  aesthesis: "https://dam.kerzner.com/i/kerzner/Burberry%20x%20One&Only%20Aesthesis%20Takeover(4)?w=1920&fmt=auto",
  mexico: "https://dam.kerzner.com/i/kerzner/P1000548_1?w=1920&fmt=auto",
  homes: "https://dam.kerzner.com/i/kerzner/RLH_Mandarina_Arch_Villa14_Pool_0419_MASTER?w=992&fmt=auto"
};

const navItems = ["About", "Discover", "Bookings & Terms", "Follow Us"];

const journeys = [
  {
    label: "Dining",
    title: "Savour",
    image: assets.dining,
    copy: "Celebrated chefs, immersive culinary journeys and a spirit of innovation define our dining worlds."
  },
  {
    label: "Wellness",
    title: "Reconnect",
    image: assets.wellness,
    copy: "Rituals rooted in place bring stillness, heat, texture and expert care into the day."
  },
  {
    label: "Events",
    title: "Gather",
    image: assets.events,
    copy: "Private celebrations and rare moments unfold with the ease of a resort made around you."
  }
];

const stories = [
  {
    kicker: "Mediterranean escapes",
    title: "Summer, unscripted",
    image: assets.mediterranean,
    copy: "At One&Only's Mediterranean resorts in Greece and Montenegro, summer reveals the truest expression of escape."
  },
  {
    kicker: "Inspired by Athens",
    title: "Burberry x One&Only Aesthesis",
    image: assets.aesthesis,
    copy: "A seasonal takeover brings the signature style of Athens into villas, terraces and poolside moments."
  },
  {
    kicker: "Magic of Mexico",
    title: "Chase the sun",
    image: assets.mexico,
    copy: "Blue mornings, golden sunsets and coastal rainforest shape an escape made for slower days."
  }
];

const benefits = [
  {
    title: "Extend your stay",
    copy: "Enjoy more time to explore at your leisure with an additional night on us when you secure your booking."
  },
  {
    title: "Curated benefits",
    copy: "Treat your visit to thoughtful extras shaped around the destination and the rhythm of your stay."
  },
  {
    title: "Advanced reservations",
    copy: "Book now and stay later with preferred rates arranged ahead of your arrival."
  }
];

const footerColumns = [
  ["Our Story", "Contact Us", "Newsletter Sign Up"],
  ["Destinations", "Awards", "Media Centre", "Careers"],
  ["Modify Booking", "Website Terms", "Privacy Policy"],
  ["Instagram", "TikTok", "YouTube", "LinkedIn"]
];

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export default function Home() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeJourney, setActiveJourney] = useState(0);
  const [openFooter, setOpenFooter] = useState<number | null>(0);
  const overlayOpen = menuOpen || bookingOpen;

  useBodyLock(overlayOpen);

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("isVisible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!overlayOpen || !overlayRef.current) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusables = [...overlayRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setBookingOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [overlayOpen]);

  const active = useMemo(() => journeys[activeJourney], [activeJourney]);

  function nextJourney(direction: number) {
    setActiveJourney((current) => (current + direction + journeys.length) % journeys.length);
  }

  return (
    <main id="top">
      <header className="siteHeader">
        <button className="menuTrigger" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
        <a className="globalLink" href="#destinations">One&Only Global</a>
        <a className="brand" href="#top" aria-label="One&Only home">One&Only</a>
        <div className="headerTools" aria-label="Site tools">
          <button type="button" aria-label="Search destinations" onClick={() => setMenuOpen(true)} />
          <button type="button" aria-label="Open booking" onClick={() => setBookingOpen(true)} />
        </div>
      </header>

      <section className="heroSection" aria-labelledby="hero-title">
        <video className="heroVideo" autoPlay muted loop playsInline poster={assets.hero}>
          <source src={assets.heroVideo} type="video/mp4" />
        </video>
        <img className="heroFallback" src={assets.hero} alt="" />
        <div className="heroVeil" />
        <div className="heroAperture" aria-hidden="true" />
        <div className="heroCopy">
          <p>One&Only Resorts and Private Homes</p>
          <h1 id="hero-title">
            <span>Your One&Only escape,</span>
            <span>your way</span>
          </h1>
          <p>
            Where every stay unfolds with effortless freedom, authentic experiences and unscripted moments, crafted around how you move, feel and connect.
          </p>
        </div>
      </section>

      <section id="destinations" className="portfolioHero" data-reveal>
        <img src={assets.portfolio} alt="" />
        <div>
          <p>One&Only Portfolio</p>
          <h2>Our global destinations</h2>
          <p>
            From beach villas to alpine peaks, city skylines and coastal rainforest, our resorts are shaped by places worth travelling for.
          </p>
          <a href="#stays">Explore Destinations</a>
        </div>
      </section>

      <section id="stays" className="splitFeature splitFeatureRight" data-reveal>
        <img src={assets.stays} alt="" />
        <article>
          <p>Stays</p>
          <h2>Shaped by the setting</h2>
          <p>
            Artful rooms, suites and villas are crafted to reflect each destination's character, promising seclusion and soulful space to connect.
          </p>
          <a href="#homes">Explore All Stays</a>
        </article>
      </section>

      <section className="journeySection" data-reveal>
        <div className="sectionIntro">
          <p>Experiences</p>
          <h2>Journeys of discovery</h2>
          <p>
            Venture outside the ordinary with curated adventures on land and at sea. Uncover natural, cultural and culinary wonders all around.
          </p>
          <a href="#stories">Explore Experiences</a>
        </div>

        <div className="foldingGallery" aria-live="polite">
          {journeys.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={`galleryPanel ${index === activeJourney ? "isActive" : ""}`}
              onClick={() => setActiveJourney(index)}
              aria-label={`Show ${item.title}`}
            >
              <img src={item.image} alt="" />
            </button>
          ))}
        </div>

        <article className="journeyCaption">
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
          <a href="#stories">Explore {active.label}</a>
          <div className="galleryControls">
            <button type="button" onClick={() => nextJourney(-1)} aria-label="Previous journey">Prev</button>
            <span />
            <button type="button" onClick={() => nextJourney(1)} aria-label="Next journey">Next</button>
          </div>
        </article>
      </section>

      <section id="stories" className="storyCards" data-reveal>
        {stories.map((story) => (
          <article key={story.title}>
            <img src={story.image} alt="" />
            <p>{story.kicker}</p>
            <h3>{story.title}</h3>
            <p>{story.copy}</p>
            <a href="#offers">Explore</a>
          </article>
        ))}
      </section>

      <section id="homes" className="splitFeature splitFeatureLeft" data-reveal>
        <article>
          <p>One&Only Private Homes</p>
          <h2>At home, here</h2>
          <p>
            Immerse in the One&Only lifestyle with an ultra-luxury flagship residence, available to purchase in unrivalled resort communities.
          </p>
          <a href="#booking">Explore Private Homes</a>
        </article>
        <img src={assets.homes} alt="" />
      </section>

      <section className="quietStory" data-reveal>
        <p>About Us</p>
        <h2>Our story</h2>
        <p>Explore the ethos that drives every decision and follow our journey so far.</p>
        <a href="#footer">Explore Our Story</a>
      </section>

      <section id="offers" className="quietStory offers" data-reveal>
        <p>Exclusive Offers</p>
        <h2>Your One&Only stay, elevated</h2>
        <p>Thoughtfully curated, our seasonal and exclusive savings, packages and privileges bring added benefit to your stay.</p>
        <a href="#booking">Explore All Offers</a>
      </section>

      <section className="benefits" data-reveal>
        {benefits.map((benefit) => (
          <article key={benefit.title}>
            <h3>{benefit.title}</h3>
            <p>{benefit.copy}</p>
          </article>
        ))}
      </section>

      <footer id="footer" className="siteFooter">
        <div className="footerBrand">One&Only</div>
        <div className="footerLinks">
          {footerColumns.map((links, index) => (
            <div key={links[0]} className={openFooter === index ? "isOpen" : ""}>
              <button type="button" onClick={() => setOpenFooter(openFooter === index ? null : index)}>
                {navItems[index]}
              </button>
              <ul>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#top">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footerFamily" aria-label="Kerzner brands">
          <span>kerzner</span>
          <span>ATLANTIS</span>
          <span>One&Only</span>
          <span>SIRO</span>
          <span>rare finds</span>
        </div>
        <p className="copyright">2026 Blueprint Factory clone preview. Donor media is reference-only and not cleared for production.</p>
      </footer>

      {overlayOpen ? (
        <div className="overlay" role="presentation">
          <div
            ref={overlayRef}
            className={`overlayPanel ${bookingOpen ? "bookingPanel" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={bookingOpen ? "booking-title" : "menu-title"}
          >
            <button
              className="closeButton"
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setBookingOpen(false);
              }}
            >
              Close
            </button>
            {bookingOpen ? (
              <>
                <p>Reservations</p>
                <h2 id="booking-title">Book Now and Stay</h2>
                <div className="bookingGrid" id="booking">
                  <label>
                    Destination
                    <select defaultValue="Portonovi">
                      <option>Portonovi</option>
                      <option>Moonlight Basin</option>
                      <option>Mandarina</option>
                    </select>
                  </label>
                  <label>
                    Arrival
                    <input type="date" />
                  </label>
                  <label>
                    Guests
                    <select defaultValue="2 Adults">
                      <option>2 Adults</option>
                      <option>Family Stay</option>
                      <option>Private Home</option>
                    </select>
                  </label>
                </div>
                <button className="primaryAction" type="button">Check Availability</button>
              </>
            ) : (
              <>
                <p>One&Only Global</p>
                <h2 id="menu-title">Discover the collection</h2>
                <nav className="menuLinks" aria-label="Overlay navigation">
                  <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
                  <a href="#stays" onClick={() => setMenuOpen(false)}>Stays</a>
                  <a href="#stories" onClick={() => setMenuOpen(false)}>Experiences</a>
                  <a href="#offers" onClick={() => setMenuOpen(false)}>Offers</a>
                </nav>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
