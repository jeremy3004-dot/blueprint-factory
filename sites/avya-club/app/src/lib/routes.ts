import type { NavRoute } from "../content/site";

export const primaryRoutes = [
  { href: "/", label: "Home", sourceUrl: "https://avya.club/" },
  { href: "/about", label: "About", sourceUrl: "https://avya.club/about" },
  { href: "/services", label: "Services", sourceUrl: "https://avya.club/service" },
  { href: "/gallery", label: "Gallery", sourceUrl: "https://avya.club/gallery" },
  { href: "/contact", label: "Contact", sourceUrl: "https://avya.club/contact" },
  { href: "/membership", label: "Membership", sourceUrl: "https://avya.club/register" }
] as const satisfies readonly NavRoute[];

export function normalizePath(path: string): string {
  return path === "/" ? path : path.replace(/\/+$/, "");
}

export function isActiveRoute(pathname: string, href: string): boolean {
  return normalizePath(pathname) === normalizePath(href);
}
