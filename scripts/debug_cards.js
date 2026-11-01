const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const cardInfo = await page.evaluate(() => {
    const portfolio = document.querySelector('#portfolio');
    const container = portfolio.querySelector('.relative.rounded-xl');
    const cards = Array.from(container.children);
    return cards.map((c, i) => ({
      index: i,
      zIndex: window.getComputedStyle(c).zIndex,
      transform: window.getComputedStyle(c).transform,
      filter: window.getComputedStyle(c).filter,
      imgSrc: c.querySelector('img') ? c.querySelector('img').getAttribute('src') : null,
      alt: c.querySelector('img') ? c.querySelector('img').getAttribute('alt') : null
    }));
  });
  console.log(JSON.stringify(cardInfo, null, 2));
  await browser.close();
})();
