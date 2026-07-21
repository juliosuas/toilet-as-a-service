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
    title: "Toilet as a Service — Mira 12 segundos. Desbloquea 4 minutos.",
    description: "Infraestructura pública financiada por atención. Una sátira interactiva sobre el último espacio que la economía de la atención todavía no había monetizado.",
    metadataBase: new URL(origin),
    alternates: { canonical: origin },
    openGraph: { title: "Toilet as a Service", description: "Mira 12 segundos. Desbloquea 4 minutos. Es sátira. Por ahora.", url: origin, images: [{ url: `${origin}/og.png`, width: 1376, height: 768 }] },
    twitter: { card: "summary_large_image", title: "Toilet as a Service", description: "La economía de la atención encontró lo último que quedaba: tu urgencia.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
