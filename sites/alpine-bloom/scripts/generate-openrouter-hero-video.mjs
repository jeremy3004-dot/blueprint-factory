import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.OPENROUTER_API_KEY;
const model = process.env.OPENROUTER_VIDEO_MODEL || "bytedance/seedance-2.0-fast";
const outputPath =
  process.env.OUTPUT_PATH ||
  "sites/alpine-bloom/app/public/alpine-bloom-assets/generated/alpine-bloom-seedance-hero.mp4";

if (!apiKey) {
  throw new Error("Set OPENROUTER_API_KEY in your environment before running.");
}

const inputReferences = [
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hiking%20to%20Mount%20Annapurna%2CNepal%202017%20%28Unsplash%29.jpg",
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Front%20view%20of%20the%20iconic%20Tengboche%20Monastery%20in%20Nepal%2C%20on%20the%20route%20of%20Everest%20Base%20camp%20trek%2C%20photographed%20on%20November%2027%2C%202023.jpg",
  "https://commons.wikimedia.org/wiki/Special:Redirect/file/Annapurna%20Base%20Camp%20Trekking%20Route%2C%20Ghandruk%2C%20Nepal%20%28Unsplash%29.jpg"
].map((url) => ({
  type: "image_url",
  image_url: { url }
}));

const prompt = [
  "Create a seamless 6-second looping homepage hero video in the playful scrapbook collage style of a boutique women-powered adventure travel site.",
  "Scene: ultra-realistic women trekking in Nepal with young Nepali guides, Himalayan mountains, prayer flags, lodge trails, bright daylight, joyful candid travel energy.",
  "Composition: one large scenic Himalayan backplate with realistic cutout-style people and polaroid snapshots flashing gently in and out across the scene.",
  "Motion: subtle paper-collage pop-ins, gentle handheld camera drift, no aggressive zooms, no text, no logos, no watermarks.",
  "Keep the look polished, artsy, real-life, warm, and optimistic."
].join(" ");

const submitResponse = await fetch("https://openrouter.ai/api/v1/videos", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model,
    prompt,
    duration: 6,
    resolution: "720p",
    aspect_ratio: "16:9",
    generate_audio: false,
    input_references: inputReferences
  })
});

if (!submitResponse.ok) {
  throw new Error(await submitResponse.text());
}

let job = await submitResponse.json();
console.log(`Submitted ${job.id} with status ${job.status}`);

for (let attempt = 0; attempt < 40; attempt += 1) {
  if (job.status === "completed") break;
  if (["failed", "cancelled", "expired"].includes(job.status)) {
    throw new Error(job.error || `Video generation ${job.status}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 30_000));
  const pollUrl = new URL(job.polling_url, "https://openrouter.ai");
  const pollResponse = await fetch(pollUrl, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });

  if (!pollResponse.ok) {
    throw new Error(await pollResponse.text());
  }

  job = await pollResponse.json();
  console.log(`Poll ${attempt + 1}: ${job.status}`);
}

if (job.status !== "completed") {
  throw new Error("Video generation did not complete before the polling limit.");
}

const videoUrl =
  job.unsigned_urls?.[0] ?? `https://openrouter.ai/api/v1/videos/${job.id}/content?index=0`;
const videoResponse = await fetch(videoUrl, {
  headers: videoUrl.startsWith("https://openrouter.ai/api/")
    ? { Authorization: `Bearer ${apiKey}` }
    : undefined
});

if (!videoResponse.ok) {
  throw new Error(await videoResponse.text());
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.from(await videoResponse.arrayBuffer()));
console.log(`Saved ${outputPath}`);
