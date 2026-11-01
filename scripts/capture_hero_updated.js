const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();

  // Desktop (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500); // Tunggu preloader & animasi intro selesai

  await page.screenshot({ path: 'scripts/hero_updated_desktop.png' });

  // Mobile (390x844)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3500);

  await mobilePage.screenshot({ path: 'scripts/hero_updated_mobile.png' });

  console.log('Finished capturing hero updated');
  await browser.close();
})();
