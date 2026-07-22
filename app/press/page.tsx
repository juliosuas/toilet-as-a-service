"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages -- next/link triggers a Vinext hydration error in this client route. */

const posts = [
  "The attention economy found the last thing we had left: urgency. Watch 12 seconds. Unlock 4 minutes. Toilet as a Service.",
  "SaaS monetized work. Apps monetized attention. We found the last unmonetized moment. It is satire. For now.",
  "Biological product–market fit: public restrooms funded by impossible-to-ignore ads.",
];

export default function PressPage() {
  async function copy(text: string) { await navigator.clipboard.writeText(`${text} ${window.location.origin}`); }
  return <main className="press-page shell"><a className="back-link" href="/">← Back to TaaS</a><header><span>PRESS ROOM · INTERACTIVE SATIRE</span><h1>Toilet as<br />a Service.</h1><p>An interactive satire about infrastructure, privacy, and the attention economy, created in Mexico City.</p></header><section><h2>In one line</h2><p className="press-lede">A startup turns human urgency into measurable ad inventory.</p></section><section><h2>About</h2><p>TaaS imagines a network of urban restrooms funded by impossible-to-ignore ads. The interface, metrics, and plans are part of a fictional demonstration; no units, memberships, or real-world operations exist.</p></section><section><h2>Assets</h2><div className="asset-card"><img src="/og.png" width="1200" height="630" alt="Toilet as a Service social card" /><a href="/og.png" download>Download social card ↓</a></div></section><section><h2>Ready-to-post copy</h2><div className="copy-grid">{posts.map((post) => <article key={post}><p>{post}</p><button onClick={() => copy(post)}>Copy text</button></article>)}</div></section><footer><b>Disclosure</b><p>Independent conceptual project. It collects no personal data, processes no payments, and does not represent a real sanitation service.</p></footer></main>;
}
