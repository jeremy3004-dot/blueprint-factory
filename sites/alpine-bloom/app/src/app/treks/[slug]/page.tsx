import Link from "next/link";
import { notFound } from "next/navigation";

import { RouteMapExplorer } from "@/components/route-map-explorer";
import { RoutePillNav } from "@/components/route-pill-nav";
import { SiteShell } from "@/components/site-shell";
import { trekRoutes } from "@/data/green-pastures";
import { getOperatorSourceRoute } from "@/data/operator-source";
import { getTrekMapData } from "@/data/trek-route-geo";
import {
  getRouteDossierFacts,
  getRouteNarrative,
  getSanitizedSourceItems,
  getSourceUpdatedLabel,
  sanitizeSourceCopy,
} from "@/lib/operator-dossier";
import { formatStartingRateWithPrefix } from "@/lib/route-pricing";

export function generateStaticParams() {
  return trekRoutes.map((route) => ({ slug: route.slug }));
}

export default async function TrekDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = trekRoutes.find((route) => route.slug === slug);

  if (!trek) notFound();

  const trekMap = getTrekMapData(trek.slug);
  const sourceRoute = getOperatorSourceRoute(trek.sourceSlug);
  const dossierFacts = getRouteDossierFacts(trek, sourceRoute);
  const narrative = getRouteNarrative(trek, sourceRoute);
  const included = getSanitizedSourceItems(sourceRoute?.includeItems ?? [], [
    "Nepali women guide support, permit planning, lodging, meals, and trailhead transport are shaped into the proposal.",
  ]);
  const excluded = getSanitizedSourceItems(sourceRoute?.excludeItems ?? [], [
    "International flights, insurance, personal trail expenses, optional upgrades, and tips are quoted separately.",
  ]);
  const alternates = trekRoutes
    .filter((route) => route.slug !== trek.slug && route.region === trek.region)
    .concat(trekRoutes.filter((route) => route.slug !== trek.slug && route.region !== trek.region))
    .slice(0, 3);

  return (
    <SiteShell>
      <section className="routeHero">
        <img src={trek.image} alt="" />
        <div className="shell">
          <p className="kicker">{trek.region} route dossier</p>
          <h1>{trek.name}</h1>
          <p>{trek.signature}</p>
          <div className="routeHeroMeta">
            <span>{formatStartingRateWithPrefix(trek.fromUsd)}</span>
            <span>{getSourceUpdatedLabel(sourceRoute)}</span>
          </div>
          <Link className="btn" href={`/book?route=${trek.slug}`}>
            Build a proposal <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="routeFacts shell">
        {dossierFacts.map(({ label, value }) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="routeQuickLinks shell">
        <p className="kicker">Compare nearby routes</p>
        <RoutePillNav activeSlug={trek.slug} routes={trekRoutes} />
      </section>

      <section className="routeBody shell">
        <article>
          <p className="kicker">Route shape</p>
          <h2>What this trek feels like.</h2>
          {narrative.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="highlightList">
            {trek.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </article>
        <aside>
          <h2>Permits and access</h2>
          <p>{trek.permits.join(" · ")}</p>
          <p>{trek.access.join(" · ")}</p>
          <h2>Stay style</h2>
          <p>{trek.stayStyle}</p>
          <h2>Readiness notes</h2>
          <ul className="prepList">
            {trek.prep.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="routeDossier shell">
        <div className="routeDossierIntro">
          <p className="kicker">Dossier depth</p>
          <h2>What the proposal normally wraps around this route.</h2>
          <p>
            These are planning-snapshot details, not a final quote. Alpine Bloom confirms guide
            availability, room standards, permits, and women-only support before the proposal is
            locked.
          </p>
        </div>
        <div className="routeDossierGrid">
          <article>
            <h3>Usually included</h3>
            {included.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <h3>Usually separate</h3>
            {excluded.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
          <article>
            <h3>Source itinerary notes</h3>
            {(sourceRoute?.itinerary.length ? sourceRoute.itinerary : []).slice(0, 3).map((item) => (
              <p key={`${item.day}-${item.title}`}>
                <strong>{item.day ? `Day ${item.day}: ` : ""}{sanitizeSourceCopy(item.title)}</strong>
                <span>{sanitizeSourceCopy(item.details)}</span>
                {[item.duration, item.distance, item.ascent].filter(Boolean).length ? (
                  <em>{[item.duration, item.distance, item.ascent].filter(Boolean).join(" · ")}</em>
                ) : null}
              </p>
            ))}
            {!sourceRoute?.itinerary.length ? <p>Custom itinerary notes are confirmed during proposal planning.</p> : null}
          </article>
          <article>
            <h3>Snapshot signals</h3>
            {sourceRoute?.activity ? <p><strong>Activity</strong><span>{sanitizeSourceCopy(sourceRoute.activity)}</span></p> : null}
            {sourceRoute?.highlights.map((highlight) => (
              <p key={highlight}>{sanitizeSourceCopy(highlight)}</p>
            ))}
            {sourceRoute?.facts.map((fact) => (
              <p key={fact.label}>
                <strong>{sanitizeSourceCopy(fact.label)}</strong>
                <span>{sanitizeSourceCopy(fact.value)}</span>
              </p>
            ))}
          </article>
        </div>
      </section>

      <section className="itinerary shell">
        <p className="kicker">Itinerary sketch</p>
        <h2>Trail days at a glance.</h2>
        <div>
          {trek.itinerary.map((item) => (
            <article key={item.day}>
              <span>{item.day}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {trekMap ? <RouteMapExplorer trek={trek} mapData={trekMap} /> : null}

      <section className="alternateRoutes shell">
        <h2>Nearby ideas</h2>
        {alternates.map((route) => (
          <Link href={`/treks/${route.slug}`} key={route.slug}>
            <img src={route.image} alt="" />
            <strong>{route.name}</strong>
            <span>{route.durationDays} days · {route.region}</span>
            <small>Women-only support, Nepali guide matching, and proposal pacing.</small>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
