import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();

for (const [w, h, mobile] of [
  [1440, 900, false],
  [390, 844, true],
]) {
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    isMobile: mobile,
    hasTouch: mobile,
  });
  const t0 = Date.now();
  await page.goto(base, { waitUntil: "commit" });
  for (let i = 0; i < 15; i++) {
    await page
      .screenshot({ path: `shots/trace-${w}-${String(i).padStart(2, "0")}.png` })
      .catch(() => {});
    console.log(`${w} frame ${i}: ${Date.now() - t0}ms`);
    await page.waitForTimeout(200);
  }
  await page.close();
}

await browser.close();
