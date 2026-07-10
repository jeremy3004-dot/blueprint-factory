"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";

import { ChevronDownIcon } from "./icons";
import { siteContent } from "../content/site";

interface FooterGroupProps {
  readonly title: string;
  readonly children: ReactNode;
}

function FooterGroup({ title, children }: FooterGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="footerGroup">
      <h2 className="footerGroupHeading">{title}</h2>
      <button
        className="footerAccordionButton"
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{title}</span>
        <ChevronDownIcon />
      </button>
      <div className="footerAccordionPanel" id={panelId}>
        {children}
      </div>
    </section>
  );
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function SiteFooter() {
  const { contact, routes, socialLinks } = siteContent;

  return (
    <footer className="siteFooter">
      <div className="siteFooterGrid">
        <section className="footerAbout" aria-labelledby="footer-about-heading">
          <Link className="footerLogo" href="/" aria-label="Avya Club home">
            <img src="/brand/avya-club-logo.png" alt="Avya Club" width="133" height="72" />
          </Link>
          <h2 className="srOnly" id="footer-about-heading">
            About Avya Club
          </h2>
          <p>A holistic haven for health, fitness, recovery, and wellbeing.</p>
          <p>
            {contact.street}, {contact.city}, {contact.country}
            <br />
            {contact.hours}
          </p>
        </section>

        <FooterGroup title="Explore">
          <ul className="footerLinkList">
            {routes.map((route) => (
              <li key={route.href}>
                <a href={route.href}>{route.label}</a>
              </li>
            ))}
          </ul>
        </FooterGroup>

        <FooterGroup title="Contact">
          <ul className="footerLinkList">
            {contact.phones.map((phone) => (
              <li key={phone}>
                <a href={phoneHref(phone)}>{phone}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </FooterGroup>

        <FooterGroup title="Follow">
          <ul className="footerLinkList">
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </FooterGroup>
      </div>

      <div className="footerLegal">
        <span>© 2026 Avya Club</span>
        <span>Gharipatan, Pokhara, Nepal</span>
      </div>
    </footer>
  );
}
