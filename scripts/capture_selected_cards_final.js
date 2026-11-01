const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // 1. Desktop Test
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const portfolio = document => document.getElementById('portfolio');
  const portfolioY = await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    return window.scrollY + el.getBoundingClientRect().top;
  });

  // GSAP scroll trigger: start: 10% top (artinya portfolioY + 0.1 * portfolioHeight)
  const portfolioHeight = await page.evaluate(() => document.getElementById('portfolio').offsetHeight);
  console.log('Portfolio Y:', portfolioY, 'Height:', portfolioHeight);

  // Total scrollable range of portfolio pin is portfolioHeight - window.innerHeight
  // Mari kita tentukan scroll positions untuk progress 0.0, 0.5, 1.0
  // start: 10% top -> scrollY = portfolioY + 0.1 * portfolioHeight
  // end: bottom bottom -> scrollY = portfolioY + portfolioHeight - 900
  const startScroll = portfolioY + 0.1 * portfolioHeight;
  const endScroll = portfolioY + portfolioHeight - 900;
  const dist = endScroll - startScroll;

  const snaps = [
    { label: 'card_0_hmti', scroll: startScroll + 10 },
    { label: 'card_1_kodekiri', scroll: startScroll + dist * 0.5 },
    { label: 'card_2_maukitchen', scroll: endScroll - 10 }
  ];

  for (const s of snaps) {
    await page.evaluate((y) => window.scrollTo(0, y), s.scroll);
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scripts/' + s.label + '_desktop.png' });
  }

  // 2. Mobile Test (390 x 844 iPhone 14)
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mPortfolioY = await mobilePage.evaluate(() => {
    const el = document.getElementById('portfolio');
    return window.scrollY + el.getBoundingClientRect().top;
  });
  const mHeight = await mobilePage.evaluate(() => document.getElementById('portfolio').offsetHeight);
  const mStart = mPortfolioY + 0.1 * mHeight;
  const mEnd = mPortfolioY + mHeight - 844;
  const mDist = mEnd - mStart;

  const mSnaps = [
    { label: 'card_0_hmti', scroll: mStart + 10 },
    { label: 'card_1_kodekiri', scroll: mStart + mDist * 0.5 },
    { label: 'card_2_maukitchen', scroll: mEnd - 10 }
  ];

  for (const s of mSnaps) {
    await mobilePage.evaluate((y) => window.scrollTo(0, y), s.scroll);
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: 'scripts/' + s.label + '_mobile.png' });
  }

  console.log('Finished capturing all desktop and mobile screenshots');
  await browser.close();
})();
