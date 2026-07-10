"use client";

import { useEffect, useRef, useState } from "react";

import type { NavRoute } from "../content/site";
import { CloseIcon, MenuIcon } from "./icons";

interface MobileMenuProps {
  readonly routes: readonly NavRoute[];
  readonly registrationUrl: string;
}

export function MobileMenu({ routes, registrationUrl }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  function closeMenu({ restoreFocus = false } = {}) {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      overlayRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }

      if (event.key !== "Tab" || !overlayRef.current || !toggleRef.current) return;

      const focusable = [
        toggleRef.current,
        ...overlayRef.current.querySelectorAll<HTMLAnchorElement>("a[href]")
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <div className="mobileMenu">
      <button
        ref={toggleRef}
        className="mobileMenuToggle"
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isOpen ? (
        <div
          ref={overlayRef}
          className="mobileMenuOverlay"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul>
            {routes.map((route) => (
              <li key={route.href}>
                <a href={route.href} onClick={() => closeMenu()}>
                  {route.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="mobileMembershipCta"
            href={registrationUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => closeMenu()}
          >
            Membership
          </a>
        </div>
      ) : null}
    </div>
  );
}
