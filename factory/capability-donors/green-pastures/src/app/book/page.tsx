import { BookingForm } from "@/components/booking-form";
import { companyProfile } from "@/data/company";

export default async function BookPage({
  searchParams,
}: {
  searchParams?: Promise<{ route?: string | string[] }>;
}) {
  const params = await searchParams;
  const routeSlug = Array.isArray(params?.route) ? params.route[0] : params?.route;

  return (
    <main className="section-shell pb-24 pt-12 md:pt-16">
      <div className="max-w-4xl space-y-4">
        <p className="section-kicker">{companyProfile.shortName} booking desk</p>
        <h1 className="font-display text-5xl text-white md:text-7xl">
          Send your trip request straight to the {companyProfile.shortName} team.
        </h1>
        <p className="max-w-3xl text-base leading-8 text-stone-300">
          Share your preferred route, season, group size, comfort level, and add-ons.
          This is the fastest way to move from inspiration into a usable first proposal
          for a private trek, small-group departure, or custom adventure. You can also
          reach the team directly at {companyProfile.email} or {companyProfile.phones[0]}.
        </p>
      </div>
      <div className="mt-10">
        <BookingForm key={routeSlug ?? "default-route"} initialRouteSlug={routeSlug} />
      </div>
    </main>
  );
}
