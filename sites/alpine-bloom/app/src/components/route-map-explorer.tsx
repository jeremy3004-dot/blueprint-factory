"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

import type { TrekMapData, TrekWaypoint } from "@/data/trek-route-geo";
import type { TrekRoute } from "@/data/green-pastures";

const RouteMapCanvas = dynamic(
  () => import("@/components/route-map-canvas").then((mod) => mod.RouteMapCanvas),
  {
    ssr: false,
    loading: () => <div className="trekLeafletMap isLoading" />,
  },
);

export type RouteMapViewMode = "terrain" | "topo" | "light";

function distanceKm(a: [number, number], b: [number, number]) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const [lngA, latA] = a;
  const [lngB, latB] = b;
  const dLat = toRad(latB - latA);
  const dLng = toRad(lngB - lngA);
  const lat1 = toRad(latA);
  const lat2 = toRad(latB);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function RouteMapExplorer({
  trek,
  mapData,
}: {
  trek: TrekRoute;
  mapData: TrekMapData;
}) {
  const points = mapData.waypoints;
  const [selectedId, setSelectedId] = useState(points[0]?.id);
  const [viewMode, setViewMode] = useState<RouteMapViewMode>("terrain");
  const selectedIndex = Math.max(
    points.findIndex((point) => point.id === selectedId),
    0,
  );
  const selected = points[selectedIndex] ?? points[0];
  const totalKm = useMemo(
    () =>
      mapData.route.reduce((sum, point, index, route) => {
        if (index === 0) return sum;
        return sum + distanceKm(route[index - 1], point);
      }, 0),
    [mapData.route],
  );
  const coveredKm = useMemo(
    () =>
      points.slice(0, selectedIndex + 1).reduce((sum, point, index, route) => {
        if (index === 0) return sum;
        return sum + distanceKm(route[index - 1].coordinates, point.coordinates);
      }, 0),
    [points, selectedIndex],
  );
  const progress = totalKm ? Math.round((coveredKm / totalKm) * 100) : 0;
  const minAltitude = Math.min(...points.map((point) => point.altitudeM));
  const maxAltitude = Math.max(...points.map((point) => point.altitudeM));
  const elevationPoints = points
    .map((point, index) => {
      const x = points.length > 1 ? (index / (points.length - 1)) * 100 : 0;
      const normalized = (point.altitudeM - minAltitude) / Math.max(maxAltitude - minAltitude, 1);
      const y = 88 - normalized * 68;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="routeMapExplorer shell">
      <div className="routeMapHead">
        <div>
          <p className="kicker">Interactive route map</p>
          <h2>{trek.name} terrain read</h2>
          <p>{mapData.visualHook}</p>
        </div>
        <div className="routeMapStats">
          <span>{Math.round(totalKm)} km route</span>
          <span>{points.length} stages</span>
          <span>{trek.maxAltitudeM.toLocaleString()}m high point</span>
        </div>
      </div>

      <div className="routeMapGrid">
        <div className="routeMapCanvas" aria-label={`${trek.name} interactive route map`}>
          <div className="mapModeSwitch" aria-label="Map view">
            {[
              ["terrain", "Terrain"],
              ["topo", "Topo"],
              ["light", "Light"],
            ].map(([mode, label]) => (
              <button
                className={viewMode === mode ? "active" : ""}
                key={mode}
                type="button"
                onClick={() => setViewMode(mode as RouteMapViewMode)}
              >
                {label}
              </button>
            ))}
          </div>
          <RouteMapCanvas
            mapData={mapData}
            selectedStop={selected}
            viewMode={viewMode}
            onSelectStop={(waypoint: TrekWaypoint) => setSelectedId(waypoint.id)}
          />
          <div className="routeMapBrand">Nepal</div>
          <div className="routeCompass">N</div>
          <div className="routeScale"><span /> 20 km</div>
        </div>

        <aside className="routeMapPanel">
          <img src={selected.image} alt="" />
          <span>
            Stage {selectedIndex + 1} of {points.length} · {selected.altitudeM.toLocaleString()}m
          </span>
          <h3>{selected.name}</h3>
          <p>{selected.note}</p>
          <div className="routeProgress">
            <div>
              <strong>{progress}%</strong>
              <span>Route progress</span>
            </div>
            <div>
              <strong>{Math.round(coveredKm)} km</strong>
              <span>Covered to this stop</span>
            </div>
          </div>
          <div className="elevationMini">
            <p>Elevation profile</p>
            <svg viewBox="0 0 100 100">
              <polyline points={elevationPoints} />
              {points.map((point, index) => {
                const [x, y] = elevationPoints.split(" ")[index].split(",").map(Number);
                return <circle key={point.id} cx={x} cy={y} r={point.id === selected.id ? 3.8 : 2.4} />;
              })}
            </svg>
          </div>
        </aside>
      </div>

      <div className="routeStageRail">
        {points.map((point, index) => (
          <button
            className={point.id === selected.id ? "active" : ""}
            key={point.id}
            type="button"
            onClick={() => setSelectedId(point.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {point.name}
          </button>
        ))}
      </div>
    </section>
  );
}
