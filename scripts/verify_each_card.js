const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const portfolio = page.locator('#portfolio');
  const box = await portfolio.boundingBox();

  // 1. Card 0 (HMTI)
  await page.evaluate(y => window.scrollTo(0, y + 300), box.y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'scripts/card0_hmti_verified.png' });
  console.log('Saved card0');

  // 2. Card 1 (Kode-Kiri)
  await page.evaluate(y => window.scrollTo(0, y + 1100), box.y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'scripts/card1_kodekiri_verified.png' });
  console.log('Saved card1');

  // 3. Card 2 (MAU\'S Kitchen)
  await page.evaluate(y => window.scrollTo(0, y + 1800), box.y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'scripts/card2_mau_verified.png' });
  console.log('Saved card2');

  await browser.close();
}
run();