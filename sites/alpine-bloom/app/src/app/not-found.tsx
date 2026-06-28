import Link from "next/link";

import { RoutePillNav } from "@/components/route-pill-nav";
import { SiteShell } from "@/components/site-shell";
import { trekRoutes } from "@/data/green-pastures";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="notFoundPage shell">
        <p className="kicker">Trail marker missing</p>
        <h1>
          This path wandered <em>off route</em>.
        </h1>
        <p>
          The page is not on the Alpine Bloom map, but the women-only Himalayan route desk is still
          close by.
        </p>
        <div className="notFoundActions">
          <Link className="btn" href="/treks">
            Browse treks <span className="arrow">→</span>
          </Link>
          <Link className="btn dark" href="/planner">
            Ask the planner <span className="arrow">→</span>
          </Link>
          <Link href="/book">Start a proposal</Link>
        </div>
      </section>
      <section className="routeQuickLinks shell">
        <p className="kicker">Popular routes</p>
        <RoutePillNav routes={trekRoutes.slice(0, 4)} />
      </section>
    </SiteShell>
  );
}
