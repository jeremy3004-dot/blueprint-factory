import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  brandSourceSlugForClient,
  CLONE_STAGE_LABELS,
  runClonePipeline,
  type RunCommandFn
} from "./console-clone-runner.ts";
import { rootDir } from "./console-data.ts";

test("brandSourceSlugForClient appends -brand-source suffix", () => {
  assert.equal(brandSourceSlugForClient("everest-tours"), "everest-tours-brand-source");
});

test("CLONE_STAGE_LABELS uses plain English", () => {
  assert.match(CLONE_STAGE_LABELS.adopting, /Adopting/i);
  assert.match(CLONE_STAGE_LABELS.deploying, /Deploying/i);
  assert.match(CLONE_STAGE_LABELS.complete, /Preview ready/i);
});

test("runClonePipeline runs adopt → capture → tokens → install → build → deploy", async () => {
  const siteSlug = "console-clone-runner-test";
  const siteDir = path.join(rootDir, "sites", siteSlug);
  await mkdir(siteDir, { recursive: true });
  await writeFile(
    path.join(siteDir, "deploy.md"),
    "Preview URL: https://console-clone-runner-test.vercel.app\n"
  );

  const calls: string[] = [];
  const stages: string[] = [];

  const runCommand: RunCommandFn = async (command, args) => {
    calls.push([command, ...args].join(" "));
    if (command === "pnpm" && args[0] === "blueprint:deploy") {
      return { code: 0, stdout: "ok", stderr: "" };
    }
    return { code: 0, stdout: "", stderr: "" };
  };

  const result = await runClonePipeline(
    {
      clientName: "Console Clone Runner Test",
      clientWebsite: "https://example.com",
      donorShelfSlug: "donor-black-tomato"
    },
    runCommand,
    {
      appendLog: async (line) => {
        calls.push(`log:${line}`);
      },
      updateStage: async (stage) => {
        stages.push(stage);
      }
    }
  );

  assert.equal(result.siteSlug, "console-clone-runner-test");
  assert.equal(result.brandSourceSlug, "console-clone-runner-test-brand-source");
  assert.equal(result.adopted, true);
  assert.deepEqual(stages, [
    "adopting",
    "capturing_brand",
    "curating_tokens",
    "installing",
    "building",
    "deploying",
    "complete"
  ]);
  assert.ok(calls.some((c) => c.includes("blueprint:adopt console-clone-runner-test donor-black-tomato")));
  assert.ok(calls.some((c) => c.includes("blueprint:capture console-clone-runner-test-brand-source")));
  assert.ok(calls.some((c) => c.includes("blueprint:tokens console-clone-runner-test")));
  assert.ok(calls.some((c) => c.includes("--filter console-clone-runner-test build")));
  assert.ok(calls.some((c) => c.includes("blueprint:deploy console-clone-runner-test --preview")));
  assert.equal(result.previewUrl, "https://console-clone-runner-test.vercel.app");

  await rm(siteDir, { recursive: true, force: true });
});

test("runClonePipeline fails fast when adopt fails", async () => {
  const runCommand: RunCommandFn = async () => ({ code: 1, stdout: "", stderr: "donor missing" });

  await assert.rejects(
    () =>
      runClonePipeline(
        {
          clientName: "Test Co",
          clientWebsite: "https://test.co",
          donorShelfSlug: "donor-missing"
        },
        runCommand,
        {
          appendLog: async () => {},
          updateStage: async () => {}
        }
      ),
    /blueprint:adopt failed/
  );
});
