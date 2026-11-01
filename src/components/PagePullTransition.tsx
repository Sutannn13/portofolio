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
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const SLICE_COUNT = 5;
const SLICE_INDICES = [0, 1, 2, 3, 4] as const;
const ROUTE_TIMEOUT_MS = 2200;
const SAFETY_MS = 3800;

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const FORWARD_META = {
  title: 'LIVE GITHUB ACTIVITY',
  subtitle: '@Sutannn13 // Telemetry Portal',
  routeTag: 'PORTAL // /ACTIVITY',
};
const BACK_META = {
  title: 'PORTFOLIO SHOWCASE',
  subtitle: 'Sutan Arlie Johan // Main Stage',
  routeTag: 'PORTAL // /HOME',
};

type TransitionWindow = Window & { __pptInFlight?: boolean; __pptArrived?: boolean };

export function PagePullTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  const [isPulling, setIsPulling] = useState(false);
  const [pullMeta, setPullMeta] = useState(FORWARD_META);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const edgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const seamRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const barFillRef = useRef<HTMLDivElement | null>(null);

  const busyRef = useRef(false);
  const runIdRef = useRef(0);
  const targetPathRef = useRef<string | null>(null);
  const routeResolveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    pathnameRef.current = pathname;
    if (targetPathRef.current === pathname && routeResolveRef.current) {
      routeResolveRef.current();
      routeResolveRef.current = null;
    }
  }, [pathname]);

  // Prefetch both primary routes once mounted so client-side slicing transitions are instant.
  useEffect(() => {
    router.prefetch('/activity');
    router.prefetch('/');
  }, [router]);

  const triggerPagePull = useCallback(
    (targetHref: string, direction: PullDirection = 'forward', customLabel?: string) => {
      if (busyRef.current) return;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const overlay = overlayRef.current;
      const slices = sliceRefs.current.filter(Boolean) as HTMLDivElement[];
      const edges = edgeRefs.current.filter(Boolean) as HTMLDivElement[];
      const seam = seamRef.current;
      const badge = badgeRef.current;
      const barFill = barFillRef.current;

      if (reduced || !overlay || slices.length === 0 || !badge) {
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

      const isForward = direction === 'forward';
      const baseMeta = isForward ? FORWARD_META : BACK_META;
      setPullMeta({
        title: customLabel || baseMeta.title,
        subtitle: baseMeta.subtitle,
        routeTag: baseMeta.routeTag,
      });

      const targetPath = targetHref.split(/[?#]/)[0] || '/';
      targetPathRef.current = targetPath;

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

      const cleanupAndUnlock = () => {
        gsap.set(overlay, { autoAlpha: 0 });
        gsap.set(slices, { scaleY: 0, clearProps: 'transformOrigin' });
        if (seam) gsap.set(seam, { scaleX: 0, opacity: 0 });
        if (barFill) gsap.set(barFill, { scaleX: 0 });
        gsap.set(badge, { clearProps: 'transform,opacity' });
        busyRef.current = false;
        setIsPulling(false);
        w.__pptArrived = true;
        w.__pptInFlight = false;
        lenisRef.current?.start();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      const watchdog = window.setTimeout(() => {
        if (!busyRef.current || runId !== runIdRef.current) return;
        gsap.killTweensOf([overlay, ...slices, ...edges, seam, badge, barFill]);
        cleanupAndUnlock();
      }, SAFETY_MS);

      // Prepare GPU-accelerated 5-blade interlocking counter-slice shutter state:
      // Even-indexed blades (0, 2, 4) slice from top -> bottom (or reverse when going back)
      // Odd-indexed blades (1, 3) counter-slice from bottom -> top, interlocking in the center!
      const staggerOrder: 'start' | 'end' = isForward ? 'start' : 'end';

      slices.forEach((slice, idx) => {
        const fromTop = isForward ? idx % 2 === 0 : idx % 2 !== 0;
        gsap.set(slice, {
          scaleY: 0,
          transformOrigin: fromTop ? 'top center' : 'bottom center',
          force3D: true,
        });
      });

      edges.forEach((edge, idx) => {
        const fromTop = isForward ? idx % 2 === 0 : idx % 2 !== 0;
        edge.style.top = fromTop ? 'auto' : '0px';
        edge.style.bottom = fromTop ? '0px' : 'auto';
        gsap.set(edge, { opacity: 1, scaleX: 1 });
      });

      gsap.set(overlay, { autoAlpha: 1 });
      if (seam) {
        gsap.set(seam, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: isForward ? 'left center' : 'right center',
        });
      }
      if (barFill) {
        gsap.set(barFill, { scaleX: 0, transformOrigin: 'left center' });
      }
      gsap.set(badge, {
        y: isForward ? 20 : -20,
        scale: 0.94,
        opacity: 0,
        force3D: true,
      });

      // Phase 1: Interlocking 5-blade counter-slice shut (~0.46s)
      const exitTl = gsap.timeline();
      exitTl
        .to(
          slices,
          {
            scaleY: 1,
            duration: 0.45,
            stagger: { each: 0.042, from: staggerOrder },
            ease: 'expo.inOut',
            force3D: true,
          },
          0
        )
        .to(
          seam,
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.34,
            ease: 'expo.out',
          },
          0.14
        )
        .to(
          badge,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'power3.out',
            force3D: true,
          },
          0.16
        )
        .to(
          barFill,
          {
            scaleX: 1,
            duration: 0.32,
            ease: 'power2.out',
          },
          0.18
        );

      exitTl.eventCallback('onComplete', async () => {
        if (targetPath === window.location.pathname && pathnameRef.current === targetPath) {
          resolveRoute();
        } else {
          router.push(targetHref, { scroll: false });
          const pollStart = performance.now();
          const checkCommitted = () => {
            if (routeSettled) return;
            if (
              pathnameRef.current === targetPath ||
              window.location.pathname === targetPath ||
              performance.now() - pollStart > ROUTE_TIMEOUT_MS
            ) {
              resolveRoute();
              return;
            }
            requestAnimationFrame(checkCommitted);
          };
          requestAnimationFrame(checkCommitted);
        }

        await routeReady;
        if (!busyRef.current || runId !== runIdRef.current) return;
        routeResolveRef.current = null;
        targetPathRef.current = null;

        // Reset scroll position while shutter blades completely cover the viewport
        window.scrollTo(0, 0);
        lenisRef.current?.scrollTo(0, { immediate: true, force: true });

        await nextFrame();
        await wait(25);

        window.dispatchEvent(new Event('ppt:arrive'));
        ScrollTrigger.refresh();

        // Flip transform-origin on each blade so it slices open in its continuation direction
        slices.forEach((slice, idx) => {
          const fromTop = isForward ? idx % 2 === 0 : idx % 2 !== 0;
          gsap.set(slice, {
            transformOrigin: fromTop ? 'bottom center' : 'top center',
          });
        });

        // Phase 2: Interlocking 5-blade shutter slice open (~0.45s)
        const arriveTl = gsap.timeline({
          onComplete: () => {
            window.clearTimeout(watchdog);
            cleanupAndUnlock();
          },
        });

        arriveTl
          .call(
            () => {
              busyRef.current = false;
              setIsPulling(false);
              lenisRef.current?.start();
            },
            undefined,
            0.22
          )
          .to(
            badge,
            {
              y: isForward ? -16 : 16,
              scale: 0.95,
              opacity: 0,
              duration: 0.18,
              ease: 'power2.in',
              force3D: true,
            },
            0
          )
          .to(
            seam,
            {
              scaleX: 0,
              opacity: 0,
              transformOrigin: isForward ? 'right center' : 'left center',
              duration: 0.22,
              ease: 'power2.inOut',
            },
            0.02
          )
          .to(
            edges,
            {
              opacity: 0,
              duration: 0.18,
              ease: 'power1.out',
            },
            0.1
          )
          .to(
            slices,
            {
              scaleY: 0,
              duration: 0.44,
              stagger: { each: 0.042, from: staggerOrder },
              ease: 'expo.inOut',
              force3D: true,
            },
            0.04
          );
      });
    },
    [router]
  );

  const contextValue = useMemo(
    () => ({ triggerPagePull, isPulling }),
    [triggerPagePull, isPulling]
  );

  return (
    <PagePullTransitionContext.Provider value={contextValue}>
      <div className="relative min-h-screen w-screen bg-[#070707]">{children}</div>

      {/* 60fps GPU-Accelerated 5-Blade Interlocking Architectural Slicing Overlay */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        {/* 5 Vertical Counter-Slicing Shutter Blades */}
        <div className="absolute inset-0 grid h-full w-full grid-cols-5">
          {SLICE_INDICES.map((idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => {
                  sliceRefs.current[idx] = el;
                }}
                className="relative -mr-[1px] h-full overflow-hidden border-r border-[#F16B0D]/25 will-change-transform"
                style={{
                  transform: 'scaleY(0)',
                  background: isEven
                    ? 'linear-gradient(180deg, #09090d 0%, #121016 55%, #1c110d 100%)'
                    : 'linear-gradient(180deg, #1c110d 0%, #121016 45%, #09090d 100%)',
                }}
              >
                {/* Glowing Ember Cutting Edge on each Blade */}
                <div
                  ref={(el) => {
                    edgeRefs.current[idx] = el;
                  }}
                  className="
                    absolute inset-x-0 bottom-0 h-[4px]
                    bg-gradient-to-r from-[#F16B0D] via-[#ffb078] to-[#E61416]
                  "
                />

                {/* Top Architectural Crosshair */}
                <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-white/25 max-md:left-2.5">
                  <span className="text-[#F16B0D]/60">+</span>
                  <span>SLICE.0{idx + 1}</span>
                </div>

                {/* Large Subtle Architectural Number Watermark */}
                <div className="pointer-events-none absolute inset-x-0 bottom-12 flex justify-center select-none">
                  <span className="font-mono text-[6vw] font-semibold leading-none tracking-tighter text-white/[0.035] max-md:text-[10vw]">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom Architectural Telemetry Index */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 max-md:left-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F16B0D]/70" />
                  <span className="font-mono text-[10px] tracking-[0.26em] text-white/35 max-md:text-[8px]">
                    0{idx + 1} // 0{SLICE_COUNT}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Horizontal Laser Slicing Seam */}
        <div
          ref={seamRef}
          className="
            absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px]
            bg-gradient-to-r from-transparent via-[#F16B0D] to-transparent
            opacity-0 will-change-[transform,opacity]
          "
        />

        {/* Center Editorial Telemetry HUD */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            ref={badgeRef}
            className="
              relative flex flex-col items-center gap-3.5 rounded-3xl
              border border-[#F16B0D]/35 bg-[#0b0b0f]/95 px-10 py-7
              text-center text-white shadow-[0_24px_80px_rgba(0,0,0,0.9)]
              will-change-[transform,opacity] max-md:px-6 max-md:py-5
            "
          >
            <div className="flex items-center gap-2.5 rounded-full border border-[#F16B0D]/40 bg-[#F16B0D]/15 px-3.5 py-1">
              <span className="h-2 w-2 rounded-full bg-[#F16B0D]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ff9852]">
                {pullMeta.subtitle}
              </span>
            </div>

            <p className="text-[2.4vw] font-medium tracking-tight text-white max-[1025px]:text-[4.2vw] max-md:text-[5.8vw]">
              {pullMeta.title}
            </p>

            {/* Slicing Progress Bar + Route Coordinate */}
            <div className="mt-1 flex w-48 flex-col items-center gap-2">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  ref={barFillRef}
                  className="h-full w-full origin-left bg-gradient-to-r from-[#F16B0D] via-[#ff9852] to-white will-change-transform"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                {pullMeta.routeTag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </PagePullTransitionContext.Provider>
  );
}

