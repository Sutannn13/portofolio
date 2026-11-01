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

  // Ambil beberapa titik scroll antara portfolioY + 300 s/d portfolioY + 700
  for (let off = 300; off <= 700; off += 100) {
    await page.evaluate((y) => window.scrollTo(0, y), portfolioY + off);
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'scripts/hmti_off_' + off + '.png' });
  }

  await browser.close();
})();
