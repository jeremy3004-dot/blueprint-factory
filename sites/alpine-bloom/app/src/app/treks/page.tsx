import { SiteShell } from "@/components/site-shell";
import { TrekExplorer } from "@/components/trek-explorer";
import { guideProfiles, trekRoutes } from "@/data/green-pastures";
import { operatorSourceRoutes } from "@/data/operator-source";
import type { CSSProperties } from "react";
import { RoutePillNav } from "@/components/route-pill-nav";

export default function TreksPage() {
  return (
    <SiteShell>
      <section className="pageHero shell">
        <p className="kicker">Route atlas</p>
        <h1>
          Nepal treks for women <em>ready to rise</em>.
        </h1>
        <p>
          Browse Alpine Bloom routes by region, altitude, season, and the kind of support you want
          around you on trail.
        </p>
      </section>
      <section className="routeQuickLinks shell">
        <p className="kicker">Route quick links</p>
        <RoutePillNav routes={trekRoutes} />
      </section>
      <TrekExplorer operatorSources={operatorSourceRoutes} routes={trekRoutes} />
      <section className="guideStrip shell">
        <p className="kicker">Guide matching</p>
        <h2>Meet the people who make the mountain feel held.</h2>
        <div>
          {guideProfiles.map((guide) => (
            <article
              key={guide.slug}
              style={{ "--guide-color": guide.color } as CSSProperties & Record<"--guide-color", string>}
            >
              <div className="guidePhoto">
                <img src={guide.image} alt={`${guide.name}'s Himalayan region`} />
                <strong>{guide.avatar}</strong>
              </div>
              <span>{guide.label}</span>
              <h3>{guide.name}</h3>
              <p>{guide.role}</p>
              <small>{guide.focus}</small>
              <ul>
                {guide.specialties.slice(0, 3).map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
              <p>{guide.bio}</p>
              <small>
                {guide.languages.join(" / ")} · {guide.certifications[0]}
              </small>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
