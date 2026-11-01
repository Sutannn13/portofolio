import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://sutan.dev', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2500);
const hint = page.getByText('Click the folder below', { exact: false }).first();
await hint.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const secHtml = await page.evaluate(() => {
  const el = [...document.querySelectorAll('p,span,div')].find(e => e.textContent.includes('Click the folder below'));
  const sec = el ? el.closest('section') : null;
  return sec ? sec.outerHTML : 'no section';
});
fs.writeFileSync('scratch_cert_section.html', secHtml);
console.log('section len', secHtml.length);
console.log(secHtml.slice(0, 6000));
await page.screenshot({ path: 'reference/verify-cert-folders/sutan-cert-section.png' });
await browser.close();
