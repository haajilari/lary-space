import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://laryspace.tech/en", lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: "https://laryspace.tech/fa", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
