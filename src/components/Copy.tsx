'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export interface CopyProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  className?: string;
  scrub?: boolean;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  splitBy?: 'chars' | 'lines';
  stagger?: number;
  duration?: number;
  onComplete?: () => void;
  completeOverlap?: number;
  start?: boolean;
}

const DIRECTIONS = {
  top: { yPercent: -100, xPercent: 0, rotate: 0 },
  bottom: { yPercent: 100, xPercent: 0, rotate: 0 },
  left: { yPercent: 0, xPercent: -100, rotate: 0 },
  right: { yPercent: 0, xPercent: 100, rotate: 0 },
};

export default function Copy({
  children,
  animateOnScroll = true,
  delay = 0,
  className = '',
  scrub = false,
  direction = 'bottom',
  splitBy = 'chars',
  stagger,
  duration = 0.5,
  onComplete,
  completeOverlap = 0,
  start = true,
}: CopyProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const splitsRef = useRef<SplitText[]>([]);
  const targetsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let timer: number | undefined;
    if (!wrapperRef.current || !start) return;

    splitsRef.current = [];
    targetsRef.current = [];

    const wrapper = wrapperRef.current;
    const elements = wrapper.hasAttribute('data-copy-wrapper')
      ? Array.from(wrapper.children) as HTMLElement[]
      : [wrapper];

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const buildAndAnimate = () => {
      if (!wrapperRef.current) return;
      ctx = gsap.context(() => {
        elements.forEach((el) => {
          if (splitBy === 'lines') {
            const split = SplitText.create(el, {
              type: 'lines',
              mask: 'lines',
              linesClass: 'line++',
              reduceWhiteSpace: false,
            });
            splitsRef.current.push(split);
            targetsRef.current.push(...(split.lines as HTMLElement[]));
            return;
          }
          const split = SplitText.create(el, {
            type: 'lines,chars',
            mask: 'chars',
            charsClass: 'char++',
            reduceWhiteSpace: false,
          });
          split.masks?.forEach((m) => {
            const maskEl = m as HTMLElement;
            maskEl.style.paddingInline = '0.04em';
            maskEl.style.marginInline = '-0.04em';
            maskEl.style.boxSizing = 'content-box';
          });
          splitsRef.current.push(split);
          targetsRef.current.push(...(split.chars as HTMLElement[]));
        });

        if (reducedMotion) {
          gsap.set(targetsRef.current, {
            yPercent: 0,
            xPercent: 0,
            rotate: 0,
            opacity: 1,
          });
          gsap.set(wrapper, { opacity: 0, y: 24 });
          const tweenVars: gsap.TweenVars = {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay,
          };
          if (onComplete) {
            gsap.delayedCall(Math.max(delay + 0.8 - completeOverlap, 0), onComplete);
          }
          if (animateOnScroll) {
            gsap.to(wrapper, {
              ...tweenVars,
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 85%',
                once: true,
              },
            });
          } else {
            gsap.to(wrapper, { ...tweenVars });
          }
          return;
        }

        const initialDir = DIRECTIONS[direction] || DIRECTIONS.bottom;
        gsap.set(wrapper, { opacity: 1 });
        const fromVars: gsap.TweenVars = {
          ...initialDir,
          willChange: 'transform',
        };
        const computedStagger = stagger ?? (splitBy === 'lines' ? 0.1 : 0.03);
        const toVars: gsap.TweenVars = {
          yPercent: 0,
          xPercent: 0,
          rotate: 0,
          opacity: 1,
          duration,
          stagger: computedStagger,
          ease: 'power3.out',
          delay,
        };

        if (onComplete) {
          const totalDuration =
            delay +
            computedStagger * Math.max(targetsRef.current.length - 1, 0) +
            duration;
          gsap.delayedCall(Math.max(totalDuration - completeOverlap, 0), onComplete);
        }

        if (animateOnScroll) {
          gsap.fromTo(targetsRef.current, fromVars, {
            ...toVars,
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
              end: 'bottom 68%',
              scrub,
            },
          });
        } else {
          gsap.fromTo(targetsRef.current, fromVars, toVars);
        }
      }, wrapper);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(buildAndAnimate, buildAndAnimate);
    } else {
      buildAndAnimate();
    }

    return () => {
      if (timer) clearTimeout(timer);
      ctx?.revert();
      splitsRef.current.forEach((s) => s?.revert());
      splitsRef.current = [];
      targetsRef.current = [];
    };
  }, [
    animateOnScroll,
    completeOverlap,
    delay,
    direction,
    duration,
    onComplete,
    scrub,
    splitBy,
    stagger,
    start,
  ]);

  return (
    <div
      ref={wrapperRef}
      data-copy-wrapper="true"
      className={className}
      style={!start ? { opacity: 0 } : undefined}
    >
      {children}
    </div>
  );
}
