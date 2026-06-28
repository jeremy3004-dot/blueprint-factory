import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Mountain } from "lucide-react";

import { AIConcierge } from "@/components/ai-concierge";
import { PhotoCarousel } from "@/components/photo-carousel";
import { RoutePillNav } from "@/components/route-pill-nav";
import { TrekCard } from "@/components/trek-card";
import { companyProfile } from "@/data/company";
import { heroSlides } from "@/data/site-content";
import {
  getPayloadFeaturedTreks,
  getPayloadGuides,
  getPayloadTreks,
} from "@/lib/payload-content";

const companyDetails = [
  { label: "Phone", value: companyProfile.phones.join(" / ") },
  { label: "Email", value: companyProfile.email },
  { label: "Address", value: companyProfile.address },
  { label: "PAN", value: companyProfile.pan },
];

export default async function HomePage() {
  const [featuredTreks, guideProfiles, trekRoutes] = await Promise.all([
    getPayloadFeaturedTreks(),
    getPayloadGuides(),
    getPayloadTreks(),
  ]);
  const stats = [
    { label: "Signature routes", value: String(trekRoutes.length) },
    { label: "Lead guides", value: String(guideProfiles.length) },
    { label: "Trip formats", value: "Private + Small Group" },
  ];

  return (
    <main className="pb-24">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden">
        <Image
          src={heroSlides[0].image}
          alt="Himalayan trekking panorama"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(9,12,16,0.72)_55%,rgba(9,12,16,0.96))]" />
        <div className="section-shell relative flex min-h-[calc(100svh-72px)] items-end pb-28 pt-14 md:pb-32 md:pt-20">
          <div className="w-full">
            <div className="mb-20 max-w-4xl space-y-7 md:mb-0">
              <p className="section-kicker">Pokhara-based trekking company</p>
              <div className="space-y-4">
                <h1 className="font-display text-6xl leading-[0.9] text-white md:text-8xl">
                  Trek Nepal with a local team that knows the route in real life.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-stone-200 md:text-lg">
                  {companyProfile.legalName} is based in {companyProfile.address}. Use the site to compare classic and restricted-area treks, understand permits and pacing, and contact the team directly for private departures, small groups, and custom adventure planning.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition hover:bg-amber-200"
                >
                  Start booking <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/treks"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/40 hover:text-amber-300"
                >
                  Explore routes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-12 md:mt-16">
        <div className="grid gap-8 border-y border-white/10 py-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="space-y-3">
            <p className="section-kicker">Company quick facts</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Local credentials without crowding the first impression.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
                <p className="text-xs uppercase tracking-[0.26em] text-stone-500">{stat.label}</p>
                <p className="mt-2 font-display text-3xl text-white">{stat.value}</p>
              </div>
            ))}
            <div className="space-y-4 border-t border-white/10 pt-4 md:col-span-3">
              <p className="text-xs uppercase tracking-[0.26em] text-stone-500">
                Contact {companyProfile.shortName}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {companyDetails.map((item) => (
                  <div key={item.label}>
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-stone-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-16 md:mt-24">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-5">
            <p className="section-kicker">Nepal in view</p>
            <h2 className="font-display text-4xl text-white md:text-6xl">
              See the country before you commit to the trail.
            </h2>
            <p className="max-w-lg text-base leading-8 text-stone-300">
              Browse the landscapes, villages, and mountain light that shape each journey across Khumbu, Annapurna, Mustang, and Langtang.
            </p>
          </div>
          <PhotoCarousel slides={heroSlides} />
        </div>
      </section>

      <section className="section-shell mt-20 md:mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <p className="section-kicker">Trekking routes</p>
            <h2 className="font-display text-4xl text-white md:text-6xl">
              Classic Himalayan trails and remote restricted-area journeys.
            </h2>
          </div>
          <Link
            href="/treks"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:text-amber-300"
          >
            Full route explorer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <RoutePillNav routes={trekRoutes} />
        </div>
        <div className="mt-8 space-y-3">
          {featuredTreks.map((trek) => (
            <TrekCard key={trek.slug} trek={trek} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-20 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] md:mt-28">
        <div className="space-y-4">
          <p className="section-kicker">Route maps</p>
          <h2 className="font-display text-4xl text-white md:text-6xl">
            See where the route climbs, rests, and gets remote.
          </h2>
          <p className="max-w-lg text-base leading-8 text-stone-300">
            Switch between topographic views, the full route line, and stage-by-stage stops to understand pacing, access, and where the journey changes character.
          </p>
          <Link
            href="/treks"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/35 hover:text-amber-300"
          >
            Open terrain explorer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Topo mapping",
                detail: "Contour-rich base maps make valleys, ridges, and pass approaches easier to read.",
              },
              {
                title: "Stage-by-stage stops",
                detail: "Every route highlights overnight anchors and key viewpoints so the itinerary feels like a journey, not a list of place names.",
              },
              {
                title: "Planning context",
                detail: "See where altitude, road access, and domestic flights shape the journey.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-white/10 pt-4">
                <p className="text-sm uppercase tracking-[0.22em] text-stone-100">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-stone-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-20 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] md:mt-28">
        <div className="space-y-4">
          <p className="section-kicker">Meet the guides</p>
          <h2 className="font-display text-4xl text-white md:text-6xl">
            Know who is leading before you commit to the trip.
          </h2>
          <p className="max-w-lg text-base leading-8 text-stone-300">
            Language comfort, pacing style, and women-led options can shape the feel of your trek from the first day.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {guideProfiles.slice(0, 4).map((guide) => (
            <article key={guide.slug} className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5">
              <div className="relative h-72">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-3xl text-white">{guide.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-amber-300">{guide.gender}</p>
                  </div>
                  <Mountain className="h-5 w-5 text-stone-500" />
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-stone-400">{guide.title}</p>
                <p className="text-sm leading-7 text-stone-300">{guide.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] md:mt-28">
        <div className="space-y-4">
          <p className="section-kicker">AI planning layer</p>
          <h2 className="font-display text-4xl text-white md:text-6xl">
            Ask practical route, permit, and guide questions before you message the team.
          </h2>
          <p className="max-w-lg text-base leading-8 text-stone-300">
            The planner can compare itineraries, explain permit complexity, suggest women-led departures, and flag where a helicopter or jeep upgrade genuinely improves the trip.
          </p>
          <Link
            href="/planner"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/35 hover:text-amber-300"
          >
            Open full planner <Bot className="h-4 w-4" />
          </Link>
        </div>
        <AIConcierge />
      </section>

    </main>
  );
}
