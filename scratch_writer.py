import os

qa_script = """import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const OUT_DIR = path.resolve('reference/local-fase7');
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'intermediate'), { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, 'scroll-diffs'), { recursive: true });

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

async function runFase7() {
  console.log('=== FASE 7: RESPONSIVE, METADATA, & QA AUDIT ===');
  const qaResults = {
    timestamp: new Date().toISOString(),
    metadata: {},
    intermediateBreakpoints: {},
    scrollDiffSummary: {},
  };

  const browser = await chromium.launch({ headless: true });

  // 1. Metadata Verification (7b)
  console.log('--- 7b: Verifying Metadata & SEO Tags ---');
  const metaPage = await browser.newPage();
  await metaPage.goto('http://localhost:3099/', { waitUntil: 'domcontentloaded' });
  const extractedMeta = await metaPage.evaluate(() => {
    const getMeta = (selector, attr = 'content') => document.querySelector(selector)?.getAttribute(attr);
    return {
      title: document.title,
      description: getMeta('meta[name="description"]'),
      favicon: getMeta('link[rel*="icon"]', 'href'),
      ogTitle: getMeta('meta[property="og:title"]'),
      ogDescription: getMeta('meta[property="og:description"]'),
      ogImage: getMeta('meta[property="og:image"]'),
      ogImageWidth: getMeta('meta[property="og:image:width"]'),
      ogImageHeight: getMeta('meta[property="og:image:height"]'),
      twitterCard: getMeta('meta[name="twitter:card"]'),
      twitterTitle: getMeta('meta[name="twitter:title"]'),
      twitterDescription: getMeta('meta[name="twitter:description"]'),
      twitterImage: getMeta('meta[name="twitter:image"]'),
    };
  });
  qaResults.metadata = extractedMeta;
  console.log('Metadata extracted:', extractedMeta);
  await metaPage.close();

  // 2. Intermediate Breakpoints Verification (7a: 1280, 1100, 900, 600)
  console.log('--- 7a: Verifying Intermediate Breakpoints (1280, 1100, 900, 600) ---');
  const breakpoints = [1280, 1100, 900, 600];

  for (const bp of breakpoints) {
    console.log(`Checking breakpoint ${bp}px...`);
    const bpPage = await browser.newPage({ viewport: { width: bp, height: 900 } });
    await bpPage.goto('http://localhost:3099/', { waitUntil: 'networkidle' });
    await bpPage.waitForTimeout(4200);

    const bpMetrics = await bpPage.evaluate(() => {
      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      const bodyW = document.body.offsetWidth;
      const hasHorizontalOverflow = scrollW > window.innerWidth;
      const sections = Array.from(document.querySelectorAll('section, header, footer')).map(s => ({
        id: s.id || s.tagName.toLowerCase(),
        width: s.offsetWidth,
        height: s.offsetHeight,
      }));
      return {
        viewportWidth: window.innerWidth,
        docWidth: docW,
        scrollWidth: scrollW,
        bodyWidth: bodyW,
        hasHorizontalOverflow,
        sections,
      };
    });

    const shotPath = path.join(OUT_DIR, `intermediate/fullpage-${bp}.png`);
    await bpPage.screenshot({ path: shotPath, fullPage: true });

    qaResults.intermediateBreakpoints[bp] = {
      ...bpMetrics,
      screenshot: `reference/local-fase7/intermediate/fullpage-${bp}.png`,
    };

    console.log(`Breakpoint ${bp}px: hasHorizontalOverflow = ${bpMetrics.hasHorizontalOverflow}, totalSections = ${bpMetrics.sections.length}`);
    await bpPage.close();
  }

  // 3. Pixel Diff per 400px Scroll (7c)
  console.log('--- 7c: Comparing Scroll Positions at 1440 and 390 ---');
  const scrollReports = {
    1440: [],
    390: [],
  };

  // Viewport 1440
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://localhost:3099/', { waitUntil: 'networkidle' });
  await page1440.waitForTimeout(4200);

  const ref1440Files = fs.readdirSync('reference/scroll-1440').filter(f => f.endsWith('.png')).sort();
  for (const refFile of ref1440Files) {
    const match = refFile.match(/scroll-(\\d+)\\.png/);
    if (!match) continue;
    const y = parseInt(match[1], 10);
    const refPath = path.join('reference/scroll-1440', refFile);

    await page1440.evaluate((targetY) => {
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(targetY, { immediate: true, force: true });
      }
      window.scrollTo(0, targetY);
    }, y);
    await page1440.waitForTimeout(1200);

    const localShot = await page1440.screenshot();
    const refBuf = fs.readFileSync(refPath);
    const comp = comparePng(localShot, refBuf);

    scrollReports[1440].push({
      y,
      file: refFile,
      diffPixels: comp.diffPixels,
      totalPixels: comp.totalPixels,
      diffPercent: comp.diffPercent,
      diffRatio: comp.diffRatio,
    });
  }
  await page1440.close();

  // Viewport 390
  const page390 = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page390.goto('http://localhost:3099/', { waitUntil: 'networkidle' });
  await page390.waitForTimeout(4200);

  const ref390Files = fs.readdirSync('reference/scroll-390').filter(f => f.endsWith('.png')).sort();
  for (const refFile of ref390Files) {
    const match = refFile.match(/scroll-(\\d+)\\.png/);
    if (!match) continue;
    const y = parseInt(match[1], 10);
    const refPath = path.join('reference/scroll-390', refFile);

    await page390.evaluate((targetY) => {
      if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(targetY, { immediate: true, force: true });
      }
      window.scrollTo(0, targetY);
    }, y);
    await page390.waitForTimeout(1200);

    const localShot = await page390.screenshot();
    const refBuf = fs.readFileSync(refPath);
    const comp = comparePng(localShot, refBuf);

    scrollReports[390].push({
      y,
      file: refFile,
      diffPixels: comp.diffPixels,
      totalPixels: comp.totalPixels,
      diffPercent: comp.diffPercent,
      diffRatio: comp.diffRatio,
    });
  }
  await page390.close();

  qaResults.scrollDiffSummary = scrollReports;
  await browser.close();

  fs.writeFileSync('docs/fase7-qa-results.json', JSON.stringify(qaResults, null, 2), 'utf8');
  console.log('Fase 7 results saved to docs/fase7-qa-results.json');
}

runFase7().catch(err => {
  console.error(err);
  process.exit(1);
});
"""

with open('scratch_fase7_qa.mjs', 'w', encoding='utf-8') as f:
    f.write(qa_script)
print("scratch_fase7_qa.mjs written successfully")

