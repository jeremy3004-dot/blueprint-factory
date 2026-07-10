import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("app/public/media");

const assets = {
  "logo.svg": "https://dorjes.com/wp-content/uploads/2023/10/logo-main.svg",
  "mark.svg": "https://dorjes.com/wp-content/uploads/2023/10/dorje-final.svg",
  "mountain-pattern.svg": "https://dorjes.com/wp-content/uploads/2023/10/Mountain_pattern.svg",
  "favicon.png": "https://dorjes.com/wp-content/uploads/2023/10/favicon.png",
  "hero.mp4": "https://dorjes.com/wp-content/uploads/2023/10/final-video.mp4",
  "hero-poster.webp": "https://dorjes.com/wp-content/uploads/yootheme/cache/91/Group-862-913d5d9f.webp",
  "resort-overview.jpg": "https://dorjes.com/wp-content/uploads/2023/11/resort-mid-1.jpg",
  "resort-architecture.jpg": "https://dorjes.com/wp-content/uploads/2023/11/resort-main-c.jpg",
  "resort-hero.jpg": "https://dorjes.com/wp-content/uploads/2023/10/resort3.jpg",
  "resort-gallery.jpg": "https://dorjes.com/wp-content/uploads/yootheme/cache/9a/resortgallery-1-9ab8b90e.jpg",
  "resort-view.jpg": "https://dorjes.com/wp-content/uploads/2023/11/outside-view.jpg",
  "resort-side.jpg": "https://dorjes.com/wp-content/uploads/yootheme/cache/76/sideviews-ban-76ff08f1.jpg",
  "lake-sunrise.jpg": "https://dorjes.com/wp-content/uploads/2023/11/sunrise-lake.jpg",
  "pool.jpg": "https://dorjes.com/wp-content/uploads/2023/11/swimming-resort.jpg",
  "room-dorje.jpg": "https://dorjes.com/wp-content/uploads/2023/11/dorje-suite-room.jpg",
  "room-jen.jpg": "https://dorjes.com/wp-content/uploads/2023/11/junior-suite-room.jpg",
  "room-deluxe.jpg": "https://dorjes.com/wp-content/uploads/2023/11/deluxe-room-intro.jpg",
  "room-standard.jpg": "https://dorjes.com/wp-content/uploads/2024/02/dorjes-standard-room-home-intro-new2.jpg",
  "room-dorje-hero.jpg": "https://dorjes.com/wp-content/uploads/2024/01/dorje-suite-new-banner1.jpg",
  "room-jen-hero.jpg": "https://dorjes.com/wp-content/uploads/2024/03/junior-suite-banner.jpg",
  "room-deluxe-hero.jpg": "https://dorjes.com/wp-content/uploads/2024/01/deluxe-room-new-banner3.jpg",
  "room-standard-hero.jpg": "https://dorjes.com/wp-content/uploads/2024/02/dorjes-standard-room-new-banner3.jpg",
  "dining-hero.jpg": "https://dorjes.com/wp-content/uploads/2023/10/culinary1.jpg",
  "dining-table.jpg": "https://dorjes.com/wp-content/uploads/2023/10/taste-2.jpg",
  "dining-landscape.jpg": "https://dorjes.com/wp-content/uploads/yootheme/cache/68/culinary1-686839ab.jpg",
  "local-food.jpg": "https://dorjes.com/wp-content/uploads/2023/11/local-savory-flavour.jpg",
  "drinks-view.jpg": "https://dorjes.com/wp-content/uploads/2023/11/drink-with-view.jpg",
  "taste.webp": "https://dorjes.com/wp-content/uploads/yootheme/cache/87/taste-2-87ebc4b1.webp",
  "spa.jpg": "https://dorjes.com/wp-content/uploads/2024/01/spa-new-1.jpg",
  "pool-wellness.jpg": "https://dorjes.com/wp-content/uploads/2023/10/swimmingspa.jpg",
  "founder.jpg": "https://dorjes.com/wp-content/uploads/2023/10/dorje.jpg",
  "moondance.jpg": "https://dorjes.com/wp-content/uploads/2023/10/moondance-exterior.jpg",
  "moondance-people.jpg": "https://dorjes.com/wp-content/uploads/2023/10/moondance-people.jpg",
  "natgeo.jpg": "https://dorjes.com/wp-content/uploads/2024/07/natgeo-dorje.jpg",
  "gallery-a.jpg": "https://dorjes.com/wp-content/uploads/2023/11/media-gallery-a.jpg",
  "gallery-g4.jpg": "https://dorjes.com/wp-content/uploads/2023/10/g4.jpg",
  "gallery-g8.jpg": "https://dorjes.com/wp-content/uploads/2023/10/g8.jpg",
  "sustainability.webp": "https://dorjes.com/wp-content/uploads/yootheme/cache/4c/organic-farming-min-scaled-4c56c931.jpg"
};

await mkdir(output, { recursive: true });

for (const [filename, url] of Object.entries(assets)) {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 100) throw new Error(`Unexpectedly small asset: ${url}`);
  await writeFile(path.join(output, filename), bytes);
  console.log(`${filename}\t${bytes.length}\t${url}`);
}
