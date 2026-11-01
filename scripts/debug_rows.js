const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const rows = page.locator('#awards .cursor-pointer');
  const c = await rows.count();
  console.log('Rows count in #awards:', c);
  for (let i = 0; i < c; i++) {
    console.log(i, await rows.nth(i).innerText());
  }
  await browser.close();
}
run();