import Link from "next/link";
import { notFound } from "next/navigation";

import { RouteMapExplorer } from "@/components/route-map-explorer";
import { SiteShell } from "@/components/site-shell";
import { trekRoutes } from "@/data/green-pastures";
import { getTrekMapData } from "@/data/trek-route-geo";

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
          <Link className="btn" href={`/book?route=${trek.slug}`}>
            Build a proposal <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="routeFacts shell">
        {[
          ["Days", trek.durationDays],
          ["Altitude", `${trek.maxAltitudeM.toLocaleString()}m`],
          ["Difficulty", trek.difficulty],
          ["From", trek.fromUsd ? `$${trek.fromUsd.toLocaleString()}` : "Custom"],
          ["Season", trek.bestSeasons.join(" / ")],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <section className="routeBody shell">
        <article>
          <p className="kicker">Route shape</p>
          <h2>What this trek feels like.</h2>
          <p>{trek.summary}</p>
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
            {route.name} <span>{route.durationDays} days</span>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
