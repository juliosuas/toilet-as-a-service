import type { MetadataRoute } from "next";
import { headers } from "next/headers";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return [{ url: origin, priority: 1 }, { url: `${origin}/press`, priority: 0.7 }];
}
