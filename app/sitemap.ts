import type { MetadataRoute } from "next";

const publicUrl = "https://toilet-as-a-service.juliosuas.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: publicUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${publicUrl}/press`, changeFrequency: "monthly", priority: 0.7 },
  ];
}
