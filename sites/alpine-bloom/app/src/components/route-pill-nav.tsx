import Link from "next/link";

import type { TrekRoute } from "@/data/green-pastures";

export function RoutePillNav({
  activeSlug,
  routes,
}: {
  activeSlug?: string;
  routes: TrekRoute[];
}) {
  return (
    <nav aria-label="Route quick links" className="routePillNav">
      {routes.map((route) => (
        <Link
          aria-current={route.slug === activeSlug ? "page" : undefined}
          href={`/treks/${route.slug}`}
          key={route.slug}
        >
          <img src={route.image} alt="" />
          <span>{route.name}</span>
          <small>{route.durationDays} days · {route.region}</small>
        </Link>
      ))}
    </nav>
  );
}
