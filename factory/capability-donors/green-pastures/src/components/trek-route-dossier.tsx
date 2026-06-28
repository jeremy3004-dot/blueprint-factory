import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPinned,
  Mountain,
  ShieldCheck,
  Timer,
} from "lucide-react";

import { RouteMapExplorer } from "@/components/route-map-explorer";
import type { TrekMapData } from "@/data/trek-route-geo";
import type { TrekRoute } from "@/data/treks";

type TrekRouteDossierProps = {
  trek: TrekRoute;
  trekMap: TrekMapData;
  alternateRoutes: TrekRoute[];
};

function AlternateRouteLink({
  route,
  priority,
}: {
  route: TrekRoute;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/treks/${route.slug}`}
      className="group grid gap-3 border-t border-white/10 py-4 text-left transition hover:border-white/25"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500 transition group-hover:text-stone-300">
            {priority ? `${route.region} alternative` : route.region}
          </p>
          <h2 className="mt-2 font-display text-2xl leading-none text-stone-100 transition group-hover:text-white md:text-[2rem]">
            {route.name}
          </h2>
        </div>
        <span className="rounded-full border border-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-stone-400 transition group-hover:text-stone-200">
          {route.durationDays} days
        </span>
      </div>
      <p className="max-w-md text-sm leading-6 text-stone-300">{route.signature}</p>
    </Link>
  );
}

export function TrekRouteDossier({
  trek,
  trekMap,
  alternateRoutes,
}: TrekRouteDossierProps) {
  return (
    <div className="space-y-14 md:space-y-20">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <Image
          src={trek.image}
          alt={trek.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,11,15,0.94)_0%,rgba(8,11,15,0.7)_38%,rgba(8,11,15,0.2)_72%,rgba(8,11,15,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(241,201,129,0.24),transparent_24%),radial-gradient(circle_at_83%_12%,rgba(86,137,170,0.22),transparent_26%)]" />

        <div className="relative grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:min-h-[44rem] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-between gap-10">
            <div className="max-w-3xl space-y-6">
              <p className="section-kicker text-stone-200/80">Curated route atlas</p>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.34em] text-amber-200/90">
                  {trek.region} spotlight
                </p>
                <div className="space-y-4">
                  <h1 className="font-display text-5xl leading-[0.88] text-white md:text-7xl lg:text-[5.7rem]">
                    {trek.name}
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-stone-100/88">
                    {trek.signature}
                  </p>
                </div>
              </div>

            </div>

            <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-400">
                  Why travelers choose it
                </p>
                <p className="text-sm leading-7 text-stone-200/82">{trek.summary}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    Best season
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">
                    {trek.bestSeasons.join(" · ")}
                  </p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    Access
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">{trek.access[0]}</p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    Stay style
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">{trek.stayStyle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:items-end">
            <div className="w-full max-w-xl border-t border-white/10 pt-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                  Other routes
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  {alternateRoutes.length} nearby matches
                </p>
              </div>
              <div className="mt-3 grid gap-1">
                {alternateRoutes.map((route, index) => (
                  <AlternateRouteLink
                    key={route.slug}
                    route={route}
                    priority={index === 0 && route.region === trek.region}
                  />
                ))}
              </div>
            </div>

            <div className="w-full max-w-xl rounded-[2rem] border border-white/12 bg-[rgba(8,11,15,0.7)] p-5 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                Highlights
              </p>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-stone-200 sm:grid-cols-2">
                {trek.highlights.slice(0, 4).map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.48fr_1.52fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="border-t border-white/10 pt-5">
            <p className="section-kicker">Trip planning</p>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              Everything worth knowing before you choose this trek.
            </h2>
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-5 text-sm leading-7 text-stone-300">
            <div className="flex items-start gap-3">
              <Timer className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Trip length
                </p>
                <p className="mt-2">
                  {trek.durationDays} days, paced around a {trek.maxAltitudeM.toLocaleString()}m high point.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Permits
                </p>
                <p className="mt-2">{trek.permits.join(" · ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinned className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Getting there
                </p>
                <p className="mt-2">{trek.access.join(" · ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mountain className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Premium angle
                </p>
                <p className="mt-2">
                  {trek.bundle.helicopter ??
                    trek.bundle.jeep ??
                    trek.bundle.flight ??
                    "Guide-led pacing and route clarity are the strongest upgrade on this line."}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <Link
              href={{ pathname: "/book", query: { route: trek.slug } }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/35 hover:text-amber-300"
            >
              Build a proposal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <RouteMapExplorer trek={trek} mapData={trekMap} emphasis="immersive" />
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.36fr_1.64fr]">
        <div className="space-y-4">
          <p className="section-kicker">Route details</p>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            Everything you need before asking us to tailor the trip.
          </h2>
          <p className="max-w-md text-base leading-8 text-stone-300">
            This is where a great idea turns into a workable itinerary: route
            framing, comfort planning, and upgrade options.
          </p>
        </div>

        <div className="space-y-0 overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
          <div className="px-6 py-6 md:px-8 md:py-8">
            <div className="space-y-5 rounded-[2rem] border border-white/10 bg-stone-950/80 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">
                  Customize your trip
                </p>
                <p className="mt-3 text-base leading-7 text-stone-300">
                  The best version of this route often comes down to how arrival plans,
                  comfort level, and exit upgrades are tailored.
                </p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-4 text-sm leading-7 text-stone-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Permits</p>
                  <p className="mt-2">{trek.permits.join(", ")}</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Access</p>
                  <p className="mt-2">{trek.access.join(", ")}</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Stay style</p>
                  <p className="mt-2">{trek.stayStyle}</p>
                </div>
                {Object.entries(trek.bundle)
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <div key={label} className="border-t border-white/10 pt-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{label}</p>
                      <p className="mt-2">{value}</p>
                    </div>
                  ))}
              </div>

              <Link
                href={{ pathname: "/book", query: { route: trek.slug } }}
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-amber-200"
              >
                Build a proposal <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
