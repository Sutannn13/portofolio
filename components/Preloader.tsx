'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';

const EXIT_AT_MS = 2350;
const SHEET_MS = 960;
const VEIL_DELAY_MS = 140;
const UNMOUNT_SLACK_MS = 180;

const WORDMARK = 'SUTANNN13';
const ACCENT_FROM = 7;

const GITHUB_ICON_PATH =
  'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const completeRef = useRef(onComplete);
  const unlockedRef = useRef(false);

  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && !unlockedRef.current) lenis.stop();
  }, [lenis]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
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

    const exitTimer = setTimeout(() => {
      setPhase(1);
      unlockedRef.current = true;
      window.dispatchEvent(new CustomEvent('preloader:complete'));
      try {
        completeRef.current?.();
      } catch {
        /* never block scroll unlock */
      }
    }, exitAt);

    const revealTimer = setTimeout(() => {
      setPhase(2);
      lenisRef.current?.start();
    }, exitAt + VEIL_DELAY_MS);

    const doneTimer = setTimeout(() => setPhase(3), exitAt + totalExitMs);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
      lenisRef.current?.start();
    };
  }, []);

  if (phase === 3) return null;

  const exiting = phase >= 1;
  const revealed = phase >= 2;

  return (
    <div
      className={`preloader-root fixed inset-0 z-[9999] pointer-events-none`}
      aria-hidden="true"
    >
      {/* Secondary Warm Accent Veil — glides & feathers seamlessly into the Hero gradient */}
      <div
        className={`absolute inset-0 z-30 will-change-[transform,opacity] bg-gradient-to-b from-[#070707] via-[#2A1108] to-[#D8470A] transition-[transform,opacity] duration-[960ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          revealed ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-95'
        }`}
      />

      {/* Primary Dark Stage Curtain */}
      <div
        className={`absolute inset-0 z-40 overflow-hidden bg-[#070707] will-change-transform border-b border-[#F0640D]/30 shadow-[0_24px_64px_rgba(0,0,0,0.65)] transition-transform duration-[920ms] delay-[60ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          exiting ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="loader-glow-a absolute left-[10%] top-[16%] h-[42vh] w-[42vh] rounded-full bg-[#F0640D]/12 blur-[130px]" />
          <div className="loader-glow-b absolute bottom-[8%] right-[6%] h-[36vh] w-[36vh] rounded-full bg-[#F0640D]/8 blur-[120px]" />
        </div>

        <div
          className={`relative z-10 flex h-full w-full flex-col items-center justify-center gap-7 px-6 will-change-[transform,opacity,filter] transition-[transform,opacity,filter] duration-[520ms] ease-[cubic-bezier(0.33,0,0.2,1)] ${
            exiting
              ? '-translate-y-8 scale-[0.95] opacity-0 blur-[6px]'
              : 'translate-y-0 scale-100 opacity-100 blur-0'
          }`}
        >
          <div className="flex overflow-hidden font-sans text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white select-none sm:text-6xl md:text-7xl lg:text-8xl">
            {WORDMARK.split('').map((char, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <span
                  className={`loader-letter inline-block ${
                    index >= ACCENT_FROM ? 'text-[#F0640D]' : ''
                  }`}
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  {char}
                </span>
              </span>
            ))}
          </div>

          <div className="loader-badge flex items-center gap-3.5">
            <div className="relative h-11 w-11">
              <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
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
              <span className="font-mono text-sm tracking-[0.18em] text-white/85">@Sutannn13</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                github.com
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
          <div className="loader-hairline-fill absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#F0640D]/30 via-[#F0640D] to-[#F0640D]/30" />
          <span className="loader-sweep absolute bottom-0 left-0 h-[3px] w-[3px] rounded-full bg-white shadow-[0_0_10px_2px_rgba(240,100,13,0.7)]" />
        </div>
      </div>
    </div>
  );
}

