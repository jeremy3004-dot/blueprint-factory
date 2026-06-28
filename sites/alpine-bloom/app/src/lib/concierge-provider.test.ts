import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAnthropicRequestBody,
  CONCIERGE_MAX_OUTPUT_TOKENS,
  DEFAULT_ANTHROPIC_DEEP_MODEL,
  DEFAULT_ANTHROPIC_FAST_MODEL,
  DEFAULT_OPENAI_MODEL,
  resolveConciergeProvider,
  selectAnthropicModel,
} from "./concierge-provider.ts";

function testEnv(values: Record<string, string>): NodeJS.ProcessEnv {
  return {
    NODE_ENV: "test",
    ...values,
  };
}

test("prefers anthropic when both model providers are configured", () => {
  assert.deepEqual(
    resolveConciergeProvider(testEnv({
      ANTHROPIC_API_KEY: "anthropic-key",
      OPENAI_API_KEY: "openai-key",
    })),
    {
      provider: "anthropic",
      apiKey: "anthropic-key",
      model: DEFAULT_ANTHROPIC_FAST_MODEL,
      connected: true,
    },
  );
});

test("uses openai when only openai is configured", () => {
  assert.deepEqual(resolveConciergeProvider(testEnv({ OPENAI_API_KEY: "openai-key" })), {
    provider: "openai",
    apiKey: "openai-key",
    model: DEFAULT_OPENAI_MODEL,
    connected: true,
  });
});

test("builds anthropic request with recent messages and token cap", () => {
  const body = buildAnthropicRequestBody({
    system: "Women-only Himalayan concierge.",
    messages: Array.from({ length: 9 }, (_, index) => ({
      role: index % 2 ? "assistant" as const : "user" as const,
      content: `message ${index + 1}`,
    })),
  });

  assert.equal(body.model, DEFAULT_ANTHROPIC_FAST_MODEL);
  assert.equal(body.system, "Women-only Himalayan concierge.");
  assert.equal(body.max_tokens, CONCIERGE_MAX_OUTPUT_TOKENS);
  assert.equal(body.messages.length, 8);
  assert.equal(body.messages[0].content, "message 2");
});

test("routes complex planning prompts to sonnet and never opus", () => {
  const model = selectAnthropicModel([
    {
      role: "user",
      content:
        "Compare Everest, Annapurna, and Langtang with tradeoffs, altitude risk, budget, and a day-by-day proposal.",
    },
  ]);

  assert.equal(model, DEFAULT_ANTHROPIC_DEEP_MODEL);
  assert.equal(model.includes("opus"), false);
});
