import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await page.goto('https://sutan.dev', { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,div,span,p')].filter(e => e.children.length === 0 && e.textContent.trim() === 'Certificates & Awards');
  const h = heads[0];
  const sec = h ? h.closest('section') : null;
  const views = [...document.querySelectorAll('a,button,div,span')].filter(e => e.children.length === 0 && e.textContent.trim() === 'View All').map(e => ({ tag: e.tagName, cls: e.className, href: e.getAttribute('href') }));
  return { found: !!sec, views, html: sec ? sec.outerHTML.slice(0, 9000) : '' };
});
console.log('views', JSON.stringify(info.views, null, 1));
console.log('--- SECTION HTML ---');
console.log(info.html);
await browser.close();
