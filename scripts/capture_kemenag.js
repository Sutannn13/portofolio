const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const awardsSection = page.locator('#awards');
  await awardsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const kemenagRow = page.locator('#awards >> text=IT Support & Systems Intern');
  await kemenagRow.hover();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/screenshot_kemenag_final.png' });
  console.log('Saved scripts/screenshot_kemenag_final.png');
  await browser.close();
}
run();