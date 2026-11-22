import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const errors = [];

function watch(page) {
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
}

// 1. overflow + headings + header behavior at 1440
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  watch(page);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);

  const baseInfo = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    h1s: document.querySelectorAll("h1").length,
    h1Text: document.querySelector("h1")?.textContent?.trim(),
    headings: [...document.querySelectorAll("h1,h2,h3")].map((h) => h.tagName),
  }));
  console.log("base:", JSON.stringify(baseInfo));

  await page.mouse.wheel(0, 1400);
  await page.waitForTimeout(700);
  const hidden = await page.evaluate(() => {
    const h = document.querySelector("header");
    return h ? Math.round(h.getBoundingClientRect().top) : null;
  });
  await page.mouse.wheel(0, -500);
  await page.waitForTimeout(700);
  const shown = await page.evaluate(() => {
    const h = document.querySelector("header");
    return h ? Math.round(h.getBoundingClientRect().top) : null;
  });
  console.log("header top after down / up:", hidden, shown);

  await context.close();
}

// 2. mobile menu link -> price, and no dead scroll
{
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  watch(page);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Меню" }).click();
  await page.waitForTimeout(900);
  await page.getByRole("dialog").getByRole("link", { name: "Цена" }).click();
  await page.waitForTimeout(2400);
  const menuInfo = await page.evaluate(() => {
    const price = document.querySelector("section#price");
    return {
      dialogOpen: !!document.querySelector('[role="dialog"]'),
      stopped: document.documentElement.classList.contains("lenis-stopped"),
      scrollY: Math.round(window.scrollY),
      priceTop: price ? Math.round(price.getBoundingClientRect().top) : null,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  console.log("menu click:", JSON.stringify(menuInfo));
  await context.close();
}

// 3. craving dialog open, Escape, scroll resumes
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  watch(page);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: /Меня тянет/i }).click();
  await page.waitForTimeout(800);
  const opened = await page.evaluate(() => ({
    stopped: document.documentElement.classList.contains("lenis-stopped"),
    dialog: !!document.querySelector('[role="dialog"]'),
  }));
  await page.keyboard.press("Escape");
  await page.waitForTimeout(900);
  const closed = await page.evaluate(() => ({
    stopped: document.documentElement.classList.contains("lenis-stopped"),
    dialog: !!document.querySelector('[role="dialog"]'),
    scrollY: Math.round(window.scrollY),
  }));
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(600);
  const afterScroll = await page.evaluate(() => Math.round(window.scrollY));
  console.log("craving:", JSON.stringify({ opened, closed, afterScroll }));
  await context.close();
}

// 4. calculator reacts
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  watch(page);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.locator("#money").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const before = await page.locator("#money p.text-stat").first().textContent();
  await page.locator("#cigarettes").focus();
  for (let i = 0; i < 15; i++) await page.locator("#cigarettes").press("ArrowRight");
  await page.waitForTimeout(1200);
  const after = await page.locator("#money p.text-stat").first().textContent();
  console.log("calculator:", JSON.stringify({ before: before?.trim(), after: after?.trim() }));
  await page.screenshot({ path: "shots/calculator-changed.png" });
  await context.close();
}

// 5. pin slow / fast / back
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  watch(page);
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.locator("#hours").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const pinned = await page.evaluate(() => {
    const s = document.querySelector("#hours");
    return {
      top: Math.round(s.getBoundingClientRect().top),
      mode: s.getAttribute("data-mode"),
    };
  });
  await page.mouse.wheel(0, 2200);
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, -2200);
  await page.waitForTimeout(900);
  const back = await page.evaluate(() => {
    const s = document.querySelector("#hours");
    return {
      top: Math.round(s.getBoundingClientRect().top),
      mode: s.getAttribute("data-mode"),
    };
  });
  console.log("pin:", JSON.stringify({ pinned, back }));
  await context.close();
}

// 6. descender test: "Gyp, jq." in masks
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.locator("#start").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.evaluate(() => {
    const line = document.querySelector("#start h2 .split-line");
    if (line) line.textContent = "Gyp, jq.";
    const hero = document.querySelector("h1");
    if (hero) hero.textContent = "Gyp, jq.";
    const manifesto = document.querySelector("#method .split-line");
    if (manifesto) manifesto.textContent = "Gyp, jq.";
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: "shots/descender-footer.png" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: "shots/descender-hero.png" });
  await context.close();
}

console.log("errors:", errors.length ? errors : "none");
await browser.close();
