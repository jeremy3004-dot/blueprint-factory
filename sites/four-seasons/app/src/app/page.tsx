"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const navLinks = [
  "Hotels & Resorts",
  "Residence Rentals",
  "Residences",
  "Dining",
  "Private Jet",
  "Yachts",
  "More"
];

const categoryRail = [
  { icon: "H", label: "All Hotels and Resorts" },
  { icon: "R", label: "Residences" },
  { icon: "V", label: "Villa and Residence Rentals" },
  { icon: "D", label: "Dining" },
  { icon: "J", label: "Private Jet" },
  { icon: "Y", label: "Yachts" },
  { icon: "S", label: "Summer Travel" }
];

const properties = [
  {
    location: "Bora Bora",
    type: "Hotels and Resorts",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    copy: "Lose yourself in a private island paradise where turquoise water and quiet villas frame every morning."
  },
  {
    location: "Costa Rica Peninsula Papagayo",
    type: "Hotels and Resorts",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=85",
    copy: "Discover jungle ridgelines, Pacific light, and days that move between adventure and total calm."
  },
  {
    location: "Lanai",
    type: "Hotels and Resorts",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
    copy: "A quieter Hawaiian retreat where garden paths, ocean views, and unhurried days set the pace."
  },
  {
    location: "Tamarindo",
    type: "Hotels and Resorts",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=85",
    copy: "Follow the Pacific coast into a modern sanctuary shaped by cliffs, mangroves, and warm Mexican light."
  },
  {
    location: "Fort Lauderdale",
    type: "Residences",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
    copy: "A polished coastal address with easy beach days, private residences, and warm Atlantic evenings."
  },
  {
    location: "Oahu at Ko Olina",
    type: "Residences",
    image: "https://images.unsplash.com/photo-1501959915551-4e8d30928317?auto=format&fit=crop&w=1400&q=85",
    copy: "Residential calm beside sheltered lagoons, with generous terraces and a rhythm made for longer stays."
  },
  {
    location: "Hualalai",
    type: "Villa Rentals",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85",
    copy: "Lava rock, ocean air, and residential privacy create a slower kind of Hawaiian arrival."
  },
  {
    location: "Punta Mita",
    type: "Villa Rentals",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
    copy: "Gather in a private coastal home where open-air rooms, palms, and sunset water frame the day."
  }
];

const exploreCards = [
  {
    title: "We're changing the way you sail",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1000&q=85",
    copy: "A new chapter at sea with intimate voyages, wide horizons, and service shaped around the day."
  },
  {
    title: "Discover our new openings",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
    copy: "Explore a growing collection of hotels and resorts in places worth slowing down for."
  },
  {
    title: "Private jet experience",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1000&q=85",
    copy: "A seamless journey through rare destinations, handled with the precision of a private itinerary."
  }
];

const suggestions = [
  "Bora Bora",
  "Costa Rica",
  "Fort Lauderdale",
  "Hualalai",
  "Lanai",
  "Mexico Collection",
  "Private Jet",
  "Yachts"
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
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const bookingDialogRef = useRef<HTMLDivElement>(null);
  const searchDialogRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("Hotels and Resorts");
  const [activeProperty, setActiveProperty] = useState(0);
  const overlayOpen = menuOpen || bookingOpen || searchOpen;

  useBodyLock(overlayOpen);

  function scrollToId(id: string) {
    const element = document.getElementById(id);
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = menuDialogRef.current ?? bookingDialogRef.current ?? searchDialogRef.current;
    if (!overlayOpen || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusables = [...dialog.querySelectorAll<HTMLElement>(focusableSelector)];
    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setBookingOpen(false);
        setSearchOpen(false);
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

  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("[data-motion-reveal]")];
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.22 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const visibleSuggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return suggestions;
    return suggestions.filter((item) => item.toLowerCase().includes(normalized));
  }, [query]);

  const filteredProperties = properties.filter((property) => {
    if (activeType === "Hotels and Resorts") return property.type === "Hotels and Resorts";
    if (activeType === "Residences") return property.type === "Residences";
    return property.type === "Villa Rentals";
  });
  const activeIndex = filteredProperties.length > 0 ? activeProperty % filteredProperties.length : 0;
  const active = filteredProperties[activeIndex] ?? properties[0];
  const previousIndex = (activeIndex - 1 + filteredProperties.length) % filteredProperties.length;
  const nextIndex = (activeIndex + 1) % filteredProperties.length;
  const previousPreview = filteredProperties[previousIndex];
  const nextPreview = filteredProperties[nextIndex];

  function nextProperty() {
    setActiveProperty((value) => (value + 1) % filteredProperties.length);
  }

  function previousProperty() {
    setActiveProperty((value) => (value - 1 + filteredProperties.length) % filteredProperties.length);
  }

  function selectType(type: string) {
    setActiveType(type);
    setActiveProperty(0);
  }

  function handleTypeKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, type: string) {
    const types = ["Residences", "Hotels and Resorts", "Villa Rentals"];
    const currentIndex = types.indexOf(type);
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (offset === 0) return;

    event.preventDefault();
    const nextType = types[(currentIndex + offset + types.length) % types.length];
    selectType(nextType);
    document.getElementById(`property-tab-${nextType.replace(/\s+/g, "-").toLowerCase()}`)?.focus();
  }

  return (
    <main>
      <div className="promoStrip">
        <span>Explore the Mexico Collection</span>
        <button type="button" onClick={() => scrollToId("mexico")}>
          Reopen
        </button>
      </div>

      <header className={`siteHeader ${scrolled ? "isScrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Four Seasons home">
          <span className="brandLeaf">FS</span>
          <span>Four Seasons</span>
        </a>
        <nav className="desktopNav" aria-label="Primary">
          {navLinks.map((link) => (
            <a href="#featured" key={link}>
              {link}
            </a>
          ))}
        </nav>
        <div className="headerActions">
          <button type="button" className="quietAction" onClick={() => setSearchOpen(true)}>
            Search
          </button>
          <button type="button" className="rateButton" onClick={() => setBookingOpen(true)}>
            Check Rates
          </button>
          <button type="button" className="menuButton" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            Menu
          </button>
        </div>
      </header>

      <section id="top" className="heroSection">
        <img
          className="heroMedia"
          src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=2600&q=90"
          alt=""
        />
        <div className="heroShade" />
        <div className="heroWake" aria-hidden="true" />
        <div className="heroCopy">
          <p>Private journeys by sea</p>
          <h1 aria-label="Where exploration meets exclusivity">
            <span>Where</span>
            <span>exploration</span>
            <span>meets</span>
            <span>exclusivity</span>
          </h1>
          <button type="button" onClick={() => setBookingOpen(true)}>
            Find Your Voyage
          </button>
        </div>
        <div className="bookingBar" aria-label="Booking search">
          <button type="button" onClick={() => setSearchOpen(true)}>
            Destination
            <strong>Where will you go?</strong>
          </button>
          <button type="button" onClick={() => setBookingOpen(true)}>
            Dates
            <strong>Select stay dates</strong>
          </button>
          <button type="button" onClick={() => setBookingOpen(true)}>
            Guests
            <strong>2 adults</strong>
          </button>
          <button type="button" className="bookingSubmit" onClick={() => setBookingOpen(true)}>
            Check Rates
          </button>
        </div>
        <div className="categoryRail" aria-label="Four Seasons categories">
          {categoryRail.map((item, index) => (
            <button type="button" key={item.label} style={{ "--rail-index": index } as React.CSSProperties}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <button className="scrollCue" type="button" onClick={() => scrollToId("mexico")}>
          Scroll to discover more
        </button>
      </section>

      <section id="mexico" className="mexicoBand motionReveal" data-motion-reveal>
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
          alt="Tropical retreat surrounded by palms"
        />
        <div>
          <p>Explore the Mexico Collection</p>
          <h2>Where memories take shape</h2>
          <span>This summer, discover moments that matter and the joy of being together.</span>
          <button type="button" onClick={() => setBookingOpen(true)}>
            Book Now
          </button>
        </div>
      </section>

      <section id="featured" className="featuredSection motionReveal" data-motion-reveal>
        <div className="sectionHeading">
          <p>Featured Properties</p>
          <h2>Find your next extraordinary stay</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="Property types">
          {["Residences", "Hotels and Resorts", "Villa Rentals"].map((type) => (
            <button
              type="button"
              key={type}
              id={`property-tab-${type.replace(/\s+/g, "-").toLowerCase()}`}
              role="tab"
              aria-selected={activeType === type}
              aria-controls="featured-property-panel"
              tabIndex={activeType === type ? 0 : -1}
              className={activeType === type ? "isActive" : ""}
              onClick={() => selectType(type)}
              onKeyDown={(event) => handleTypeKeyDown(event, type)}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="featuredIntro">
          Whether staying for business or leisure, discover our most inspiring properties around the world.
        </p>
        <a className="viewAll" href="#explore">
          View all hotels and resorts
        </a>
        <div
          className="propertyStage"
          id="featured-property-panel"
          role="tabpanel"
          aria-live="polite"
          aria-labelledby={`property-tab-${activeType.replace(/\s+/g, "-").toLowerCase()}`}
        >
          <img className="propertyBackdrop" key={active.image} src={active.image} alt="" />
          {previousPreview && filteredProperties.length > 1 && (
            <button
              type="button"
              className="sidePreview sidePreviewPrevious"
              onClick={() => setActiveProperty(previousIndex)}
              aria-label={`Show ${previousPreview.location}`}
            >
              <img src={previousPreview.image} alt="" />
              <span>Previous</span>
              <strong>{previousPreview.location}</strong>
            </button>
          )}
          <article className="propertyCard" key={active.location}>
            <img className="propertyCardMedia" src={active.image} alt={`${active.location} property preview`} />
            <div className="propertyCardBody">
              <p>{active.type}</p>
              <h3>{active.location}</h3>
              <span>{active.copy}</span>
              <button type="button" onClick={() => setBookingOpen(true)}>
                View Property
              </button>
            </div>
          </article>
          {nextPreview && filteredProperties.length > 1 && (
            <button
              type="button"
              className="sidePreview sidePreviewNext"
              onClick={() => setActiveProperty(nextIndex)}
              aria-label={`Show ${nextPreview.location}`}
            >
              <img src={nextPreview.image} alt="" />
              <span>Next</span>
              <strong>{nextPreview.location}</strong>
            </button>
          )}
        </div>
        <div className="carouselControls">
          <button type="button" onClick={previousProperty} aria-label="Previous property">
            <span aria-hidden="true" />
          </button>
          <span>
            {activeProperty + 1} / {filteredProperties.length}
          </span>
          <button type="button" onClick={nextProperty} aria-label="Next property">
            <span aria-hidden="true" />
          </button>
        </div>
        <div className="propertyDots" aria-label="Property carousel position">
          {filteredProperties.map((property, index) => (
            <button
              type="button"
              key={property.location}
              className={index === activeProperty ? "isActive" : ""}
              onClick={() => setActiveProperty(index)}
              aria-label={`Show ${property.location}`}
            />
          ))}
        </div>
      </section>

      <section id="explore" className="exploreSection motionReveal" data-motion-reveal>
        <h2>Explore more with Four Seasons</h2>
        <div className="exploreGrid">
          {exploreCards.map((card, index) => (
            <article className={index === 0 ? "largeStory" : ""} key={card.title}>
              <img src={card.image} alt="" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <a href="#top">Learn more</a>
            </article>
          ))}
        </div>
      </section>

      <section className="storySection motionReveal" data-motion-reveal>
        <div>
          <h2>The Four Seasons Story</h2>
          <p>
            A name synonymous around the world for continual innovation, remarkable expansion, and a single-minded
            dedication to the highest standards of service.
          </p>
          <a href="#top">Discover our story</a>
        </div>
      </section>

      <footer className="footerSection motionReveal" data-motion-reveal>
        <div className="footerLogo">
          <span>FS</span>
          <strong>Four Seasons</strong>
        </div>
        <div className="footerGrid">
          {[
            ["About", "About Us", "Four Seasons for Good", "Careers", "Contact Us"],
            ["Reservations", "Request an Invoice", "Find a Reservation", "Email Preferences"],
            ["News", "Press Room", "New Openings", "Magazine", "Newsletter"],
            ["More", "Private Jet", "Yachts", "Residences", "Gift Cards"]
          ].map(([heading, ...items]) => (
            <div key={heading}>
              <h3>{heading}</h3>
              {items.map((item) => (
                <a href="#top" key={item}>
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
        <p className="legal">Four Seasons Hotels Limited 1997-2026. Clone preview for Blueprint Factory review.</p>
      </footer>

      {menuOpen && (
        <div className="overlay menuOverlay" role="dialog" aria-modal="true" aria-label="Menu" ref={menuDialogRef}>
          <button type="button" className="closeButton" onClick={() => setMenuOpen(false)}>
            Close
          </button>
          <div className="overlayBrand">Four Seasons</div>
          <nav>
            {navLinks.concat(["Shop", "Weddings", "Meetings & Events", "Magazine"]).map((link) => (
              <a href="#featured" key={link} onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}

      {bookingOpen && (
        <div className="overlay sheetOverlay" role="dialog" aria-modal="true" aria-label="Check rates" ref={bookingDialogRef}>
          <div className="bookingSheet">
            <button type="button" className="closeButton" onClick={() => setBookingOpen(false)}>
              Close
            </button>
            <p>Check Rates</p>
            <h2>Begin with a destination</h2>
            <label>
              Destination
              <input placeholder="Bora Bora, Costa Rica, Mexico..." />
            </label>
            <div className="fieldRow">
              <label>
                Arrival
                <input type="date" />
              </label>
              <label>
                Departure
                <input type="date" />
              </label>
            </div>
            <label>
              Guests
              <select defaultValue="2 adults">
                <option>2 adults</option>
                <option>2 adults, 2 children</option>
                <option>Private residence stay</option>
              </select>
            </label>
            <button type="button" className="primaryWide" onClick={() => setBookingOpen(false)}>
              View Availability
            </button>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="overlay searchOverlay" role="dialog" aria-modal="true" aria-label="Search destinations" ref={searchDialogRef}>
          <div className="searchPanel">
            <button type="button" className="closeButton" onClick={() => setSearchOpen(false)}>
              Close
            </button>
            <p>Search Four Seasons</p>
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search destinations and experiences"
            />
            <div className="suggestions">
              {visibleSuggestions.length > 0 ? (
                visibleSuggestions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => {
                      setQuery(item);
                      setSearchOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <div className="noResults">
                  <span>No result found</span>
                  <button type="button" onClick={() => setQuery("")}>
                    View all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
