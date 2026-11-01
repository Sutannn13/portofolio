import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://sutan.dev', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2500);
for (let y = 0; y < 9000; y += 700) { await page.mouse.wheel(0, 700); await page.waitForTimeout(120); }
await page.waitForTimeout(1500);
const html = await page.content();
fs.writeFileSync('scratch_sutan_full.html', html);
console.log('saved', html.length, 'has hint', html.includes('Click the folder below'));
const body = await page.evaluate(() => document.body.innerText);
fs.writeFileSync('scratch_sutan_text2.txt', body);
await page.screenshot({ path: 'reference/verify-cert-folders/sutan-page.png', fullPage: false });
await browser.close();
