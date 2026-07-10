import type { MetadataRoute } from "next";
import { navigation } from "../data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thejuicerycafe.com";

  return navigation.map((item) => ({
    url: `${baseUrl}${item.href === "/" ? "" : item.href}`,
    lastModified: new Date("2026-07-11"),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : item.href === "/food" || item.href === "/contact" ? 0.8 : 0.6,
  }));
}
