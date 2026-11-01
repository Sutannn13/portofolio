const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const portfolio = page.locator('#portfolio');
  const box = await portfolio.boundingBox();
  console.log('Portfolio box:', box);

  // Card 1: KETIKA Section baru sajai sticky dan awal timeline
  await page.evaluate((y) => window.scrollTo(0, y + 300), box.y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/screenshot_card_1_hmti.png' });
  console.log('Saved card 1');

  // Card 2: KodeKiri
  await page.evaluate((y) => window.scrollTo(0, y + 900), box.y);
  await page.waitForTimeout(1000);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/screenshot_card_2_kodekiri.png' });
  console.log('Saved card 2');

  // Card 3: MAU\'S Kitchen
  await page.evaluate((y) => window.scrollTo(0, y + 1600), box.y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/screenshot_card_3_mau.png' });
  console.log('Saved card 3');

  await browser.close();
}
run();