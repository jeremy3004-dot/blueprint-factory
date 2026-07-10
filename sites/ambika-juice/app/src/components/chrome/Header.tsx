"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { CartDrawer } from "./CartDrawer";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
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
    setCartOpen(false);
  };

  return (
    <>
      <a className="skipLink" href="#main-content">Skip to content</a>
      <div className="announcementBar">FREE SHIPPING ON ORDERS $40+</div>
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
        <Link className="wordmark" href="/" aria-label="Onyx Coffee Lab home">ONYX</Link>
        <nav className="headerTools" aria-label="Utility navigation">
          <Link className="desktopOnly" href="/account/login">LOGIN</Link>
          <button type="button" aria-label="Search">SEARCH</button>
          <button type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">CART (0)</button>
        </nav>
        <MegaMenu open={menuOpen} onNavigate={closeAll} />
      </header>
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

