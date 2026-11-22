import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const html = await (await fetch(base + "/")).text();

const grab = (pattern) => {
  const m = html.match(pattern);
  return m ? m[1] : null;
};

console.log(
  JSON.stringify(
    {
      title: grab(/<title>(.*?)<\/title>/),
      description: grab(/<meta name="description" content="(.*?)"/),
      canonical: grab(/<link rel="canonical" href="(.*?)"/),
      ogImage: grab(/<meta property="og:image" content="(.*?)"/),
      ogTitle: grab(/<meta property="og:title" content="(.*?)"/),
      twitterCard: grab(/<meta name="twitter:card" content="(.*?)"/),
      jsonLd: html.includes("application/ld+json"),
      icon: grab(/<link rel="icon" href="(.*?)"/),
      appleIcon: grab(/<link rel="apple-touch-icon" href="(.*?)"/),
    },
    null,
    2,
  ),
);

for (const [path, type] of [
  ["/icon.svg", "image/svg+xml"],
  ["/apple-icon.png", "image/png"],
  ["/opengraph-image.png", "image/png"],
]) {
  const res = await fetch(base + path);
  console.log(path, res.status, res.headers.get("content-type"), type);
}

const browser = await chromium.launch();
for (const [name, opts] of [
  ["404-1440", { viewport: { width: 1440, height: 900 } }],
  ["404-390", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }],
]) {
  const page = await browser.newPage(opts);
  await page.goto(base + "/net-takoy-stranicy", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `shots/${name}.png` });
  await page.close();
}
await browser.close();
