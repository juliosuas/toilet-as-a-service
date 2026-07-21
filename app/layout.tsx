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
    title: "TaaS — Sátira interactiva sobre la economía de la atención",
    description: "Una startup demasiado plausible: mira un anuncio, desbloquea un baño y descubre hasta dónde puede llegar la economía de la atención.",
    metadataBase: new URL(origin),
    alternates: { canonical: origin },
    openGraph: { title: "TaaS — El alivio, patrocinado.", description: "Una sátira interactiva demasiado plausible.", url: origin, images: [{ url: `${origin}/og.png`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: "TaaS — El alivio, patrocinado.", description: "Una sátira interactiva demasiado plausible.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
