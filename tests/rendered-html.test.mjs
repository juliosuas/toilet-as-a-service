import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the TaaS product experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Toilet as a Service/iu);
  assert.match(html, /Relief,/);
  assert.match(html, /TOILET AS A SERVICE/);
  assert.match(html, /THE BUSINESS MODEL/);
  assert.match(html, /LIVE URGENCY MODEL/);
  assert.match(html, /THE ACCESS MOMENT/);
  assert.match(html, /Three beats/);
  assert.match(html, /One inevitable flow/);
  assert.match(html, /CONCEPT UNIT 17/);
  assert.match(html, /FIELD STUDIES/);
  assert.match(html, /Three distances/);
  assert.equal(existsSync(new URL("../public/access-exchange-loop.svg", import.meta.url)), true);
  assert.equal(existsSync(new URL("../public/taas-unit-17.webp", import.meta.url)), true);
  assert.equal(existsSync(new URL("../public/taas-unit-17-blue.webp", import.meta.url)), true);
  assert.equal(existsSync(new URL("../public/taas-unit-street-blue.webp", import.meta.url)), true);
  assert.equal(existsSync(new URL("../public/taas-access-terminal-blue.webp", import.meta.url)), true);
  assert.match(html, /TaaS is interactive satire/);
  assert.match(html, /No physical units/);
  assert.match(html, /MAKE THE PREMISE TRAVEL/);
  assert.match(html, /Post on X/);
  assert.match(html, /Share on LinkedIn/);
  assert.match(html, /The future cannot be skipped/);
  assert.doesNotMatch(html, /S\.A\.P\.I\. de C\.V\./);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("publishes project-specific social metadata", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /og:image/);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /CreativeWork/);
  assert.match(html, /Watch 12 seconds\. Unlock 4 minutes/i);
});

test("publishes crawlable discovery routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("discovery", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
  const context = { waitUntil() {}, passThroughOnException() {} };

  const robots = await worker.fetch(new Request("http://localhost/robots.txt"), env, context);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/toilet-as-a-service\.juliosuas\.chatgpt\.site\/sitemap\.xml/);

  const sitemap = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, context);
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /<loc>https:\/\/toilet-as-a-service\.juliosuas\.chatgpt\.site<\/loc>/);
  assert.match(xml, /<loc>https:\/\/toilet-as-a-service\.juliosuas\.chatgpt\.site\/press<\/loc>/);
});
