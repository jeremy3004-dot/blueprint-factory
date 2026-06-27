"use client";

import { useMemo, useState } from "react";

import type { TrekMapData, TrekWaypoint } from "@/data/trek-route-geo";
import type { TrekRoute } from "@/data/green-pastures";

type ProjectedPoint = TrekWaypoint & {
  x: number;
  y: number;
};

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

function projectPoints(mapData: TrekMapData): ProjectedPoint[] {
  const lngs = mapData.waypoints.map((point) => point.coordinates[0]);
  const lats = mapData.waypoints.map((point) => point.coordinates[1]);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const lngRange = Math.max(maxLng - minLng, 0.001);
  const latRange = Math.max(maxLat - minLat, 0.001);

  return mapData.waypoints.map((point) => ({
    ...point,
    x: 10 + ((point.coordinates[0] - minLng) / lngRange) * 80,
    y: 86 - ((point.coordinates[1] - minLat) / latRange) * 72,
  }));
}

export function RouteMapExplorer({
  trek,
  mapData,
}: {
  trek: TrekRoute;
  mapData: TrekMapData;
}) {
  const points = useMemo(() => projectPoints(mapData), [mapData]);
  const [selectedId, setSelectedId] = useState(points[0]?.id);
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
          <svg viewBox="0 0 100 100" role="img">
            <defs>
              <linearGradient id={`trail-${trek.slug}`} x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#75dec9" />
                <stop offset="100%" stopColor="#ff16a2" />
              </linearGradient>
            </defs>
            <path className="mapContour c1" d="M4 70 C22 48, 38 88, 58 54 S82 28, 96 48" />
            <path className="mapContour c2" d="M7 38 C22 20, 48 28, 58 16 S84 10, 95 23" />
            <path className="mapContour c3" d="M8 88 C28 76, 42 92, 63 74 S84 60, 97 70" />
            <polyline
              className="mapRouteGhost"
              points={points.map((point) => `${point.x},${point.y}`).join(" ")}
            />
            <polyline
              className="mapRouteLine"
              points={points.map((point) => `${point.x},${point.y}`).join(" ")}
              stroke={`url(#trail-${trek.slug})`}
            />
            {points.map((point, index) => (
              <g
                aria-label={`Select ${point.name}`}
                className="mapStopHit"
                key={point.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedId(point.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedId(point.id);
                  }
                }}
              >
                <circle
                  className={point.id === selected.id ? "mapStop active" : "mapStop"}
                  cx={point.x}
                  cy={point.y}
                  r={point.id === selected.id ? 4.6 : 3.4}
                />
                <text x={point.x} y={point.y - 7} textAnchor="middle">
                  {index + 1}
                </text>
              </g>
            ))}
          </svg>
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
