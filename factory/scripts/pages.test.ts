import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  buildPagePlan,
  pageCoverageMessage,
  routeToDir,
  summarizePageCoverage,
  type PagePlanEntry
} from "./pages";

describe("routeToDir", () => {
  it("maps routes to screenshot directory names", () => {
    assert.equal(routeToDir("/"), "home");
    assert.equal(routeToDir("/stay"), "stay");
    assert.equal(routeToDir("/treks/manaslu"), "treks-manaslu");
    assert.equal(routeToDir("/Trips/Winter Escapes/"), "trips-winter-escapes");
  });
});

describe("summarizePageCoverage", () => {
  const allShots = () => true;
  const noShots = () => false;

  it("is ready when every page is built (with shots) or deferred", () => {
    const pages: PagePlanEntry[] = [
      { route: "/", status: "built" },
      { route: "/stay", status: "built" },
      { route: "/press", status: "deferred", reason: "later" }
    ];
    const cov = summarizePageCoverage(pages, allShots);
    assert.equal(cov.ready, true);
    assert.equal(cov.builtCount, 2);
    assert.equal(cov.deferredCount, 1);
  });

  it("is NOT ready while planned pages remain, and reports the count", () => {
    const pages: PagePlanEntry[] = [
      { route: "/", status: "built" },
      { route: "/stay", status: "planned" },
      { route: "/dine", status: "planned" },
      { route: "/spa", status: "planned" },
      { route: "/press", status: "planned" }
    ];
    const cov = summarizePageCoverage(pages, allShots);
    assert.equal(cov.ready, false);
    assert.equal(cov.plannedUnbuilt.length, 4);
    assert.match(pageCoverageMessage(cov), /4 pages planned but not built or deferred/);
  });

  it("is NOT ready when a built page is missing screenshots", () => {
    const pages: PagePlanEntry[] = [{ route: "/", status: "built" }];
    const cov = summarizePageCoverage(pages, noShots);
    assert.equal(cov.ready, false);
    assert.deepEqual(cov.builtMissingShots, ["/"]);
    assert.match(pageCoverageMessage(cov), /missing screenshots/);
  });
});

describe("buildPagePlan", () => {
  it("seeds home + header/nav pages as planned, dropping body/footer links", () => {
    const plan = buildPagePlan([
      { path: "/", label: "Home", area: "nav" },
      { path: "/stay", label: "Stay", area: "header" },
      { path: "/dine", label: "Dine", area: "nav" },
      { path: "/privacy", label: "Privacy", area: "footer" },
      { path: "/random", label: "Random", area: "body" }
    ]);
    const routes = plan.pages.map((p) => p.route);
    assert.deepEqual(routes, ["/", "/stay", "/dine"]);
    assert.ok(plan.pages.every((p) => p.status === "planned"));
  });

  it("caps the number of seeded pages", () => {
    const donor = Array.from({ length: 20 }, (_, i) => ({ path: `/p${i}`, label: `P${i}`, area: "nav" }));
    const plan = buildPagePlan(donor, 5);
    assert.equal(plan.pages.length, 5); // home + 4
  });
});
