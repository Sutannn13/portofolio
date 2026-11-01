'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    title: 'Full-Stack Engineering',
    items: ['Next.js & React Ecosystem', 'TypeScript Architecture', 'Laravel & Modern PHP API', 'RESTful & WebSocket Services'],
    href: '#portfolio',
  },
  {
    title: 'Agentic AI & LLMs',
    items: ['LLM Pipeline & Tool Calling', 'Gemini & OpenAI Integration', 'Model Context Protocol (MCP)', 'Autonomous Workflow Automation'],
    href: '#portfolio',
  },
  {
    title: 'Creative Frontend & Motion',
    items: ['GSAP & ScrollTrigger Animation', 'Micro-interactions & UX Craft', 'Responsive Layouts & Design Tokens', 'Tailwind CSS Architecture'],
    href: '#portfolio',
  },
  {
    title: 'Backend & Data Systems',
    items: ['PostgreSQL & Supabase', 'Realtime Event Streams', 'Database Schema & Query Tuning', 'Secure Authentication & RBAC'],
    href: '#portfolio',
  },
];

export default function Services() {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealsRef = useRef(SERVICES.map((_, i) => ({ value: i === 0 ? 100 : -40 })));
  const [activeCard, setActiveCard] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const anim = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(anim);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      if (rowRef.current) gsap.set(rowRef.current, { clearProps: 'transform' });
      return;
    }

    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1025;
    const isTablet =
      typeof window !== 'undefined' &&
      window.innerWidth <= 1025 &&
      window.innerWidth > 541;

    let startX = 40;
    let endX = -65;
    if (isDesktop) {
      startX = 55;
      endX = -22;
    } else if (isTablet) {
      startX = 40;
      endX = -52;
    }

    const tween = gsap.fromTo(
      rowRef.current,
      { xPercent: startX },
      {
        xPercent: endX,
        ease: 'none',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  const handleCardHover = (newIdx: number) => {
    if (newIdx === activeCard) return;
    const dur = reducedMotion ? 0 : 0.45;

    gsap.to(revealsRef.current[activeCard], {
      value: -40,
      duration: dur,
      ease: 'power2.out',
      onUpdate: () => {
        maskRefs.current[activeCard]?.style.setProperty(
          '--reveal',
          `${revealsRef.current[activeCard].value}%`
        );
      },
    });

    gsap.to(revealsRef.current[newIdx], {
      value: 100,
      duration: dur,
      ease: 'power2.out',
      onUpdate: () => {
        maskRefs.current[newIdx]?.style.setProperty(
          '--reveal',
          `${revealsRef.current[newIdx].value}%`
        );
      },
    });

    setActiveCard(newIdx);
  };

  return (
    <section
      className={`services-section relative w-screen bg-[#070707] text-white ${
        reducedMotion ? '' : 'h-[275vh]'
      }`}
      id="services"
    >
      <div className="relative pt-[6vw] px-[4vw] w-[60%] max-[1025px]:w-[85%] max-md:w-full max-[1025px]:px-[5vw] max-[1025px]:pt-[15vw]">
        <Copy stagger={0.015}>
          <h2 className="text-[5.5vw] leading-[1.2] max-[1025px]:text-[7vw] max-md:text-[9vw]">
            End-to-End
            <br />
            Engineering Stack
          </h2>
        </Copy>
        <div className="w-[75%] max-[1025px]:w-full mt-[1.5vw] max-[1025px]:mt-[5vw]">
          <Copy splitBy="lines">
            <p className="text-[1.25vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw]">
              Building modern web applications from interactive interfaces and resilient
              data architectures to practical, production-ready AI systems.
            </p>
          </Copy>
        </div>
      </div>

      <div
        className={`services-sticky ${
          reducedMotion
            ? 'w-screen pb-[6vw]'
            : 'w-screen h-screen sticky top-0 overflow-hidden flex flex-col max-md:mt-[-30vw]'
        }`}
      >
        <div className={reducedMotion ? '' : 'relative flex-1 flex items-center'}>
          <div
            ref={rowRef}
            className={`services-row ${
              reducedMotion
                ? 'grid grid-cols-3 gap-[1.6vw] px-[4vw] pt-[5vw] max-[1025px]:grid-cols-2 max-md:grid-cols-1'
                : 'flex gap-[1.6vw] px-[4vw] will-change-transform max-[1025px]:gap-[2.5vw] max-md:gap-[6vw]'
            }`}
          >
            {SERVICES.map((service, idx) => (
              <Link
                key={service.title}
                href={service.href}
                onMouseEnter={() => handleCardHover(idx)}
                className={`services-card ${
                  reducedMotion
                    ? 'relative rounded-lg p-[1.6vw] flex flex-col justify-between bg-[#161616] overflow-hidden min-h-[22vw] max-[1025px]:min-h-[32vw] max-[1025px]:p-[3vw] max-md:min-h-0 max-md:p-[5vw] border border-white/20'
                    : 'relative w-[27vw] h-[30vw] shrink-0 rounded-lg p-[1.6vw] flex flex-col justify-between bg-[#161616] overflow-hidden max-[1025px]:w-[55vw] max-[1025px]:h-[65vw] max-[1025px]:p-[3vw] max-md:w-[75vw] max-md:h-[85vw] max-md:p-[5vw] border border-white/20 group'
                }`}
              >
                <div
                  ref={(el) => {
                    maskRefs.current[idx] = el;
                    el?.style.setProperty('--reveal', `${revealsRef.current[idx].value}%`);
                  }}
                  className="absolute inset-0 bg-linear-to-r from-[#F16B0D] to-[#E61416] radial-mask-bg-fill"
                />

                <div className="relative flex justify-end">
                  <div
                    className={`size-12 rounded-full flex items-center justify-center transition-colors duration-300 max-[1025px]:size-10 ${
                      activeCard === idx
                        ? 'bg-white text-black'
                        : 'border border-white/30 text-white'
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="rotate-[-45deg]"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-2">
                  <h3 className="text-[2.2vw] leading-[1.2] max-[1025px]:text-[3.5vw] max-md:text-[6vw] mb-[1.5vw] max-md:mb-[3vw]">
                    {service.title}
                  </h3>
                  <ul className="space-y-[0.4vw] max-[1025px]:space-y-1">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-[1.1vw] text-white/70 flex items-center gap-2 max-[1025px]:text-[2vw] max-md:text-[3.5vw]"
                      >
                        <span className="size-1 rounded-full bg-white/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
