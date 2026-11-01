const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll into view
  await page.evaluate(() => {
    document.getElementById('portfolio').scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/mobile_into_view.png' });

  // Scroll sedikit ke dalam timeline
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/mobile_step_500.png' });

  await page.evaluate(() => {
    window.scrollBy(0, 800);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/mobile_step_1300.png' });

  await browser.close();
})();
