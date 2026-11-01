import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://sutan.dev', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2000);
const heading = page.locator('text=Certificates & Awards').first();
await heading.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const section = page.locator('section, div').filter({ hasText: 'Click the folder below' }).first();
const buttons = await page.locator('button:has-text("View All"), a:has-text("View All")').all();
console.log('viewAll count', buttons.length);
for (let i = 0; i < buttons.length; i++) {
  const t = await buttons[i].evaluate((el) => el.closest('section,div')?.innerText?.slice(0, 120) || '');
  console.log('btn', i, JSON.stringify(t));
}
await buttons[0]?.click().catch((e) => console.log('click fail', e.message));
await page.waitForTimeout(1500);
const modal = await page.evaluate(() => document.body.innerText.slice(-4000));
console.log('--- AFTER CLICK ---');
console.log(modal);
await page.screenshot({ path: 'reference/verify-cert-folders/sutan-folder.png', fullPage: false });
await browser.close();
