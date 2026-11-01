/* Credential folders: 2 folder cards below #awards, fan-out on hover, click opens detail panels. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = 'reference/verify-credential-folders';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const errors = [];
const report = { checks: {}, errors };

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));

await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 120000 });
await page.waitForSelector('.preloader-root', { state: 'detached', timeout: 45000 }).catch(() => {});
await sleep(1500);

const section = page.locator('#credentials');
await section.scrollIntoViewIfNeeded();
await sleep(1200);

// DOM order: credentials must follow awards
report.checks['below-awards'] = await page.evaluate(() => {
  const a = document.querySelector('#awards');
  const c = document.querySelector('#credentials');
  return !!a && !!c && (a.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
});

const folders = page.locator('#credentials .folder-card');
report.checks['two-folders'] = (await folders.count()) === 2;

const fans = page.locator('#credentials .folder-fan-icon');
report.checks['fan-icons'] = (await fans.count()) === 11; // 3 cert + 8 tech

const certFolder = folders.nth(0);
const certBox = await certFolder.boundingBox();
await page.evaluate((y) => window.scrollBy(0, y - 260), certBox.y);
await sleep(700);
const box = await certFolder.boundingBox();
await page.screenshot({ path: `${OUT}/folders-closed.png`, clip: { x: box.x - 60, y: box.y - 140, width: box.width + 120, height: box.height + 220 } });

await certFolder.hover();
await sleep(900);
const fanState = await fans.first().evaluate((el) => {
  const s = getComputedStyle(el);
  return { opacity: Number(s.opacity), translate: s.translate, scale: s.scale };
});
report.checks['fan-fans-out'] = fanState.opacity > 0.9 && fanState.translate !== 'none' && fanState.translate.includes('px');
await page.screenshot({ path: `${OUT}/folder-hover.png`, clip: { x: box.x - 120, y: box.y - 190, width: box.width + 240, height: box.height + 270 } });

// open certificates
await certFolder.click();
await page.waitForSelector('#folder-panel-certs', { timeout: 5000 });
await sleep(700);
const certPanel = page.locator('#folder-panel-certs');
report.checks['cert-panel-open'] = await certPanel.isVisible();
report.checks['cert-panel-items'] = (await certPanel.locator('figure').count()) === 6;
report.checks['cert-images-load'] = await certPanel.locator('figure img').evaluateAll((imgs) =>
  imgs.length === 6 && imgs.every((i) => i.complete && i.naturalWidth > 0)
);
report.checks['aria-expanded'] = (await certFolder.getAttribute('aria-expanded')) === 'true';
await certPanel.scrollIntoViewIfNeeded();
await sleep(400);
await page.screenshot({ path: `${OUT}/panel-certs.png` });

// switch to tech stack
await page.keyboard.press('Escape');
await sleep(400);
report.checks['escape-closes'] = (await page.locator('#folder-panel-certs').count()) === 0;

const techFolder = folders.nth(1);
await techFolder.click();
await page.waitForSelector('#folder-panel-stack', { timeout: 5000 });
await sleep(700);
const stackPanel = page.locator('#folder-panel-stack');
report.checks['stack-panel-open'] = await stackPanel.isVisible();
const chips = await stackPanel.locator('li').count();
report.checks['stack-items'] = chips === 23;
const groups = (await stackPanel.locator('h3').allInnerTexts()).map((g) => g.trim().toLowerCase());
report.checks['stack-groups'] = JSON.stringify(groups) === JSON.stringify(['full-stack', 'data & infra', 'ai & agent tooling']);
report.checks['ai-tools-present'] = (await stackPanel.innerText()).includes('DeepSeek Harness') && (await stackPanel.innerText()).includes('9Router') && (await stackPanel.innerText()).includes('Antigravity') && (await stackPanel.innerText()).includes('opencode') && (await stackPanel.innerText()).includes('ZCode');
await stackPanel.scrollIntoViewIfNeeded();
await sleep(400);
await page.screenshot({ path: `${OUT}/panel-stack.png` });

report.checks['zero-errors'] = errors.length === 0;

// mobile pass
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mpage = await mctx.newPage();
const mErrors = [];
mpage.on('pageerror', (e) => mErrors.push(e.message));
await mpage.goto('http://localhost:3000', { waitUntil: 'load', timeout: 120000 });
await mpage.waitForSelector('.preloader-root', { state: 'detached', timeout: 45000 }).catch(() => {});
await mpage.waitForSelector('#credentials', { timeout: 30000 });
await mpage.evaluate(() => document.querySelector('#credentials').scrollIntoView());
await sleep(1000);
const mobile = await mpage.evaluate(() => ({
  overflow: document.documentElement.scrollWidth - window.innerWidth,
  folders: document.querySelectorAll('#credentials .folder-card').length,
}));
report.checks['mobile-no-overflow'] = mobile.overflow <= 1;
report.checks['mobile-folders'] = mobile.folders === 2;
await mpage.screenshot({ path: `${OUT}/folders-mobile.png` });
await mctx.close();

await browser.close();
const pass = Object.values(report.checks).every(Boolean) && mErrors.length === 0;
console.log(JSON.stringify({ pass, ...report, mobile, mErrors }, null, 2));
process.exit(pass ? 0 : 1);
