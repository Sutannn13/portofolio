const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const awardsSection = page.locator('#awards');
  await awardsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const rows = awardsSection.locator('.cursor-pointer');
  const count = await rows.count();
  console.log('Found rows:', count);
  if (count >= 2) {
    await rows.nth(1).hover();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scripts/screenshot_kemenag_hover.png' });
    console.log('Saved scripts/screenshot_kemenag_hover.png');
  }
  if (count >= 1) {
    await rows.nth(0).hover();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scripts/screenshot_connextion_hover.png' });
    console.log('Saved scripts/screenshot_connextion_hover.png');
  }
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);
  const mobileAwards = mobilePage.locator('#awards');
  await mobileAwards.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: 'scripts/screenshot_mobile_experience.png' });
  console.log('Saved scripts/screenshot_mobile_experience.png');
  await browser.close();
}
run().catch(err => {
  console.error(err);
  process.exit(1);
});