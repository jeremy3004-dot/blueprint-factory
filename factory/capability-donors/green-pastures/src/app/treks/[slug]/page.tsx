import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RouteMapExplorer } from "@/components/route-map-explorer";
import { getTrekMapData } from "@/data/trek-route-geo";
import {
  formatSourceUpdatedAt,
  getSanitizedSourceItems,
  getRouteDossierFacts,
  sanitizeSourceCopy,
} from "@/lib/operator-dossier";
import { getVisibleItineraryItems } from "@/lib/itinerary";
import {
  getPayloadOperatorSourceRoute,
  getPayloadTrekBySlug,
  getPayloadTreks,
} from "@/lib/payload-content";
import { formatStartingRate } from "@/lib/route-pricing";

export async function generateStaticParams() {
  const routes = await getPayloadTreks();
  return routes.map((route) => ({ slug: route.slug }));
}

export default async function TrekDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = await getPayloadTrekBySlug(slug);

  if (!trek) {
    notFound();
  }

  const trekMap = getTrekMapData(trek.slug);
  const sourceRoute = await getPayloadOperatorSourceRoute(trek.sourceSlug);
  const sourceFacts = getRouteDossierFacts(trek, sourceRoute);
  const sourceUpdatedAt = formatSourceUpdatedAt(sourceRoute?.updatedAt ?? null);
  const sourceIncludes = getSanitizedSourceItems(sourceRoute?.includeItems ?? [], [
    "Guide support, meals, lodging, permits, and trailhead transport are the common package backbone.",
  ]);
  const sourceExcludes = getSanitizedSourceItems(sourceRoute?.excludeItems ?? [], [
    "Mineral water, discretionary drinks, tips, souvenirs, and traveler insurance should still be budgeted separately.",
  ]);
  const visibleItinerary = getVisibleItineraryItems(sourceRoute?.itinerary ?? []);

  return (
    <main className="pb-24">
      <section className="relative min-h-[56svh] overflow-hidden">
        <Image
          src={trek.image}
          alt={trek.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[rgba(9,12,16,0.94)]" />
        <div className="section-shell relative flex min-h-[56svh] items-end py-16">
          <div className="max-w-4xl space-y-5">
            <p className="section-kicker">{trek.region} · {trek.difficulty}</p>
            <h1 className="font-display text-6xl text-white md:text-8xl">{trek.name}</h1>
            <p className="max-w-3xl text-base leading-8 text-stone-200 md:text-lg">{trek.signature}</p>
          </div>
        </div>
      </section>

      {trekMap ? (
        <section className="mx-auto mt-12 max-w-[91.5rem] space-y-9 px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_1px_minmax(0,1.65fr)] lg:items-center">
            <div className="space-y-4">
              <p className="section-kicker">Route planning map</p>
              <h2 className="font-display text-4xl leading-[0.95] text-white md:text-[3.55rem]">
              Explore the route before you commit to it.
              </h2>
            </div>
            <div className="hidden h-[5.5rem] bg-white/14 lg:block" />
            <p className="max-w-[32rem] text-base leading-8 text-stone-200 lg:ml-10">
              Switch between topographic context, overall route shape, and stage-by-stage
              stops so you can see how the trek unfolds in real terms, not just as a line
              between famous names.
            </p>
          </div>
          <RouteMapExplorer trek={trek} mapData={trekMap} />
        </section>
      ) : null}

      <section className="section-shell mt-12 space-y-8">
        {!trekMap ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Duration", `${trek.durationDays} days`],
              ["Max altitude", `${trek.maxAltitudeM.toLocaleString()}m`],
              ["Best seasons", trek.bestSeasons.join(" · ")],
              ["Starting rate", formatStartingRate(trek.fromUsd)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">{label}</p>
                <p className="mt-2 font-display text-3xl text-white">{value}</p>
              </div>
            ))}
          </div>
        ) : null}

        {!trekMap ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="section-kicker">Permits and access</p>
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Permits</p>
                  <p className="mt-2 text-base leading-7 text-stone-300">{trek.permits.join(", ")}</p>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Access</p>
                  <p className="mt-2 text-base leading-7 text-stone-300">{trek.access.join(", ")}</p>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-stone-500">Stay style</p>
                  <p className="mt-2 text-base leading-7 text-stone-300">{trek.stayStyle}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-stone-950/85 p-6">
              <p className="section-kicker">Customize your trip</p>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-stone-300 sm:grid-cols-2">
                {Object.entries(trek.bundle)
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <div key={label} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0">
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{label}</p>
                      <p className="mt-2">{value}</p>
                    </div>
                  ))}
              </div>
              <Link
                href={{ pathname: "/book", query: { route: trek.slug } }}
                className="mt-6 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-amber-200"
              >
                Build a proposal
              </Link>
            </div>
          </div>
        ) : null}

        <div className="space-y-8">
          {trek.packageOptions ? (
            <div id="package-options" className="space-y-5 border-t border-white/10 pt-6">
              <div>
                <p className="section-kicker">Package options</p>
                <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
                  Choose the Karnali product that fits the traveler.
                </h2>
              </div>
              <div className="grid gap-4">
                {trek.packageOptions.map((option) => (
                  <article
                    key={option.name}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.26em] text-amber-200">
                          {option.positioning}
                        </p>
                        <h3 className="mt-3 font-display text-3xl text-white">
                          {option.name}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em] text-stone-300">
                        <span className="rounded-full border border-white/12 bg-black/20 px-3 py-1">
                          {option.duration}
                        </span>
                        <span className="rounded-full border border-white/12 bg-black/20 px-3 py-1">
                          {option.difficulty}
                        </span>
                        {option.priceGuide ? (
                          <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-amber-100">
                            {option.priceGuide}
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-stone-300">
                      Best for: {option.bestFor}
                    </p>
                    <div className="mt-4 grid gap-3 text-sm leading-7 text-stone-300 md:grid-cols-3">
                      {option.highlights.map((highlight) => (
                        <div key={highlight} className="border-t border-white/10 pt-3">
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

        </div>
      </section>

      {sourceRoute ? (
        <section className="section-shell mt-16 space-y-8">
          <div className="border-t border-white/10 pt-6">
            <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-8">
                {visibleItinerary.length > 0 ? (
                  <div id="full-itinerary" className="scroll-mt-24 space-y-4">
                    <p className="section-kicker">Full itinerary</p>
                    <div className="space-y-4">
                      {visibleItinerary.map((item) => (
                        <article
                          key={`${item.day ?? "x"}-${item.title}`}
                          className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 first:lg:min-h-[18rem]"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs uppercase tracking-[0.26em] text-stone-500">
                              {item.day ? `Day ${item.day}` : "Route stage"}
                            </p>
                            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-stone-500">
                              {item.duration ? <span>{item.duration}</span> : null}
                              {item.distance ? <span>{item.distance}</span> : null}
                              {item.ascent ? <span>{item.ascent}</span> : null}
                            </div>
                          </div>
                          <h3 className="mt-3 font-display text-3xl text-white">
                            {sanitizeSourceCopy(item.title)}
                          </h3>
                          {item.details ? (
                            <p className="mt-3 text-sm leading-7 text-stone-300">
                              {sanitizeSourceCopy(item.details)}
                            </p>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="space-y-4">
                <p className="section-kicker">Trip essentials</p>
                <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:grid-cols-2 lg:min-h-[12.5rem]">
                  {sourceFacts.map((fact) => (
                    <div key={fact.label} className="border-t border-white/10 pt-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-stone-200">{fact.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-stone-950/85 p-6">
                  <p className="section-kicker">Included and excluded at a glance</p>
                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                        Includes
                      </p>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-stone-300">
                        {sourceIncludes.slice(0, 6).map((item) => (
                          <p key={item} className="border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                        Not included
                      </p>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-stone-300">
                        {sourceExcludes.slice(0, 6).map((item) => (
                          <p key={item} className="border-t border-white/10 pt-3 first:border-t-0 first:pt-0">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-5 text-sm leading-7 text-stone-400">
                    <p>
                      Partner listing: {sourceRoute.title}
                      {sourceUpdatedAt ? ` · Updated ${sourceUpdatedAt}` : ""}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
