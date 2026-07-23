import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const publicUrl = "https://toilet-as-a-service.juliosuas.chatgpt.site";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: "Toilet as a Service — Relief, as a service.",
    description: "A clean public restroom when you need it. Watch 12 seconds. Unlock 4 minutes. An interactive product satire about attention-funded infrastructure.",
    applicationName: "Toilet as a Service",
    authors: [{ name: "T/AAS Studio", url: publicUrl }],
    creator: "T/AAS Studio",
    category: "Interactive satire",
    keywords: ["interactive satire", "attention economy", "public infrastructure", "speculative design", "product design", "urban technology"],
    manifest: "/manifest.webmanifest",
    metadataBase: new URL(origin),
    alternates: {
      canonical: origin,
      types: { "application/rss+xml": `${origin}/feed.xml` },
    },
    robots: { index: true, follow: true },
    openGraph: { type: "website", siteName: "Toilet as a Service", locale: "en_US", title: "Toilet as a Service", description: "Watch 12 seconds. Unlock 4 minutes. The future cannot be skipped.", url: origin, images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Toilet as a Service — watch 12 seconds, unlock 4 minutes" }] },
    twitter: { card: "summary_large_image", title: "Toilet as a Service", description: "The last unmonetized moment is now a media channel.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Toilet as a Service",
    alternateName: "TaaS",
    url: publicUrl,
    image: `${publicUrl}/og.png`,
    description: "An interactive product satire about attention-funded public infrastructure.",
    inLanguage: "en",
    genre: ["Interactive satire", "Speculative design"],
    isAccessibleForFree: true,
    sameAs: ["https://github.com/juliosuas/toilet-as-a-service"],
  };
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
