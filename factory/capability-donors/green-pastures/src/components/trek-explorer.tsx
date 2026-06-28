"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPinned, Mountain, ShieldCheck, Timer } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import { RouteMapExplorer } from "@/components/route-map-explorer";
import { RoutePillNav } from "@/components/route-pill-nav";
import type { OperatorSourceRoute } from "@/data/operator-source";
import { getTrekMapData } from "@/data/trek-route-geo";
import type { TrekRoute } from "@/data/treks";
import {
  formatOperatorRate,
  formatStartingRate,
  formatStartingRateWithPrefix,
} from "@/lib/route-pricing";
import {
  getRouteDossierFacts,
  getRouteNarrative,
  getSanitizedSourceItems,
  sanitizeSourceCopy,
} from "@/lib/operator-dossier";

type EnrichedRoute = TrekRoute & {
  sourceRoute: OperatorSourceRoute | null;
  hasMap: boolean;
  isSourceBacked: boolean;
  pricingSnippet: string;
  planningSnippet: string;
};

function getPricingSnippet(route: TrekRoute, sourceRoute: OperatorSourceRoute | null) {
  const catalogRate = formatStartingRateWithPrefix(route.fromUsd);

  if (sourceRoute?.costUsd != null) {
    return `${catalogRate} with us • ${formatOperatorRate(sourceRoute.costUsd)}`;
  }

  return `${catalogRate} with us • Partner rate not listed`;
}

function getPlanningSnippet(route: TrekRoute, sourceRoute: OperatorSourceRoute | null) {
  const sourceNotes = [
    sourceRoute?.seasonWindow ? sanitizeSourceCopy(sourceRoute.seasonWindow) : null,
    sourceRoute?.groupSize ? sanitizeSourceCopy(sourceRoute.groupSize) : null,
    sourceRoute?.accommodation ? sanitizeSourceCopy(sourceRoute.accommodation) : null,
    sourceRoute?.activity ? sanitizeSourceCopy(sourceRoute.activity) : null,
  ].filter(Boolean) as string[];

  return sourceNotes.slice(0, 2).join(" • ") || route.stayStyle;
}

function RouteSignalPill({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "amber" | "slate";
}) {
  const toneClassName =
    tone === "amber"
      ? "border-amber-300/35 bg-amber-300/12 text-amber-100"
      : tone === "slate"
        ? "border-white/16 bg-white/6 text-stone-100"
        : "border-white/12 bg-black/25 text-stone-300";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${toneClassName}`}
    >
      {label}
    </span>
  );
}

function RouteIndexButton({
  route,
  active,
  onSelect,
}: {
  route: EnrichedRoute;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(route.slug)}
      className={`group grid gap-3 border-t py-4 text-left transition ${
        active ? "border-amber-300/45" : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-[11px] uppercase tracking-[0.28em] transition ${
              active ? "text-amber-200" : "text-stone-500 group-hover:text-stone-300"
            }`}
          >
            {route.region}
          </p>
          <h3
            className={`mt-2 font-display text-2xl leading-none transition md:text-[2rem] ${
              active ? "text-white" : "text-stone-200 group-hover:text-white"
            }`}
          >
            {route.name}
          </h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] transition ${
            active
              ? "border-amber-300/45 bg-amber-300/10 text-amber-100"
              : "border-white/12 text-stone-400 group-hover:text-stone-200"
          }`}
        >
          {route.durationDays} days
        </span>
      </div>
      <p className="max-w-md text-sm leading-6 text-stone-300">{route.signature}</p>
      <div className="flex flex-wrap gap-2">
        {route.isSourceBacked ? <RouteSignalPill label="Operator notes" tone="slate" /> : null}
        {!route.hasMap ? <RouteSignalPill label="Route brief" /> : null}
      </div>
    </button>
  );
}

function RouteLedgerRow({
  route,
  active,
  onSelect,
}: {
  route: EnrichedRoute;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border-t border-white/10 py-7 first:border-t-0 first:pt-0"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Link
          href={`/treks/${route.slug}`}
          aria-label={`Open ${route.name} route guide`}
          className="group relative aspect-[1.18] overflow-hidden rounded-[2rem] border border-white/10 text-left"
        >
          <Image
            src={route.image}
            alt={route.name}
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,11,0.06),rgba(5,8,11,0.16)_45%,rgba(5,8,11,0.84))]" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <h3 className="font-display text-4xl text-white md:text-5xl">{route.name}</h3>
          </div>
        </Link>

        <div className="grid gap-5">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-stone-500">
            <span>{route.durationDays} days</span>
            <span className="h-1 w-1 rounded-full bg-stone-600" />
            <span>{route.maxAltitudeM.toLocaleString()}m</span>
            <span className="h-1 w-1 rounded-full bg-stone-600" />
            <span>{route.hasMap ? "Interactive map" : "Route brief"}</span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {route.isSourceBacked ? (
                <RouteSignalPill label="Operator notes" tone="slate" />
              ) : null}
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">
              {active ? "Featured now" : "Route overview"}
            </p>
            <p className="max-w-2xl text-base leading-8 text-stone-200">{route.summary}</p>
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-4 text-sm leading-7 text-stone-300 md:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                Rate guide
              </p>
              <p className="mt-2">{route.pricingSnippet}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                Trip style
              </p>
              <p className="mt-2">{route.planningSnippet}</p>
            </div>
          </div>

          <div className="grid gap-3 text-sm leading-7 text-stone-300 md:grid-cols-2">
            {route.highlights.slice(0, 4).map((highlight) => (
              <div key={highlight} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={`/treks/${route.slug}`}
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:text-amber-300"
            >
              Open route detail <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function RouteDossierFallback({
  route,
  sourceRoute,
}: {
  route: TrekRoute;
  sourceRoute: OperatorSourceRoute | null;
}) {
  const facts = getRouteDossierFacts(route, sourceRoute);
  const narrative = getRouteNarrative(route, sourceRoute);
  const includeItems = getSanitizedSourceItems(sourceRoute?.includeItems ?? [], [
    "Guide support, meals, lodging, permits, and trailhead transport are the main package backbone.",
  ]);

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,14,18,0.98),rgba(20,24,29,0.84))]">
      <div className="grid gap-8 p-6 md:p-8 lg:min-h-[44rem] lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
        <div className="space-y-6">
          <div className="border-t border-white/10 pt-5">
            <p className="section-kicker">Route guide preview</p>
            <h3 className="mt-4 font-display text-4xl text-white md:text-5xl">
              This route still comes with a rich trip brief even without the interactive map.
            </h3>
          </div>

          <div className="space-y-4 text-sm leading-7 text-stone-300">
            {narrative.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-5 text-sm leading-7 text-stone-300">
            <div className="flex items-start gap-3">
              <Timer className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Trip length
                </p>
                <p className="mt-2">
                  {route.durationDays} days, paced around a{" "}
                  {route.maxAltitudeM.toLocaleString()}m high point.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Permits
                </p>
                <p className="mt-2">{route.permits.join(" · ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinned className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Getting there
                </p>
                <p className="mt-2">{route.access.join(" · ")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid content-start gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <p className="section-kicker">Trip essentials</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-white/10 pt-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
            <p className="section-kicker">What’s included</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-stone-300">
              {includeItems.slice(0, 5).map((item) => (
                <p key={item} className="border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/treks/${route.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-amber-200"
            >
              Open full route guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrekExplorer({
  operatorSources,
  routes,
}: {
  operatorSources: OperatorSourceRoute[];
  routes: TrekRoute[];
}) {
  const [selectedSlug, setSelectedSlug] = useState(routes[0]?.slug ?? "");

  const filteredRoutes = useMemo(() => {
    const sourceBySlug = new Map(operatorSources.map((source) => [source.slug, source]));

    return routes
      .map((route) => {
        const sourceRoute = route.sourceSlug
          ? sourceBySlug.get(route.sourceSlug) ?? null
          : null;

        return {
          ...route,
          sourceRoute,
          hasMap: Boolean(getTrekMapData(route.slug)),
          isSourceBacked: Boolean(sourceRoute),
          pricingSnippet: getPricingSnippet(route, sourceRoute),
          planningSnippet: getPlanningSnippet(route, sourceRoute),
        };
      });
  }, [operatorSources, routes]);

  const selectedRoute = useMemo(() => {
    const matched = filteredRoutes.find((route) => route.slug === selectedSlug);
    return matched ?? filteredRoutes[0] ?? null;
  }, [filteredRoutes, selectedSlug]);

  const selectedMap = selectedRoute ? getTrekMapData(selectedRoute.slug) : null;
  const spotlightRoutes = filteredRoutes.slice(0, 6);

  if (!selectedRoute) {
    return (
      <section className="rounded-[2.5rem] border border-white/10 bg-black/20 px-6 py-12 text-center backdrop-blur-xl md:px-10">
        <p className="section-kicker">Route catalogue unavailable</p>
        <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
          No routes are available right now.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone-300">
          Reload the page in a moment, or check back once the route collection refreshes.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-14 md:space-y-20">
      <section className="space-y-5 border-b border-white/10 pb-7">
        <p className="section-kicker">Route quick links</p>
        <RoutePillNav routes={filteredRoutes} />
      </section>

      <section>
        <div className="space-y-2">
          {filteredRoutes.map((route) => (
            <RouteLedgerRow
              key={route.slug}
              route={route}
              active={route.slug === selectedRoute.slug}
              onSelect={setSelectedSlug}
            />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoute.slug}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={selectedRoute.image}
              alt={selectedRoute.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,11,15,0.94)_0%,rgba(8,11,15,0.7)_38%,rgba(8,11,15,0.2)_72%,rgba(8,11,15,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(241,201,129,0.24),transparent_24%),radial-gradient(circle_at_83%_12%,rgba(86,137,170,0.22),transparent_26%)]" />

        <div className="relative grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:min-h-[44rem] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10">
          <div className="flex flex-col justify-between gap-10">
            <div className="max-w-3xl space-y-6">
              <p className="section-kicker text-stone-200/80">Selected route spotlight</p>
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.34em] text-amber-200/90">
                  {selectedRoute.region} spotlight
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedRoute.slug}-copy`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.36 }}
                    className="space-y-4"
                  >
                    <h2 className="font-display text-5xl leading-[0.88] text-white md:text-7xl lg:text-[5.7rem]">
                      {selectedRoute.name}
                    </h2>
                    <p className="max-w-2xl text-lg leading-8 text-stone-100/88">
                      {selectedRoute.signature}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-400">
                  Why travelers choose it
                </p>
                <p className="text-sm leading-7 text-stone-200/82">{selectedRoute.summary}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    Best season
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">
                    {selectedRoute.sourceRoute?.seasonWindow ??
                      selectedRoute.bestSeasons.join(" · ")}
                  </p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    Access
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">
                    {selectedRoute.access[0]}
                  </p>
                </div>
                <div className="border-l border-white/10 pl-4">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    Stay style
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-100">
                    {selectedRoute.sourceRoute?.accommodation
                      ? sanitizeSourceCopy(selectedRoute.sourceRoute.accommodation)
                      : selectedRoute.stayStyle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:items-end">
            <div className="w-full max-w-xl border-t border-white/10 pt-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Quick jump</p>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Pick any route to preview
                </p>
              </div>
              <div className="mt-3 grid gap-1">
                {spotlightRoutes.map((route) => (
                  <RouteIndexButton
                    key={route.slug}
                    route={route}
                    active={route.slug === selectedRoute.slug}
                    onSelect={setSelectedSlug}
                  />
                ))}
              </div>
            </div>

            <div className="w-full max-w-xl rounded-[2rem] border border-white/12 bg-[rgba(8,11,15,0.7)] p-5 backdrop-blur-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-stone-400">
                At a glance
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedRoute.isSourceBacked ? (
                  <RouteSignalPill label="Operator notes" tone="slate" />
                ) : null}
                <RouteSignalPill
                  label={selectedRoute.hasMap ? "Interactive map" : "Route brief"}
                />
              </div>

              <div className="mt-5 grid gap-4 border-t border-white/10 pt-4 text-sm leading-7 text-stone-200">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Rate guide
                  </p>
                  <p className="mt-2">{selectedRoute.pricingSnippet}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Trip style
                  </p>
                  <p className="mt-2">{selectedRoute.planningSnippet}</p>
                </div>
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
              See how the journey comes together before you commit.
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
                  {selectedRoute.durationDays} days, paced around a{" "}
                  {selectedRoute.maxAltitudeM.toLocaleString()}m high point.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Permits
                </p>
                <p className="mt-2">{selectedRoute.permits.join(" · ")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPinned className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Ideal for
                </p>
                <p className="mt-2">
                  {selectedRoute.sourceRoute?.groupSize
                    ? sanitizeSourceCopy(selectedRoute.sourceRoute.groupSize)
                    : selectedRoute.sourceRoute?.activity
                      ? sanitizeSourceCopy(selectedRoute.sourceRoute.activity)
                      : selectedRoute.access.join(" · ")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mountain className="mt-1 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Rate note
                </p>
                <p className="mt-2">
                  {selectedRoute.sourceRoute?.costUsd != null
                    ? `A partner-published starting rate of ${formatStartingRate(selectedRoute.sourceRoute.costUsd)} can be used as a planning reference.`
                    : `${formatStartingRate(selectedRoute.fromUsd)} is our public starting price; partner pricing varies by dates, route shape, and inclusions.`}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <Link
              href={`/treks/${selectedRoute.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/35 hover:text-amber-300"
            >
              Open full route guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {selectedMap ? (
          <RouteMapExplorer trek={selectedRoute} mapData={selectedMap} emphasis="immersive" />
        ) : (
          <RouteDossierFallback
            route={selectedRoute}
            sourceRoute={selectedRoute.sourceRoute}
          />
        )}
      </section>

      <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(10,14,18,0.98),rgba(20,24,29,0.85))] px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-4">
            <p className="section-kicker">Next move</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Want help narrowing the list?
            </h2>
            <p className="max-w-2xl text-base leading-8 text-stone-300">
              The planner uses the same route collection to filter around your travel
              window, altitude comfort, flight tolerance, guide preference, and the mix of
              culture versus big-mountain drama you actually want.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition hover:bg-amber-200"
            >
              Open trip planner <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={{ pathname: "/book", query: { route: selectedRoute.slug } }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/35 hover:text-amber-300"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
