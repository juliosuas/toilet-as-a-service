const publicUrl = "https://toilet-as-a-service.juliosuas.chatgpt.site";
const releaseDate = "Wed, 22 Jul 2026 00:00:00 GMT";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const title = "Toilet as a Service v1.0.0 — Public launch";
  const description =
    "The attention economy found the last thing we had left: urgency. Watch 12 seconds. Unlock 4 minutes.";

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Toilet as a Service</title>
    <link>${publicUrl}</link>
    <description>Dispatches from attention-funded public infrastructure.</description>
    <language>en</language>
    <lastBuildDate>${releaseDate}</lastBuildDate>
    <atom:link href="${publicUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>${escapeXml(title)}</title>
      <link>${publicUrl}</link>
      <guid isPermaLink="false">taas-v1.0.0</guid>
      <pubDate>${releaseDate}</pubDate>
      <description>${escapeXml(description)}</description>
    </item>
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
