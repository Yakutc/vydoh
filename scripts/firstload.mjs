import { gzipSync } from "node:zlib";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const html = await (await fetch(base + "/")).text();
const srcs = [
  ...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1])),
];
const THREE = /WebGLRenderer|WebGL2RenderingContext|react-three-fiber/;
let raw = 0;
let gz = 0;
const hits = [];

for (const src of srcs) {
  const buf = Buffer.from(await (await fetch(new URL(src, base))).arrayBuffer());
  raw += buf.length;
  gz += gzipSync(buf).length;
  if (THREE.test(buf.toString("utf8"))) hits.push(src);
}

console.log(
  `first-load: ${srcs.length} scripts, ${(raw / 1024).toFixed(1)} kB raw, ${(gz / 1024).toFixed(1)} kB gzip`,
);
console.log(`three.js in first load: ${hits.length ? hits.join(", ") : "none"}`);

const browser = await chromium.launch();
for (const [name, opts] of [
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  [
    "phone",
    { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ],
]) {
  const page = await browser.newPage(opts);
  const js = [];
  page.on("response", async (r) => {
    if (!r.url().endsWith(".js")) return;
    try {
      const b = await r.body();
      js.push({ kb: b.length / 1024, three: THREE.test(b.toString("utf8")) });
    } catch {}
  });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const lazy = js.filter((j) => j.three);
  console.log(
    `${name}: ${js.length} JS files; three.js chunks ${lazy.length} (${lazy.reduce((a, b) => a + b.kb, 0).toFixed(1)} kB raw)`,
  );
  await page.close();
}
await browser.close();
