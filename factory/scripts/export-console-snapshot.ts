// Writes a static JSON snapshot for hosted console deploys (Vercel).

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gatherConsoleData } from "./console-data";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outPath = path.join(rootDir, "factory", "console", "snapshot.json");

async function main() {
  const data = await gatherConsoleData();
  const payload = {
    ...data,
    mode: "snapshot" as const,
    snapshotNote:
      "This is a point-in-time export from the last deploy. Create tasks on your local console for live inbox writes."
  };
  await writeFile(outPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
  console.log(`Wrote ${outPath}`);
  console.log(`  ${data.stats.clientCount} client sites, ${data.stats.donorCount} donors, ${data.stats.prospectCount ?? 0} prospects`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
