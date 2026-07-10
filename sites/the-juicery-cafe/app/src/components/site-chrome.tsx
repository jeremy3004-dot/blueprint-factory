"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, navigation } from "@/data/site";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <path d="M24 7c4 7 5 12 0 18-5-6-4-11 0-18Z" />
        <path d="M12 15c7 2 11 6 12 13-7-1-11-6-12-13Z" />
        <path d="M36 15c-7 2-11 6-12 13 7-1 11-6 12-13Z" />
        <path d="M8 27c7-1 12 1 16 7-7 2-13-1-16-7Z" />
        <path d="M40 27c-7-1-12 1-16 7 7 2 13-1 16-7Z" />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Link className="site-brand" href="/" aria-label="The Juicery Cafe home">
          <BrandMark />
          <span>The Juicery Cafe</span>
        </Link>
        <button
          ref={triggerRef}
          className="menu-trigger"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <span>Menu</span>
          <i aria-hidden="true" />
        </button>
      </header>

      <div id="site-menu" className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="menu-topline">
          <span className="menu-eyebrow">North Lakeside · Pokhara</span>
          <button
            ref={closeRef}
            type="button"
            className="menu-close"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Primary navigation">
          <ol>
            {navigation.map((item, index) => (
              <li key={item.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-contact">
          <span>Open {contact.hours}</span>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
        </div>
      </div>
    </>
  );
}

export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-content" aria-label="Cafe details">
        <div className="footer-pattern" aria-hidden="true" />
        <div className="footer-grid">
          <div>
            <h2 className="section-label">Visit</h2>
            <address>{contact.address}</address>
            <a href={contact.mapHref} target="_blank" rel="noreferrer">
              Open map ↗
            </a>
          </div>
          <div className="footer-emblem">
            <BrandMark />
            <h2>The Juicery Cafe</h2>
            <span>Est. 2016 · Pokhara</span>
          </div>
          <div>
            <h2 className="section-label">Contact</h2>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer">
              WhatsApp {contact.whatsappDisplay}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <h2 className="footer-mini-heading">Hours</h2>
            <span>Open {contact.hours}</span>
          </div>
          <div className="footer-explore">
            <h2 className="footer-mini-heading">Explore</h2>
            <nav aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
}
