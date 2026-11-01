import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const OUT_DIR = path.resolve('reference/local-fase6');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'frames'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'interactions'), { recursive: true });

function comparePng(bufA, bufB) {
  const imgA = PNG.sync.read(bufA);
  const imgB = PNG.sync.read(bufB);
  const w = Math.min(imgA.width, imgB.width);
  const h = Math.min(imgA.height, imgB.height);
  const diffPng = new PNG({ width: w, height: h });
  const diffPixels = pixelmatch(imgA.data, imgB.data, diffPng.data, w, h, { threshold: 0.1 });
  const totalPixels = w * h;
  const diffRatio = diffPixels / totalPixels;
  return {
    w, h, diffPixels, totalPixels,
    diffPercent: (diffRatio * 100).toFixed(4) + '%',
    diffRatio,
    diffPngBuffer: PNG.sync.write(diffPng),
  };
}

async function verifyAll() {
  console.log('--- Starting Fase 6 Animation & Interaction Verification ---');
  const results = {
    timestamp: new Date().toISOString(),
    runtime: {},
    heroIntro: {},
    interactions: {},
    videoDiffs: [],
  };

  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1440 - Intro Timeline & Runtime
  console.log('Testing Desktop 1440 Runtime & Intro Timeline...');
  const ctx1440 = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: path.join(OUT_DIR, 'videos-1440'), size: { width: 1440, height: 900 } }
  });
  const page1440 = await ctx1440.newPage();

  await page1440.goto('http://localhost:3099/', { waitUntil: 'domcontentloaded' });
  
  // Capture t = 0.2s (during mask reveal, header hidden)
  await page1440.waitForTimeout(200);
  const t0_shot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'frames/1440-t0.2s.png'), t0_shot);

  const t0_runtime = await page1440.evaluate(() => {
    const header = document.getElementById('header');
    const heroH1 = document.querySelector('#hero h1');
    const heroMask = document.querySelector('.hero-mask-reveal');
    return {
      hasLenis: !!window.lenis,
      lenisVersion: window.lenisVersion,
      htmlHasLenisClass: document.documentElement.classList.contains('lenis'),
      headerOpacity: header ? getComputedStyle(header).opacity : null,
      heroMaskReveal: heroMask ? getComputedStyle(heroMask).getPropertyValue('--reveal').trim() : null,
    };
  });
  results.runtime = t0_runtime;

  // Capture t = 1.3s (after H1 triggered)
  await page1440.waitForTimeout(1100);
  const t1_shot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'frames/1440-t1.3s.png'), t1_shot);

  // Capture t = 2.1s (header slid in)
  await page1440.waitForTimeout(800);
  const t2_shot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'frames/1440-t2.1s.png'), t2_shot);

  const t2_runtime = await page1440.evaluate(() => {
    const header = document.getElementById('header');
    return {
      headerOpacity: header ? getComputedStyle(header).opacity : null,
    };
  });
  results.heroIntro = {
    t0_runtime,
    t2_runtime,
  };

  // Wait until intro completed
  await page1440.waitForTimeout(1600);
  const t3_shot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'frames/1440-t3.7s-intro-complete.png'), t3_shot);

  // 2. Interactive States Verification
  console.log('Testing Interactive States (Modal, FAQ, Services, Testimonials)...');
  
  // A. Get in Touch Modal
  const ctaBtn = page1440.locator('#header :is(a, button):has-text("Get in Touch")');
  await ctaBtn.click();
  await page1440.waitForTimeout(400);
  const modalShot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'interactions/modal-open.png'), modalShot);

  const modalState = await page1440.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    const title = document.getElementById('get-in-touch-modal-title');
    const inputs = Array.from(dialog?.querySelectorAll('input, textarea') || []).map(i => i.getAttribute('name'));
    return {
      isOpen: !!dialog,
      titleText: title?.textContent?.trim(),
      inputs,
    };
  });
  results.interactions.modal = modalState;

  // Close modal
  const closeBtn = page1440.locator('[role="dialog"] button[aria-label="Close"]');
  await closeBtn.click();
  await page1440.waitForTimeout(400);

  // B. FAQ Accordion Click
  await page1440.locator('#faq, section:has-text("Frequently Asked Questions")').scrollIntoViewIfNeeded();
  await page1440.waitForTimeout(800);

  // Click second item
  const faqButtons = page1440.locator('section:has-text("Frequently Asked Questions") button[aria-expanded]');
  await faqButtons.nth(1).click();
  await page1440.waitForTimeout(500);
  const faqItem2Shot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'interactions/faq-item-2-open.png'), faqItem2Shot);

  const faqState = await page1440.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button[aria-expanded]'));
    return btns.map(b => ({
      expanded: b.getAttribute('aria-expanded'),
      text: b.querySelector('span')?.textContent?.trim(),
    }));
  });
  results.interactions.faq = faqState;

  // C. Testimonials Prev/Next & Avatar Click
  await page1440.locator('#testimonials').scrollIntoViewIfNeeded();
  await page1440.waitForTimeout(800);
  const nextBtn = page1440.locator('#testimonials button[aria-label="Next testimonial"]');
  await nextBtn.click();
  await page1440.waitForTimeout(500);
  const testNextShot = await page1440.screenshot();
  fs.writeFileSync(path.join(OUT_DIR, 'interactions/testimonials-next.png'), testNextShot);

  const testState = await page1440.evaluate(() => {
    const name = document.querySelector('#testimonials .testimonial-fade p');
    const currentAvatar = document.querySelector('#testimonials button[aria-current="true"]');
    return {
      activeName: name?.textContent?.trim(),
      activeAvatarLabel: currentAvatar?.getAttribute('aria-label'),
    };
  });
  results.interactions.testimonials = testState;

  // Perform full scroll video capture
  console.log('Capturing slow scroll video for 1440...');
  const maxScroll = await page1440.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const steps = 30;
  for (let s = 0; s <= steps; s++) {
    const targetY = (s / steps) * maxScroll;
    await page1440.evaluate((y) => window.scrollTo(0, y), targetY);
    await page1440.waitForTimeout(100);
  }
  await page1440.waitForTimeout(1000);

  await page1440.close();
  await ctx1440.close();

  // 3. Mobile 390
  console.log('Testing Mobile 390...');
  const ctx390 = await browser.newContext({
    viewport: { width: 390, height: 844 },
    recordVideo: { dir: path.join(OUT_DIR, 'videos-390'), size: { width: 390, height: 844 } }
  });
  const page390 = await ctx390.newPage();
  await page390.goto('http://localhost:3099/', { waitUntil: 'domcontentloaded' });
  await page390.waitForTimeout(3600);

  const mMaxScroll = await page390.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  for (let s = 0; s <= steps; s++) {
    const targetY = (s / steps) * mMaxScroll;
    await page390.evaluate((y) => window.scrollTo(0, y), targetY);
    await page390.waitForTimeout(100);
  }
  await page390.waitForTimeout(1000);

  await page390.close();
  await ctx390.close();
  await browser.close();

  // 4. Compare Keyframe Scroll Positions against reference captures
  console.log('Comparing Scroll Positions vs Reference Captures...');
  const checkScrolls = [
    { name: 'scroll-00000', file: 'reference/scroll-1440/scroll-00000.png', y: 0 },
    { name: 'scroll-02000', file: 'reference/scroll-1440/scroll-02000.png', y: 2000 },
    { name: 'scroll-04000', file: 'reference/scroll-1440/scroll-04000.png', y: 4000 },
    { name: 'scroll-06000', file: 'reference/scroll-1440/scroll-06000.png', y: 6000 },
    { name: 'scroll-08000', file: 'reference/scroll-1440/scroll-08000.png', y: 8000 },
    { name: 'scroll-10000', file: 'reference/scroll-1440/scroll-10000.png', y: 10000 },
    { name: 'scroll-12000', file: 'reference/scroll-1440/scroll-12000.png', y: 12000 },
    { name: 'scroll-14000', file: 'reference/scroll-1440/scroll-14000.png', y: 14000 },
    { name: 'scroll-14707', file: 'reference/scroll-1440/scroll-14707.png', y: 14707 },
  ];

  const browser2 = await chromium.launch({ headless: true });
  const page2 = await browser2.newPage({ viewport: { width: 1440, height: 900 } });
  await page2.goto('http://localhost:3099/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(4200); // Wait for 4.2s hero mask reveal to complete

  for (const cs of checkScrolls) {
    if (!fs.existsSync(cs.file)) continue;
    await page2.evaluate((targetY) => {
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(targetY, { immediate: true, force: true });
      }
      window.scrollTo(0, targetY);
    }, cs.y);
    await page2.waitForTimeout(1500); // 1500ms settle as in Fase 1
    const localShot = await page2.screenshot();
    const refBuf = fs.readFileSync(cs.file);
    const comp = comparePng(localShot, refBuf);
    fs.writeFileSync(path.join(OUT_DIR, `frames/${cs.name}-diff.png`), comp.diffPngBuffer);
    results.videoDiffs.push({
      scrollPos: cs.y,
      referenceFile: cs.file,
      diffPixels: comp.diffPixels,
      totalPixels: comp.totalPixels,
      diffPercent: comp.diffPercent,
      diffRatio: comp.diffRatio,
    });
    console.log(`Scroll ${cs.y}px (${cs.name}): Diff = ${comp.diffPercent}`);
  }

  await browser2.close();

  fs.writeFileSync('docs/fase6-animation-verification.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Verification completed! Results written to docs/fase6-animation-verification.json');
}

verifyAll().catch(err => {
  console.error(err);
  process.exit(1);
});
