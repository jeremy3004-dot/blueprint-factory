"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { VisitDrawer } from "./VisitDrawer";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setMobileOpen(false);
    setVisitOpen(false);
  };

  return (
    <>
      <a className="skipLink" href="#main-content">Skip to content</a>
      <div className="announcementBar">OPEN DAILY · 10:00 AM–7:30 PM · RASTRA BANK CHOWK</div>
      <header
        className="siteHeader"
        data-scrolled={scrolled}
        data-menu-open={menuOpen}
        onKeyDown={(event) => event.key === "Escape" && closeAll()}
      >
        <button
          className="menuTrigger desktopOnly"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          MENU <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
        </button>
        <button
          className="menuTrigger mobileOnly"
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          MENU
        </button>
        <Link className="wordmark" href="/" aria-label="Ambika Juice home">AMBIKA</Link>
        <nav className="headerTools" aria-label="Utility navigation">
          <a className="desktopOnly" href="tel:+9779804172590">CALL</a>
          <Link href="/pages/menu">MENU</Link>
          <button type="button" onClick={() => setVisitOpen(true)} aria-label="Open visit details">VISIT US</button>
        </nav>
        <MegaMenu open={menuOpen} onNavigate={closeAll} />
      </header>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <VisitDrawer open={visitOpen} onClose={() => setVisitOpen(false)} />
    </>
  );
}
