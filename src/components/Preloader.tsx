'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

const EXIT_AT_MS = 2250;
const STAGE_LIFT_DELAY_MS = 220;
const HERO_TRIGGER_DELAY_MS = 320;
const VEIL_DELAY_MS = 350;
const SHEET_MS = 1040;
const UNMOUNT_SLACK_MS = 180;

const WORDMARK = 'SUTANNN13';
const ACCENT_FROM = 7;

const GITHUB_ICON_PATH =
  'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

interface PreloaderProps {
  onComplete?: () => void;
}

// Survives client-side navigation, resets on a full reload.
let hasPlayedOnce = false;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [skip] = useState(() => hasPlayedOnce);
  const [phase, setPhase] = useState(skip ? 3 : 0);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const completeRef = useRef(onComplete);
  const unlockedRef = useRef(skip);

  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && !unlockedRef.current && !hasPlayedOnce) lenis.stop();
  }, [lenis]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (skip || hasPlayedOnce) {
      unlockedRef.current = true;
      setPhase(3);
      lenisRef.current?.start();
      const t = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('preloader:complete'));
        completeRef.current?.();
      }, 0);
      return () => clearTimeout(t);
    }
    hasPlayedOnce = true;
    lenisRef.current?.stop();
    let exitAt = EXIT_AT_MS;

    const starts = document
      .getAnimations()
      .filter(
        (a): a is CSSAnimation =>
          typeof CSSAnimation !== 'undefined' &&
          a instanceof CSSAnimation &&
          a.animationName === 'loader-rise'
      )
      .map((a) => a.startTime)
      .filter((t): t is number => typeof t === 'number');
    if (starts.length) {
      exitAt = Math.max(0, EXIT_AT_MS - (performance.now() - Math.min(...starts)));
    }

    const totalExitMs = VEIL_DELAY_MS + SHEET_MS + UNMOUNT_SLACK_MS;

    // Phase 1: Letters & badges tuck out into their masks, primary stage begins its lift
    const exitTimer = setTimeout(() => {
      setPhase(1);
    }, exitAt);

    // Dispatch Hero intro trigger right as the primary curtain begins uncovering the lower viewport
    const heroTriggerTimer = setTimeout(() => {
      unlockedRef.current = true;
      window.dispatchEvent(new CustomEvent('preloader:complete'));
      try {
        completeRef.current?.();
      } catch {
        /* never block scroll unlock */
      }
    }, exitAt + HERO_TRIGGER_DELAY_MS);

    // Phase 2: Secondary warm ember veil sweeps up & blends into the Hero gradient
    const revealTimer = setTimeout(() => {
      setPhase(2);
      lenisRef.current?.start();
    }, exitAt + VEIL_DELAY_MS);

    const doneTimer = setTimeout(() => setPhase(3), exitAt + totalExitMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(heroTriggerTimer);
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
      lenisRef.current?.start();
    };
  }, [skip]);

  if (phase === 3) return null;

  const exiting = phase >= 1;
  const revealed = phase >= 2;

  return (
    <div
      className={`preloader-root fixed inset-0 z-[9999] pointer-events-none ${exiting ? 'preload-exit' : ''}`}
      aria-hidden="true"
    >
      {/* Secondary Warm Ember Veil — follows the dark stage and melts into the Hero top gradient */}
      <div
        className={`loader-veil absolute inset-0 z-30 will-change-transform bg-gradient-to-b from-[#070707] via-[#7A1C08] to-[#F0640D] ${
          revealed ? '-translate-y-[108%]' : 'translate-y-0'
        }`}
      >
        <svg
          className="pointer-events-none absolute left-0 top-full h-[6vh] w-full text-[#F0640D] fill-current"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,20 Q720,100 0,20 Z" />
        </svg>
      </div>

      {/* Primary Dark Stage Curtain */}
      <div
        className={`loader-stage absolute inset-0 z-40 bg-[#070707] will-change-transform ${
          exiting ? '-translate-y-[108%]' : 'translate-y-0'
        }`}
        style={{ transitionDelay: exiting ? `${STAGE_LIFT_DELAY_MS}ms` : '0ms' }}
      >
        {/* Curved SVG Apron at the bottom edge of the dark curtain for silk-smooth organic lift */}
        <svg
          className="loader-apron pointer-events-none absolute left-0 top-full h-[7.5vh] w-full text-[#070707] fill-current"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L1440,0 L1440,12 Q720,120 0,12 Z" />
        </svg>

        {/* Ambient stage lighting (GPU static gradient, no expensive repaint blur during lift) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `
              radial-gradient(45% 45% at 18% 22%, rgba(240, 100, 13, 0.11) 0%, rgba(240, 100, 13, 0) 70%),
              radial-gradient(40% 40% at 84% 82%, rgba(240, 100, 13, 0.08) 0%, rgba(240, 100, 13, 0) 70%)
            `,
          }}
        />

        {/* Center Wordmark & Identity Badge */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-7 px-6">
          <div className="flex overflow-hidden py-2 font-sans text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white select-none sm:text-6xl md:text-7xl lg:text-8xl">
            {WORDMARK.split('').map((char, index) => (
              <span key={index} className="inline-block overflow-hidden py-1">
                <span
                  className={`loader-letter inline-block will-change-transform ${
                    index >= ACCENT_FROM ? 'text-[#F0640D]' : ''
                  }`}
                  style={{ animationDelay: `${index * 55}ms`, '--i': index } as React.CSSProperties}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>

          <div className="loader-badge flex items-center gap-3.5 will-change-[transform,opacity]">
            <div className="relative h-11 w-11">
              <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="rgba(255,255,255,0.10)"
                  strokeWidth="1.5"
                />
                <circle
                  className="loader-ring-arc"
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#F0640D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="125.7"
                  strokeDashoffset="125.7"
                />
              </svg>
              <div className="loader-spinner absolute inset-0">
                <span className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#F0640D] shadow-[0_0_10px_2px_rgba(240,100,13,0.65)]" />
              </div>
              <div className="loader-float absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-[18px] w-[18px] text-white/90"
                >
                  <path d={GITHUB_ICON_PATH} />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm tracking-[0.18em] text-white/90">@Sutannn13</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                github.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

