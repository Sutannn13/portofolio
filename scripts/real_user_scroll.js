const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // Scroll perlahan dengan mouse wheel ke #portfolio
  await page.locator('#portfolio').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/real_scroll_card0.png' });
  console.log('Saved real_scroll_card0.png');

  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/real_scroll_card1.png' });
  console.log('Saved real_scroll_card1.png');

  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/real_scroll_card2.png' });
  console.log('Saved real_scroll_card2.png');

  await browser.close();
}
run();