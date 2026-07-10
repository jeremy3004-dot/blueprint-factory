"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/Icons";
import { navItems, site } from "@/data/site";
import "@/styles/shell.css";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.classList.add("menu-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const controls = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!controls.length) return;

      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  return (
    <header className="site-header">
      <p className="site-header__announcement">
        Street 16, Lakeside <span aria-hidden="true">·</span> Online-listed hours 12–10 PM
      </p>

      <div className="site-header__frame">
        <nav className="site-header__nav site-header__nav--desktop" aria-label="Primary navigation">
          <div className="site-header__nav-side">
            {navItems.slice(1).map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </div>

          <a className="site-crest" href="/" aria-label="San Chon home">
            <span lang="ko" aria-hidden="true">산촌</span>
            <small aria-hidden="true">San Chon</small>
          </a>

          <div className="site-header__nav-side site-header__nav-side--right">
            <a
              className="site-header__instagram"
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit San Chon on Instagram (opens in a new tab)"
            >
              <InstagramIcon />
            </a>
            <a className="shell-button shell-button--compact" href={site.phoneHref}>Call to reserve</a>
          </div>
        </nav>

        <div className="site-header__mobile-bar">
          <button
            ref={menuButtonRef}
            className="site-header__menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
            <span>Menu</span>
          </button>
          <a className="site-crest site-crest--mobile" href="/" aria-label="San Chon home">
            <span lang="ko" aria-hidden="true">산촌</span>
          </a>
          <a className="site-header__mobile-call" href={site.phoneHref}>Call</a>
        </div>
      </div>

      <div
        ref={panelRef}
        id="mobile-navigation"
        className={`mobile-menu${menuOpen ? " mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="mobile-menu__top">
          <span className="mobile-menu__name">San Chon</span>
          <button
            ref={closeButtonRef}
            className="site-header__menu-button"
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
            <span>Close</span>
          </button>
        </div>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a key={item.label} href={item.href} onClick={closeMenu}>
              <span aria-hidden="true">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__actions">
          <a className="shell-button" href={site.phoneHref} onClick={closeMenu}>Call to reserve</a>
          <a
            className="mobile-menu__instagram"
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            <InstagramIcon /> Instagram <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
