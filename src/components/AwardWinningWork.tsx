'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    name: 'HMTI UBSI Margonda',
    tags: ['Organization Portal', 'Laravel Reverb'],
    imgSrc: '/projects/project-hmti-ubsi.png',
    link: 'https://hmtiubsimargo.amx.qzz.io/',
  },
  {
    name: 'KodeKiri Studio',
    tags: ['Dev & Motion Studio', 'Web Engineering'],
    imgSrc: '/projects/project-kode-kiri.png',
    link: 'https://www.kodekiri.tech/',
  },
  {
    name: "MAU'S Kitchen",
    tags: ['Culinary Platform', 'E-Commerce Experience'],
    imgSrc: '/projects/project-mau-kitchen.png',
    link: 'https://maukitchen.my.id/',
  },
];

export default function AwardWinningWork() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleClipRef = useRef<HTMLDivElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIdxRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const reducedMotionRef = useRef(false);

  // Dynamic progress line position between first and last dot
  const [lineStyle, setLineStyle] = useState<{ left: string | number; top: string | number; height: string | number }>({
    left: '5px',
    top: '12px',
    height: '14vw',
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const anim = window.requestAnimationFrame(() => setReducedMotion(mq.matches));
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      setReducedMotion(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => {
      window.cancelAnimationFrame(anim);
      mq.removeEventListener('change', onChange);
    };
  }, []);

  // Recalculate the vertical progress line connecting the dots
  useEffect(() => {
    const updateLinePosition = () => {
      const firstDot = dotsRef.current[0];
      const lastDot = dotsRef.current[PROJECTS.length - 1];
      const container = listContainerRef.current;
      if (firstDot && lastDot && container) {
        const containerRect = container.getBoundingClientRect();
        const firstRect = firstDot.getBoundingClientRect();
        const lastRect = lastDot.getBoundingClientRect();

        const left = firstRect.left - containerRect.left + firstRect.width / 2;
        const top = firstRect.top - containerRect.top + firstRect.height / 2;
        const bottom = lastRect.top - containerRect.top + lastRect.height / 2;

        setLineStyle({
          left: `${left}px`,
          top: `${top}px`,
          height: `${Math.max(0, bottom - top)}px`,
        });
      }
    };

    const raf = requestAnimationFrame(() => {
      updateLinePosition();
    });
    window.addEventListener('resize', updateLinePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateLinePosition);
    };
  }, []);

  useEffect(() => {
    const cardCount = PROJECTS.length - 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'portfolio-scroll',
        trigger: '#portfolio',
        start: '10% top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            cardCount,
            Math.max(0, Math.round(self.progress * cardCount))
          );
          if (activeIdxRef.current !== idx) {
            activeIdxRef.current = idx;
            setActiveIndex(idx);
          }
        },
        ...(reducedMotionRef.current
          ? {}
          : {
              snap: {
                snapTo: 1 / cardCount,
                duration: { min: 0.2, max: 0.6 },
                ease: 'power1.inOut',
              },
            }),
      },
    });

    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleY: 0 });
    }
    if (dotsRef.current[0]) {
      gsap.set(dotsRef.current[0], { backgroundColor: '#ffffff', borderColor: '#ffffff' });
    }
    dotsRef.current.slice(1).forEach((dot) => {
      if (dot) {
        gsap.set(dot, { backgroundColor: '#F06A0E', borderColor: 'rgba(255,255,255,0.5)' });
      }
    });

    cardsRef.current.forEach((card, idx) => {
      if (card) {
        gsap.set(card, {
          opacity: 1,
          filter: 'brightness(1)',
          pointerEvents: idx === 0 ? 'auto' : 'none',
        });
      }
    });

    if (reducedMotionRef.current) {
      cardsRef.current.slice(1).forEach((card) => {
        if (card) gsap.set(card, { opacity: 0 });
      });
    } else {
      cardsRef.current.slice(1).forEach((card) => {
        if (card) gsap.set(card, { yPercent: 100, opacity: 1 });
      });
    }

    if (progressBarRef.current) {
      tl.to(progressBarRef.current, { scaleY: 1, ease: 'none', duration: cardCount }, 0);
    }

    for (let i = 0; i < cardCount; i++) {
      const nextCard = cardsRef.current[i + 1];
      const curCard = cardsRef.current[i];
      const nextDot = dotsRef.current[i + 1];

      if (reducedMotionRef.current) {
        if (nextCard) tl.to(nextCard, { opacity: 1, ease: 'none', duration: 1 }, i);
      } else {
        if (nextCard) tl.to(nextCard, { yPercent: 0, ease: 'power2.inOut', duration: 1 }, i);
      }

      if (curCard) {
        tl.to(curCard, { opacity: 0, ease: 'power2.inOut', duration: 1 }, i);
      }

      // Synchronize pointer events at transition midpoint so only the active card is clickable
      if (curCard) {
        tl.set(curCard, { pointerEvents: 'none' }, i + 0.5);
      }
      if (nextCard) {
        tl.set(nextCard, { pointerEvents: 'auto' }, i + 0.5);
      }

      if (nextDot) {
        tl.set(nextDot, { backgroundColor: '#ffffff', borderColor: '#ffffff' }, i + 1);
      }
    }

    let circleTween: gsap.core.Tween | null = null;
    let clipTween: gsap.core.Tween | null = null;

    if (!reducedMotionRef.current) {
      const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
      circleTween = gsap.to('.circle-clip', {
        yPercent: isDesktop ? -70 : -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '#portfolio',
          start: 'top bottom',
          end: '30% bottom',
          scrub: true,
        },
      });

      if (circleClipRef.current) {
        gsap.set(circleClipRef.current, {
          clipPath: 'ellipse(150% 100% at 50% 100%)',
        });
        clipTween = gsap.to(circleClipRef.current, {
          clipPath: 'ellipse(60% 100% at 50% 100%)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top bottom',
            end: '30% bottom',
            scrub: true,
          },
        });
      }
    }

    return () => {
      circleTween?.scrollTrigger?.kill();
      circleTween?.kill();
      clipTween?.scrollTrigger?.kill();
      clipTween?.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Smooth scroll to specific project slide when clicked from list
  const scrollToProject = (index: number) => {
    const trigger = ScrollTrigger.getById('portfolio-scroll');
    if (!trigger) return;
    const cardCount = PROJECTS.length - 1;
    const progress = index / cardCount;
    const targetScroll = trigger.start + progress * (trigger.end - trigger.start);
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(targetScroll, { duration: 0.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`relative w-screen max-w-full h-[300vh] text-white ${
        reducedMotion ? 'pt-[8vw]' : 'pt-[8vw] max-[1025px]:pt-[12vw]'
      }`}
      id="portfolio"
    >
      <div
        ref={circleClipRef}
        className="w-full h-[50vh] absolute top-0 left-0 z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] circle-clip will-change-[clip-path]"
      />
      <div
        className="w-screen max-w-full h-screen h-[100dvh] sticky top-0 z-3 flex flex-col items-center justify-center px-4 sm:px-6 md:px-[4vw] py-3 sm:py-6 md:py-0 gap-3 sm:gap-5 lg:gap-[4vw] overflow-hidden bg-linear-to-r from-[#F16B0D] to-[#E61416]"
      >
        <Copy stagger={0.015}>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-[5.5vw] text-center font-normal tracking-tight">
            Selected Works
          </h2>
        </Copy>
        <div className="w-full flex items-center justify-between gap-4 sm:gap-6 lg:gap-[4vw] max-[1025px]:flex-col max-[1025px]:items-center">
          {/* Project List / Indicators */}
          <div
            ref={listContainerRef}
            className="w-full max-w-xl lg:w-[34%] relative shrink-0"
          >
            {/* Background Track Line */}
            <div
              className="absolute bg-white/20 w-px -translate-x-1/2 z-0"
              style={{
                left: lineStyle.left,
                top: lineStyle.top,
                height: lineStyle.height,
              }}
            />
            {/* Active Progress Line */}
            <div
              ref={progressBarRef}
              className="absolute bg-white origin-top w-px -translate-x-1/2 z-0"
              style={{
                left: lineStyle.left,
                top: lineStyle.top,
                height: lineStyle.height,
              }}
            />

            <div className="flex flex-col gap-2 sm:gap-3 lg:gap-[1.5vw]">
              {PROJECTS.map((r, i) => (
                <div
                  key={r.name}
                  onClick={() => scrollToProject(i)}
                  className="relative flex items-start gap-3 sm:gap-4 lg:gap-[1.2vw] cursor-pointer group py-1 sm:py-1.5 lg:h-[7vw] lg:py-0 select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToProject(i);
                    }
                  }}
                  aria-label={`Scroll to ${r.name}`}
                >
                  <div className="relative flex items-center justify-center pt-1 sm:pt-1.5 lg:pt-[2.2vw] shrink-0 z-10">
                    <span
                      ref={(t) => {
                        dotsRef.current[i] = t;
                      }}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white/50 bg-[#F06A0E] shrink-0 transition-transform duration-300 group-hover:scale-125"
                    />
                  </div>
                  <div className="flex flex-col lg:justify-center">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm sm:text-base lg:text-[1.5vw] font-normal leading-snug transition-colors duration-300 ${
                          activeIndex === i
                            ? 'text-white font-medium'
                            : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {r.name}
                      </h3>
                      {activeIndex === i && (
                        <a
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-white/90 bg-white/15 hover:bg-white/25 px-2 py-0.5 rounded-full border border-white/20 transition-all duration-200"
                          title={`Visit ${r.name} live site`}
                        >
                          <span>Live</span>
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p
                      className={`text-xs sm:text-sm lg:text-[1vw] transition-colors duration-300 ${
                        activeIndex === i ? 'text-white/90' : 'text-white/50'
                      }`}
                    >
                      {r.tags.join('  •  ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Preview Mockups */}
          <div className="w-full h-[52vw] min-h-[220px] max-h-[350px] sm:h-[46vw] lg:h-[38vw] lg:max-h-none lg:w-[63%] relative overflow-hidden">
            {PROJECTS.map((e, r) => (
              <div
                key={e.name}
                ref={(card) => {
                  cardsRef.current[r] = card;
                }}
                className="absolute inset-0 bg-transparent flex items-center justify-center overflow-hidden"
                style={{ zIndex: r + 1 }}
              >
                <a
                  href={e.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-full flex items-center justify-center cursor-pointer group select-none"
                  aria-label={`Visit ${e.name} live website (opens in new tab)`}
                  title={`Click to open ${e.name} live website`}
                >
                  <Image
                    src={e.imgSrc}
                    alt={e.name}
                    width={1400}
                    height={800}
                    priority={r === 0}
                    className="w-full h-full object-contain p-2 sm:p-3 md:p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-active:scale-[0.98]"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute w-screen h-[60vh] bottom-[-10%] left-0 overflow-hidden max-[1025px]:bottom-[-13%]">
        <div className="w-[115%] h-[40vh] absolute bottom-[35%] left-[-7.5%] z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] blur-2xl max-[1025px]:bottom-[50%] max-[1025px]:w-[120%] max-[1025px]:left-[-10%] max-[1025px]:blur-lg" />
      </div>
    </section>
  );
}
