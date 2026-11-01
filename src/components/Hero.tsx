'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechText from './TechText';
import { useLenis } from 'lenis/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PORTFOLIO_COL_1 = [
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/openai.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/gemini.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/deepseek.png',
  '/ai-pure-icons/supabase.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/openai.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/gemini.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/deepseek.png',
  '/ai-pure-icons/supabase.png',
  '/ai-pure-icons/netlify.png',
];

const PORTFOLIO_COL_CENTER = [
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/react.png',
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/9router.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/zedai.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/tailwindcss.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/react.png',
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/9router.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/zedai.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/tailwindcss.png',
];

const PORTFOLIO_COL_2 = [
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/copilot.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/anthropic.png',
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/zhipu.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/github.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/copilot.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/anthropic.png',
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/zhipu.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/github.png',
];

const PORTFOLIO_MOBILE = [
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/openai.png',
  '/ai-pure-icons/anthropic.png',
  '/ai-pure-icons/gemini.png',
  '/ai-pure-icons/copilot.png',
  '/ai-pure-icons/deepseek.png',
  '/ai-pure-icons/react.png',
  '/ai-pure-icons/supabase.png',
  '/ai-pure-icons/9router.png',
  '/ai-pure-icons/tailwindcss.png',
  '/ai-pure-icons/github.png',
  '/ai-pure-icons/zedai.png',
  '/ai-pure-icons/zhipu.png',
  '/ai-pure-icons/docker.png',
  '/ai-pure-icons/netlify.png',
  '/ai-pure-icons/cloudflare.png',
  '/ai-pure-icons/laragon.png',
  '/ai-pure-icons/openai.png',
  '/ai-pure-icons/anthropic.png',
  '/ai-pure-icons/gemini.png',
  '/ai-pure-icons/copilot.png',
  '/ai-pure-icons/deepseek.png',
  '/ai-pure-icons/react.png',
  '/ai-pure-icons/supabase.png',
  '/ai-pure-icons/9router.png',
  '/ai-pure-icons/tailwindcss.png',
  '/ai-pure-icons/github.png',
  '/ai-pure-icons/zedai.png',
  '/ai-pure-icons/zhipu.png',
];

let hasHeroIntroPlayedOnce = false;

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgParallaxRef = useRef<HTMLDivElement | null>(null);
  const textParallaxRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLDivElement | null>(null);
  const line2Ref = useRef<HTMLDivElement | null>(null);
  const subCopyRef = useRef<HTMLDivElement | null>(null);
  const revealImgRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const introRunRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [skipIntroAnim, setSkipIntroAnim] = useState(() => hasHeroIntroPlayedOnce);
  const [startH1, setStartH1] = useState(() => hasHeroIntroPlayedOnce);
  const [startH2, setStartH2] = useState(() => hasHeroIntroPlayedOnce);

  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1025px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!hasHeroIntroPlayedOnce) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [lenis]);

  // Choreographed Intro Timeline (synchronized with Preloader silk curtain lift)
  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    const restoreInstantHero = () => {
      introRunRef.current = true;
      hasHeroIntroPlayedOnce = true;
      setSkipIntroAnim(true);
      if (containerRef.current) gsap.set(containerRef.current, { scale: 1 });
      if (line1Ref.current) gsap.set(line1Ref.current, { opacity: 1, y: 0 });
      if (line2Ref.current) gsap.set(line2Ref.current, { opacity: 1, y: 0 });
      if (subCopyRef.current) gsap.set(subCopyRef.current, { opacity: 1, y: 0 });
      if (revealImgRef.current) {
        revealImgRef.current.style.setProperty('--reveal', '130%');
        gsap.set(revealImgRef.current, { opacity: 1, scale: 1, y: 0 });
      }
      setStartH1(true);
      setStartH2(true);
      const headerEl = document.getElementById('header');
      if (headerEl) {
        gsap.set(headerEl, { yPercent: 0, opacity: 1 });
      }
      lenisRef.current?.start();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if (hasHeroIntroPlayedOnce) {
      restoreInstantHero();
      const onArrive = () => {
        restoreInstantHero();
      };
      window.addEventListener('ppt:arrive', onArrive);
      return () => {
        window.removeEventListener('ppt:arrive', onArrive);
      };
    }

    if (line1Ref.current) {
      gsap.set(line1Ref.current, { opacity: 0, y: 28 });
    }
    if (line2Ref.current) {
      gsap.set(line2Ref.current, { opacity: 0, y: 28 });
    }
    if (subCopyRef.current) {
      gsap.set(subCopyRef.current, { opacity: 0, y: 20 });
    }
    if (revealImgRef.current) {
      gsap.set(revealImgRef.current, { opacity: 0, scale: 1.055, y: 44 });
    }

    const startHeroIntro = () => {
      if (introRunRef.current) return;
      introRunRef.current = true;
      hasHeroIntroPlayedOnce = true;

      const revealObj = { reveal: 8 };
      revealImgRef.current?.style.setProperty('--reveal', '8%');
      tl = gsap.timeline({ delay: 0.06 });

      // 1. Portrait mask sweep & depth settle (pure GPU transform + mask, no heavy blur filter)
      tl.to(
        revealObj,
        {
          reveal: 130,
          duration: 2.05,
          ease: 'power3.out',
          onUpdate: () => {
            revealImgRef.current?.style.setProperty('--reveal', `${revealObj.reveal}%`);
          },
        },
        0
      )
        .to(
          revealImgRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.85,
            ease: 'expo.out',
          },
          0
        )
        // 2. Primary headline ("SUTAN ARLIE") glides in & types
        .call(() => setStartH1(true), undefined, 0.14)
        .to(
          line1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: 'expo.out',
          },
          0.14
        )
        // 3. Secondary headline ("FULL-STACK & AI") glides in & assembles
        .call(() => setStartH2(true), undefined, 0.30)
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'expo.out',
          },
          0.30
        )
        // 4. Right editorial sub-copy reveal
        .to(
          subCopyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'expo.out',
          },
          0.42
        )
        // 5. Top navigation bar settles down
        .call(
          () => {
            const headerEl = document.getElementById('header');
            if (!headerEl) return;
            gsap.fromTo(
              headerEl,
              { yPercent: -40, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 1.15,
                ease: 'expo.out',
                onComplete: () => lenisRef.current?.start(),
              }
            );
          },
          undefined,
          0.48
        );
    };

    window.addEventListener('preloader:complete', startHeroIntro);
    window.addEventListener('ppt:arrive', startHeroIntro);

    const fallbackTimer = setTimeout(() => {
      if (!introRunRef.current) {
        startHeroIntro();
      }
    }, 3500);

    return () => {
      window.removeEventListener('preloader:complete', startHeroIntro);
      window.removeEventListener('ppt:arrive', startHeroIntro);
      clearTimeout(fallbackTimer);
      tl?.kill();
    };
  }, []);

  // Scroll Scrub Scale & Blur
  useEffect(() => {
    if (!containerRef.current || !heroRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      containerRef.current,
      {
        scale: 0.5,
        ease: 'power2.inOut',
        duration: 1,
      },
      0
    );

    if (marqueeRef.current) {
      gsap.set(marqueeRef.current, {
        filter: 'blur(24px)',
        opacity: 0.35,
      });
      tl.to(
        marqueeRef.current,
        {
          filter: 'blur(0px)',
          opacity: 1,
          ease: 'power2.out',
          duration: 0.18,
        },
        0.32
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // Mouse Parallax (Desktop > 1024px)
  useEffect(() => {
    let animId: number;
    if (
      typeof window === 'undefined' ||
      window.innerWidth <= 1024 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const state = {
      targetImgX: 0,
      currentImgX: 0,
      targetTextX: 0,
      currentTextX: 0,
      targetImgY: 0,
      currentImgY: 0,
      targetTextY: 0,
      currentTextY: 0,
    };

    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      state.targetImgX = -(30 * normX);
      state.targetTextX = -(12 * normX);
      state.targetImgY = -(30 * normY);
      state.targetTextY = -(12 * normY);
    };

    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      state.currentImgX += (state.targetImgX - state.currentImgX) * 0.08;
      state.currentTextX += (state.targetTextX - state.currentTextX) * 0.08;
      state.currentImgY += (state.targetImgY - state.currentImgY) * 0.08;
      state.currentTextY += (state.targetTextY - state.currentTextY) * 0.08;

      if (imgParallaxRef.current) {
        gsap.set(imgParallaxRef.current, {
          x: state.currentImgX,
          y: state.currentImgY,
        });
      }
      if (textParallaxRef.current) {
        gsap.set(textParallaxRef.current, {
          x: state.currentTextX,
          y: state.currentTextY,
        });
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-screen h-[300vh]" id="hero">
      <div
        ref={containerRef}
        className="w-screen h-screen sticky top-0 flex justify-between items-center hero-container px-[4vw] z-2 max-[1025px]:px-[5vw] max-[1025px]:items-start max-[1025px]:pt-[30vw] overflow-hidden"
        style={{
          backgroundColor: '#180d08',
          backgroundImage: `
            radial-gradient(65% 55% at 92% 6%, #F0640D 0%, rgba(240,100,13,0) 65%),
            radial-gradient(60% 55% at 4% 82%, #EC690F 0%, rgba(236,105,15,0) 65%),
            radial-gradient(75% 80% at 48% 42%, #B01205 0%, rgba(176,18,5,0) 70%),
            linear-gradient(180deg, #D8470A 0%, #C0300A 28%, #B01205 46%, #7A1C08 68%, #2A1108 88%, #180D08 100%)
          `,
        }}
      >
        <div
          ref={textParallaxRef}
          className="w-full h-fit flex justify-between relative z-10 pointer-events-none max-[1025px]:flex-col max-[1025px]:gap-8"
        >
          <div className="w-[42vw] max-w-[520px] max-[1025px]:w-[65%] max-md:w-full flex flex-col gap-1 pointer-events-auto select-none">
            <div
              ref={line1Ref}
              className="w-full h-[110px] sm:h-[130px] md:h-[150px] lg:h-[170px] opacity-0 will-change-[transform,opacity]"
            >
              <TechText
                text="SUTAN ARLIE"
                fontWeight={700}
                fontSize={135}
                align="left"
                color="#ffffff"
                accentColor="#F0640D"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={16}
                intro={skipIntroAnim ? 'none' : startH1 ? 'type' : 'none'}
                introDuration={1.45}
                clickKick
                draggable
                sweep
                labels
              />
            </div>
            <div
              ref={line2Ref}
              className="w-full h-[55px] sm:h-[65px] md:h-[80px] lg:h-[95px] opacity-0 will-change-[transform,opacity]"
            >
              <TechText
                text="FULL-STACK & AI"
                fontWeight={600}
                fontSize={75}
                align="left"
                color="#ffffff"
                accentColor="#F0640D"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={12}
                intro={skipIntroAnim ? 'none' : startH2 ? 'assemble' : 'none'}
                introDuration={1.65}
                clickKick
                draggable
                sweep
                labels
              />
            </div>
          </div>
          <div
            ref={subCopyRef}
            className="w-[12%] min-w-[140px] flex flex-col justify-between text-end text-[1.25vw] leading-[1.15] py-[2vw] max-[1025px]:w-[50%] max-[1025px]:text-[3.5vw] max-[1025px]:text-start max-[1025px]:flex-col-reverse max-md:text-[4.5vw] max-md:gap-[7vw] max-[1025px]:gap-20 max-md:py-0 will-change-[transform,opacity]"
          >
            <p className="text-white">
              Scalable Web &
              <br />
              AI Systems
            </p>
            <p className="text-white">
              Full-Stack &
              <br />
              <span className="whitespace-nowrap">Software Engineer</span>
            </p>
          </div>
        </div>

        <div
          ref={revealImgRef}
          className="absolute bottom-[-64%] left-1/2 translate-x-[-49.5%] size-[180%] z-0 max-[1025px]:w-full max-[1025px]:translate-x-[-40%] max-md:w-[160%] max-md:top-auto max-md:bottom-[-30%] max-md:h-auto max-md:translate-x-[-40%] hero-av-img hero-mask-reveal opacity-0"
        >
          <div ref={imgParallaxRef} className="w-full h-full">
            <Image
              src="/hero-bg-full-img.webp"
              alt="Johann Portrait"
              width={1142}
              height={1378}
              priority
              loading="eager"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div
        ref={marqueeRef}
        className="absolute inset-0 w-full h-full bg-[#070707]"
      >
        <div className="w-full h-screen sticky top-0 px-[4vw] flex justify-between overflow-hidden">
          {/* Kolom Kiri */}
          <div className="w-[18vw] max-[1025px]:w-[24vw] max-md:w-[28vw] h-fit flex flex-col gap-[3vw] marquee-1">
            {(isMobile ? PORTFOLIO_MOBILE : PORTFOLIO_COL_1).map((src, i) => (
              <div
                key={i}
                className="w-full h-[18vw] max-[1025px]:h-[28vw] max-md:h-[36vw] flex items-center justify-center select-none pointer-events-none"
              >
                <div className="relative w-[11vw] h-[11vw] max-w-[140px] max-h-[140px] min-w-[64px] min-h-[64px] flex items-center justify-center">
                  <Image
                    src={src}
                    alt="ai-icon"
                    width={256}
                    height={256}
                    unoptimized
                    loading="eager"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Kolom Tengah (Sejajar di Belakang Hero Card) */}
          <div
            className="w-[18vw] max-[1025px]:w-[24vw] max-md:w-[28vw] h-fit flex flex-col gap-[3vw] marquee-3"
            style={{ willChange: 'transform', animation: '20s linear infinite marquee-scroll-y' }}
          >
            {(isMobile ? PORTFOLIO_MOBILE : PORTFOLIO_COL_CENTER).map((src, i) => (
              <div
                key={i}
                className="w-full h-[18vw] max-[1025px]:h-[28vw] max-md:h-[36vw] flex items-center justify-center select-none pointer-events-none"
              >
                <div className="relative w-[11vw] h-[11vw] max-w-[140px] max-h-[140px] min-w-[64px] min-h-[64px] flex items-center justify-center">
                  <Image
                    src={src}
                    alt="ai-icon"
                    width={256}
                    height={256}
                    unoptimized
                    loading="eager"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Kolom Kanan */}
          <div className="w-[18vw] max-[1025px]:w-[24vw] max-md:w-[28vw] h-fit flex flex-col gap-[3vw] marquee-2">
            {(isMobile ? PORTFOLIO_MOBILE : PORTFOLIO_COL_2).map((src, i) => (
              <div
                key={i}
                className="w-full h-[18vw] max-[1025px]:h-[28vw] max-md:h-[36vw] flex items-center justify-center select-none pointer-events-none"
              >
                <div className="relative w-[11vw] h-[11vw] max-w-[140px] max-h-[140px] min-w-[64px] min-h-[64px] flex items-center justify-center">
                  <Image
                    src={src}
                    alt="ai-icon"
                    width={256}
                    height={256}
                    unoptimized
                    loading="eager"
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
