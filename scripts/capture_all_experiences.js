const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const awardsSection = page.locator('#awards');
  await awardsSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const rowItems = [
    { name: 'afk', sel: 'text=Full-Stack Engineer Intern' },
    { name: 'kemenag', sel: 'text=IT Support & Systems Intern' },
    { name: 'trashpoint', sel: 'text=Lead Developer & Project Manager' },
    { name: 'sali', sel: 'text=Researcher & Application Developer' }
  ];

  for (const item of rowItems) {
    const rowEl = page.locator('#awards >> ' + item.sel);
    await rowEl.hover();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'scripts/screenshot_exp_' + item.name + '.png' });
    console.log('Saved screenshot_exp_' + item.name + '.png');
  }

  await browser.close();
}
run();