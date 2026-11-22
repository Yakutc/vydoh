import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();

async function scrollThrough(page) {
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  let y = 0;
  while (y < height) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(80);
    y += 700;
  }
  await page.waitForTimeout(1200);
}

async function shoot(name, opts, { scroll = true } = {}) {
  const context = await browser.newContext(opts);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);
  if (scroll) await scrollThrough(page);
  await page.screenshot({ path: `shots/${name}.png`, fullPage: true });
  await context.close();
}

const sizes = [
  ["390", { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 }],
  ["768", { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 }],
  ["1440", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ["1920", { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 }],
];

for (const [name, opts] of sizes) {
  await shoot(`full-${name}`, opts);
}

// Hero only, at the top
for (const [name, opts] of sizes) {
  const context = await browser.newContext(opts);
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `shots/hero-${name}.png` });
  await context.close();
}

// Reduced motion full page (no reveals to wait for)
await shoot(
  "reduced-1440",
  { viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" },
  { scroll: false },
);

// No JS full page
await shoot(
  "nojs-390",
  { viewport: { width: 390, height: 844 }, javaScriptEnabled: false },
  { scroll: false },
);
await shoot(
  "nojs-1440",
  { viewport: { width: 1440, height: 900 }, javaScriptEnabled: false },
  { scroll: false },
);

// Section-by-section, desktop, after reveals settle
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  for (const [name, selector] of [
    ["section-method", "#method"],
    ["section-moment", "#moment"],
    ["section-money", "#money"],
    ["section-price", "section#price"],
  ]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `shots/${name}.png` });
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "shots/section-footer.png" });

  await context.close();
}

// Pinned showpiece: engage, then three positions
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.locator("#hours").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "shots/pin-a.png" });
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shots/pin-b.png" });
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shots/pin-c.png" });
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shots/pin-d.png" });
  await context.close();
}

// Craving dialog
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.getByRole("button", { name: /Меня тянет/i }).click();
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "shots/craving-1440.png" });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: "shots/craving-1440-b.png" });
  await context.close();
}

// Mobile menu
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.getByRole("button", { name: "Меню" }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "shots/menu-390.png" });
  await context.close();
}

await browser.close();
console.log("shots written");
