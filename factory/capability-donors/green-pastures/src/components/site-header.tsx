import Image from "next/image";
import Link from "next/link";

import { companyProfile } from "@/data/company";

const links = [
  { href: "/", label: "Home" },
  { href: "/treks", label: "Routes" },
  { href: "/faq", label: "FAQ" },
  { href: "/book", label: "Book" },
  { href: "/planner", label: "AI Concierge" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,12,16,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/green-pastures-logo.png"
            alt={`${companyProfile.shortName} logo`}
            width={52}
            height={47}
            sizes="52px"
            className="h-12 w-12 shrink-0 rounded-full object-contain"
            priority
          />
          <div>
            <p className="font-display text-lg uppercase tracking-[0.28em] text-stone-100">
              {companyProfile.shortName}
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
              {companyProfile.tagline}
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.28em] text-stone-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
