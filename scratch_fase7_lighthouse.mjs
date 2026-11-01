import { chromium } from 'playwright';
import fs from 'node:fs';

async function auditLighthouse() {
  console.log('=== FASE 7d: AUDIT PERFORMANCE & ACCESSIBILITY (TARGET vs LOCAL) ===');
  const browser = await chromium.launch({ headless: true });

  async function auditUrl(url, name) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Performance.enable');

    const startNav = Date.now();
    await page.goto(url, { waitUntil: 'networkidle' });
    const navDuration = Date.now() - startNav;

    const metrics = await page.evaluate(() => {
      const navEntry = performance.getEntriesByType('navigation')[0] || {};
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(p => p.name === 'first-contentful-paint')?.startTime || null;

      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithAlt = images.filter(img => img.hasAttribute('alt') && img.getAttribute('alt').trim().length > 0);
      
      const buttons = Array.from(document.querySelectorAll('button'));
      const buttonsWithAccessibleName = buttons.filter(b => {
        return (b.textContent && b.textContent.trim().length > 0) || b.hasAttribute('aria-label') || b.hasAttribute('aria-labelledby');
      });

      const links = Array.from(document.querySelectorAll('a'));
      const linksWithAccessibleName = links.filter(a => {
        return (a.textContent && a.textContent.trim().length > 0) || a.hasAttribute('aria-label') || a.hasAttribute('aria-labelledby');
      });

      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent.trim().slice(0, 50),
      }));

      const landmarks = {
        header: document.querySelectorAll('header').length,
        footer: document.querySelectorAll('footer').length,
        mainOrSections: document.querySelectorAll('main, section').length,
      };

      const domNodeCount = document.querySelectorAll('*').length;

      return {
        timing: {
          ttfb: navEntry.responseStart ? Math.round(navEntry.responseStart - navEntry.requestStart) : null,
          domInteractive: navEntry.domInteractive ? Math.round(navEntry.domInteractive) : null,
          domComplete: navEntry.domComplete ? Math.round(navEntry.domComplete) : null,
          fcp: fcp ? Math.round(fcp) : null,
        },
        accessibility: {
          totalImages: images.length,
          imagesWithAlt: imagesWithAlt.length,
          totalButtons: buttons.length,
          buttonsWithAccessibleName: buttonsWithAccessibleName.length,
          totalLinks: links.length,
          linksWithAccessibleName: linksWithAccessibleName.length,
          headingsCount: headings.length,
          headings,
          landmarks,
        },
        domNodeCount,
        hasHtmlLang: !!document.documentElement.getAttribute('lang'),
        htmlLang: document.documentElement.getAttribute('lang'),
        hasViewportMeta: !!document.querySelector('meta[name="viewport"]'),
      };
    });

    const perfMetrics = await cdp.send('Performance.getMetrics');
    const getMetricVal = (key) => perfMetrics.metrics.find(m => m.name === key)?.value;

    const result = {
      name,
      url,
      navDurationMs: navDuration,
      ...metrics,
      cdpMetrics: {
        JSHeapUsedSize: Math.round((getMetricVal('JSHeapUsedSize') || 0) / 1024 / 1024) + ' MB',
        LayoutDuration: Math.round((getMetricVal('LayoutDuration') || 0) * 1000) + ' ms',
        RecalcStyleDuration: Math.round((getMetricVal('RecalcStyleDuration') || 0) * 1000) + ' ms',
        ScriptDuration: Math.round((getMetricVal('ScriptDuration') || 0) * 1000) + ' ms',
        TaskDuration: Math.round((getMetricVal('TaskDuration') || 0) * 1000) + ' ms',
      }
    };

    await page.close();
    return result;
  }

  console.log('Auditing Local (http://localhost:3099/)...');
  const localAudit = await auditUrl('http://localhost:3099/', 'Local Next.js Replica');

  console.log('Auditing Target (https://elena-voss-portfolio-template-v3.21st.app/)...');
  const targetAudit = await auditUrl('https://elena-voss-portfolio-template-v3.21st.app/', 'Target Production Site');

  const report = {
    timestamp: new Date().toISOString(),
    local: localAudit,
    target: targetAudit,
  };

  fs.writeFileSync('docs/lighthouse-audit-raw.json', JSON.stringify(report, null, 2), 'utf8');
  console.log('Audit completed and saved to docs/lighthouse-audit-raw.json');
  await browser.close();
}

auditLighthouse().catch(err => {
  console.error(err);
  process.exit(1);
});
