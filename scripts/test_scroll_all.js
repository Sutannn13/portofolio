const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const portfolio = page.locator('#portfolio');
  const box = await portfolio.boundingBox();

  // 1. Card 0 (HMTI): scroll tepat ke top section
  await page.evaluate((y) => window.scrollTo(0, y + 500), box.y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/snap_0.png' });

  // 2. Card 1 (Kode-Kiri): scroll tengah timeline
  await page.evaluate((y) => window.scrollTo(0, y + 1300), box.y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/snap_1.png' });

  // 3. Card 2 (MAU\'S Kitchen): scroll akhir timeline
  await page.evaluate((y) => window.scrollTo(0, y + 2100), box.y);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/snap_2.png' });

  console.log('Saved all 3 snaps');
  await browser.close();
}
run();