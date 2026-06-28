import Image from "next/image";
import Link from "next/link";

import type { TrekRoute } from "@/data/treks";

type RoutePillNavProps = {
  routes: TrekRoute[];
};

export function RoutePillNav({ routes }: RoutePillNavProps) {
  return (
    <nav aria-label="Route quick links">
      <div className="flex flex-wrap gap-3 md:gap-4">
        {routes.map((route) => (
          <Link
            key={route.slug}
            href={`/treks/${route.slug}`}
            aria-label={`Open ${route.name}`}
            title={route.name}
            className="group relative inline-flex min-h-14 max-w-full items-center overflow-hidden rounded-full border border-white/12 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_42px_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:border-amber-300/45 hover:text-amber-100 md:min-h-16 md:px-6 md:text-xs"
          >
            <Image
              src={route.image}
              alt=""
              fill
              sizes="260px"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,11,0.84),rgba(5,8,11,0.48)_58%,rgba(5,8,11,0.28))]" />
            <span className="absolute inset-0 bg-black/18 transition group-hover:bg-black/8" />
            <span className="relative whitespace-nowrap drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              {route.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
