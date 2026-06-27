import { Concierge } from "@/components/concierge";
import { SiteShell } from "@/components/site-shell";

export default function PlannerPage() {
  return (
    <SiteShell tone="dark">
      <section className="pageHero shell">
        <p className="kicker">AI trip desk</p>
        <h1>
          Plan with route sense, not generic <em>travel noise</em>.
        </h1>
        <p>
          Ask about altitude, women-led guide fit, route comparisons, permits, timing, and what kind
          of trek your group is actually ready for.
        </p>
      </section>
      <section className="shell plannerWrap">
        <Concierge />
      </section>
    </SiteShell>
  );
}
