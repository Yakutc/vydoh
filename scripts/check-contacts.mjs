import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch();

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  await page.locator("#start").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "shots/footer-contacts.png" });
  const info = await page.evaluate(() => ({
    footerEmail: document.querySelector('#start a[href^="mailto:"]')?.textContent?.trim(),
    mailtos: [...document.querySelectorAll('a[href^="mailto:"]')].map((a) => a.getAttribute("href")),
    hasOld: document.body.innerText.includes("hello@vydoh.ru"),
    city: document.body.innerText.match(/Санкт-Петербург[^\n]*/)?.[0] ?? null,
  }));
  console.log("desktop:", JSON.stringify(info));
  await context.close();
}

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
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "shots/menu-contacts.png" });
  const text = await page.getByRole("dialog").innerText();
  console.log("menu:", JSON.stringify(text.replace(/\n/g, " | ")));
  await context.close();
}

await browser.close();
