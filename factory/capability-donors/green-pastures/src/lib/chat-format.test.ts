import test from "node:test";
import assert from "node:assert/strict";

import { formatAssistantReply } from "./chat-format.ts";

test("removes markdown emphasis markers from assistant replies", () => {
  const formatted = formatAssistantReply(
    "A few routes work really well for building confidence: **Shorter/gentler options:**",
  );

  assert.equal(
    formatted,
    "A few routes work really well for building confidence: Shorter/gentler options:",
  );
});

test("preserves list line breaks while stripping markdown styling", () => {
  const formatted = formatAssistantReply(
    "- **Poon Hill (5 days)**\n- Great mountain views without major altitude stress\n- **Astam & Dhampus (3 days)**",
  );

  assert.equal(
    formatted,
    "- Poon Hill (5 days)\n- Great mountain views without major altitude stress\n- Astam & Dhampus (3 days)",
  );
});

test("cleans headings and collapses excessive blank lines", () => {
  const formatted = formatAssistantReply(
    "### Easy options\n\n\n* **Mardi Himal**\n\n\n* **Langtang Valley**",
  );

  assert.equal(
    formatted,
    "Easy options\n\n- Mardi Himal\n\n- Langtang Valley",
  );
});
