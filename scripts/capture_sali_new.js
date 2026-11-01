const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const awardsSection = page.locator('#awards');
  await awardsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const saliRow = page.locator('#awards >> text=Researcher & Application Developer');
  await saliRow.hover();
  await page.waitForTimeout(900);
  await page.screenshot({ path: 'scripts/screenshot_sali_final_card.png' });
  console.log('Saved screenshot_sali_final_card.png');
  await browser.close();
}
run();