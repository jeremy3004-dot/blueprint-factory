"use client";

import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";

import type { TrekMapData, TrekWaypoint } from "@/data/trek-route-geo";
import type { RouteMapViewMode } from "@/components/route-map-explorer";

type RouteMapCanvasProps = {
  mapData: TrekMapData;
  selectedStop: TrekWaypoint;
  viewMode: RouteMapViewMode;
  onSelectStop: (waypoint: TrekWaypoint) => void;
};

function getTileConfig(viewMode: RouteMapViewMode) {
  if (viewMode === "light") {
    return {
      maxZoom: 14,
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    };
  }

  if (viewMode === "topo") {
    return {
      maxZoom: 15,
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    };
  }

  return {
    maxZoom: 17,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  };
}

function getTooltipPlacement(index: number): {
  direction: L.Direction;
  offset: L.PointExpression;
} {
  const placements: Array<{ direction: L.Direction; offset: L.PointExpression }> = [
    { direction: "bottom", offset: [0, 18] },
    { direction: "top", offset: [0, -18] },
    { direction: "right", offset: [16, -6] },
    { direction: "right", offset: [16, 10] },
    { direction: "top", offset: [0, -18] },
    { direction: "left", offset: [-16, 0] },
    { direction: "bottom", offset: [0, 18] },
    { direction: "right", offset: [16, 0] },
  ];

  return placements[index] ?? { direction: "right", offset: [16, 0] };
}

export function RouteMapCanvas({
  mapData,
  selectedStop,
  viewMode,
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
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      attributionControl: false,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      touchZoom: true,
      zoomControl: false,
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

    if (!map || !overlay) return;

    map.invalidateSize();
    tileLayerRef.current?.remove();
    tileLayerRef.current = L.tileLayer(tileConfig.url, {
      maxZoom: tileConfig.maxZoom,
      minZoom: 6,
    }).addTo(map);

    overlay.clearLayers();

    L.polyline(routePositions, {
      color: "#090807",
      lineCap: "round",
      lineJoin: "round",
      opacity: 0.82,
      weight: 12,
    }).addTo(overlay);

    L.polyline(routePositions, {
      color: "#ffffff",
      lineCap: "round",
      lineJoin: "round",
      opacity: 0.9,
      weight: 7,
    }).addTo(overlay);

    L.polyline(routePositions, {
      color: "#ff16a2",
      lineCap: "round",
      lineJoin: "round",
      opacity: 0.96,
      weight: 4,
    }).addTo(overlay);

    mapData.waypoints.forEach((waypoint, index) => {
      const active = waypoint.id === selectedStop.id;
      const position: [number, number] = [
        waypoint.coordinates[1],
        waypoint.coordinates[0],
      ];

      if (active) {
        L.circleMarker(position, {
          color: "#ffffff",
          fillColor: "#ff16a2",
          fillOpacity: 0.18,
          opacity: 0.96,
          radius: 24,
          weight: 2,
        }).addTo(overlay);
      }

      const marker = L.marker(position, {
        icon: L.divIcon({
          className: "",
          html: `<button class="route-map-pin ${active ? "route-map-pin--active" : ""}" type="button" aria-label="${waypoint.name}">${index + 1}</button>`,
          iconAnchor: [16, 16],
          iconSize: [32, 32],
        }),
        zIndexOffset: active ? 1000 : 0,
      }).addTo(overlay);

      marker.on("click", () => onSelectStop(waypoint));

      const placement = getTooltipPlacement(index);
      marker.bindTooltip(
        `<div class="route-map-label">
          <p>${waypoint.name}</p>
          <span>${waypoint.altitudeM.toLocaleString()}m</span>
        </div>`,
        {
          className: active ? "route-map-tooltip-active" : "route-map-tooltip",
          direction: placement.direction,
          offset: placement.offset,
          opacity: 1,
          permanent: active || index === 0 || index === mapData.waypoints.length - 1,
        },
      );
    });

    const compact = (containerRef.current?.clientWidth ?? 0) < 520;
    map.fitBounds(L.latLngBounds(routePositions), {
      animate: false,
      maxZoom: compact ? 10 : viewMode === "light" ? 10 : 11,
      padding: compact ? [68, 42] : [52, 52],
    });
  }, [
    mapData.waypoints,
    onSelectStop,
    routePositions,
    selectedStop.id,
    tileConfig.maxZoom,
    tileConfig.url,
    viewMode,
  ]);

  return <div ref={containerRef} className="trekLeafletMap" />;
}
