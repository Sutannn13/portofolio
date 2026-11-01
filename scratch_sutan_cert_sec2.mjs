import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://sutan.dev', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2500);
const hint = page.getByText('Click the folder below', { exact: false }).first();
await hint.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const html = await page.evaluate(() => {
  const el = [...document.querySelectorAll('p,span,div')].find(e => e.textContent.includes('Click the folder below'));
  let node = el;
  for (let i = 0; i < 6 && node; i++) node = node.parentElement;
  return node ? node.outerHTML : 'none';
});
fs.writeFileSync('scratch_cert_section.html', html);
console.log('len', html.length);
console.log(html.slice(0, 12000));
