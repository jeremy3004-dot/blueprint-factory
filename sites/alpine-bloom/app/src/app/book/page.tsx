import { BookingForm } from "@/components/booking-form";
import { SiteShell } from "@/components/site-shell";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ route?: string }>;
}) {
  const { route } = await searchParams;

  return (
    <SiteShell>
      <section className="pageHero shell">
        <p className="kicker">Proposal desk</p>
        <h1>
          Tell us the mountain story you want to <em>walk into</em>.
        </h1>
        <p>
          This preview form captures the same details the Alpine Bloom ops desk needs: route, dates,
          group size, guide support, and comfort level.
        </p>
      </section>
      <BookingForm initialRouteSlug={route} />
    </SiteShell>
  );
}
