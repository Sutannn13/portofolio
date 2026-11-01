const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const portfolioY = await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    const rect = el.getBoundingClientRect();
    return window.scrollY + rect.top;
  });

  console.log('Portfolio absolute top:', portfolioY);

  const offsets = [0, 200, 600, 1100, 1600, 2000];

  for (let i = 0; i < offsets.length; i++) {
    const off = offsets[i];
    await page.evaluate((targetY) => window.scrollTo(0, targetY), portfolioY + off);
    await page.waitForTimeout(700);

    const info = await page.evaluate(() => {
      const portfolio = document.querySelector('#portfolio');
      const container = portfolio.querySelector('.relative.rounded-xl');
      const cards = Array.from(container.children);
      return cards.map((c, idx) => ({
        idx: idx,
        transform: window.getComputedStyle(c).transform,
        filter: window.getComputedStyle(c).filter,
        alt: c.querySelector('img') ? c.querySelector('img').getAttribute('alt') : null
      }));
    });

    console.log('Offset ' + off + ':', JSON.stringify(info));
    await page.screenshot({ path: 'scripts/step_' + i + '_off' + off + '.png' });
  }

  await browser.close();
})();
