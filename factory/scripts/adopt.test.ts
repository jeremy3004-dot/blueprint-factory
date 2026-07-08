import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { normalizeDonorSlug, rewriteReferenceHeader, seedPagesFromDonorInventory } from "./adopt";

describe("normalizeDonorSlug", () => {
  it("accepts donor names with or without the donor prefix", () => {
    assert.equal(normalizeDonorSlug("black-tomato"), "donor-black-tomato");
    assert.equal(normalizeDonorSlug("donor-aman"), "donor-aman");
  });
});

describe("rewriteReferenceHeader", () => {
  it("rewrites topology and clone-plan titles for the client while preserving donor facts", () => {
    const topology = [
      "# donor-black-tomato Reference-First Topology",
      "",
      "Primary donor: blacktomato.com",
      "Donor URL: https://www.blacktomato.com"
    ].join("\n");
    const clonePlan = [
      "# Clone Plan: donor-black-tomato",
      "",
      "Primary donor: blacktomato.com",
      "Donor URL: https://www.blacktomato.com"
    ].join("\n");

    assert.ok(rewriteReferenceHeader(topology, "everest-tours", "topology").startsWith("# everest-tours Reference-First Topology"));
    const rewritten = rewriteReferenceHeader(clonePlan, "everest-tours", "clone-plan");
    assert.ok(rewritten.startsWith("# Clone Plan: everest-tours"));
    assert.ok(rewritten.includes("Donor URL: https://www.blacktomato.com"));
  });
});

describe("seedPagesFromDonorInventory", () => {
  it("builds a starter pages.json from donor header/nav inventory", () => {
    const pages = seedPagesFromDonorInventory([
      { path: "/", label: "Home", area: "header" },
      { path: "/about", label: "About", area: "header" },
      { path: "/privacy", label: "Privacy", area: "footer" }
    ]);
    assert.deepEqual(pages.pages.map((page) => page.route), ["/", "/about"]);
  });
});
