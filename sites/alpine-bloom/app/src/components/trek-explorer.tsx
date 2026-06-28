"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { TrekRoute } from "@/data/green-pastures";
import type { OperatorSourceRoute } from "@/data/operator-source";
import {
  getSanitizedSourceItems,
  getSourceUpdatedLabel,
  sanitizeSourceCopy,
} from "@/lib/operator-dossier";
import { formatSnapshotRate, formatStartingRateWithPrefix } from "@/lib/route-pricing";

const all = "All";

type EnrichedRoute = TrekRoute & {
  sourceRoute: OperatorSourceRoute | null;
  pricingSnippet: string;
  planningSnippet: string;
};

function getPricingSnippet(route: TrekRoute, sourceRoute: OperatorSourceRoute | null) {
  const rate = formatStartingRateWithPrefix(route.fromUsd);

  if (sourceRoute?.costUsd != null) {
    return `${rate} · ${formatSnapshotRate(sourceRoute.costUsd)}`;
  }

  return `${rate} · snapshot pending`;
}

function getPlanningSnippet(route: TrekRoute, sourceRoute: OperatorSourceRoute | null) {
  const sourceNotes = [
    sourceRoute?.seasonWindow ? sanitizeSourceCopy(sourceRoute.seasonWindow) : null,
    sourceRoute?.groupSize ? sanitizeSourceCopy(sourceRoute.groupSize) : null,
    sourceRoute?.accommodation ? sanitizeSourceCopy(sourceRoute.accommodation) : null,
  ].filter(Boolean) as string[];

  return sourceNotes.slice(0, 2).join(" · ") || route.stayStyle;
}

export function TrekExplorer({
  operatorSources,
  routes,
}: {
  operatorSources: OperatorSourceRoute[];
  routes: TrekRoute[];
}) {
  const [region, setRegion] = useState(all);
  const [difficulty, setDifficulty] = useState(all);
  const [season, setSeason] = useState(all);
  const [support, setSupport] = useState(all);
  const sourceBySlug = useMemo(
    () => new Map(operatorSources.map((source) => [source.slug, source])),
    [operatorSources],
  );
  const enrichedRoutes = useMemo(
    () =>
      routes.map((route) => {
        const sourceRoute = route.sourceSlug ? sourceBySlug.get(route.sourceSlug) ?? null : null;
        return {
          ...route,
          sourceRoute,
          pricingSnippet: getPricingSnippet(route, sourceRoute),
          planningSnippet: getPlanningSnippet(route, sourceRoute),
        };
      }),
    [routes, sourceBySlug],
  );

  const regions = [all, ...Array.from(new Set(enrichedRoutes.map((route) => route.region)))];
  const difficulties = [all, ...Array.from(new Set(enrichedRoutes.map((route) => route.difficulty)))];
  const seasons = [all, ...Array.from(new Set(enrichedRoutes.flatMap((route) => route.bestSeasons)))];
  const supportOptions = [all, "Women-led", "First trek", "No flight", "Short route"];
  const filtered = useMemo(
    () =>
      enrichedRoutes.filter((route) => {
        const womenSourceText = [
          route.summary,
          route.signature,
          route.stayStyle,
          route.sourceRoute?.title,
          route.sourceRoute?.groupSize,
          route.sourceRoute?.description.join(" "),
          route.sourceRoute?.includeItems.join(" "),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const supportMatch =
          support === all ||
          (support === "Women-led" && womenSourceText.includes("women")) ||
          (support === "First trek" &&
            (route.difficulty === "Introductory" ||
              route.summary.toLowerCase().includes("first"))) ||
          (support === "No flight" &&
            !route.access.join(" ").toLowerCase().includes("flight")) ||
          (support === "Short route" && route.durationDays <= 7);

        return (
          (region === all || route.region === region) &&
          (difficulty === all || route.difficulty === difficulty) &&
          (season === all || route.bestSeasons.includes(season)) &&
          supportMatch
        );
      }),
    [difficulty, enrichedRoutes, region, season, support],
  );
  const featured = filtered[0] ?? null;
  const featuredIncludes = featured
    ? getSanitizedSourceItems(featured.sourceRoute?.includeItems ?? [], [
        "Nepali women guide support, permit planning, lodging, meals, and trailhead transport are shaped into the proposal.",
      ])
    : [];
  const featuredExcludes = featured
    ? getSanitizedSourceItems(featured.sourceRoute?.excludeItems ?? [], [
        "International flights, insurance, personal trail expenses, optional upgrades, and tips are quoted separately.",
      ])
    : [];

  return (
    <section className="featureBlock shell">
      <div className="filterBar" aria-label="Trek filters">
        <FilterGroup label="Region" value={region} options={regions} onChange={setRegion} />
        <FilterGroup
          label="Difficulty"
          value={difficulty}
          options={difficulties}
          onChange={setDifficulty}
        />
        <FilterGroup label="Season" value={season} options={seasons} onChange={setSeason} />
        <FilterGroup label="Support" value={support} options={supportOptions} onChange={setSupport} />
      </div>

      {filtered.length ? (
        <div className="trekGrid">
          {filtered.map((route, index) => (
            <Link
              className={`trekTile ${index === 0 ? "wide" : ""}`}
              href={`/treks/${route.slug}`}
              key={route.slug}
            >
              <img src={route.image} alt="" />
              <div className="trekTileText">
                <span>
                  {route.region} · {route.durationDays} days · {route.maxAltitudeM.toLocaleString()}m
                </span>
                <h2>{route.name}</h2>
                <p>{route.signature}</p>
                <dl className="trekTileMeta">
                  <div>
                    <dt>Rate guide</dt>
                    <dd>{route.pricingSnippet}</dd>
                  </div>
                  <div>
                    <dt>Planning notes</dt>
                    <dd>{route.planningSnippet}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="trekEmptyState">
          <h2>No route matches those filters yet.</h2>
          <p>
            Clear one filter or send the planner your dates and comfort level. Alpine Bloom can
            still shape a women-only custom trek brief from the full route desk.
          </p>
        </div>
      )}

      {featured ? (
        <section className="routePreviewDossier">
          <div>
            <p className="kicker">Source-backed route dossier</p>
            <h2>{featured.name} planning snapshot</h2>
            <p>{featured.sourceRoute?.description[0] ? sanitizeSourceCopy(featured.sourceRoute.description[0]) : featured.summary}</p>
            <span>{getSourceUpdatedLabel(featured.sourceRoute)}</span>
            {featured.sourceRoute?.highlights.length ? (
              <div className="routePreviewHighlights">
                {featured.sourceRoute.highlights.map((highlight) => (
                  <span key={highlight}>{sanitizeSourceCopy(highlight)}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="routePreviewLists">
            <article>
              <h3>Usually included</h3>
              {featuredIncludes.slice(0, 4).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
            <article>
              <h3>Usually separate</h3>
              {featuredExcludes.slice(0, 4).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
          </div>
        </section>
      ) : null}
    </section>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p>{label}</p>
      <div className="chipRow">
        {options.map((option) => (
          <button
            className={option === value ? "active" : ""}
            key={option}
            type="button"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
