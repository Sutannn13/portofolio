const { chromium } = require('playwright');
async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const alts = [
    { name: 'hmti', alt: 'HMTI UBSI Margonda' },
    { name: 'kodekiri', alt: 'KodeKiri Studio' },
    { name: 'mau', alt: "MAU\'S Kitchen" }
  ];

  for (const i of alts) {
    const img = page.locator('#portfolio img[alt="' + i.alt + '"]');
    const count = await img.count();
    console.log(i.name, 'count:', count);
    if (count > 0) {
      const parent = img.locator('..');
      await parent.screenshot({ path: 'scripts/alt_card_' + i.name + '.png' });
      console.log('Saved alt_card_' + i.name + '.png');
    }
  }
  await browser.close();
}
run();