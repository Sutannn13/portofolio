'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Copy from './Copy';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function RocketIcon({ size = 50, color = '#ff6b00', strokeWidth = 1.5, className = '' }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function LayersIcon({ size = 50, color = '#ff6b00', strokeWidth = 1.5, className = '' }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.5-8.58 3.91a2 2 0 0 1-1.66 0L2 12.5" />
      <path d="m22 17.5-8.58 3.91a2 2 0 0 1-1.66 0L2 17.5" />
    </svg>
  );
}

function PaletteIcon({ size = 50, color = '#ff6b00', strokeWidth = 1.5, className = '' }: { size?: number; color?: string; strokeWidth?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

const CARDS = [
  {
    icon: RocketIcon,
    title: 'Rapid Project Delivery',
    description:
      'Launch faster without sacrificing quality. We streamline design-to-delivery pipelines so your vision hits the market at record speed.',
  },
  {
    icon: PaletteIcon,
    title: 'Precision & Aesthetics',
    description:
      'Every pixel and proportion matters. I create interfaces that communicate sophistication while strictly honoring brand guidelines and consistency.',
  },
  {
    icon: LayersIcon,
    title: 'Future-Proofed Designs',
    description:
      'Stay ahead of shifting trends with an approach that seamlessly integrates with the latest innovations in interactive design and user experience craft.',
  },
];

export default function WhyWorkWithMe() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    lineRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
      }
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      gsap.set('.work-card', { opacity: 1, yPercent: 0 });
      return;
    }

    const tween = gsap.fromTo(
      '.work-card',
      { opacity: 0, yPercent: 10 },
      {
        opacity: 1,
        yPercent: 0,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#work-with-me',
          start: 'top top',
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion]);

  const handleMouseEnter = (idx: number) => {
    const el = lineRefs.current[idx];
    if (el) {
      gsap.killTweensOf(el);
      gsap.set(el, { transformOrigin: 'left center' });
      gsap.to(el, { scaleX: 1, duration: 0.55, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = (idx: number) => {
    const el = lineRefs.current[idx];
    if (el) {
      gsap.killTweensOf(el);
      gsap.set(el, { transformOrigin: 'right center' });
      gsap.to(el, { scaleX: 0, duration: 0.55, ease: 'power2.out' });
    }
  };

  return (
    <section
      className="relative w-screen bg-[#070707] text-white pt-[25vw] pb-[10vw] max-[1025px]:pt-[65vw]"
      id="work-with-me"
    >
      <div className="text-center mb-[5vw] max-md:mb-[10vw]">
        <Copy stagger={0.015}>
          <h2 className="text-[5.5vw] max-[1025px]:text-[7vw] max-md:text-[9vw]">
            Why Work With Me?
          </h2>
        </Copy>
        <Copy splitBy="lines">
          <p className="text-[1.25vw] text-white mt-[1.5vw] max-[1025px]:text-[2.5vw] max-md:text-[4.5vw] max-md:mt-[2vw]">
            Fast-track your Digital Projects
          </p>
        </Copy>
      </div>

      <div className="grid grid-cols-3 max-[1025px]:grid-cols-1">
        {CARDS.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative px-[4vw] pt-[2vw] pb-[3vw] h-[32vw] flex flex-col justify-between work-card max-[1025px]:h-auto max-[1025px]:py-[6vw] max-[1025px]:px-[5vw]"
            >
              <div>
                <Icon
                  size={50}
                  color="#ff6b00"
                  strokeWidth={1.5}
                  className="mb-[2.5vw] max-[1025px]:mb-[4vw]"
                />
                <h3 className="text-[2.2vw] leading-[1.2] max-[1025px]:text-[3.5vw] max-md:text-[5.5vw]">
                  {card.title}
                </h3>
                <p className="text-[1.1vw] leading-[1.6] text-white/70 mt-[1.2vw] max-[1025px]:text-[2vw] max-md:text-[3.6vw] max-md:mt-[3vw]">
                  {card.description}
                </p>
              </div>

              <span
                ref={(el) => {
                  lineRefs.current[idx] = el;
                }}
                className="absolute bottom-0 left-0 w-full h-[2px] bg-linear-to-r from-[#F16B0D] to-[#E61416]"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
