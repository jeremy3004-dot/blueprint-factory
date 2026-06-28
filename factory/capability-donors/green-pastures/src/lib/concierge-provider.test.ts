import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAnthropicRequestBody,
  DEFAULT_ANTHROPIC_DEEP_MODEL,
  DEFAULT_ANTHROPIC_FAST_MODEL,
  CONCIERGE_MAX_OUTPUT_TOKENS,
  DEFAULT_OPENAI_MODEL,
  selectAnthropicModel,
  resolveConciergeProvider,
} from "./concierge-provider.ts";

function testEnv(values: Record<string, string>): NodeJS.ProcessEnv {
  return {
    NODE_ENV: "test",
    ...values,
  };
}

test("prefers anthropic when an anthropic key is configured", () => {
  const config = resolveConciergeProvider(testEnv({
    ANTHROPIC_API_KEY: "anthropic-key",
    OPENAI_API_KEY: "openai-key",
  }));

  assert.deepEqual(config, {
    provider: "anthropic",
    apiKey: "anthropic-key",
    model: DEFAULT_ANTHROPIC_FAST_MODEL,
    connected: true,
  });
});

test("falls back to openai when only an openai key is configured", () => {
  const config = resolveConciergeProvider(testEnv({
    OPENAI_API_KEY: "openai-key",
  }));

  assert.deepEqual(config, {
    provider: "openai",
    apiKey: "openai-key",
    model: DEFAULT_OPENAI_MODEL,
    connected: true,
  });
});

test("uses the configured anthropic model when one is provided", () => {
  const config = resolveConciergeProvider(testEnv({
    ANTHROPIC_API_KEY: "anthropic-key",
    ANTHROPIC_MODEL: "claude-sonnet-4-0",
  }));

  assert.deepEqual(config, {
    provider: "anthropic",
    apiKey: "anthropic-key",
    model: "claude-sonnet-4-0",
    connected: true,
  });
});

test("builds the anthropic request with the system prompt and recent messages", () => {
  const body = buildAnthropicRequestBody({
    system: "You are a trekking concierge.",
    messages: [
      { role: "user", content: "message 1" },
      { role: "assistant", content: "message 2" },
      { role: "user", content: "message 3" },
      { role: "assistant", content: "message 4" },
      { role: "user", content: "message 5" },
      { role: "assistant", content: "message 6" },
      { role: "user", content: "message 7" },
      { role: "assistant", content: "message 8" },
      { role: "user", content: "message 9" },
    ],
  });

  assert.equal(body.model, DEFAULT_ANTHROPIC_FAST_MODEL);
  assert.equal(body.system, "You are a trekking concierge.");
  assert.equal(body.max_tokens, CONCIERGE_MAX_OUTPUT_TOKENS);
  assert.deepEqual(body.messages, [
    { role: "assistant", content: "message 2" },
    { role: "user", content: "message 3" },
    { role: "assistant", content: "message 4" },
    { role: "user", content: "message 5" },
    { role: "assistant", content: "message 6" },
    { role: "user", content: "message 7" },
    { role: "assistant", content: "message 8" },
    { role: "user", content: "message 9" },
  ]);
});

test("routes lightweight chat to the pinned haiku model", () => {
  const model = selectAnthropicModel([
    {
      role: "user",
      content: "What trek would you suggest for a first timer with 10 days?",
    },
  ]);

  assert.equal(model, DEFAULT_ANTHROPIC_FAST_MODEL);
});

test("routes deeper reasoning prompts to the pinned sonnet model", () => {
  const model = selectAnthropicModel([
    {
      role: "user",
      content:
        "Compare Langtang, Mardi, and Annapurna Base Camp with tradeoffs, altitude risk, and a day-by-day premium itinerary recommendation.",
    },
  ]);

  assert.equal(model, DEFAULT_ANTHROPIC_DEEP_MODEL);
});

test("routes custom planning prompts to the pinned sonnet model instead of any opus model", () => {
  const model = selectAnthropicModel([
    {
      role: "user",
      content:
        "Build me a full custom Nepal proposal with logistics, pacing, weather buffers, and contingency planning.",
    },
  ]);

  assert.equal(model, DEFAULT_ANTHROPIC_DEEP_MODEL);
  assert.notEqual(model.includes("opus"), true);
});
