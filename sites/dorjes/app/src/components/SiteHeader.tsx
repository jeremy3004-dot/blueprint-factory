"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "../lib/content";

const menuLinks = [
  ["Stay", "/accommodation-in-pokhara"],
  ["Taste", "/tastes"],
  ["Wellness", "https://dorjes.com/spa-and-wellness/"],
  ["The Resort", "https://dorjes.com/resort/"],
  ["About Dorje", "https://dorjes.com/about-dorje/"],
  ["Contact", "https://dorjes.com/contact/"]
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (!open) return;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  };

  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header">
        <div className="header-left">
          <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>
            <span className="menu-glyph" aria-hidden="true"><span /><span /><span /></span>
            <span className="menu-label">Menu</span>
          </button>
          <nav className="desktop-nav" aria-label="Primary">
            <Link href="/accommodation-in-pokhara">Stay</Link>
            <Link href="/tastes">Taste</Link>
          </nav>
        </div>
        <Link className="site-logo" href="/" aria-label="Dorje's Resort & Spa home">
          <img src="/media/mark.svg" alt="Dorje's Resort & Spa" />
        </Link>
        <div className="header-right">
          <a href={`mailto:${site.email}`}>Enquire</a>
          <a className="book-link" href={site.booking}>Book</a>
        </div>
      </header>
      <div id="site-menu" className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div ref={panelRef} className="menu-panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <button className="menu-close" type="button" onClick={close}>Close</button>
          <nav className="menu-links" aria-label="Full menu">
            {menuLinks.map(([label, href]) => <Link key={label} href={href} onClick={close}>{label}</Link>)}
          </nav>
          <div className="menu-meta">
            <span>{site.location}</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone.replaceAll("-", "")}`}>{site.phone}</a>
          </div>
        </div>
        <button className="menu-scrim" type="button" aria-label="Close menu" onClick={close} />
      </div>
    </>
  );
}
