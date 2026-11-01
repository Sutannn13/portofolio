const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const section = page.locator('#portfolio');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/screenshot_work_1.png' });
  console.log('Saved screenshot_work_1.png');

  // Scroll lettle down to animate to second card
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/screenshot_work_2.png' });
  console.log('Saved screenshot_work_2.png');

  // Scroll further to third card
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/screenshot_work_3.png' });
  console.log('Saved screenshot_work_3.png');

  await browser.close();
}
run();