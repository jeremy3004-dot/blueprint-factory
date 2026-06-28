import assert from "node:assert/strict";
import test from "node:test";

import { formatAssistantReply } from "./chat-format.ts";

test("removes markdown emphasis markers from assistant replies", () => {
  assert.equal(
    formatAssistantReply("A strong fit: **Mardi Himal** for first-time women trekkers."),
    "A strong fit: Mardi Himal for first-time women trekkers.",
  );
});

test("preserves list line breaks while cleaning bullets", () => {
  assert.equal(
    formatAssistantReply("* **Poon Hill**\n* Gentle altitude\n* Nepali women guide match"),
    "- Poon Hill\n- Gentle altitude\n- Nepali women guide match",
  );
});
