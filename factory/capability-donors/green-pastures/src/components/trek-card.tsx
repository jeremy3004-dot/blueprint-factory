import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Timer } from "lucide-react";

import type { TrekRoute } from "@/data/treks";

type TrekCardProps = {
  trek: TrekRoute;
};

export function TrekCard({ trek }: TrekCardProps) {
  return (
    <article className="group grid gap-5 border-t border-white/10 py-6 md:grid-cols-[1.35fr_1fr] md:gap-8">
      <div className="relative min-h-64 overflow-hidden rounded-[1.8rem] border border-white/10">
        <Image
          src={trek.image}
          alt={trek.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="flex flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-5 text-sm text-stone-400">
            <span className="inline-flex items-center gap-2">
              <Timer className="h-4 w-4 text-amber-300" /> {trek.durationDays} days
            </span>
            <span className="inline-flex items-center gap-2">
              <Mountain className="h-4 w-4 text-amber-300" /> {trek.maxAltitudeM.toLocaleString()}m
            </span>
          </div>
          <h3 className="font-display text-4xl text-stone-100">{trek.name}</h3>
          <p className="max-w-xl text-base leading-7 text-stone-300">{trek.summary}</p>
          <ul className="grid gap-2 text-sm text-stone-300">
            {trek.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="inline-flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-300" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Best season</p>
            <p className="mt-1 text-sm text-stone-300">{trek.bestSeasons.join(" · ")}</p>
          </div>
          <Link
            href={`/treks/${trek.slug}`}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-stone-100 transition hover:text-amber-300"
          >
            View trek <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
