"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";

import type { TrekMapData, TrekWaypoint } from "@/data/trek-route-geo";
import type { RouteMapViewMode } from "@/components/route-map-explorer";

type RouteMapCanvasProps = {
  mapData: TrekMapData;
  emphasis: "immersive" | "compact";
  viewMode: RouteMapViewMode;
  selectedStop: TrekWaypoint;
  onSelectStop?: (waypoint: TrekWaypoint) => void;
};

function getTileConfig(viewMode: RouteMapViewMode) {
  if (viewMode === "overview") {
    return {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    };
  }

  return {
    url: viewMode === "terrain"
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
  };
}

function getTooltipPlacement(index: number): {
  direction: L.Direction;
  offset: L.PointExpression;
} {
  const placements: Array<{ direction: L.Direction; offset: L.PointExpression }> = [
    { direction: "bottom", offset: [0, 14] },
    { direction: "top", offset: [0, -14] },
    { direction: "right", offset: [14, -8] },
    { direction: "right", offset: [14, 12] },
    { direction: "top", offset: [0, -14] },
    { direction: "right", offset: [14, 0] },
    { direction: "bottom", offset: [0, 14] },
    { direction: "right", offset: [14, 0] },
  ];

  return placements[index] ?? { direction: "right", offset: [14, 0] };
}

export function RouteMapCanvas({
  mapData,
  emphasis,
  viewMode,
  selectedStop,
  onSelectStop,
}: RouteMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const overlayRef = useRef<L.LayerGroup | null>(null);

  const routePositions = useMemo(
    () => mapData.route.map(([lng, lat]) => [lat, lng] as [number, number]),
    [mapData.route],
  );
  const tileConfig = getTileConfig(viewMode);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: false,
      doubleClickZoom: true,
      touchZoom: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);
    overlayRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      overlayRef.current = null;
      tileLayerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const overlay = overlayRef.current;

    if (!map || !overlay) {
      return;
    }

    tileLayerRef.current?.remove();
    tileLayerRef.current = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      maxZoom: 17,
    }).addTo(map);

    overlay.clearLayers();

    const bounds = L.latLngBounds(routePositions);

    L.polyline(routePositions, {
      color: "#091018",
      weight: 10,
      opacity: 0.82,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(overlay);

    L.polyline(routePositions, {
      color: "#f2c25b",
      weight: 5,
      opacity: 0.96,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(overlay);

    mapData.waypoints.forEach((waypoint, index) => {
      const active = waypoint.id === selectedStop.id;
      if (active) {
        L.circleMarker([waypoint.coordinates[1], waypoint.coordinates[0]], {
          radius: 21,
          color: "#ffd84d",
          weight: 2,
          opacity: 0.95,
          fillColor: "#ffd84d",
          fillOpacity: 0.16,
          pane: "overlayPane",
        }).addTo(overlay);
      }

      const marker = L.marker([waypoint.coordinates[1], waypoint.coordinates[0]], {
        icon: L.divIcon({
          className: "",
          html: `<button class="route-map-pin ${active ? "route-map-pin--active" : ""}" type="button" aria-label="${waypoint.name}">${index + 1}</button>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
        zIndexOffset: active ? 1000 : 0,
      }).addTo(overlay);

      marker.on("click", () => onSelectStop?.(waypoint));
      const placement = getTooltipPlacement(index);

      marker.bindTooltip(
        `<div class="route-map-label">
          <p>${waypoint.name}</p>
          <span>${waypoint.altitudeM.toLocaleString()}m</span>
        </div>`,
        {
          direction: placement.direction,
          offset: placement.offset,
          opacity: 1,
          permanent: active || (emphasis === "compact" ? index < 4 : false),
          className: active ? "route-map-tooltip-active" : "",
        },
      );
    });

    map.fitBounds(bounds, {
      padding: emphasis === "immersive" ? [48, 48] : [30, 30],
      animate: false,
      maxZoom: viewMode === "overview" ? 9 : 10,
    });
  }, [emphasis, mapData.waypoints, onSelectStop, routePositions, selectedStop, tileConfig.attribution, tileConfig.url, viewMode]);

  return <div ref={containerRef} className="h-full w-full" aria-label="Interactive trek route map" />;
}
