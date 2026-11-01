'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

type PullDirection = 'forward' | 'back';

interface PagePullTransitionContextValue {
  triggerPagePull: (targetHref: string, direction?: PullDirection, label?: string) => void;
  isPulling: boolean;
}

const PagePullTransitionContext = createContext<PagePullTransitionContextValue | null>(null);

export function usePagePullTransition() {
  const ctx = useContext(PagePullTransitionContext);
  if (!ctx) {
    throw new Error('usePagePullTransition must be used within PagePullTransitionProvider');
  }
  return ctx;
}

const ROUTE_TIMEOUT_MS = 5000;
const SAFETY_MS = 4000;
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const FORWARD_META = { title: 'LIVE GITHUB ACTIVITY', subtitle: '@Sutannn13 // GitHub' };
const BACK_META = { title: 'PORTFOLIO', subtitle: 'Sutan Arlie Johan' };

type TransitionWindow = Window & { __pptInFlight?: boolean; __pptArrived?: boolean };

export function PagePullTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const [isPulling, setIsPulling] = useState(false);
  const [pullMeta, setPullMeta] = useState(FORWARD_META);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);

  const busyRef = useRef(false);
  const runIdRef = useRef(0);
  const targetPathRef = useRef<string | null>(null);
  const routeResolveRef = useRef<(() => void) | null>(null);

  // Resolve the pending navigation once the new route has actually committed.
  useEffect(() => {
    if (targetPathRef.current === pathname && routeResolveRef.current) {
      routeResolveRef.current();
      routeResolveRef.current = null;
    }
  }, [pathname]);

  // Freeze the page into a viewport-sized fixed layer so GSAP only composites
  // one screen of pixels instead of the whole (very tall) document.
  const freezeSheet = (scrollY: number) => {
    const stage = stageRef.current;
    const sheet = sheetRef.current;
    const inner = innerRef.current;
    if (!stage || !sheet || !inner) return;
    stage.style.height = `${stage.offsetHeight}px`;
    sheet.style.position = 'fixed';
    sheet.style.inset = '0';
    sheet.style.height = `${window.innerHeight}px`;
    sheet.style.overflow = 'hidden';
    sheet.style.willChange = 'transform';
    inner.style.position = 'relative';
    inner.style.top = `${-scrollY}px`;
  };

  // All persistent sheet styling lives in classes, so clearing inline styles is safe.
  const releaseSheet = () => {
    const stage = stageRef.current;
    const sheet = sheetRef.current;
    const inner = innerRef.current;
    if (stage) stage.style.height = '';
    if (sheet) {
      gsap.set(sheet, { clearProps: 'transform' });
      sheet.removeAttribute('style');
    }
    if (inner) inner.removeAttribute('style');
  };

  const triggerPagePull = useCallback(
    (targetHref: string, direction: PullDirection = 'forward', customLabel?: string) => {
      if (busyRef.current) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const sheet = sheetRef.current;
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      const badge = badgeRef.current;

      if (reduced || !sheet || !overlay || !panel || !badge) {
        router.push(targetHref);
        return;
      }

      busyRef.current = true;
      const runId = ++runIdRef.current;
      setIsPulling(true);
      lenisRef.current?.stop();
      router.prefetch(targetHref);

      const w = window as TransitionWindow;
      w.__pptInFlight = true;
      w.__pptArrived = false;

      const sign = direction === 'forward' ? 1 : -1;
      const meta = sign > 0 ? FORWARD_META : BACK_META;
      setPullMeta({ title: customLabel || meta.title, subtitle: meta.subtitle });

      const targetPath = targetHref.split(/[?#]/)[0] || '/';
      targetPathRef.current = targetPath;

      // Idempotent route resolver with its own safety timeout.
      let routeSettled = false;
      let routeTimer = 0;
      let resolveRoute = () => {};
      const routeReady = new Promise<void>((resolve) => {
        resolveRoute = () => {
          if (routeSettled) return;
          routeSettled = true;
          if (routeTimer) window.clearTimeout(routeTimer);
          resolve();
        };
        routeResolveRef.current = resolveRoute;
      });
      routeTimer = window.setTimeout(resolveRoute, ROUTE_TIMEOUT_MS);

      // Insurance: never leave the UI locked if a tween/route stalls.
      const watchdog = window.setTimeout(() => {
        if (!busyRef.current || runId !== runIdRef.current) return;
        gsap.killTweensOf([overlay, panel, badge, sheet]);
        releaseSheet();
        lenisRef.current?.start();
        busyRef.current = false;
        setIsPulling(false);
        w.__pptArrived = true;
        w.__pptInFlight = false;
      }, SAFETY_MS);

      freezeSheet(window.scrollY);

      // Accent strip sits on the leading edge of the sweep.
      const strip = stripRef.current;
      if (strip) {
        strip.style.left = sign > 0 ? '0' : '';
        strip.style.right = sign > 0 ? '' : '0';
      }

      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(panel, { xPercent: sign * 104, force3D: false });
      gsap.set(badge, {
        scale: 0.8,
        opacity: 0,
        rotationY: -10 * sign,
        transformPerspective: 800,
      });
      gsap.set(sheet, { xPercent: 0, scale: 1, force3D: false });

      // Exit (~0.45s): panel sweeps across, page drifts back, badge pops in late.
      const exit = gsap.timeline();
      exit
        .to(panel, { xPercent: 0, duration: 0.45, ease: 'power3.inOut', force3D: false }, 0)
        .to(sheet, { xPercent: -sign * 18, scale: 0.985, duration: 0.45, ease: 'power3.inOut', force3D: false }, 0)
        .to(badge, { scale: 1, opacity: 1, rotationY: 0, duration: 0.2, ease: 'back.out(1.4)' }, 0.25);

      exit.eventCallback('onComplete', async () => {
        // Same-path short-circuit: resolve without pushing.
        if (targetPath === window.location.pathname) {
          routeResolveRef.current?.();
        } else {
          router.push(targetHref, { scroll: false });
        }
        await routeReady;
        // Watchdog may have already reset the machine.
        if (!busyRef.current || runId !== runIdRef.current) return;
        routeResolveRef.current = null;
        targetPathRef.current = null;

        window.scrollTo(0, 0);
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });
        const inner = innerRef.current;
        if (inner) inner.style.top = '0px';

        // Let React + the new page's effects settle before the arrival tween.
        await nextFrame();
        await nextFrame();
        await wait(90);

        window.dispatchEvent(new Event('ppt:arrive'));

        gsap.set(sheet, { xPercent: sign * 8, scale: 0.985, force3D: false });

        // Arrive (~0.55s): badge leaves first, panel uncovers, page counter-slides in.
        const arrive = gsap.timeline({
          onComplete: () => {
            releaseSheet();
            gsap.set(overlay, { autoAlpha: 0 });
            gsap.set([panel, badge], { clearProps: 'transform,opacity' });
            busyRef.current = false;
            setIsPulling(false);
            w.__pptArrived = true;
            w.__pptInFlight = false;
            window.clearTimeout(watchdog);
            lenisRef.current?.start();
          },
        });
        arrive
          .to(badge, { scale: 0.9, opacity: 0, duration: 0.15, ease: 'power2.in' }, 0)
          .to(panel, { xPercent: -sign * 104, duration: 0.5, ease: 'power3.inOut', force3D: false }, 0.05)
          .to(sheet, { xPercent: 0, scale: 1, duration: 0.55, ease: 'power3.out', force3D: false }, 0);
      });
    },
    [router]
  );

  const contextValue = useMemo(() => ({ triggerPagePull, isPulling }), [triggerPagePull, isPulling]);

  return (
    <PagePullTransitionContext.Provider value={contextValue}>
      <div ref={stageRef} className="relative min-h-screen w-screen bg-[#040405]">
        <div ref={sheetRef} className="relative min-h-screen w-screen bg-[#070707]">
          <div ref={innerRef}>{children}</div>
        </div>

        <div
          ref={overlayRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
          style={{ visibility: 'hidden', opacity: 0 }}
        >
          <div ref={panelRef} className="absolute inset-0 bg-[#0b0b0d] will-change-transform">
            <div
              ref={stripRef}
              className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-[#F16B0D] via-[#E61416] to-[#9A2806]"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={badgeRef}
              className="relative flex flex-col items-center gap-4 rounded-3xl border border-white/15 bg-[#0d0d10] px-10 py-8 text-center text-white will-change-transform max-md:px-6 max-md:py-6"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-[#F16B0D]/40 bg-[#F16B0D]/15 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#F16B0D]" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#ff9852]">
                  {pullMeta.subtitle}
                </span>
              </div>
              <p className="text-[2.8vw] font-medium tracking-tight text-white max-[1025px]:text-[4.5vw] max-md:text-[6.2vw]">
                {pullMeta.title}
              </p>
              <div className="h-1 w-28 rounded-full bg-gradient-to-r from-[#F16B0D] to-white" />
            </div>
          </div>
        </div>
      </div>
    </PagePullTransitionContext.Provider>
  );
}
