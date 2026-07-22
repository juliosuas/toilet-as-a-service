import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: "Toilet as a Service — Relief, as a service.",
    description: "A clean public restroom when you need it. Watch 12 seconds. Unlock 4 minutes. An interactive product satire about attention-funded infrastructure.",
    metadataBase: new URL(origin),
    alternates: { canonical: origin },
    openGraph: { title: "Toilet as a Service", description: "Watch 12 seconds. Unlock 4 minutes. The future cannot be skipped.", url: origin, images: [{ url: `${origin}/og.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "Toilet as a Service", description: "The last unmonetized moment is now a media channel.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
