import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Warm-up compile first
await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3500);

// Reload to capture preloader without bottom elements
await page.reload({ waitUntil: "commit" });
await page.waitForTimeout(1000);
await page.screenshot({ path: "verify_preloader_clean.png" });

await page.waitForTimeout(1450);
await page.screenshot({ path: "verify_transition_clean.png" });

console.log("Captured preloader and transition");
await browser.close();
