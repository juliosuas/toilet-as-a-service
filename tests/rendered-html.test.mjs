import assert from "node:assert/strict";
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
  assert.match(html, /ART-DIRECTED WITH HIGGSFIELD/);
  assert.match(html, /TaaS is interactive satire/);
  assert.match(html, /No physical units/);
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
  assert.match(html, /Watch 12 seconds\. Unlock 4 minutes/i);
});
