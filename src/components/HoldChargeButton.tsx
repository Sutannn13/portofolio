'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface HoldChargeButtonProps {
  label: string;
  onComplete: () => void;
  holdMs?: number;
  /** Idle hint paragraph (hero size only). */
  hintIdle?: string;
  /** Hint paragraph while the user is holding. */
  hintActive?: string;
  /** Hint paragraph after an early release. */
  hintReleased?: string;
  /** Hint paragraph once the charge completes. */
  hintDone?: string;
  size?: 'hero' | 'compact';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  /** Optional observer for charge progress (drives host-side visuals). */
  onProgress?: (progress: number) => void;
}

export default function HoldChargeButton({
  label,
  onComplete,
  holdMs = 2000,
  hintIdle,
  hintActive,
  hintReleased,
  hintDone,
  size = 'hero',
  disabled = false,
  className = '',
  ariaLabel,
  onProgress,
}: HoldChargeButtonProps) {
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hintMessage, setHintMessage] = useState<string>(hintIdle ?? '');

  const rafRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const startProgressRef = useRef<number>(0);
  const completedRef = useRef<boolean>(false);
  const progressRef = useRef<number>(0);
  const onProgressRef = useRef(onProgress);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // Notify observers imperatively at the source (no state->effect->setState loop).
  const emitProgress = useCallback((value: number) => {
    progressRef.current = value;
    setProgress(value);
    onProgressRef.current?.(value);
  }, []);

  const cancelRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => cancelRaf, [cancelRaf]);

  // Cancel any in-flight charge when the button becomes disabled externally.
  useEffect(() => {
    if (!disabled) return;
    cancelRaf();
    holdStartRef.current = null;
  }, [disabled, cancelRaf]);

  const activelyHolding = isHolding && !disabled;

  const startDrain = useCallback(() => {
    cancelRaf();
    const drainFrom = progressRef.current;
    if (drainFrom <= 0.005) {
      emitProgress(0);
      return;
    }
    const drainDuration = Math.max(180, drainFrom * 520);
    const drainStart = performance.now();

    const stepDrain = (now: number) => {
      const elapsed = now - drainStart;
      const t = Math.min(1, elapsed / drainDuration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.max(0, drainFrom * (1 - eased));
      emitProgress(next);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(stepDrain);
      } else {
        emitProgress(0);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(stepDrain);
  }, [cancelRaf, emitProgress]);

  const handleChargeComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    cancelRaf();
    emitProgress(1);
    setIsHolding(false);
    setIsCompleted(true);
    setHintMessage(hintDone ?? hintIdle ?? '');
    onComplete();
  }, [cancelRaf, emitProgress, onComplete, hintDone, hintIdle]);

  const startHold = useCallback(() => {
    if (completedRef.current || disabled) return;
    cancelRaf();
    setIsHolding(true);
    setHintMessage(hintActive ?? hintIdle ?? '');
    const durationMs = Math.max(1, holdMs);

    const initialProg = progressRef.current;
    startProgressRef.current = initialProg;
    const remainingRatio = Math.max(0.05, 1 - initialProg);
    const targetDuration = durationMs * remainingRatio;
    holdStartRef.current = performance.now();

    const stepHold = (now: number) => {
      if (holdStartRef.current === null) return;
      const elapsed = now - holdStartRef.current;
      const ratio = Math.min(1, elapsed / targetDuration);
      const next = Math.min(1, startProgressRef.current + ratio * (1 - startProgressRef.current));
      emitProgress(next);

      if (next >= 1) {
        handleChargeComplete();
        return;
      }
      rafRef.current = requestAnimationFrame(stepHold);
    };

    rafRef.current = requestAnimationFrame(stepHold);
  }, [cancelRaf, handleChargeComplete, disabled, holdMs, hintActive, hintIdle, emitProgress]);

  const stopHold = useCallback(() => {
    if (completedRef.current) return;
    if (!isHolding && progressRef.current === 0) return;
    setIsHolding(false);
    holdStartRef.current = null;
    if (progressRef.current < 1) {
      setHintMessage(hintReleased ?? hintIdle ?? '');
      startDrain();
    }
  }, [isHolding, startDrain, hintReleased, hintIdle]);

  const chars = Array.from(label);
  const percentValue = Math.round(progress * 100);
  const isCompact = size === 'compact';
  const rootClass = isCompact
    ? `inline-flex ${className}`
    : `relative z-10 mt-6 flex w-full flex-col items-center ${className}`;

  return (
    <div className={rootClass}>
      <button
        type="button"
        aria-label={
          ariaLabel ??
          `${label} — hold ${Math.round(holdMs / 1000)} seconds to activate`
        }
        disabled={disabled}
        onPointerDown={(e) => {
          if (e.button !== 0 && e.pointerType === 'mouse') return;
          startHold();
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        onContextMenu={(e) => {
          if (isHolding) e.preventDefault();
        }}
        onKeyDown={(e) => {
          if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
            e.preventDefault();
            startHold();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            stopHold();
          }
        }}
        onBlur={stopHold}
        style={
          {
            '--hold-progress': progress,
            background: isCompleted ? '#ffffff' : 'rgba(255, 255, 255, 0.11)',
            borderColor: activelyHolding ? '#ffffff' : 'rgba(255, 255, 255, 0.32)',
            boxShadow: activelyHolding
              ? '0 0 32px rgba(241, 107, 13, 0.45), 0 8px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.75)'
              : '0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
          } as React.CSSProperties
        }
        className={`
          hold-charge-btn group relative flex cursor-pointer items-center
          justify-between overflow-hidden rounded-full border-[1.5px]
          backdrop-blur-xl transition-transform duration-200 select-none touch-none
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F16B0D]
          disabled:cursor-not-allowed disabled:opacity-60
          ${
            isCompact
              ? 'h-11 w-fit gap-2.5 px-5 max-md:h-11'
              : 'h-[4vw] w-full gap-4 px-6 max-[1025px]:h-14 max-md:h-14 max-md:px-5'
          }
          ${activelyHolding ? 'scale-[1.02]' : 'hover:border-white/55'}
        `}
      >
        {/* Liquid white charge fill driven by hold progress */}
        <span
          aria-hidden="true"
          className="hold-charge-btn__fill pointer-events-none absolute inset-[-1px] z-10 origin-left rounded-full"
          style={{
            background: '#ffffff',
            boxShadow:
              progress > 0.01 && progress < 0.99
                ? '4px 0 12px rgba(241, 107, 13, 0.55)'
                : 'none',
            transform: `scaleX(${progress.toFixed(4)})`,
          }}
        />

        {/* Left indicator: radial ring (hero) or back arrow (compact) */}
        {isCompact ? (
          <span
            aria-hidden="true"
            className="relative z-20 shrink-0 text-base leading-none transition-colors duration-150"
            style={{ color: progress > 0.05 ? '#0a0a0a' : '#ffffff' }}
          >
            &larr;
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="relative z-20 flex h-7 w-7 shrink-0 items-center justify-center"
          >
            <svg className="h-7 w-7 -rotate-90" viewBox="0 0 28 28">
              <circle
                cx="14"
                cy="14"
                r="11"
                fill="none"
                stroke={progress > 0.08 ? 'rgba(10,10,10,0.22)' : 'rgba(255,255,255,0.24)'}
                strokeWidth="2"
              />
              <circle
                cx="14"
                cy="14"
                r="11"
                fill="none"
                stroke={progress > 0.08 ? '#0a0a0a' : '#F16B0D'}
                strokeWidth="2.2"
                strokeDasharray={2 * Math.PI * 11}
                strokeDashoffset={2 * Math.PI * 11 * (1 - progress)}
                strokeLinecap="round"
              />
            </svg>
            <span
              className="absolute h-2 w-2 rounded-full transition-colors duration-150"
              style={{
                backgroundColor: progress > 0.08 ? '#0a0a0a' : '#ffffff',
              }}
            />
          </span>
        )}

        {/* Per-character white -> black flip as the fill wave passes */}
        <span
          className={`
            relative z-20 block overflow-hidden font-medium tracking-tight whitespace-nowrap
            ${
              isCompact
                ? 'text-sm'
                : 'text-[1.15vw] max-[1025px]:text-base max-md:text-sm'
            }
          `}
        >
          {chars.map((ch, idx) => {
            const charThreshold = 0.25 + (idx / chars.length) * 0.5;
            const isCovered = progress >= charThreshold;
            return (
              <span
                key={idx}
                className="inline-block transition-[color,transform] duration-75"
                style={{
                  color: isCovered ? '#0a0a0a' : '#ffffff',
                  transform: isCovered ? 'translateY(-0.5px)' : 'translateY(0)',
                  whiteSpace: ch === ' ' ? 'pre' : undefined,
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>

        {/* Right percentage readout */}
        <span
          aria-hidden="true"
          className={`
            relative z-20 shrink-0 font-mono font-medium tracking-wider transition-colors duration-150
            ${isCompact ? 'text-[10px]' : 'text-xs'}
          `}
          style={{
            color: progress > 0.88 ? '#0a0a0a' : 'rgba(255,255,255,0.78)',
          }}
        >
          {percentValue}%
        </span>
      </button>

      {!isCompact && hintIdle && (
        <p
          aria-live="polite"
          className="mt-3 text-center font-mono text-[11px] tracking-wide text-white/45"
        >
          {hintMessage}
        </p>
      )}
    </div>
  );
}
