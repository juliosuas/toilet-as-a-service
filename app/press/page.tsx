"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

const posts = [
  "La economía de la atención encontró lo último que quedaba: tu urgencia. Mira 12 segundos. Desbloquea 4 minutos. Toilet as a Service.",
  "SaaS monetizó el trabajo. Las apps monetizaron la atención. Nosotros encontramos lo último que quedaba. Es sátira. Por ahora.",
  "Product–market fit biológico: baños públicos financiados por anuncios imposibles de omitir.",
];

export default function PressPage() {
  async function copy(text: string) { await navigator.clipboard.writeText(`${text} ${window.location.origin}`); }
  return <main className="press-page shell"><Link className="back-link" href="/">← Volver a TaaS</Link><header><span>PRESS ROOM · PROYECTO SATÍRICO</span><h1>Toilet as<br />a Service.</h1><p>Una sátira interactiva sobre infraestructura, privacidad y economía de la atención, creada en Ciudad de México.</p></header><section><h2>En una línea</h2><p className="press-lede">Una startup convierte la urgencia humana en atención publicitaria medible.</p></section><section><h2>Sobre el proyecto</h2><p>TaaS imagina una red de baños urbanos financiada por anuncios imposibles de omitir. La interfaz, las cifras y los planes son parte de una demostración ficticia; no existen cabinas, membresías ni operaciones reales.</p></section><section><h2>Assets</h2><div className="asset-card"><img src="/og.png" width="1376" height="768" alt="Tarjeta de prensa de Toilet as a Service" /><a href="/og.png" download>Descargar imagen social ↓</a></div></section><section><h2>Copy listo para publicar</h2><div className="copy-grid">{posts.map((post) => <article key={post}><p>{post}</p><button onClick={() => copy(post)}>Copiar texto</button></article>)}</div></section><footer><b>Divulgación</b><p>Proyecto conceptual independiente. No recopila datos personales, no procesa pagos y no representa un servicio sanitario real.</p></footer></main>;
}
