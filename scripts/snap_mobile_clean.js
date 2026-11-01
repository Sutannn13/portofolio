const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const portfolioY = await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    return window.scrollY + el.getBoundingClientRect().top;
  });

  await page.evaluate((y) => window.scrollTo(0, y + 400), portfolioY);
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/mobile_clean_transparent.png' });
  await browser.close();
})();
