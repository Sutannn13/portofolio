const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const awards = page.locator('#awards');
  await awards.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2200);
  await page.screenshot({ path: 'scripts/screenshot_mobile_final.png' });
  console.log('Saved mobile screenshot after animation');
  await browser.olose();
}
run();