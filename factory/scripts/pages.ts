// Machine-readable page inventory for a site's clone plan. Each planned route carries a status so the
// factory can refuse to pass to Beauty while donor-critical pages are neither built nor explicitly
// deferred. This is the mechanical version of the rubric's "missing donor-critical pages" fail condition.

export type PageStatus = "planned" | "built" | "deferred";
export type PagePlanEntry = { route: string; title?: string; status: PageStatus; reason?: string };
export type PagesFile = { pages: PagePlanEntry[] };

/** Map a route to a screenshot sub-directory name. "/" -> "home", "/treks/manaslu" -> "treks-manaslu". */
export function routeToDir(route: string): string {
  const trimmed = route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
  const slug = trimmed.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
  return slug === "" ? "home" : slug;
}

export type PageCoverage = {
  ready: boolean;
  plannedUnbuilt: string[];
  builtMissingShots: string[];
  builtCount: number;
  deferredCount: number;
  plannedCount: number;
  total: number;
};

/**
 * A site's pages are "ready" when every planned page is built-or-deferred AND every built page has its
 * screenshots. `hasShots(route)` reports whether a built route's desktop+mobile screenshots exist.
 */
export function summarizePageCoverage(pages: PagePlanEntry[], hasShots: (route: string) => boolean): PageCoverage {
  const plannedUnbuilt = pages.filter((p) => p.status === "planned").map((p) => p.route);
  const built = pages.filter((p) => p.status === "built");
  const builtMissingShots = built.filter((p) => !hasShots(p.route)).map((p) => p.route);
  return {
    ready: plannedUnbuilt.length === 0 && builtMissingShots.length === 0,
    plannedUnbuilt,
    builtMissingShots,
    builtCount: built.length,
    deferredCount: pages.filter((p) => p.status === "deferred").length,
    plannedCount: plannedUnbuilt.length,
    total: pages.length
  };
}

/** One-line, human-readable coverage message for the gate. */
export function pageCoverageMessage(coverage: PageCoverage): string {
  if (coverage.ready) {
    return `page coverage complete: ${coverage.builtCount} built, ${coverage.deferredCount} deferred.`;
  }
  const parts: string[] = [];
  if (coverage.plannedUnbuilt.length > 0) {
    parts.push(`${coverage.plannedUnbuilt.length} page${coverage.plannedUnbuilt.length === 1 ? "" : "s"} planned but not built or deferred (${coverage.plannedUnbuilt.join(", ")})`);
  }
  if (coverage.builtMissingShots.length > 0) {
    parts.push(`${coverage.builtMissingShots.length} built page${coverage.builtMissingShots.length === 1 ? "" : "s"} missing screenshots (${coverage.builtMissingShots.join(", ")})`);
  }
  return parts.join("; ");
}

/** Seed a draft build plan from a captured donor page inventory (all planned; agent then curates). */
export function buildPagePlan(
  donorPages: { path: string; label: string; area: string }[],
  limit = 8
): PagesFile {
  const nav = donorPages.filter((p) => p.path !== "/" && (p.area === "header" || p.area === "nav"));
  const seen = new Set<string>(["/"]);
  const entries: PagePlanEntry[] = [{ route: "/", title: "Home", status: "planned" }];
  for (const page of nav) {
    if (seen.has(page.path)) continue;
    seen.add(page.path);
    entries.push({ route: page.path, title: page.label || page.path, status: "planned" });
    if (entries.length >= limit) break;
  }
  return { pages: entries };
}
