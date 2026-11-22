import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(2400);

const content = await page.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  manifesto: document.querySelector("#method .split-line")?.textContent?.trim(),
  momentRows: document.querySelectorAll("#moment [data-reveal]").length,
  hoursTitle: document.querySelector("#hours h2")?.textContent?.trim(),
  vapeNotes: document.querySelectorAll("#hours [data-phase]").length,
  hasVapeLine: [...document.querySelectorAll("#hours [data-phase]")].every((el) =>
    el.textContent?.includes("Для вейпа"),
  ),
  metaTitle: document.title,
  description: document
    .querySelector('meta[name="description"]')
    ?.getAttribute("content"),
}));
console.log("content:", JSON.stringify(content, null, 2));

await page.locator("#money").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const before = await page.locator("#money p.text-stat").first().textContent();
await page.getByRole("button", { name: "Вейп" }).click();
await page.waitForTimeout(1200);
const vape = await page.evaluate(() => {
  const money = document.querySelector("#money");
  const giant = money?.querySelector("p.text-stat")?.textContent?.trim();
  const labels = [...money.querySelectorAll("p.text-small")].map((p) =>
    p.textContent?.trim(),
  );
  const inputs = [...money.querySelectorAll("input[type=range]")].map((i) => ({
    id: i.id,
    value: i.value,
  }));
  const pressed = [...money.querySelectorAll("button[aria-pressed]")].map(
    (b) => ({ text: b.textContent?.trim(), pressed: b.getAttribute("aria-pressed") }),
  );
  return { giant, labels, inputs, pressed, text: money?.innerText };
});
console.log("cigarettes giant:", before?.trim());
console.log("vape:", JSON.stringify(vape, null, 2));
await page.screenshot({ path: "shots/calculator-vape.png" });

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.screenshot({ path: "shots/hero-vape.png" });

console.log("errors:", errors.length ? errors : "none");
await browser.close();
