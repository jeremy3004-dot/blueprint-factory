import ambikaJuiceScreenshot from "../../public/screenshots/ambika-juice-desktop.png";
import americanaGrillScreenshot from "../../public/screenshots/americana-grill-desktop.png";
import sanChonScreenshot from "../../public/screenshots/san-chon-desktop.png";
import dorjesScreenshot from "../../public/screenshots/dorjes-desktop.png";
import juiceryScreenshot from "../../public/screenshots/the-juicery-cafe-desktop.png";
import avyaClubScreenshot from "../../public/screenshots/avya-club-desktop.png";
import type { StaticImageData } from "next/image";
import { liveDemoCount, liveDemoRecords } from "./project-records";

export type LiveDemoProject = {
  slug: string;
  name: string;
  category: string;
  description: string;
  url: string;
  screenshot: StaticImageData;
  screenshotAlt: string;
};

const screenshots: Record<string, StaticImageData> = {
  "ambika-juice-desktop.png": ambikaJuiceScreenshot,
  "americana-grill-desktop.png": americanaGrillScreenshot,
  "san-chon-desktop.png": sanChonScreenshot,
  "dorjes-desktop.png": dorjesScreenshot,
  "the-juicery-cafe-desktop.png": juiceryScreenshot,
  "avya-club-desktop.png": avyaClubScreenshot
};

export { liveDemoCount };

export const liveDemoProjects: LiveDemoProject[] = liveDemoRecords.map((record) => {
  const screenshot = screenshots[record.screenshotFile];
  if (!screenshot) {
    throw new Error(`Missing screenshot import for ${record.screenshotFile}`);
  }

  return {
    slug: record.slug,
    name: record.name,
    category: record.category,
    description: record.description,
    url: record.url,
    screenshot,
    screenshotAlt: record.screenshotAlt
  };
});
