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
    imgSrc: '/projects/project-hmti-ubsi.jpeg',
  },
  {
    name: 'KodeKiri Studio',
    tags: ['Dev & Motion Studio', 'Web Engineering'],
    imgSrc: '/projects/project-kode-kiri.jpeg',
  },
  {
    name: "MAU'S Kitchen",
    tags: ['Culinary Platform', 'E-Commerce Experience'],
    imgSrc: '/projects/project-mau-kitche.jpeg',
  },
];

export default function AwardWinningWork() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleClipRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const reducedMotionRef = useRef(false);

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

  useEffect(() => {
    const cardCount = PROJECTS.length - 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#portfolio',
        start: '10% top',
        end: 'bottom bottom',
        scrub: true,
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
    cardsRef.current.forEach((card) => {
      if (card) gsap.set(card, { filter: 'brightness(1)' });
    });

    if (reducedMotionRef.current) {
      cardsRef.current.slice(1).forEach((card) => {
        if (card) gsap.set(card, { opacity: 0 });
      });
    } else {
      cardsRef.current.slice(1).forEach((card) => {
        if (card) gsap.set(card, { yPercent: 100 });
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
        tl.to(curCard, { filter: 'brightness(0.3)', ease: 'power2.inOut', duration: 1 }, i);
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

  return (
    <section
      className={`relative w-screen h-[300vh] text-white ${
        reducedMotion ? 'pt-[8vw]' : 'pt-[8vw] max-[1025px]:pt-[30vw]'
      }`}
      id="portfolio"
    >
      <div
        ref={circleClipRef}
        className="w-full h-[50vh] absolute top-0 left-0 z-2 bg-linear-to-r from-[#F16B0D] to-[#E61416] circle-clip will-change-[clip-path]"
      />
      <div
        className="w-screen h-screen sticky top-0 z-3 flex flex-col items-center justify-center px-[4vw] gap-[5vw] overflow-hidden bg-linear-to-r from-[#F16B0D] to-[#E61416] max-md:gap-[15vw] max-[1025px]:gap-12 max-[1025px]:px-[5vw]"
      >
        <Copy stagger={0.015}>
          <h2 className="text-[5.5vw] text-center max-[1025px]:text-[6.5vw] max-md:text-[9vw]">
            Selected Works
          </h2>
        </Copy>
        <div className="w-full flex items-center gap-[4vw] max-[1025px]:flex-col max-md:gap-[15vw] max-[1025px]:items-start max-[1025px]:gap-16">
          <div className="w-[32%] relative max-md:w-full max-[1025px]:w-[50%]">
            <div className="absolute left-1 bg-white/20 top-[2.5vw] max-[1025px]:top-[1vw] h-[14vw] max-[1025px]:h-[22vw] max-md:h-[41.5vw] w-px" />
            <div
              ref={progressBarRef}
              className="absolute left-1 bg-white origin-top top-[2.5vw] max-[1025px]:top-[1vw] h-[14vw] max-[1025px]:h-[22vw] max-md:h-[41.5vw] w-px"
            />
            <div className="flex flex-col max-[1025px]:gap-[4vw] max-md:gap-[14vw]">
              {PROJECTS.map((r, i) => (
                <div
                  key={r.name}
                  className="relative flex items-center gap-[1.2vw] max-md:gap-[5vw]"
                  style={{ height: '7vw' }}
                >
                  <span
                    ref={(t) => {
                      dotsRef.current[i] = t;
                    }}
                    className="w-[10px] h-[10px] mt-[-1.5vw] bg-[#F06A0E] rounded-full border shrink-0 max-md:mt-[-7vw] max-[1025px]:mt-[-4vw]"
                  />
                  <div>
                    <h3 className="text-[1.5vw] font-normal max-[1025px]:text-[3.5vw] max-md:text-[5.5vw]">
                      {r.name}
                    </h3>
                    <p className="text-[1vw] max-[1025px]:text-[2.5vw] max-md:text-[4.2vw]">
                      {r.tags.join('  •  ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[38vw] relative rounded-xl overflow-hidden max-[1025px]:w-full max-[1025px]:h-[52vw] max-[1025px]:rounded-lg">
            {PROJECTS.map((e, r) => (
              <div
                key={e.name}
                ref={(card) => {
                  cardsRef.current[r] = card;
                }}
                className="absolute inset-0 bg-[#F4EFE9] flex items-center justify-center rounded-xl overflow-hidden max-[1025px]:rounded-lg"
                style={{ zIndex: r + 1 }}
              >
                <Image
                  src={e.imgSrc}
                  alt={e.name}
                  width={1400}
                  height={800}
                  priority={r === 0}
                  className="w-full h-full object-cover object-top"
                />
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

