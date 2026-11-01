/* Verify Get in Touch modal show/close: enter + exit transitions run, freeze-frame mid states,
   unmount after exit, focus, Escape/backdrop close, lenis scroll lock, reopen during close,
   mobile 390, reduced motion, 0 console errors.
   Screenshots go to a temp dir first (dev watcher reloads on new files inside the repo). */
import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const BASE = 'http://localhost:3000';
const TMP = path.join(os.tmpdir(), 'verify-modal');
const OUT = 'reference/verify-modal';
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { pass: true, checks: {}, shots: [], errors: [], timings: {} };
const rec = (name, ok, detail = null) => {
  report.checks[name] = { ok, detail };
  if (!ok) report.pass = false;
};

const browser = await chromium.launch();

const attach = (page) => {
  const state = { errors: [], navs: 0 };
  page.on('console', (m) => { if (m.type() === 'error') state.errors.push(m.text()); });
  page.on('pageerror', (e) => state.errors.push(e.message));
  page.on('framenavigated', () => { state.navs++; });
  return state;
};

const settlePreloader = async (page, nav) => {
  await page.waitForSelector('.preloader-root', { state: 'detached', timeout: 45000 }).catch(() => {});
  await page.waitForFunction(() => {
    const h = document.getElementById('header');
    return h && Number(getComputedStyle(h).opacity) > 0.9;
  }, null, { timeout: 25000 });
  // dev/HMR can fire one extra full reload shortly after first paint; wait for a quiet window
  for (let i = 0; i < 4; i++) {
    const n = nav.navs;
    await sleep(1400);
    if (nav.navs === n) break;
  }
};

const openFromHeader = async (page) => {
  await page.locator('#header .charge-btn').first().click();
  await page.waitForSelector('.gi-overlay', { state: 'attached', timeout: 6000 });
};

const headerReady = (page) =>
  page.waitForFunction(() => {
    const h = document.getElementById('header');
    if (!h) return false;
    const r = h.getBoundingClientRect();
    return r.top > -1 && r.bottom > 20;
  }, null, { timeout: 4000 }).catch(() => {});

const backToTop = async (page) => {
  for (let i = 0; i < 12; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (y < 5) break;
    await page.mouse.move(720, 450);
    await page.mouse.wheel(0, -Math.max(800, y));
    await sleep(320);
  }
  await sleep(700);
  await headerReady(page);
};

// Chromium does not tick a CSSTransition again after WAAPI pause()+play(); jump to the end instead.
const freezeAt = (page, ms) =>
  page.evaluate((t) => {
    let n = 0;
    for (const a of document.getAnimations()) {
      const el = a.effect && a.effect.target;
      if (!(el instanceof Element) || !el.closest('.gi-overlay')) continue;
      if (!a.transitionProperty) continue;
      const dur = Number(a.effect.getComputedTiming().duration) || 0;
      a.pause();
      a.currentTime = Math.min(t, dur);
      n++;
    }
    return n;
  }, ms);

const finishFrozen = (page) =>
  page.evaluate(() => {
    for (const a of document.getAnimations()) {
      const el = a.effect && a.effect.target;
      if (!(el instanceof Element) || !el.closest('.gi-overlay') || !a.transitionProperty) continue;
      try { a.finish(); } catch {}
    }
  });

const settled = (page, timeout = 4000) =>
  page.waitForFunction(() => {
    const ov = document.querySelector('.gi-overlay');
    if (!ov) return false;
    const p = ov.querySelector('.gi-panel');
    const ps = getComputedStyle(p);
    return getComputedStyle(ov).opacity === '1' && ps.opacity === '1' && ps.scale === '1';
  }, null, { timeout }).then(() => true).catch(() => false);

const overlayState = (page) =>
  page.evaluate(() => {
    const ov = document.querySelector('.gi-overlay');
    if (!ov) return { mounted: false };
    const panel = ov.querySelector('.gi-panel');
    const cs = getComputedStyle(ov);
    const ps = getComputedStyle(panel);
    const props = new Set(
      document
        .getAnimations()
        .filter((a) => a.transitionProperty && a.effect && a.effect.target instanceof Element && a.effect.target.closest('.gi-overlay'))
        .map((a) => `${String(a.effect.target.className).includes('gi-panel') ? 'panel' : 'overlay'}:${a.transitionProperty}`)
    );
    return {
      mounted: true,
      state: ov.dataset.state,
      overlayOpacity: Number(cs.opacity),
      panelOpacity: Number(ps.opacity),
      panelTranslate: ps.translate,
      panelScale: ps.scale,
      panelRadius: ps.borderTopLeftRadius,
      panelBg: ps.backgroundColor,
      transitions: [...props],
      focusInPanel: document.activeElement === panel,
      pointerEvents: cs.pointerEvents,
      lenisStopped: document.documentElement.classList.contains('lenis-stopped'),
    };
  });

const waitGone = (page, timeout = 1600) =>
  page.waitForSelector('.gi-overlay', { state: 'detached', timeout }).then(() => true).catch(() => false);

// ---------- normal desktop pass ----------
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const nav = attach(page);

await page.goto(BASE, { waitUntil: 'load', timeout: 120000 });
await settlePreloader(page, nav);
report.timings.scrollAtOpen = await page.evaluate(() => window.scrollY);

await openFromHeader(page);
const enterFrozen = await freezeAt(page, 150);
const enterMid = await overlayState(page);
report.timings.enterFrozenAnims = enterFrozen;
report.timings.enterMid = enterMid;
await page.screenshot({ path: `${TMP}/modal-enter.png` });
report.shots.push('modal-enter.png');
await finishFrozen(page);

rec('open/mounted', enterMid.mounted === true, null);
rec('open/enter-transition-runs', enterFrozen >= 4, `anims=${enterFrozen} ${JSON.stringify(enterMid.transitions)}`);
rec(
  'open/enter-mid-hidden',
  enterMid.overlayOpacity > 0.05 && enterMid.overlayOpacity < 0.95 &&
    enterMid.panelOpacity > 0.05 && enterMid.panelOpacity < 0.95 &&
    enterMid.panelTranslate !== 'none' && enterMid.panelTranslate !== '0px',
  `overlay=${enterMid.overlayOpacity} panel=${enterMid.panelOpacity} translate=${enterMid.panelTranslate} scale=${enterMid.panelScale}`
);
rec('open/focus-in-panel', enterMid.focusInPanel === true, null);

const openSettled = await settled(page);
const openState = await overlayState(page);
await page.screenshot({ path: `${TMP}/modal-open.png` });
report.shots.push('modal-open.png');
rec(
  'open/settled-visible',
  openSettled && openState.panelScale === '1',
  `settled=${openSettled} overlay=${openState.overlayOpacity} panel=${openState.panelOpacity} translate=${openState.panelTranslate} scale=${openState.panelScale}`
);
rec('open/panel-preserved', openState.panelRadius !== '0px' && openState.panelBg.includes('0.'), `radius=${openState.panelRadius} bg=${openState.panelBg}`);

// lenis must hold the page while the dialog is up
const lenisClass = openState.lenisStopped;
await page.mouse.move(720, 450);
await page.mouse.wheel(0, 700);
await sleep(900);
const lockedY = await page.evaluate(() => window.scrollY);
rec('open/scroll-locked', lockedY === 0, `scrollY=${lockedY} lenisStopped=${lenisClass}`);

// ---------- close via the X button ----------
await page.locator('.gi-overlay button[aria-label="Close"]').first().click();
await sleep(60);
const closeFrozen = await freezeAt(page, 120);
const exitMid = await overlayState(page);
report.timings.closeFrozenAnims = closeFrozen;
report.timings.exitMid = exitMid;
await page.screenshot({ path: `${TMP}/modal-exit.png` });
report.shots.push('modal-exit.png');
await finishFrozen(page);

rec('close/exit-state', exitMid.mounted === true && exitMid.state === 'closing', JSON.stringify({ mounted: exitMid.mounted, state: exitMid.state }));
rec('close/exit-transition-runs', closeFrozen >= 3, `anims=${closeFrozen} ${JSON.stringify(exitMid.transitions)}`);
rec(
  'close/exit-mid-visible',
  exitMid.overlayOpacity > 0 && exitMid.overlayOpacity < 1 &&
    exitMid.panelOpacity > 0 && exitMid.panelOpacity < 1 &&
    exitMid.pointerEvents === 'none',
  `overlay=${exitMid.overlayOpacity} panel=${exitMid.panelOpacity} pe=${exitMid.pointerEvents}`
);

const closeT0 = Date.now();
const closeGone = await waitGone(page);
report.timings.unmountAfterCloseMs = Date.now() - closeT0;
rec('close/unmounts-after-exit', closeGone, `waitMs=${report.timings.unmountAfterCloseMs}`);

// clean-cycle latency: the overlay must stay mounted long enough for the exit to finish
// (dev server frame starvation can stretch timers — only assert it is not instant and not hanging)
await sleep(500);
await openFromHeader(page);
await settled(page);
const cycleT0 = Date.now();
await page.locator('.gi-overlay button[aria-label="Close"]').first().click();
const cycleGone = await waitGone(page, 2600);
const cycleMs = Date.now() - cycleT0;
report.timings.unmountDelayCleanMs = cycleMs;
rec('close/unmount-delay', cycleGone && cycleMs >= 280 && cycleMs <= 2200, `ms=${cycleMs}`);

await sleep(500);
await page.mouse.move(720, 450);
await page.mouse.wheel(0, 700);
await sleep(900);
const unlockedY = await page.evaluate(() => window.scrollY);
rec('close/scroll-resumes', unlockedY > 0, `scrollY=${unlockedY}`);

// ---------- Escape closes ----------
await backToTop(page);
await openFromHeader(page);
await page.waitForSelector('.gi-overlay[data-state="open"]', { timeout: 5000 });
await page.keyboard.press('Escape');
await sleep(80);
const afterEsc = await overlayState(page);
const escGone = await waitGone(page);
rec('escape/closes', (afterEsc.state === 'closing' || afterEsc.mounted === false) && escGone, JSON.stringify({ state: afterEsc.state ?? 'gone' }));

// ---------- backdrop click closes ----------
await backToTop(page);
await openFromHeader(page);
await settled(page);
await page.mouse.click(40, 40);
await sleep(80);
const afterBackdrop = await overlayState(page);
const backdropGone = await waitGone(page);
rec('backdrop/closes', (afterBackdrop.state === 'closing' || afterBackdrop.mounted === false) && backdropGone, JSON.stringify({ state: afterBackdrop.state ?? 'gone' }));

// ---------- reopen while closing ----------
await backToTop(page);
await openFromHeader(page);
await settled(page);
await page.locator('.gi-overlay button[aria-label="Close"]').first().click();
await sleep(90);
await page.locator('#header .charge-btn').first().click();
const reopenedSettled = await settled(page, 3000);
const reopened = await overlayState(page);
await page.screenshot({ path: `${TMP}/modal-reopened.png` });
report.shots.push('modal-reopened.png');
rec(
  'reopen/during-close',
  reopened.mounted === true && reopened.state === 'open' && reopenedSettled && reopened.panelOpacity === 1,
  JSON.stringify({ mounted: reopened.mounted, state: reopened.state, panelOpacity: reopened.panelOpacity, settled: reopenedSettled })
);
await page.locator('.gi-overlay button[aria-label="Close"]').first().click();
await waitGone(page);

rec('normal/zero-errors', nav.errors.length === 0, nav.errors.slice(0, 3));

// ---------- mobile ----------
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mctx.newPage();
const mnav = attach(mpage);
await mpage.goto(BASE, { waitUntil: 'load', timeout: 120000 });
await settlePreloader(mpage, mnav);
await openFromHeader(mpage);
await settled(mpage);
const m = await mpage.evaluate(() => {
  const ov = document.querySelector('.gi-overlay');
  const panel = ov.querySelector('.gi-panel');
  const r = panel.getBoundingClientRect();
  return {
    overlayOpacity: Number(getComputedStyle(ov).opacity),
    panelOpacity: Number(getComputedStyle(panel).opacity),
    rect: { left: r.left, right: r.right, top: r.top, bottom: r.bottom },
    vw: window.innerWidth,
    vh: window.innerHeight,
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
  };
});
await mpage.screenshot({ path: `${TMP}/modal-mobile.png` });
report.shots.push('modal-mobile.png');
rec(
  'mobile/panel-in-viewport',
  m.overlayOpacity === 1 && m.panelOpacity === 1 &&
    m.rect.left >= -1 && m.rect.right <= m.vw + 1 && m.rect.top >= -1 && m.rect.bottom <= m.vh + 1 && m.overflowX <= 0,
  JSON.stringify(m)
);
await mpage.locator('.gi-overlay button[aria-label="Close"]').first().click();
rec('mobile/closes', await waitGone(mpage), null);
rec('mobile/zero-errors', mnav.errors.length === 0, mnav.errors.slice(0, 3));
await mctx.close();

// ---------- reduced motion ----------
const rctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const rpage = await rctx.newPage();
const rnav = attach(rpage);
await rpage.goto(BASE, { waitUntil: 'load', timeout: 120000 });
await settlePreloader(rpage, rnav);
await openFromHeader(rpage);
await sleep(450);
const reduced = await overlayState(rpage);
rec('reduced/instant-visible', reduced.overlayOpacity === 1 && reduced.panelOpacity === 1, `overlay=${reduced.overlayOpacity} panel=${reduced.panelOpacity}`);
await rpage.locator('.gi-overlay button[aria-label="Close"]').first().click();
const reducedGone = await waitGone(rpage, 900);
rec('reduced/closes', reducedGone, null);
rec('reduced/zero-errors', rnav.errors.length === 0, rnav.errors.slice(0, 3));
await rctx.close();

const errors = [...nav.errors, ...mnav.errors, ...rnav.errors];
rec('all/zero-errors', errors.length === 0, errors.slice(0, 2));

await browser.close();

// publish evidence after the browser is done (new files in the repo can trigger dev reloads)
fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(TMP)) fs.copyFileSync(path.join(TMP, f), path.join(OUT, f));

console.log(JSON.stringify({ pass: report.pass, checks: report.checks, timings: report.timings, shots: report.shots, errors }, null, 2));
process.exit(report.pass ? 0 : 1);
