import { SiteShell } from "@/components/site-shell";
import { TrekExplorer } from "@/components/trek-explorer";
import { guideProfiles, trekRoutes } from "@/data/green-pastures";

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
      <TrekExplorer routes={trekRoutes} />
      <section className="guideStrip shell">
        <p className="kicker">Guide matching</p>
        <h2>Meet the people who make the mountain feel held.</h2>
        <div>
          {guideProfiles.map((guide) => (
            <article key={guide.slug}>
              <img src={guide.image} alt="" />
              <span>{guide.gender}</span>
              <h3>{guide.name}</h3>
              <p>{guide.role}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
