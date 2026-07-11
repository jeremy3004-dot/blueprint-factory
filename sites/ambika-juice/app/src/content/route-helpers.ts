import { referenceRoutes } from "./ambika-content.ts";
import type { RouteFamily } from "./types.ts";

export function routeParamsForFamily(family: RouteFamily) {
  return referenceRoutes
    .filter((route) => route.family === family)
    .map((route) => ({ slug: route.path.split("/").filter(Boolean).at(-1) ?? "home" }));
}

export function routeParamsForPrefix(prefix: string) {
  return referenceRoutes
    .filter((route) => route.path.startsWith(`${prefix}/`))
    .map((route) => ({ slug: route.path.slice(prefix.length + 1) }));
}

export function routeByPath(path: string) {
  return referenceRoutes.find((route) => route.path === path);
}
