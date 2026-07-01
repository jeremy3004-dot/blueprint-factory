"use client";

import {
  ArrowRight,
  Compass,
  MapPinned,
  Mountain,
  Route as RouteIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import type { TrekMapData, TrekWaypoint } from "@/data/trek-route-geo";
import type { TrekRoute } from "@/data/treks";
import { formatStartingRate } from "@/lib/route-pricing";

type RouteMapExplorerProps = {
  trek: TrekRoute;
  mapData: TrekMapData;
  emphasis?: "immersive" | "compact";
};

export type RouteMapViewMode = "terrain" | "overview" | "stops";

const RouteMapCanvas = dynamic(
  () =>
    import("./route-map-canvas").then((module) => ({
      default: module.RouteMapCanvas,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-end p-5 md:p-6">
        <div className="max-w-md space-y-3 rounded-[1.6rem] border border-white/10 bg-black/35 p-4 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200/90">
            Loading route map
          </p>
          <p className="text-sm leading-6 text-stone-200">
            Drawing the topographic base, route line, and stage markers for this itinerary.
          </p>
        </div>
      </div>
    ),
  },
);

function getDistanceKm(a: [number, number], b: [number, number]) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const [lngA, latA] = a;
  const [lngB, latB] = b;
  const deltaLat = toRadians(latB - latA);
  const deltaLng = toRadians(lngB - lngA);
  const latARadians = toRadians(latA);
  const latBRadians = toRadians(latB);
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(latARadians) * Math.cos(latBRadians) * Math.sin(deltaLng / 2) ** 2;

  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function getLegTone(waypoint: TrekWaypoint, index: number) {
  if (index === 0) {
    return "route moment";
  }

  return waypoint.overnight ? "overnight" : "route moment";
}

function sentenceToFragment(value: string) {
  const trimmed = value.trim().replace(/\.$/, "");

  return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
}

export function RouteMapExplorer({
  trek,
  mapData,
  emphasis = "compact",
}: RouteMapExplorerProps) {
  const [selectedStop, setSelectedStop] = useState<TrekWaypoint>(mapData.waypoints[0]);
  const viewMode: RouteMapViewMode = "terrain";
  const isImmersive = emphasis === "immersive";

  const selectedStopMeta = useMemo(
    () =>
      mapData.waypoints.find((waypoint) => waypoint.id === selectedStop.id) ??
      mapData.waypoints[0],
    [mapData.waypoints, selectedStop.id],
  );
  const routeProgress = useMemo(() => {
    const cumulativeById = new Map<string, number>();
    let runningKm = 0;

    mapData.waypoints.forEach((waypoint, index, waypoints) => {
      if (index > 0) {
        runningKm += getDistanceKm(waypoints[index - 1].coordinates, waypoint.coordinates);
      }

      cumulativeById.set(waypoint.id, runningKm);
    });

    const totalKm = runningKm;
    const selectedIndex = mapData.waypoints.findIndex((waypoint) => waypoint.id === selectedStopMeta.id);
    const coveredKm = cumulativeById.get(selectedStopMeta.id) ?? 0;
    const remainingKm = Math.max(totalKm - coveredKm, 0);

    return {
      selectedIndex,
      coveredKm,
      remainingKm,
      completedStops: selectedIndex,
      remainingStops: Math.max(mapData.waypoints.length - selectedIndex - 1, 0),
    };
  }, [mapData.waypoints, selectedStopMeta.id]);
  const routeStart = mapData.waypoints[0];
  const routeFinish = mapData.waypoints[mapData.waypoints.length - 1];
  const previousStop =
    routeProgress.selectedIndex > 0 ? mapData.waypoints[routeProgress.selectedIndex - 1] : null;
  const nextStop =
    routeProgress.selectedIndex < mapData.waypoints.length - 1
      ? mapData.waypoints[routeProgress.selectedIndex + 1]
      : null;
  const totalRouteKm = routeProgress.coveredKm + routeProgress.remainingKm;
  const routeProgressPercent =
    totalRouteKm > 0 ? Math.round((routeProgress.coveredKm / totalRouteKm) * 100) : 0;
  const currentLegKm = previousStop
    ? getDistanceKm(previousStop.coordinates, selectedStopMeta.coordinates)
    : nextStop
      ? getDistanceKm(selectedStopMeta.coordinates, nextStop.coordinates)
      : 0;
  const routeDescription = `${mapData.visualHook} Destination focus: ${routeFinish.name} at ${routeFinish.altitudeM.toLocaleString()}m, ${sentenceToFragment(routeFinish.note)}.`;
  const trekFacts = [
    ["Duration", `${trek.durationDays} days`],
    ["Max altitude", `${trek.maxAltitudeM.toLocaleString()}m`],
    ["Best seasons", trek.bestSeasons.join(" · ")],
    ["Starting rate", formatStartingRate(trek.fromUsd)],
  ];
  const elevationProfile = useMemo(() => {
    const points = mapData.waypoints.map((waypoint, index) => {
      const x = mapData.waypoints.length > 1 ? (index / (mapData.waypoints.length - 1)) * 100 : 0;
      const normalized =
        ((waypoint.altitudeM - 500) / Math.max(trek.maxAltitudeM - 500, 1)) * 100;

      return {
        waypoint,
        x,
        y: 86 - Math.min(Math.max(normalized, 8), 82),
      };
    });

    return {
      points,
      polyline: points.map((point) => `${point.x},${point.y}`).join(" "),
      area: `0,92 ${points.map((point) => `${point.x},${point.y}`).join(" ")} 100,92`,
    };
  }, [mapData.waypoints, trek.maxAltitudeM]);

  const focusStop = useCallback((stop: TrekWaypoint) => {
    setSelectedStop(stop);
  }, []);

  return (
    <section className={`grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(22rem,0.95fr)] ${isImmersive ? "" : "lg:items-stretch"}`}>
      <div className={`flex min-h-0 flex-col ${isImmersive ? "space-y-4" : ""}`}>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.95rem] border border-[#6f5a24]/80 bg-[#040b0a]/94 shadow-[0_35px_120px_rgba(0,0,0,0.5)]">
          <div className="relative z-[420] px-5 pb-0 pt-5 md:px-7 md:pt-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.38em] text-[#ffd84d]">
                  Route map
                </p>
                <h2 className="mt-2 font-display text-[1.7rem] leading-none text-white md:text-[2rem]">
                  {trek.name}
                </h2>
              </div>
            </div>
          </div>

          <div
            className={`relative overflow-hidden ${isImmersive ? "h-[30rem] md:h-[38rem]" : "h-[25.5rem] md:h-[27rem] xl:h-[30rem]"}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(242,194,91,0.14),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(108,145,196,0.18),transparent_28%),linear-gradient(180deg,#07100f_0%,#101d18_52%,#07100f_100%)]" />
            <div className={`absolute inset-0 trek-map trek-map--${viewMode}`}>
              <RouteMapCanvas
                mapData={mapData}
                emphasis={emphasis}
                viewMode={viewMode}
                selectedStop={selectedStopMeta}
                onSelectStop={focusStop}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,8,0.55)_0%,rgba(4,8,8,0.07)_31%,rgba(4,8,8,0.18)_70%,rgba(4,8,8,0.45)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(4,8,8,0.96),transparent)]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-[linear-gradient(90deg,rgba(4,8,8,0.68),transparent)]" />
            <div className="pointer-events-none absolute bottom-24 right-24 hidden text-3xl font-semibold tracking-[0.44em] text-white/55 lg:block">
              NEPAL
            </div>

            <div className="pointer-events-none absolute bottom-5 left-5 z-[410] hidden items-end gap-3 sm:flex">
              <div className="h-px w-20 bg-white" />
              <p className="text-sm text-stone-100">20 km</p>
            </div>
          </div>

          <div className="border-t border-[#6f5a24]/60 bg-[linear-gradient(180deg,rgba(5,12,11,0.94),rgba(5,10,10,0.98))] px-5 py-5 md:px-7">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="rounded-lg border border-[#6f5a24]/70 bg-white/[0.025] p-4 xl:col-span-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Route read
                </p>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row xl:gap-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20 xl:h-24 xl:w-24">
                    <Image
                      src={routeFinish.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 96px, 80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 max-w-prose">
                    <h3 className="font-display text-2xl leading-tight text-white sm:text-xl xl:text-2xl">
                      {routeStart.name} to {routeFinish.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-stone-300 sm:text-xs xl:text-sm">
                      {routeDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#6f5a24]/70 bg-white/[0.025] p-4 xl:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Route progress
                </p>
                <div className="mt-5 flex items-center justify-between text-sm text-stone-300">
                  <span>Stage {routeProgress.selectedIndex + 1} of {mapData.waypoints.length}</span>
                  <span>{routeProgressPercent}%</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/14">
                  <div
                    className="h-full rounded-full bg-amber-300"
                    style={{
                      width: `${Math.max(
                        routeProgressPercent,
                        routeProgress.coveredKm > 0 ? 8 : 2,
                      )}%`,
                    }}
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-start gap-2">
                    <RouteIcon className="mt-0.5 h-4 w-4 text-amber-300" />
                    <div>
                      <p className="text-lg text-white">{Math.round(routeProgress.coveredKm)} km</p>
                      <p className="text-[11px] text-stone-500">Completed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPinned className="mt-0.5 h-4 w-4 text-amber-300" />
                    <div>
                      <p className="text-lg text-white">~{Math.round(totalRouteKm)} km</p>
                      <p className="text-[11px] text-stone-500">Total route</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#6f5a24]/70 bg-white/[0.025] p-4 xl:col-span-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Elevation profile
                </p>
                <div className="mt-3 h-[5.75rem]">
                  <svg viewBox="0 0 100 96" className="h-full w-full overflow-visible" role="img" aria-label="Route elevation profile">
                    <defs>
                      <linearGradient id={`elevation-${trek.slug}`} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#ffd84d" stopOpacity="0.62" />
                        <stop offset="100%" stopColor="#ffd84d" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <line x1="0" x2="100" y1="18" y2="18" stroke="rgba(255,255,255,0.08)" />
                    <line x1="0" x2="100" y1="55" y2="55" stroke="rgba(255,255,255,0.08)" />
                    <line x1="0" x2="100" y1="92" y2="92" stroke="rgba(255,255,255,0.12)" />
                    <polygon points={elevationProfile.area} fill={`url(#elevation-${trek.slug})`} />
                    <polyline points={elevationProfile.polyline} fill="none" stroke="#ffd84d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    {elevationProfile.points.slice(0, 4).map((point, index) => (
                      <g key={point.waypoint.id}>
                        <circle cx={point.x} cy={point.y} r="3.5" fill="#ffd84d" stroke="#07100f" strokeWidth="1.4" />
                        <text x={point.x} y={point.y - 6} textAnchor="middle" fill="#07100f" fontSize="5.5" fontWeight="800">
                          {index + 1}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 border-t border-white/10 pt-3 text-sm">
                  <div>
                    <p className="text-amber-300">↑ 2,270 m</p>
                    <p className="mt-1 text-[11px] text-stone-500">Elevation gain</p>
                  </div>
                  <div>
                    <p className="text-amber-300">↓ 3,120 m</p>
                    <p className="mt-1 text-[11px] text-stone-500">Max elevation</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#6f5a24]/70 bg-white/[0.025] p-4 xl:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Current leg
                </p>
                <h3 className="mt-4 font-display text-xl leading-tight text-white">
                  {previousStop
                    ? `${previousStop.name} to ${selectedStopMeta.name}`
                    : `${selectedStopMeta.name} to ${nextStop?.name ?? routeFinish.name}`}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm text-stone-300">
                  <div>
                    <div className="flex items-center gap-2 text-amber-300">
                      <RouteIcon className="h-4 w-4" />
                      <span className="whitespace-nowrap">{Math.max(1, Math.round(currentLegKm))} km</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500">Est. distance</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-amber-300">
                      <Compass className="h-4 w-4" />
                      <span className="whitespace-nowrap">{selectedStopMeta.overnight ? "Overnight" : "Transit"}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-stone-500">Stage type</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {trekFacts.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-[#6f5a24]/70 bg-white/[0.025] p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                    {label}
                  </p>
                  <p className="mt-2 font-display text-2xl leading-none text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <div className="rounded-lg border border-[#6f5a24]/70 bg-white/[0.025] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Permits and access
                </p>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                      Permits
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-300">
                      {trek.permits.join(", ")}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                      Access
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-300">
                      {trek.access.join(", ")}
                    </p>
                  </div>
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                      Stay style
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-300">
                      {trek.stayStyle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#6f5a24]/70 bg-black/30 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Customize your trip
                </p>
                <div className="mt-4 grid gap-4 text-sm leading-7 text-stone-300 sm:grid-cols-2">
                  {Object.entries(trek.bundle)
                    .filter(([, value]) => Boolean(value))
                    .map(([label, value]) => (
                      <div
                        key={label}
                        className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0"
                      >
                        <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                          {label}
                        </p>
                        <p className="mt-2">{value}</p>
                      </div>
                    ))}
                </div>
                <Link
                  href={{ pathname: "/book", query: { route: trek.slug } }}
                  className="mt-6 inline-flex rounded-full bg-amber-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-stone-950 transition hover:bg-amber-200"
                >
                  Build a proposal
                </Link>
              </div>
            </div>
          </div>

        </div>

        {!isImmersive ? null : (
          <div className="grid gap-3 rounded-[1.05rem] border border-amber-300/18 bg-[#06100f]/78 p-5 text-sm text-stone-300 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <Compass className="mt-0.5 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Journey so far
                </p>
                <p className="mt-1 leading-6">
                  {routeProgress.coveredKm < 1
                    ? `You are at the trailhead in ${routeStart.name}, right at the beginning of the mapped route.`
                    : `About ${Math.round(routeProgress.coveredKm)} km in from ${routeStart.name}, with ${routeProgress.completedStops} stop${routeProgress.completedStops === 1 ? "" : "s"} already behind you.`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RouteIcon className="mt-0.5 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Still ahead
                </p>
                <p className="mt-1 leading-6">
                  {routeProgress.remainingStops === 0
                    ? `This is the final mapped highlight on the route, so from here the journey is about taking in the finish rather than moving on to another stage.`
                    : `Roughly ${Math.round(routeProgress.remainingKm)} km remain to ${routeFinish.name}, with ${routeProgress.remainingStops} more stage${routeProgress.remainingStops === 1 ? "" : "s"} still to come.`}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mountain className="mt-0.5 h-4 w-4 text-amber-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  What this stop is like
                </p>
                <p className="mt-1 leading-6">
                  {selectedStopMeta.note}
                  {previousStop
                    ? ` It comes after ${previousStop.name}`
                    : ` It opens the route`}
                  {nextStop
                    ? ` and sets up the next move toward ${nextStop.name}.`
                    : ` and marks the last major mapped point on this line.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <aside className="flex min-h-0 overflow-hidden rounded-[0.95rem] border border-[#6f5a24]/90 bg-[#040b0a]/92 shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
        <div className="flex min-h-0 w-full flex-col">
        <div className="shrink-0 overflow-hidden border-b border-white/10 bg-transparent">
          <div className="relative aspect-[1.35]">
            <Image
              src={selectedStopMeta.image}
              alt={selectedStopMeta.name}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,8,0.08),rgba(4,8,8,0.1)_34%,rgba(4,8,8,0.9)_100%)]" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.34em] text-[#ffd84d]">
                  Selected stop
                </p>
                <h3 className="mt-4 font-display text-3xl leading-none text-white md:text-[2.15rem]">
                  {selectedStopMeta.name}
                </h3>
              </div>
              <p className="pt-9 text-xl text-stone-200/82">
                {selectedStopMeta.altitudeM.toLocaleString()}m
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
              <p className="mt-2 flex items-center gap-2 text-sm text-stone-200">
                <MapPinned className="h-4 w-4" />
                {selectedStopMeta.overnight ? "Overnight anchor" : "Visual or transit stop"}
              </p>
            </div>
          </div>
          <div className="space-y-4 px-5 py-5">
            <p className="text-sm leading-7 text-stone-300">{selectedStopMeta.note}</p>
            <div className="rounded-lg border border-white/10 bg-black/28 p-4">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-amber-300">
                <Mountain className="h-4 w-4" />
                Route note
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-300">
                This is often where pacing, altitude, scenery, or logistics begin to change
                the feel of the journey.
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col bg-transparent p-5">
          <div className="flex items-center gap-3">
            <MapPinned className="h-4 w-4 text-amber-300" />
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">
              Stage selector
            </p>
          </div>
          <div className="mt-5 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(255,216,77,0.45)_rgba(255,255,255,0.06)] [scrollbar-width:thin]">
            {mapData.waypoints.map((waypoint, index) => (
              <button
                key={waypoint.id}
                type="button"
                onClick={() => focusStop(waypoint)}
                className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                  selectedStopMeta.id === waypoint.id
                    ? "border-[#ffd84d]/55 bg-[#ffd84d]/18 shadow-[inset_0_0_0_1px_rgba(255,216,77,0.08)]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-sm font-semibold ${
                    selectedStopMeta.id === waypoint.id
                      ? "border-amber-200 bg-amber-300 text-stone-950"
                      : "border-white/20 text-stone-300"
                  }`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-white">{waypoint.name}</p>
                  <p className="mt-1 text-sm text-stone-400">
                    {waypoint.altitudeM.toLocaleString()}m
                  </p>
                </div>
                <span className="hidden text-[10px] uppercase tracking-[0.18em] text-stone-500 sm:block">
                  {getLegTone(waypoint, index)}
                </span>
              </button>
            ))}
          </div>
          <Link
            href={`/treks/${trek.slug}#full-itinerary`}
            className="mt-5 inline-flex w-full items-center justify-between rounded-lg border border-white/12 bg-white/[0.035] px-4 py-3 text-sm text-white transition hover:border-amber-300/35"
          >
            View all stages
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        </div>
      </aside>
    </section>
  );
}
