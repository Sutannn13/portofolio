import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://sutan.dev', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2000);
const links = await page.evaluate(() => [...document.querySelectorAll('#certificates a')].map(a => ({ href: a.getAttribute('href'), text: a.innerText.trim(), box: JSON.stringify(a.getBoundingClientRect()) })));
console.log(JSON.stringify(links, null, 1));
await browser.close();
