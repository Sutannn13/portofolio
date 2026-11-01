const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const cards = page.locator('#portfolio [class*="bg-[[#F4EFE9)"]');
  const count = await cards.count();
  console.log('Cards matching:', count);
  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const alt = await card.locator('img').this ? null : card.locator('img').getAttribute('alt');
    const src = await card.locator('img').getAttribute('src');
    console.log(i, alt, src);
    await card.screenshot({ path: 'scripts/real_work_card_' + i + '.png' });
    console.log('Saved real_work_card_' + i + '.png');
  }
  await browser.close();
}
run();