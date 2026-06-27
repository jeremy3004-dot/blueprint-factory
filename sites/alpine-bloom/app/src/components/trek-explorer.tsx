"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { TrekRoute } from "@/data/green-pastures";

const all = "All";

export function TrekExplorer({ routes }: { routes: TrekRoute[] }) {
  const [region, setRegion] = useState(all);
  const [difficulty, setDifficulty] = useState(all);
  const [season, setSeason] = useState(all);
  const [support, setSupport] = useState(all);

  const regions = [all, ...Array.from(new Set(routes.map((route) => route.region)))];
  const difficulties = [all, ...Array.from(new Set(routes.map((route) => route.difficulty)))];
  const seasons = [all, ...Array.from(new Set(routes.flatMap((route) => route.bestSeasons)))];
  const supportOptions = [all, "Women-led", "First trek", "No flight", "Short route"];
  const filtered = useMemo(
    () =>
      routes.filter((route) => {
        const supportMatch =
          support === all ||
          (support === "Women-led" &&
            [route.summary, route.signature, route.stayStyle].join(" ").toLowerCase().includes("women")) ||
          (support === "First trek" &&
            (route.difficulty === "Introductory" ||
              route.summary.toLowerCase().includes("first"))) ||
          (support === "No flight" &&
            !route.access.join(" ").toLowerCase().includes("flight")) ||
          (support === "Short route" && route.durationDays <= 7);

        return (
          (region === all || route.region === region) &&
          (difficulty === all || route.difficulty === difficulty) &&
          (season === all || route.bestSeasons.includes(season)) &&
          supportMatch
        );
      }),
    [difficulty, region, routes, season, support],
  );

  return (
    <section className="featureBlock shell">
      <div className="filterBar" aria-label="Trek filters">
        <FilterGroup label="Region" value={region} options={regions} onChange={setRegion} />
        <FilterGroup
          label="Difficulty"
          value={difficulty}
          options={difficulties}
          onChange={setDifficulty}
        />
        <FilterGroup label="Season" value={season} options={seasons} onChange={setSeason} />
        <FilterGroup label="Support" value={support} options={supportOptions} onChange={setSupport} />
      </div>

      <div className="trekGrid">
        {filtered.map((route, index) => (
          <Link
            className={`trekTile ${index === 0 ? "wide" : ""}`}
            href={`/treks/${route.slug}`}
            key={route.slug}
          >
            <img src={route.image} alt="" />
            <div className="trekTileText">
              <span>
                {route.region} · {route.durationDays} days · {route.maxAltitudeM.toLocaleString()}m
              </span>
              <h2>{route.name}</h2>
              <p>{route.signature}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p>{label}</p>
      <div className="chipRow">
        {options.map((option) => (
          <button
            className={option === value ? "active" : ""}
            key={option}
            type="button"
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
