/* Get in Touch (charge variant): frosted rest -> white liquid sweep on hover, slowed ~20%, de-glossed. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = 'reference/verify-button-hover';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));

await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 90000 });
await page.waitForSelector('.preloader-root', { state: 'detached', timeout: 30000 }).catch(() => {});
await page.waitForFunction(() => {
  const h = document.getElementById('header');
  return h && Number(getComputedStyle(h).opacity) > 0.9;
}, null, { timeout: 20000 });
await sleep(6000); // let hero intro settle

const btn = page.locator('#header .charge-btn').first();
const box = await btn.boundingBox();
const clip = { x: box.x - 40, y: box.y - 40, width: box.width + 80, height: box.height + 80 };

const styles = () =>
  btn.evaluate((el) => {
    const s = getComputedStyle(el);
    const fill = el.querySelector('.charge-btn__fill');
    const glint = el.querySelector('.charge-btn__glint');
    return {
      background: s.backgroundColor,
      borderColor: s.borderTopColor,
      boxShadow: s.boxShadow,
      fillTransform: getComputedStyle(fill).transform,
      fillTransition: getComputedStyle(fill).transition,
      glintTransition: getComputedStyle(glint).transition,
    };
  });

const rest = await styles();
await page.screenshot({ path: `${OUT}/button-rest.png`, clip });

// hover + in-page trace of every transition on the button and its descendants
const handle = await btn.elementHandle();
const tracePromise = page.evaluate(
  (el) =>
    new Promise((resolve) => {
      const out = [];
      const t0 = performance.now();
      const tick = () => {
        const list = document
          .getAnimations()
          .filter((a) => a.transitionProperty && (a.effect.target === el || el.contains(a.effect.target)))
          .map((a) => ({
            prop: a.transitionProperty,
            target: String(a.effect.target.className || '').split(' ')[0],
            t: Math.round(Number(a.currentTime) || 0),
            dur: a.effect.getComputedTiming().duration,
            easing: a.effect.getComputedTiming().easing,
          }));
        out.push(list);
        if (performance.now() - t0 < 1100) requestAnimationFrame(tick);
        else resolve(out);
      };
      requestAnimationFrame(tick);
    }),
  handle
);
await btn.hover();
const trace = await tracePromise;
await sleep(1400);
const hovered = await styles();
await page.screenshot({ path: `${OUT}/button-hover.png`, clip });

const seen = (picker) => trace.flat().filter(picker);
const fillAnim = seen((a) => a.target === 'charge-btn__fill' && a.prop === 'transform');
const glintAnim = seen((a) => a.target === 'charge-btn__glint' && a.prop === 'transform');
const borderAnim = seen((a) => a.prop.startsWith('border'));
const shadowAnim = seen((a) => a.prop === 'box-shadow');

const fillProgressed = fillAnim.some((a) => a.t > 0 && a.t < a.dur); // end state already asserted via computed transform
const matrixX = (t) => (t && t !== 'none' ? Number(t.split('(')[1].split(',')[0]) : 1);

const checks = {
  'rest-frosted': rest.background.includes('0.11') && rest.borderColor.includes('0.3'),
  'rest-highlight-subtle': rest.boxShadow.includes('0.16'),
  'hover-bright': hovered.background.includes('0.98') && hovered.borderColor.includes('255, 255, 255'),
  'hover-glow-reduced': hovered.boxShadow.includes('15px') && hovered.boxShadow.includes('0.26'),
  'fill-sweeps': matrixX(hovered.fillTransform) > 0.99,
  'fill-slowed': rest.fillTransition.includes('0.95s') && fillAnim.some((a) => a.dur === 950 && a.easing === 'cubic-bezier(0.37, 0, 0.2, 1)'),
  'fill-progresses': fillProgressed,
  'glint-slowed': rest.glintTransition.includes('1.12s') && glintAnim.some((a) => a.dur === 1120),
  'border-shadow-run': borderAnim.some((a) => a.dur === 450) && shadowAnim.some((a) => a.dur === 550),
  'zero-errors': errors.length === 0,
};
const pass = Object.values(checks).every(Boolean);

await browser.close();
console.log(
  JSON.stringify(
    {
      pass,
      checks,
      traceCounts: { fill: fillAnim.length, glint: glintAnim.length, border: borderAnim.length, shadow: shadowAnim.length },
      traceDurations: {
        fill: [...new Set(fillAnim.map((a) => a.dur))],
        glint: [...new Set(glintAnim.map((a) => a.dur))],
        border: [...new Set(borderAnim.map((a) => `${a.prop}:${a.dur}`))],
        shadow: [...new Set(shadowAnim.map((a) => `${a.prop}:${a.dur}`))],
      },
      fillTimes: fillAnim.map((a) => a.t),
      rest,
      hovered,
      errors,
    },
    null,
    2
  )
);
process.exit(pass ? 0 : 1);
