/* Verify premium kinetic preloader: event count, animation-anchored exit, deterministic load/wipe frames,
   keyboard + native scroll locks, hero typing handoff, mobile viewport, reduced motion. */
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:3000';
const OUT = 'reference/verify-preloader-premium';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { pass: true, checks: {}, shots: [], errors: [], timings: {} };
const rec = (name, ok, detail) => {
  report.checks[name] = { ok, detail };
  if (!ok) report.pass = false;
};
const maxIn = (rows, lo, hi) => rows.filter(([t]) => t >= lo && t <= hi).reduce((m, [, v]) => Math.max(m, v), 0);

const browser = await chromium.launch();

function tracker() {
  window.__t = { exit: null, gone: null, exitCount: 0, animStart: null, hasSeen: false, ink: [] };
  window.addEventListener('preloader:complete', () => {
    window.__t.exit = performance.now();
    window.__t.exitCount += 1;
    const canvas = document.querySelector('#hero canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!canvas || !ctx) return;
    let last = -Infinity;
    const sample = () => {
      const rel = performance.now() - window.__t.exit;
      if (rel - last >= 100) {
        last = rel;
        try {
          const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          let sum = 0;
          for (let i = 3; i < d.length; i += 64) sum += d[i];
          window.__t.ink.push([Math.round(rel), sum]);
        } catch {
          return;
        }
      }
      if (rel < 3500) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  const check = () => {
    if (window.__t.gone != null || !document.body) return;
    if (document.body.textContent.includes('SUTANNN13')) window.__t.hasSeen = true;
    else if (window.__t.hasSeen) window.__t.gone = performance.now();
  };
  new MutationObserver(check).observe(document, { childList: true, subtree: true });
  requestAnimationFrame(function poll() {
    if (window.__t.animStart == null) {
      const starts = document
        .getAnimations()
        .filter((a) => a.animationName === 'loader-rise')
        .map((a) => a.startTime)
        .filter((t) => typeof t === 'number');
      if (starts.length) window.__t.animStart = Math.min(...starts);
    }
    check();
    requestAnimationFrame(poll);
  });
}

async function runNormal() {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.addInitScript(tracker);

  await page.goto(BASE, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('text=SUTANNN13', { timeout: 60000 });
  await sleep(7000); // warm-up: dev compile + one full cycle
  // dev-compile latency can delay first paint by seconds (skews exit vs animation anchor); retry until warm
  let animStart = null;
  for (let attempt = 0; attempt < 4; attempt++) {
    await page.reload({ waitUntil: 'load', timeout: 60000 });
    await page.waitForFunction(() => window.__t && window.__t.animStart != null, null, { timeout: 60000 });
    animStart = await page.evaluate(() => window.__t.animStart);
    if (animStart <= 2500) break;
    await sleep(3000);
  }
  report.timings['normal/animStart'] = Math.round(animStart);

  const atPageTime = (target) => page.waitForFunction((t) => performance.now() >= t, target, { timeout: 30000 });

  // scroll lock class must be applied while the loader is still mounted
  const lockedWhileLoading = await page
    .waitForFunction(
      () => document.documentElement.classList.contains('lenis-stopped') && document.querySelector('.preloader-root') != null,
      null,
      { timeout: 20000 }
    )
    .then(() => true)
    .catch(() => false);
  rec('normal/lenis-stopped-during-load', lockedWhileLoading, null);

  await page.waitForFunction(() => window.__t && window.__t.exit != null, null, { timeout: 20000 });
  const exit = await page.evaluate(() => window.__t.exit);
  report.timings['normal/exit'] = Math.round(exit);

  // odometer must be parked on 100 once the exit clock fires
  const counterShown = await page.evaluate(() => document.querySelector('.preloader-root .tabular-nums')?.textContent?.trim() ?? null);
  rec('normal/counter-on-hundred', counterShown === '100', `counter=${counterShown}`);

  await page.waitForFunction(() => window.__t && window.__t.gone != null, null, { timeout: 20000 });
  const gone = await page.evaluate(() => window.__t.gone);
  report.timings['normal/gone'] = Math.round(gone);
  await page.screenshot({ path: `${OUT}/hero-mid.png` });

  await atPageTime(exit + 3600);
  await page.screenshot({ path: `${OUT}/hero-revealed.png` });

  // hero canvas must keep animating while/after the wipe runs (typing, markers, sweeps)
  const ink = await page.evaluate(() => window.__t.ink);
  const start = ink.length ? ink[0][1] : 0;
  const mid = maxIn(ink, 250, 900);
  const final = maxIn(ink, 2200, 4000);
  const inkHi = Math.max(...ink.map(([, v]) => v), 0);
  const inkLo = Math.min(...ink.map(([, v]) => v), Infinity);
  report.timings['normal/inkStart'] = start;
  report.timings['normal/inkMid'] = mid;
  report.timings['normal/inkFinal'] = final;
  rec(
    'normal/hero-animates-under-wipe',
    ink.length > 0 && inkHi > 0 && (inkHi - inkLo) / inkHi > 0.15,
    ink.length === 0 ? 'no readable hero canvas' : `start=${start} mid=${mid} final=${final} lo=${inkLo} hi=${inkHi}`
  );

  // wheel scrolls again after unlock
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 1500);
  const wheelOk = await page
    .waitForFunction(() => window.scrollY > 100, null, { timeout: 6000 })
    .then(() => true)
    .catch(() => false);
  rec('normal/wheel-scrolls-after', wheelOk, `scrollY=${Math.round(await page.evaluate(() => window.scrollY))}`);

  rec('normal/header-visible', await page.locator('#header').first().isVisible(), null);
  rec('normal/hero-visible', await page.locator('#hero').first().isVisible(), null);
  const delta = exit - animStart;
  rec('normal/exit-synced-to-animation', delta >= 2250 && delta <= 3300, `exit-animStart=${Math.round(delta)}ms`);
  rec('normal/unmount-delta', gone - exit >= 900 && gone - exit <= 2200, `gone-exit=${Math.round(gone - exit)}ms`);
  rec('normal/exit-before-hero-fallback', exit < 6500, `exit=${Math.round(exit)}ms`);
  const t = await page.evaluate(() => window.__t);
  rec('normal/complete-once', t.exitCount === 1, `exitCount=${t.exitCount}`);
  rec('normal/overlay-removed', await page.evaluate(() => document.querySelector('.preloader-root') === null), `gone=${Math.round(gone)}ms`);
  rec('normal/scroll-unlocked', await page.evaluate(() => !document.documentElement.classList.contains('lenis-stopped')), null);
  rec('normal/zero-errors', errors.length === 0, errors.slice(0, 5));
  report.errors.push(...errors.map((e) => `[normal] ${e}`));
  await ctx.close();
}

async function runWipeFrames() {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));

  await page.clock.install();
  const pageNow = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(pageNow + 300); // freeze before the app starts: no loader timer can fire
  await page.goto(BASE, { waitUntil: 'commit', timeout: 60000 });

  // hydrate under the frozen clock; tiny fake-time nudges in case startup work is timer-gated
  let ready = false;
  for (let i = 0; i < 80 && !ready; i++) {
    ready = await page.evaluate(
      () =>
        document.querySelectorAll('.loader-letter').length > 0 &&
        document.documentElement.classList.contains('lenis-stopped') &&
        document.getAnimations().some((a) => typeof a.animationName === 'string' && a.animationName.startsWith('loader-'))
    );
    if (!ready) {
      await page.clock.runFor(30);
      await sleep(100);
    }
  }
  if (!ready) throw new Error('wipe: loader never hydrated under frozen clock');

  // Freeze exit transitions at birth: the observer forces a synchronous style recalc (which creates
  // the CSSTransition) the moment the sheet classes change, then pauses every transition immediately.
  // Without this, real time keeps advancing transitions between fake-clock steps and they can finish
  // before we ever see them.
  await page.evaluate(() => {
    const root = document.querySelector('.preloader-root');
    const obs = new MutationObserver(() => {
      void getComputedStyle(root).transform;
      for (const a of document.getAnimations()) if (a.transitionProperty) a.pause();
    });
    obs.observe(root, { subtree: true, attributes: true, attributeFilter: ['class'] });
  });

  const seekLoad = (ms) =>
    page.evaluate((t) => {
      let n = 0;
      for (const a of document.getAnimations()) {
        if (typeof a.animationName === 'string' && a.animationName.startsWith('loader-')) {
          a.pause();
          a.currentTime = t;
          n += 1;
        }
      }
      return n;
    }, ms);
  for (const t of [180, 600, 1200, 2350]) {
    const n = await seekLoad(t);
    if (!n) throw new Error(`wipe: no loader animations to seek at t=${t}`);
    report.timings[`wipe/load-${t}`] = await page.evaluate(() => {
      const fill = document.querySelector('.loader-hairline-fill');
      const dot = document.querySelector('.loader-sweep');
      return {
        fill: fill ? getComputedStyle(fill).transform : null,
        dotX: dot ? Math.round(dot.getBoundingClientRect().x) : null,
      };
    });
    await page.screenshot({ path: `${OUT}/frame-load-${String(t).padStart(4, '0')}.png` });
  }

  // user scroll (keyboard + wheel) must be inert while the loader is up (clock frozen, exit not fired)
  await page.keyboard.press('End');
  await sleep(120);
  const yEnd = await page.evaluate(() => window.scrollY);
  await page.keyboard.press('PageDown');
  await sleep(120);
  const yPageDown = await page.evaluate(() => window.scrollY);
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, 1500);
  await sleep(250);
  const yWheel = await page.evaluate(() => window.scrollY);
  const covered = await page.evaluate(
    () => document.querySelector('.preloader-root') != null && document.documentElement.classList.contains('lenis-stopped')
  );
  rec('wipe/user-scroll-locked', covered && yEnd === 0 && yPageDown === 0 && yWheel === 0, `End->${yEnd} PgDn->${yPageDown} wheel->${yWheel} covered=${covered}`);

  // step the frozen clock until both exit commits have happened; the observer above has already
  // paused the created transitions (pending or not), so they cannot outrun the capture
  const hasSheet = (needle) =>
    page.evaluate(
      (needle) => document.getAnimations().some((a) => a.transitionProperty && String(a.effect.target.className).includes(needle)),
      needle
    );

  let sawBlack = false;
  let sawOrange = false;
  for (let i = 0; i < 60 && !sawOrange; i++) {
    await page.clock.runFor(200);
    await sleep(40); // let React commit
    sawBlack = sawBlack || (await hasSheet('bg-[#070707]'));
    sawOrange = sawOrange || (await hasSheet('bg-gradient-to-b'));
  }
  if (!sawBlack) throw new Error('wipe: black sheet transition never started');
  if (!sawOrange) throw new Error('wipe: orange sheet transition never started');

  const exitFx = await page.evaluate(() => ({
    exitClass: document.querySelector('.preloader-root')?.classList.contains('preload-exit') ?? false,
    letterTranslate: document.getAnimations().some((a) => a.transitionProperty === 'translate'),
    stageRadius: document.getAnimations().some((a) => a.transitionProperty && a.transitionProperty.startsWith('border-')),
  }));
  rec('wipe/exit-choreography', exitFx.exitClass && exitFx.letterTranslate && exitFx.stageRadius, JSON.stringify(exitFx));

  // diagnostics only: measured commit offsets when the browser has already resolved startTime
  const measured = await page.evaluate(() => {
    const start = (insert) => {
      const hit = document
        .getAnimations()
        .filter((a) => a.transitionProperty && String(a.effect.target.className).includes(insert))
        .map((a) => a.startTime)
        .filter((t) => typeof t === 'number');
      return hit.length ? Math.min(...hit) : null;
    };
    return { black: start('bg-[#070707]'), orange: start('bg-gradient-to-b'), content: start('transition-[translate,opacity]') };
  });
  const offBlack = 260;
  const offOrange = 340;
  const offContent = 0;
  report.timings['wipe/offsets'] = {
    nominal: { black: offBlack, orange: offOrange, content: offContent },
    measured: measured.black == null ? measured : {
      orange: measured.orange == null ? null : Math.round(measured.orange - measured.black),
      content: measured.content == null ? null : Math.round(measured.content - measured.black),
    },
  };

  for (const T of [130, 300, 480, 700, 880, 1050]) {
    report.timings[`wipe/frame-${T}`] = await page.evaluate(
      ({ T, offBlack, offOrange, offContent }) => {
        const out = {};
        for (const a of document.getAnimations()) {
          if (!a.transitionProperty) continue;
          const cls = String(a.effect.target.className);
      const key = cls.includes('bg-[#070707]') ? 'black' : cls.includes('bg-gradient-to-b') ? 'orange' : cls.includes('transition-[translate,opacity]') ? 'content' : null;
          if (!key) continue;
          const off = key === 'black' ? offBlack : key === 'orange' ? offOrange : offContent;
          const c = T - off;
          const dur = Number(a.effect.getComputedTiming().duration) || 0;
          if (c >= dur) a.finish();
          else a.currentTime = Math.max(0, c);
          const cs = getComputedStyle(a.effect.target);
          out[key] = cs.translate && cs.translate !== 'none' ? cs.translate : cs.transform;
        }
        return out;
      },
      { T, offBlack, offOrange, offContent }
    );
    await sleep(60);
    await page.screenshot({ path: `${OUT}/frame-wipe-${String(T).padStart(4, '0')}.png` });
  }

  await page.evaluate(() => {
    for (const a of document.getAnimations()) if (a.transitionProperty) a.play(); // let the frozen sheets finish naturally
  });
  await page.clock.resume();
  const removed = await page
    .waitForSelector('.preloader-root', { state: 'detached', timeout: 8000 })
    .then(() => true)
    .catch(() => false);
  rec('wipe/overlay-removed-after-resume', removed, null);
  rec('wipe/zero-errors', errors.length === 0, errors.slice(0, 5));
  report.errors.push(...errors.map((e) => `[wipe] ${e}`));
  await ctx.close();
}

async function runMobile() {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.addInitScript(tracker);

  await page.goto(BASE, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('text=SUTANNN13', { timeout: 60000 });
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  rec('mobile/no-horizontal-overflow-during-load', sw <= 391, `scrollWidth=${sw}`);
  await sleep(800);
  await page.screenshot({ path: `${OUT}/mobile-loader.png` });

  await page.waitForFunction(() => window.__t && window.__t.exit != null, null, { timeout: 20000 });
  await page.waitForFunction(() => window.__t && window.__t.gone != null, null, { timeout: 20000 });
  await sleep(1500);
  await page.screenshot({ path: `${OUT}/mobile-hero.png` });

  rec('mobile/complete-once', (await page.evaluate(() => window.__t.exitCount)) === 1, null);
  rec('mobile/overlay-removed', await page.evaluate(() => document.querySelector('.preloader-root') === null), null);
  const swAfter = await page.evaluate(() => document.documentElement.scrollWidth);
  rec('mobile/no-horizontal-overflow-after', swAfter <= 391, `scrollWidth=${swAfter}`);
  rec('mobile/zero-errors', errors.length === 0, errors.slice(0, 5));
  report.errors.push(...errors.map((e) => `[mobile] ${e}`));
  await ctx.close();
}

async function runReduced() {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  await page.addInitScript(tracker);

  await page.goto(BASE, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('text=SUTANNN13', { timeout: 30000 });
  await page.screenshot({ path: `${OUT}/reduced-static.png` });
  await sleep(2500); // warm the dev compile before measuring

  // reduced exit is mount-based, so a cold hydration pushes it past the hero fallback; retry until warm
  let t = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.reload({ waitUntil: 'load', timeout: 60000 });
    await page.waitForSelector('text=SUTANNN13', { timeout: 30000 });
    await page.waitForFunction(() => window.__t && window.__t.gone != null, null, { timeout: 30000 });
    t = await page.evaluate(() => window.__t);
    if (t.exit != null && t.exit < 6500) break;
    await sleep(1500);
  }
  await sleep(1200);
  await page.screenshot({ path: `${OUT}/reduced-hero.png` });

  const { exit, gone, exitCount } = t;
  report.timings['reduced/exit'] = exit == null ? null : Math.round(exit);
  rec('reduced/complete-once', exitCount === 1, `exitCount=${exitCount}`);
  rec('reduced/unmount-delta', gone - exit >= 300 && gone - exit <= 1500, `gone-exit=${Math.round(gone - exit)}ms`);
  rec('reduced/exit-before-fallback', exit < 6500, `exit=${Math.round(exit)}ms`);
  rec('reduced/overlay-removed', await page.evaluate(() => document.querySelector('.preloader-root') === null), null);
  rec('reduced/scroll-unlocked', await page.evaluate(() => !document.documentElement.classList.contains('lenis-stopped')), null);
  rec('reduced/zero-errors', errors.length === 0, errors.slice(0, 5));
  report.errors.push(...errors.map((e) => `[reduced] ${e}`));
  await ctx.close();
}

try {
  await runNormal();
  await runWipeFrames();
  await runMobile();
  await runReduced();
} catch (e) {
  report.pass = false;
  report.errors.push(`script: ${e.message}`);
}
await browser.close();
report.shots = fs.readdirSync(OUT);
console.log(JSON.stringify(report, null, 2));
process.exit(report.pass && report.errors.length === 0 ? 0 : 1);
