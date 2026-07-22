import type { MetadataRoute } from "next";

const publicUrl = "https://toilet-as-a-service.juliosuas.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${publicUrl}/sitemap.xml`,
  };
}
