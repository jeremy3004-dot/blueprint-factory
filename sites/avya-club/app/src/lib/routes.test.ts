import assert from "node:assert/strict";
import test from "node:test";

import { isActiveRoute } from "./routes";

test("matches exact normalized route paths", () => {
  assert.equal(isActiveRoute("/", "/"), true);
  assert.equal(isActiveRoute("/services", "/services"), true);
  assert.equal(isActiveRoute("/services/", "/services"), true);
  assert.equal(isActiveRoute("/membership", "/services"), false);
});
