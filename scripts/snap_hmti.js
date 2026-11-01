const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const portfolioY = await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    return window.scrollY + el.getBoundingClientRect().top;
  });

  // Scroll tepat ke portfolio top + 200px (tempat di mana HMTI card aktif)
  await page.evaluate((y) => window.scrollTo(0, y + 200), portfolioY);
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'scripts/clean_hmti_transparent.png' });
  await browser.close();
})();
